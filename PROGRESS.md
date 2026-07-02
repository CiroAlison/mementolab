# PROGRESS — MementoLab

Stato del progetto, in ordine cronologico. Aggiornato ad ogni sessione.

## 🌐 Online
- **Sito live**: https://mementolab.vercel.app
- **Repo**: https://github.com/CiroAlison/mementolab
- **Vercel**: progetto `mementolab` (separato da Cala Sea), collegato al repo GitHub → deploy automatico ad ogni `git push`.

## ✅ Fatto (release 1)

### Fase 0 — Ricerca & materiali
- Studio del profilo ufficiale **@mementolab_**: l'artista dipinge a mano capolavori
  (Van Gogh, Klimt, Munch, Magritte, Dalí, Basquiat) e soggetti pop (Goku, Zio Paperone)
  su **giubbotti, jeans, scarpe** e pezzi speciali (tele, camicie, mocassini).
- **162 immagini reali** + didascalie estratte automaticamente dal profilo Instagram
  (via `gallery-dl` con i cookie del browser). Vedi `DECISIONS.md`.
- Tagline reale del brand recuperata dai contenuti: **"L'arte che indossi"**.
- Storia dell'artista ricostruita dalle didascalie (inizio 2020, laurea in servizio
  sociale, master in criminologia, scelta di lasciare il posto fisso, base a Napoli).
- Immagini di riferimento del brand (`logo-concept.png`, `pattern-spirale.png`)
  recuperate e salvate in `brand-reference/`.

### Identità
- Logo **MEMENT·O·LAB** ricostruito in SVG vettoriale: la "O" è una spirale
  pennellata (`src/components/SpiralMark.tsx` + `Logo.tsx`). Favicon SVG in `public/icon.svg`.
- Palette: arancione `#EB5634`, navy `#082E56`, crema `#FAF6EF`.
- Font: **Cormorant Garamond** (display) + **Inter** (testo).

### Sito (Next.js 14 App Router + TypeScript + Tailwind)
- **Home**: hero full-screen, manifesto, opere in evidenza, categorie, teaser "chi sono", CTA.
- **Portfolio**: griglia filtrabile per categoria + lightbox a schermo intero con dettagli.
- **Chi sono**: storia reale dell'artista + timeline.
- **Processo**: 6 fasi + tabella materiali/tempi.
- **Commissioni**: form completo con validazione (nome, email, telefono, tipo capo, idea, budget).
- **Contatti**: form + contatti diretti (Instagram, WhatsApp, email).
- Header sticky con menu mobile, footer, animazioni Framer Motion, reveal-on-scroll.
- **SEO**: metadata + Open Graph, `sitemap.xml`, `robots.txt`, favicon, alt text, skip-link.
- Immagini ottimizzate con `next/image` (lazy loading, WebP/AVIF automatici).

### Backend
- **Prisma + Neon (Postgres)**: modelli `Commission`, `ContactMessage`, `NewsletterSignup`.
- API `POST /api/commissioni` e `POST /api/contatti`: validazione Zod, salvataggio su DB,
  notifica email via Resend. **Degradano con eleganza** senza credenziali (i form funzionano).

### Verifica
- Tutte le pagine rispondono 200, build pulita, API testate (200 valido / 422 non valido).

## 🔜 Da fare / possibili step 2
- Collegare **Neon** (DATABASE_URL) e **Resend** (RESEND_API_KEY) per attivare
  salvataggio richieste + notifiche email. Vedi `.env.example`.
- Upload immagini di riferimento nel form commissioni (storage es. Vercel Blob).
- Eventuale **Journal/Blog** per storytelling e SEO.
- Ampliare la categoria "Altro" con nuovi pezzi (tele, accessori).
- Sostituire eventuali foto con scatti dedicati in alta risoluzione, se disponibili.

## Contenuti reali ancora da fornire
- Indirizzo email ufficiale del brand (ora placeholder in `src/lib/site.ts`).
- Conferma della categoria di alcuni pezzi (classificazione automatica dalle didascalie).
