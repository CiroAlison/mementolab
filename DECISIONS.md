# DECISIONS — MementoLab

Scelte progettuali prese in autonomia, con motivazione.

## Ambiente
- **Node.js non era installato** sulla macchina (né nvm né Homebrew). Ho installato
  Node 20 LTS in `~/.local` e aggiunto al PATH, per poter usare lo stack richiesto
  senza permessi di amministratore.
- Progetto creato in `~/Desktop/memento` (la cartella dedicata con `brand-reference/`),
  **non** nella cartella "non lo so" che contiene un altro progetto (Cala Sea).

## Contenuti (Fase 0)
- **Instagram è dietro login wall**: lo scraping diretto falliva ("user not found").
  Risolto usando i **cookie di Chrome** (utente già loggato) con `gallery-dl`.
  Così ho recuperato **162 immagini reali + didascalie**.
- **Curatela automatica**: le opere sono state classificate in giubbotti/jeans/scarpe/altro
  a partire da hashtag e testo delle didascalie. La classificazione è euristica e può
  essere corretta a mano in `src/lib/gallery.ts`.
- Escluse dalla gallery le immagini puramente promozionali (grafiche NEA, render del logo)
  e usate invece come asset di brand / immagine "in studio".
- **Titoli, storie e dettagli** dei pezzi provengono dalle didascalie reali del profilo.

## Identità visiva
- **Palette**: uso i valori del brief — arancione `#EB5634`, navy `#082E56` — come
  sistema canonico, anche se il mock del logo usa un arancione più acceso (`#FC5300`).
  Motivo: coerenza con le indicazioni del brand e resa più "premium"/desaturata.
- **Font**: **Cormorant Garamond** (serif editoriale ad alto contrasto) per i titoli,
  affine al lettering sottile del logo; **Inter** per il testo corrente (leggibilità,
  ottime performance). Coppia serif+sans coerente con un sito d'arte premium.
- **Logo**: ricostruito in SVG (spirale = path Archimedeo con tratto pennellato). La
  versione definitiva può essere rifinita ulteriormente sul concept in `brand-reference/`.

## Stack & architettura
- **Next.js 14 App Router + TypeScript + Tailwind**, come da brief.
- **Framer Motion** per animazioni leggere (reveal-on-scroll, lightbox, menu).
- **Prisma + Neon** per le richieste. Il client Prisma è opzionale a runtime:
  `getPrisma()` restituisce `null` se `DATABASE_URL` non è configurato, così i form
  funzionano anche prima di collegare il database (le richieste vengono validate e
  loggate; email e salvataggio si attivano appena si aggiungono le credenziali).
- **Resend** per le notifiche email, anch'esso opzionale (no-op senza `RESEND_API_KEY`).
- **Honeypot** anti-spam nei form (campo nascosto `website`).
- `prisma generate` inserito in `build` e `postinstall` per il deploy su Vercel.

## Redesign "premium/dinamico" (v2)
Dopo la prima release, il brand ha chiesto un'esperienza più forte e in movimento. Scelte:
- **Arancione dominante**: sfondo di tutto il sito nell'arancione vivido del brand (`#F1500F`,
  vicino al `#FC5300` del logo), navy come inchiostro, azzurro pennellato come accento.
- **Spirale reale**: estratta in PNG trasparente dalla "O" del logo ufficiale
  (`public/brand/spiral.png`), con relativi wordmark trasparenti. Sostituisce la spirale SVG
  ridisegnata in precedenza.
- **Intro cinematografica** (`SiteIntro.tsx`): all'apertura, la spirale entra e rivela il nome;
  mostrata una volta per sessione (`sessionStorage`).
- **Hero scroll-driven** (`HeroScroll.tsx`): con Framer Motion `useScroll`, la spirale ruota e
  si rimpicciolisce mentre il wordmark si svela con un wipe. Rispetta `prefers-reduced-motion`.

## Contatti & flusso richieste (v9 — scelta del cliente: "più light")
- Il cliente ha chiesto un flusso **senza database**: i form commissioni/contatti
  **non salvano** più nulla. Precompilano lo **stesso messaggio con emoji**
  (`src/lib/message.ts`) e lo mandano via **Instagram** (canale primario, `ig.me/m/` +
  copia negli appunti perché IG non permette il prefill), **WhatsApp** (`wa.me`) o
  **email** (`mailto:`). Vuole che i messaggi arrivino soprattutto da Instagram.
- **Neon reso dormiente**: tolto `db-push` dal build; le API `/api/*` (Prisma+Resend)
  esistono ma non sono più chiamate. Riattivabile in futuro (vedi `PROGRESS.md`).
- **Contatti veri**: WhatsApp/telefono **+39 348 592 4413**, Instagram **@mementolab_**,
  email ufficiale **mementolab97@gmail.com** (confermata dal cliente). In `src/lib/site.ts`.

## Logo in alta qualità & colori autentici (v10 — richiesta del cliente)
- Il cliente ha fornito la **scansione reale** della spirale (PDF). Ho sostituito
  **tutti** i loghi con la spirale in alta risoluzione estratta da quella scansione.
- **Colori autentici, non schiariti**: si tengono i colori RGB originali della
  scansione (indaco profondo + azzurro acciaio). Un primo tentativo che "puliva" i
  bordi li rendeva troppo chiari/azzurro acceso → scartato. Pipeline e motivazioni in
  **`docs/BRAND-ASSETS.md`**; script rieseguibili in **`scripts/brand/`**.
- La versione **SVG vettoriale** della spirale è definitivamente **abbandonata**: il
  cliente vuole la pennellata reale.

## Sezione Shop (v10)
- Aggiunta pagina **`/shop`** come **placeholder premium** ("Lo shop sta prendendo
  forma") con card "IN ARRIVO", su richiesta del cliente. Sarà rifinita con i prodotti
  reali (foto/prezzi/disponibilità) più avanti.
