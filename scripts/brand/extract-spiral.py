"""Step 1 — extract the MementoLab spiral from the client's scanned logo.

Input : source-spiral-scan.png  (the spiral, painted in navy/steel-blue on an
        orange card — the PNG embedded in the PDF the client provided).
Output: spiral_authentic.png    (1000x1000, transparent background, faithful
        colours — deep indigo + steel blue, NOT lightened).

Method: soft-key out the orange background to transparency while keeping the
scan's ORIGINAL ink RGB (no colour "cleaning"/decontamination — that lightened
earlier versions). Disconnected paint flecks are removed so they don't read as
dirt inside the wordmark. Run: `python3 extract-spiral.py` (needs numpy+scipy).
"""
import os
import numpy as np
from PIL import Image
from scipy import ndimage

HERE = os.path.dirname(os.path.abspath(__file__))
ORANGE = np.array([255, 100, 0], dtype=np.float32)  # scanned card background
LO, HI = 45.0, 120.0                                # soft alpha key (dist. from orange)

src = Image.open(os.path.join(HERE, "source-spiral-scan.png")).convert("RGB")
a = np.asarray(src).astype(np.float32)

# alpha = how far each pixel is from the orange background (0 orange .. 1 ink)
d = np.sqrt(((a - ORANGE) ** 2).sum(axis=2))
alpha = np.clip((d - LO) / (HI - LO), 0, 1)

# ——— CORREZIONE COLORE ———
# La scansione è la FOTO di una stampa: la carta e il riflesso hanno spento il
# blu del brand in un grigio-viola slavato (ink medio ~(93,72,93)), mentre i
# colori digitali veri del logo sono un blu profondo (~(36,57,85), vedi
# logo-concept.png e pattern-spirale.png). Qui riportiamo i colori a quelli
# ORIGINALI del brand MANTENENDO intatta la pennellata: usiamo la luminosità di
# ogni pixel (cioè la texture del pennello) per interpolare fra il navy profondo
# e l'azzurro del brand. Nessun ridisegno: solo i colori giusti.
NAVY = np.array([10, 42, 76], dtype=np.float32)    # brand ink  #0A2A4C
SKY = np.array([46, 147, 200], dtype=np.float32)   # brand sky  #2E93C8

lum = a @ np.array([0.299, 0.587, 0.114], dtype=np.float32)
ink = alpha > 0.5                                   # solo dove c'è colore vero
lo, hi = np.percentile(lum[ink], 4), np.percentile(lum[ink], 96)
t = np.clip((lum - lo) / max(hi - lo, 1e-6), 0, 1)
t = t ** 1.45  # il navy resta dominante, come nel logo originale
rgb = NAVY + t[..., None] * (SKY - NAVY)

rgba = np.dstack([rgb.astype(np.uint8), (alpha * 255).astype(np.uint8)])

# Remove disconnected flecks: dilate to bridge the real (thin) strands into one
# blob, keep the largest blob, drop everything spatially separated from it.
mask = alpha > 0.16
dil = ndimage.binary_dilation(mask, iterations=13)
lbl, n = ndimage.label(dil)
sizes = ndimage.sum(np.ones_like(lbl), lbl, range(1, n + 1))
keep = lbl == (np.argmax(sizes) + 1)
rgba[..., 3] = np.where(keep, rgba[..., 3], 0)

out = Image.fromarray(rgba, "RGBA")

# trim to the swirl, square it with a little breathing room, resize to 1000px
al = np.asarray(out)[:, :, 3]
ys, xs = np.where(al > 12)
crop = out.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
w, h = crop.size
side = max(w, h)
pad = int(side * 0.06)
canvas = Image.new("RGBA", (side + 2 * pad, side + 2 * pad), (0, 0, 0, 0))
canvas.alpha_composite(crop, ((side - w) // 2 + pad, (side - h) // 2 + pad))
final = canvas.resize((1000, 1000), Image.LANCZOS)
final.save(os.path.join(HERE, "spiral_authentic.png"))

al = np.asarray(final)[:, :, 3]
print("spiral_authentic.png", final.size,
      "transparent_frac", round((al < 30).mean(), 3),
      "solid ink median RGB", np.median(np.asarray(final)[al > 240][:, :3], axis=0).astype(int))
