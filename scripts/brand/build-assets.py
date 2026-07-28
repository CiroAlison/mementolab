"""Step 2 — build every brand asset from the extracted spiral.

Input : spiral_authentic.png            (output of extract-spiral.py)
        ../../public/brand/logo-concept.png  (the wordmark letterforms, native res)
Writes (into ../../public):
    brand/spiral.png         faithful spiral, transparent (used everywhere it spins)
    brand/spiral-cream.png   cream silhouette of the spiral (watermark on dark bg)
    brand/wordmark-full.png  "MEMENTO<spiral>LAB" — navy letters + spiral as the O
    brand/wordmark-cream.png cream version of the wordmark (dark backgrounds)
    apple-icon.png           favicon / app icon (spiral on orange, padded)

Every transparent output is VERIFIED to actually have transparency, so a fully
opaque navy rectangle can never ship again. Run: `python3 build-assets.py`.
"""
import os
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
PUBLIC = os.path.normpath(os.path.join(HERE, "..", "..", "public"))
ORANGE = np.array([255, 100, 0], dtype=np.float32)
CREAM = (251, 241, 228)

spiral = Image.open(os.path.join(HERE, "spiral_authentic.png")).convert("RGBA")


def report(name, im):
    frac = round((np.asarray(im)[:, :, 3] < 30).mean(), 3)
    assert frac > 0.10, f"{name} has NO transparency (frac={frac}) -> solid block!"
    print(f"OK {name} {im.size} transparent_frac={frac}")


# 1) spiral.png
spiral.save(f"{PUBLIC}/brand/spiral.png")
report("brand/spiral.png", spiral)

# 2) spiral-cream.png (recolour ink -> cream, keep alpha)
a = np.asarray(spiral).copy()
a[:, :, 0], a[:, :, 1], a[:, :, 2] = CREAM
cream_sp = Image.fromarray(a, "RGBA")
cream_sp.save(f"{PUBLIC}/brand/spiral-cream.png")
report("brand/spiral-cream.png", cream_sp)

# 3) wordmark-full.png — replace the concept's low-res O with the hi-res spiral
concept = Image.open(f"{PUBLIC}/brand/logo-concept.png").convert("RGB").copy()
px = concept.load()
for y in range(258, 342):                       # erase the old O (orange fill)
    for x in range(376, 455):
        px[x, y] = tuple(int(v) for v in ORANGE)
D, cx, cy = 86, 415, 301                         # spiral size + O centre in the concept
tmp = concept.convert("RGBA")
tmp.alpha_composite(spiral.resize((D, D), Image.LANCZOS), (cx - D // 2, cy - D // 2))
comp = np.asarray(tmp.convert("RGB")).astype(np.float32)

d = np.sqrt(((comp - ORANGE) ** 2).sum(axis=2))
alpha = np.clip((d - 45) / (120 - 45), 0, 1)     # key orange -> transparent
wm = np.dstack([comp.astype(np.uint8), (alpha * 255).astype(np.uint8)])
wm_im = Image.fromarray(wm, "RGBA")
al = np.asarray(wm_im)[:, :, 3]
ys, xs = np.where(al > 18)
pad = 6
wm_im = wm_im.crop((max(0, xs.min() - pad), max(0, ys.min() - pad), xs.max() + pad, ys.max() + pad))
wm_im.save(f"{PUBLIC}/brand/wordmark-full.png")
report("brand/wordmark-full.png", wm_im)

# 4) wordmark-cream.png
w = np.asarray(wm_im).copy()
w[:, :, 0], w[:, :, 1], w[:, :, 2] = CREAM
cream_wm = Image.fromarray(w, "RGBA")
cream_wm.save(f"{PUBLIC}/brand/wordmark-cream.png")
report("brand/wordmark-cream.png", cream_wm)

# 5) favicon / apple-icon (spiral on orange, padded, square)
S, p = 512, int(512 * 0.14)
icon = Image.new("RGBA", (S, S), tuple(int(v) for v in ORANGE) + (255,))
icon.alpha_composite(spiral.resize((S - 2 * p, S - 2 * p), Image.LANCZOS), (p, p))
icon.convert("RGB").save(f"{PUBLIC}/apple-icon.png")
print("OK apple-icon.png 512x512 (opaque icon, expected)")
print("all assets written")
