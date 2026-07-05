# HANDOFF — MementoLab

Guida completa per capire, mantenere o **ricostruire da zero** il sito.
Se dovessimo ripartire, qui c'è tutto: cos'è, com'è fatto, come si lancia, come si
mette online, e ogni scelta presa.

---

## 1. Cos'è
Sito premium per **MementoLab**, brand di *custom wearable art*: capi unici dipinti a
mano (giubbotti, jeans, scarpe, tele). Tagline: **"L'arte che indossi"**.
Artista con base a **Napoli** · Instagram **@mementolab_** · WhatsApp **348 592 4413**.

- **Live**: https://mementolab.vercel.app
- **Repo**: https://github.com/CiroAlison/mementolab
- **Hosting**: Vercel (progetto `mementolab`, separato da altri progetti dell'account)

## 2. Stack
- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (config in `tailwind.config.ts`)
- **Framer Motion** (animazioni: intro, hero scroll, caroselli, reveal)
- **Prisma + Neon** (Postgres) per le richieste dei form — *opzionale*
- **Resend** per le notifiche email — *opzionale*
- Deploy su **Vercel**, collegato al repo GitHub (push = deploy automatico)

## 3. Come si lancia in locale
> Serve **Node 20+**. Su questa macchina Node è in `~/.local/node-v20.18.1-darwin-x64/bin`
> (installato a mano, niente nvm/brew). Aggiungerlo al PATH:
> `export PATH="$HOME/.local/node-v20.18.1-darwin-x64/bin:$PATH"`

```bash
cd ~/Desktop/memento
npm install
npm run dev        # http://localhost:3000
npm run build      # build di produzione (esegue anche `prisma generate`)
npm run start      # serve la build
```

## 4. Struttura del progetto
```
src/
  app/
    layout.tsx          # font, metadata SEO/OG, Header, Footer, SiteIntro
    page.tsx            # HOME: hero, manifesto, caroselli, brand reveal, chi sono, press, CTA
    portfolio/page.tsx  # griglia filtrabile + lightbox
    chi-sono/page.tsx   # storia dell'artista + timeline
    processo/page.tsx   # "Come nasce un pezzo" (timeline interattiva)
    commissioni/page.tsx# form commissioni + FAQ
    contatti/page.tsx   # form contatti + recapiti
    api/commissioni/route.ts   # POST: valida (zod) → DB (Prisma) → email (Resend)
    api/contatti/route.ts      # idem per i contatti
    sitemap.ts, robots.ts
    globals.css         # variabili, componenti (.btn, .wrap...), keyframes, no-scrollbar
  components/
    Header.tsx          # nav desktop + menu mobile (overlay navy a schermo intero)
    Footer.tsx          # footer chiaro (crema)
    Logo.tsx            # wordmark reale (immagine), variante ink/cream
    SiteIntro.tsx       # intro di caricamento (spirale "dipinta" + reveal nome)
    HeroScroll.tsx      # hero: spirale che ruota allo scroll (senza wordmark sotto)
    BrandReveal.tsx     # sezione dopo i caroselli: il nome MEMENTOLAB si rivela con wipe
    Marquee.tsx         # carosello auto-scroll + trascinabile col dito
    Gallery.tsx         # griglia filtrabile + lightbox
    ProcessTimeline.tsx # timeline interattiva del processo
    Faq.tsx             # accordion FAQ
    ParallaxImage.tsx   # immagine con parallasse + blur-up
    Reveal.tsx          # reveal-on-scroll generico
  lib/
    site.ts             # config (nome, contatti, nav, categorie) — MODIFICA QUI i recapiti
    gallery.ts          # dati delle opere (titoli, storie, categorie)
    validation.ts       # schemi zod dei form
    blur.ts             # placeholder blur-up (generati dalle immagini)
    prisma.ts           # client Prisma (null se DATABASE_URL assente)
    notify.ts           # invio email via Resend (no-op senza chiave)
prisma/schema.prisma    # modelli: Commission, ContactMessage, NewsletterSignup
public/
  brand/                # spiral.png, spiral-cream.png, wordmark-full.png, wordmark-cream.png
  gallery/              # immagini delle opere (giubbotti-*, jeans-*, scarpe-*, altro-*)
  apple-icon.png        # favicon (spirale su arancione)
brand-reference/        # sorgenti originali del brand (logo-concept.png, pattern-spirale.png)
```

## 5. Identità visiva (come rifarla)
- **Palette** (in `tailwind.config.ts`): arancione `#F1500F` (sfondo dominante),
  navy `#0A2A4C` (inchiostro), azzurro `#2E93C8` (accento della spirale),
  crema `#FBF1E4` (footer/pannelli).
- **Font**: **Cormorant Garamond** (titoli) + **Inter** (testo) — via `next/font/google`.
- **Spirale del brand**: è la "O" del logo ufficiale (`brand-reference/logo-concept.png`),
  ritagliata e ripulita in PNG trasparente. Lo script che la genera:
  crop `(376,266,454,344)` → upscale 8× (LANCZOS) → sfondo arancione reso trasparente
  per distanza dal colore → i pixel "caldi" (R≥B) diventati navy per togliere l'alone →
  ritaglio al contenuto. Output: `public/brand/spiral.png` (+ versione crema).
  **Nota**: la versione vettoriale era stata provata ma scartata — si preferisce la
  spirale reale con la texture della pennellata.
- **Wordmark** (`public/brand/wordmark-full.png`): la scritta MEMENTOLAB estratta dal
  logo (trasparente), usata in header, footer, intro e nella sezione BrandReveal.
- **Favicon**: `public/apple-icon.png`, spirale su fondo arancione.

## 6. Contenuti (da dove vengono)
Le opere reali (immagini + testi) sono state estratte dal profilo Instagram
**@mementolab_** con `gallery-dl` usando i cookie di Chrome:
```bash
python3 -m gallery_dl --cookies-from-browser chrome --write-metadata -D ./ig-raw \
  "https://www.instagram.com/mementolab_/"
```
Le opere selezionate, con titoli/storie/categorie, sono in `src/lib/gallery.ts`.
Per aggiungere/cambiare un'opera: metti l'immagine in `public/gallery/` e aggiorna
`gallery.ts` (poi rigenera i blur — vedi sotto).

Rigenerare i placeholder blur-up dopo aver cambiato le immagini:
```bash
python3 - <<'PY'
from PIL import Image; import glob, base64, io, os
m={}
for p in sorted(glob.glob("public/gallery/*.jpg")):
    im=Image.open(p).convert("RGB"); im.thumbnail((16,16))
    b=io.BytesIO(); im.save(b,format="JPEG",quality=40)
    m["/gallery/"+os.path.basename(p)]="data:image/jpeg;base64,"+base64.b64encode(b.getvalue()).decode()
open("src/lib/blur.ts","w").write("export const BLUR: Record<string,string> = {\n"+
  ",\n".join(f'  "{k}": "{v}"' for k,v in m.items())+"\n};\nexport const blurFor=(s:string)=>BLUR[s];\n")
PY
```

## 7. Variabili d'ambiente (per attivare i form)
Copiare `.env.example` in `.env.local` e impostarle **anche su Vercel**
(Project → Settings → Environment Variables):
- `DATABASE_URL` — connection string di **Neon** (https://neon.tech). Poi: `npx prisma db push`.
- `RESEND_API_KEY` — chiave **Resend** (https://resend.com) per le email.
- `NOTIFY_FROM` / `NOTIFY_TO` — mittente verificato / destinatario notifiche.

Senza queste variabili i form **funzionano lo stesso** (validano e mostrano il successo)
ma non salvano su DB né inviano email.

## 8. Deploy
Il progetto Vercel `mementolab` è collegato al repo GitHub: **ogni `git push` su `main`
fa un deploy automatico** in produzione. In alternativa, da locale:
```bash
npx vercel@latest deploy --prod --yes
```
(la CLI usa il login Vercel salvato sul Mac).

## 9. Cose ancora da fare / possibili prossimi step
- Confermare l'**email ufficiale** del brand (ora placeholder in `src/lib/site.ts`).
- Collegare **Neon + Resend** per attivare salvataggio richieste + notifiche.
- Idee premium proposte: bottone **WhatsApp fisso**, **pagina dettaglio per ogni opera**,
  slider **Prima/Dopo**, recensioni, dominio personalizzato (es. `mementolab.it`),
  scroll morbido (Lenis), video del processo.

Vedi anche `PROGRESS.md` (stato) e `DECISIONS.md` (motivazioni delle scelte).
