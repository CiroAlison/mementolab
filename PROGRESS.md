# PROGRESS — MementoLab

Stato del progetto, in ordine cronologico. Aggiornato ad ogni sessione.

## 🌐 Online
- **Sito live**: https://mementolab.vercel.app
- **Repo**: https://github.com/CiroAlison/mementolab
- **Vercel**: progetto `mementolab` (separato da Cala Sea), collegato al repo GitHub → deploy automatico ad ogni `git push`.
- **Guida completa per ricostruire**: vedi `HANDOFF.md`.

## 🔁 Iterazioni successive (dopo la release 1)
- **v2 — Premium/dinamico**: arancione dominante su tutto, intro cinematografica,
  hero con spirale che si rivela allo scroll, asset reali (spirale + wordmark dal logo).
- **v3 — Qualità spirale**: provata la spirale vettoriale → **scartata**, ripristinata
  quella reale (pennellata). Poi ripulita per togliere l'alone arancione.
- **v4 — Immagini & contenuti**: blur-up + parallasse sulle foto; sezione
  "Collaborazioni" (NEA Connect); FAQ commissioni ad accordion.
- **v5 — Hero & caroselli**: spirale sempre visibile (non va sotto la barra);
  "In evidenza" e "Categorie" diventati caroselli scorrevoli.
- **v6 — Footer & categoria**: footer chiaro (crema); categoria Jeans con foto di un pantalone.
- **v7 — Mobile**: menu mobile a overlay navy; caroselli trascinabili col dito;
  spirale più piccola su mobile; alone rimosso anche nell'intro.
- **v8 — Reveal nome & processo**: sezione BrandReveal (il nome MEMENTOLAB si svela dopo
  i caroselli); pagina Processo trasformata in timeline interattiva; intro con reveal del
  nome anticipato e più lungo. Documentazione completa (`HANDOFF.md`).
- **v9 — Contatti "light" & Instagram in primo piano**: form commissioni/contatti resi
  **solo lato client** — precompilano lo stesso messaggio con emoji e lo mandano via
  **Instagram** (primario), WhatsApp o email (`src/lib/message.ts`). Nessuna scrittura su DB.
  **Neon reso dormiente** (vedi sotto). Email ufficiale `mementolab97@gmail.com`, telefono
  con prefisso `+39 348 592 4413`.
- **v10 — Logo in alta qualità & sezione Shop**: TUTTI i loghi rigenerati dalla
  **scansione reale** della spirale in alta risoluzione, con i **colori autentici**
  (vedi `docs/BRAND-ASSETS.md` e `scripts/brand/`). Nuova pagina **`/shop`** (voce di menu):
  placeholder "Lo shop sta prendendo forma" con card "IN ARRIVO", da rifinire quando il
  cliente avrà le info sui prodotti. Testo Contatti "Parliamone" riscritto.
- **v11 — Sito più piccolo e centrato sullo SHOP** (richiesta della cliente):
  rimossi **Portfolio**, **In evidenza**, **In movimento** (e i video: −1,1 MB).
  Lo **shop è ora il cuore del sito**: griglia prodotti con prezzo/disponibilità e
  pulsante «Lo voglio» (`src/lib/shop.ts` → vedi `docs/SHOP.md`), messo **subito
  sotto l'intro in home**. Tolte le foto di modella di spalle dalle sezioni visibili
  (categoria Jeans ora è una foto pulita del capo; categoria *Altro* non mostra più
  scarpe — foto provvisoria, la cliente ne fornirà una dedicata). Testo *Chi sono*
  accorciato su richiesta; tolto il campo **budget** dalle commissioni; **corretto il
  bug dell'invio su Instagram**; **colori del logo riportati a quelli originali**.
- **v12 — Shop premium & mobile**: griglia 2/3/4 colonne con schede animate;
  «Lo voglio» apre un pannello con foto, prezzo e messaggio pronto (WhatsApp già
  scritto / Instagram da incollare + link al post del pezzo). Ripristinata
  "In evidenza" in home con filtro sulle foto di spalle; foto *Chi sono* più
  neutra; tempi FAQ ridotti.
- **v13 — Shop facile da aggiornare**: pezzi spostati in `src/data/prodotti.json`
  e nuovo comando `npm run pezzo -- <link-ig> --prezzo 180` che scarica foto,
  didascalia e collega il post automaticamente (`scripts/aggiungi-pezzo.mjs`).
- **v14 — Ritocchi**: categorie a carosello come "In evidenza"; tolta la foto del
  ragazzo di spalle con Zio Paperone; nel pannello d'acquisto Instagram è il
  pulsante principale.
- **v15 — Pagine dei pezzi + basi pagamenti**: ogni pezzo ha la sua pagina
  `/shop/<id>` (foto grande, racconto, rassicurazioni, correlati, barra fissa su
  cellulare). Prezzo diventato numerico. Checkout Stripe pronto ma **spento** in
  attesa della P.IVA (`docs/PAGAMENTI.md`).
- **v16 — Bug fix**: il pannello «Lo voglio» si apriva a metà nella home (ora usa
  un portal, vedi `DECISIONS.md`); tolta la barra fissa in fondo alle pagine dei pezzi.
- **v17 — Apertura app**: i pulsanti Instagram/WhatsApp sono diventati link veri,
  così i telefoni aprono l'app invece della pagina web.

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
- Logo **MEMENT·O·LAB**: la "O" è la **spirale reale dipinta a mano** (scansione in
  alta qualità). Tutti gli asset (spirale, wordmark, favicon) sono generati da
  `scripts/brand/` — vedi **`docs/BRAND-ASSETS.md`**. La vecchia versione SVG
  vettoriale è stata **scartata** (il cliente vuole la pennellata reale).
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
- **Prezzi e disponibilità reali** dei pezzi in `src/lib/shop.ts` (ora tutti
  "Prezzo su richiesta" / "Su ordinazione"). Vedi `docs/SHOP.md`.
- **Foto dedicata per la categoria "Altro"** (ora provvisoria: San Gennaro su tela).
- Eventuale **checkout** vero (Stripe/PayPal) se un domani servisse: la struttura
  dati dello shop è già pronta.
- **Neon dormiente**: il DB è collegato ma non usato (scelta del cliente, vedi
  `DECISIONS.md`). Per riattivarlo: rimettere `node scripts/db-push.mjs` nel build e
  ricollegare il fetch nei form a `/api/commissioni` e `/api/contatti`.
- Eventuale **Journal/Blog** per storytelling e SEO.
- Ampliare la categoria "Altro" con nuovi pezzi (tele, accessori).
- Sostituire eventuali foto con scatti dedicati in alta risoluzione, se disponibili.

## Contenuti reali ancora da fornire
- **Prezzi, disponibilità e foto dei pezzi in vendita** (`src/lib/shop.ts`).
- **Foto per la categoria "Altro"** in home.
- Conferma della categoria di alcuni pezzi (classificazione automatica dalle didascalie).
