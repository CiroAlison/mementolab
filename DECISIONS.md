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

## Contatti
- **WhatsApp 348 592 4413** e **Instagram @mementolab_** presi dai contenuti reali.
- **Email**: placeholder (`mementolab.art@gmail.com`) in `src/lib/site.ts` — **da confermare**.
