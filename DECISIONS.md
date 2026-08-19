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

## Sito centrato sullo shop (v11 — richiesta della cliente)
- La cliente vuole **vendere**: lo shop è stato messo **subito sotto l'intro** in
  home e la navigazione parte da lì. Le CTA principali portano allo shop.
- **Sito alleggerito**: rimossi Portfolio, "In evidenza", "In movimento" e i video
  (−1,1 MB). Con il Portfolio è sparita anche `src/lib/gallery.ts`: i pezzi in
  vendita vivono ora in `src/lib/shop.ts`.
- **Niente carrello né pagamenti online**: per pezzi unici sarebbe un peso inutile.
  Il pulsante «Lo voglio» copia un messaggio già scritto (nome pezzo, capo, prezzo)
  e apre il DM Instagram — lo stesso flusso che l'artista già usa. Vedi `docs/SHOP.md`.
- **Nessun prezzo inventato**: finché la cliente non li fornisce, i pezzi mostrano
  "Prezzo su richiesta" e stato "Su ordinazione" (che è la verità: dipinge a richiesta).
- **Foto**: tolte dalle sezioni visibili le foto di modella di spalle. La categoria
  *Jeans* usa una foto pulita del capo; la categoria *Altro* non mostra più scarpe
  (mostrava dei mocassini) ed è in attesa di una foto dedicata.

## Bug risolto: invio su Instagram (v11)
Il pulsante "Invia su Instagram" non funzionava. Causa: `window.open()` veniva
chiamato **dopo un `await`** (la copia negli appunti), quindi il browser perdeva la
"user activation" e **bloccava la finestra come popup**; su Safari/iOS falliva anche
la copia. Soluzione in `src/lib/send.ts`: funzioni **sincrone** (nessun `await` prima
di aprire la scheda), fallback di copia con `execCommand` per Safari, fallback alla
stessa scheda se il popup viene comunque bloccato, e una schermata finale
(`SentPanel`) che **mostra sempre il messaggio con un tasto «Copia»** — così il
cliente non resta mai bloccato.

## Testi (v11)
- *Chi sono*: su richiesta della cliente il racconto si ferma a «In questi anni ho
  continuato a lavorare e a studiare». I dettagli personali (laurea, master, la
  scelta di lasciare il posto fisso) sono stati tolti anche dalla timeline e dal
  teaser in home, per coerenza.
- *Commissioni*: rimosso il campo **budget** (dal form, dal messaggio precompilato,
  dalla validazione e dalla privacy policy).

## Shop premium & acquisto (v12 — richieste della cliente)
- **Griglia**: 2 colonne su cellulare, 3 su tablet, 4 su desktop. Schede animate
  (la card si solleva, la foto zooma, su desktop «Lo voglio» compare in overlay);
  su cellulare il pulsante è sempre visibile perché il passaggio del dito non esiste.
- **«Lo voglio» apre un pannello** (bottom sheet su cellulare, finestra su desktop)
  con foto, prezzo, messaggio pronto e i due canali.
- **Instagram non può precompilare i DM**: verificato sulla documentazione Meta —
  `ig.me` non accetta parametri di testo, e `?ref=` invia solo un payload a un
  webhook (serve l'API Messaging con account professionale, app Meta e server).
  Quindi: **WhatsApp** manda il messaggio già scritto, **Instagram** lo copia e
  va incollato. In più il messaggio contiene il **link al post del pezzo**
  (`instagramPost`) così si vede subito cosa si sta comprando.
- **"In evidenza" ripristinata** in home come prima (carosello), ma con un filtro
  (`FOTO_ESCLUSE` in `gallery.ts`) che tiene fuori le foto di spalle/senza capo.
- Foto di *Chi sono* sostituita con le tele di San Gennaro (più neutra).
- FAQ commissioni: tempi ridotti da "1–3 settimane" a "pochi giorni – un paio di settimane".

## Aggiungere pezzi senza fatica (v13)
La cliente aggiungerà molti pezzi nel tempo e non voleva un processo macchinoso.
- I pezzi sono stati spostati da TypeScript a un **file dati**: `src/data/prodotti.json`.
  Cambiare un prezzo ora è modificare una riga di JSON, non toccare codice.
- Aggiunto **`npm run pezzo -- <link-instagram> --prezzo 180`**
  (`scripts/aggiungi-pezzo.mjs`): scarica la foto dal post con `gallery-dl`
  (cookie di Chrome), la salva in `public/shop/`, ricava titolo e descrizione dalla
  didascalia, indovina la categoria dalle parole chiave e aggiunge la scheda con il
  link al post già collegato. Testato su un post reale.
- Così il collegamento fra pezzo, foto, post Instagram e prezzo avviene in un
  comando solo, invece che compilando otto campi a mano.

## Ritocchi (v14 — richieste della cliente)
- **Categorie**: da griglia a **carosello scorrevole**, come la sezione "In evidenza"
  (non le piacevano incolonnate).
- Esclusa anche `jeans-08.jpg` (ragazzo di spalle con la camicia Zio Paperone):
  la lista delle foto da non mostrare è `FOTO_ESCLUSE` in `src/lib/gallery.ts`.
- **Pannello «Lo voglio»**: **Instagram è il primo pulsante** e il più grande —
  è il canale che la cliente vuole in primo piano. WhatsApp resta sotto come
  alternativa discreta ("già scritto"), perché è l'unico che precompila davvero.

## Pagine dei pezzi e basi per i pagamenti (v15)
- **Pagina dedicata per ogni pezzo** (`/shop/<id>`): foto grande, prezzo, racconto,
  rassicurazioni (pezzo unico / dipinto a mano / spedizione), link al post
  Instagram, pezzi correlati e — su cellulare — una **barra fissa** col prezzo e
  «Lo voglio» sempre a portata di pollice. Generate da sole dai dati, zero lavoro
  manuale. Aggiunti i dati schema.org: Google può mostrarle come prodotti.
- **Prezzo diventato numerico** (`priceEur: 180`) invece di stringa `"180€"`:
  unica fonte di verità, usata sia per mostrarlo sia (domani) per incassarlo.
- **Checkout Stripe scritto e installato ma SPENTO** (`/api/checkout`, guardia
  `SHOP_PAGAMENTI=on` + `STRIPE_SECRET_KEY`). Senza le variabili risponde 503 e non
  può muovere denaro. Motivo: l'artista non ha ancora la P.IVA.
- **Metodi di pagamento non elencati nel codice** di proposito: Stripe Checkout
  mostra da solo tutti quelli attivati nel pannello (carte, Apple Pay, Google Pay,
  Klarna, PayPal, Satispay). Aggiungerne uno domani = una spunta, non una modifica.
- Guida di attivazione completa, con costi e adempimenti di legge: `docs/PAGAMENTI.md`.
- Il flusso d'acquisto attuale (pannello con Instagram in primo piano) **resta
  invariato**: la cliente l'ha confermato finché non ci sono i prezzi.

## Due bug risolti (v16)
### Il pannello «Lo voglio» si apriva a metà e tagliato
Succedeva nella sezione shop della home. Causa: le schede prodotto stanno dentro
elementi **animati con `transform`** (`Reveal` e la card che si solleva). In CSS,
un elemento `position: fixed` dentro un antenato trasformato **non si ancora più
alla finestra** ma a quell'antenato — quindi il pannello veniva posizionato dentro
la scheda e tagliato dalla sezione con `overflow-hidden`.
**Soluzione**: `BuySheet` viene renderizzato con un **portal** (`createPortal` su
`document.body`), così esce da qualsiasi antenato trasformato e copre davvero lo
schermo. ⚠️ Se un domani si aggiungono altri pannelli/modali, devono usare il
portal per lo stesso motivo.

### Barra fissa in fondo alle pagine dei pezzi
Rimossa su richiesta della cliente (non le piaceva). Con lei sono spariti anche la
classe `ha-barra-acquisto` sul body e la regola CSS che nascondeva il pulsante
Instagram fisso: quel pulsante ora è di nuovo sempre visibile.

### Nota per chi testa nel browser automatico
Se la scheda del browser è in background (`document.visibilityState === "hidden"`),
`requestAnimationFrame` è sospeso e **le animazioni di Framer Motion restano
congelate al fotogramma iniziale**: il pannello sembra fermo fuori schermo anche
quando funziona. Per misurare la posizione reale, azzerare `transform` a mano
prima di leggere `getBoundingClientRect()`.

## Instagram si apriva nel browser invece che nell'app (v17)
La cliente ha notato che premendo «Lo voglio» si apriva una **pagina web** di
Instagram e non l'app. Causa: i link `ig.me` (e `wa.me`) sono **universal link** —
iOS e Android li dirottano sull'app **solo quando l'utente tocca un vero `<a href>`**.
Il sito li apriva invece da JavaScript (`window.open`), e in quel caso il sistema
operativo li tratta come normali indirizzi web: restano nel browser.

**Soluzione**: in `BuySheet` e `SentPanel` i pulsanti Instagram e WhatsApp sono
diventati **veri `<a href target="_blank">`**. La copia del messaggio avviene
nell'`onClick` (sincrona, dentro il gesto), mentre a portare all'app ci pensa il
link stesso.

⚠️ **Regola generale**: per aprire un'app esterna (Instagram, WhatsApp, telefono,
email) usare SEMPRE un `<a href>`, mai `window.open` da codice.

**Anche nei form** (v17b): erano l'ultimo punto rimasto con `window.open`. Ora
anche lì i tre canali sono `<a>` veri. Il trucco per farlo convivere con la
validazione: nell'`onClick` si valida e, se i dati non vanno, si chiama
`e.preventDefault()` per annullare la navigazione; se vanno, si aggiorna
`e.currentTarget.href` con il messaggio appena costruito — il browser legge
l'href **dopo** l'handler, quindi il link parte già completo.
`openTab()` in `src/lib/send.ts` non è più usato da nessuna parte per i canali
social: resta come utilità.

## Dominio (v18)
- `mementolab.com` è occupato (parcheggiato da HugeDomains, in vendita a $4.395):
  scartato, non vale quella cifra per un brand che sta avviando lo shop.
- Scelto **`mementolab.it`** — verificato libero sul registro (`whois.nic.it`).
  Per un brand napoletano il `.it` è anche più credibile di un `.store`/`.online`.
- Il `.it` **non si acquista da Vercel** (TLD non supportato): serve un registrar
  italiano. **L'acquisto lo fa il proprietario** — io non effettuo acquisti né
  inserisco dati di pagamento.
- `site.url` non è più fisso: legge `NEXT_PUBLIC_SITE_URL` con fallback
  sull'indirizzo Vercel. Così, quando il dominio è attivo, basta impostare la
  variabile su Vercel e ridistribuire — **nessuna modifica al codice**.
- Procedura completa (acquisto, record DNS, variabile, dominio primario):
  `docs/DOMINIO.md`.

## Testimonianze reali e anteprima di condivisione (v19)
- **Tolte le due testimonianze inventate** ("Un cliente", "Una cliente") che erano
  rimaste come segnaposto: poco credibili e, in Italia/UE, le recensioni false sono
  una **pratica commerciale scorretta** sanzionabile.
- Sostituite con **4 recensioni vere**. Su richiesta della cliente, non trascritte
  ma mostrate come **screenshot originali delle chat**: sono molto più credibili di
  un testo riscritto, perché si vede che sono messaggi veri.
  **Privacy**: ogni screenshot è ritagliato sui SOLI fumetti dei messaggi — niente
  intestazione della chat, niente foto profilo, niente cognomi; sotto compare solo
  il nome di battesimo. Gli originali sono quelli che l'artista ha pubblicato lei
  stessa nelle storie in evidenza di Instagram (scaricati con `gallery-dl`).
  Una è in inglese: mostra che spedisce anche all'estero.
  File in `public/recensioni/`. Se se ne aggiungono altri, ritagliarli allo stesso modo.
- **Rifatta `public/og.jpg`** (l'anteprima che appare quando si condivide il link su
  WhatsApp, Instagram, Facebook, Google). Prima era un riquadro arancione col logo
  nei vecchi colori sbiaditi, senza nemmeno un capo. Ora: fondo arancione del brand,
  wordmark crema, tagline, dominio e la **spirale del brand** a destra (scelta della
  cliente: preferita al capo fotografato, più pulita e riconoscibile).

## Foto della categoria «Altro» (v20)
L'artista ha fornito la foto dedicata: un cappello New Era personalizzato (perle
sul logo, iniziali dipinte a mano, cuoricino sulla visiera). Sostituisce la foto
provvisoria delle tele di San Gennaro.

La foto originale è verticale (3024×4032) mentre la scheda categoria è orizzontale
4:3. Invece di tagliare il cappello, la si è messa **intera su uno sfondo ricavato
dalla foto stessa e sfocato**: il soggetto resta completo e lo sfondo sembra
naturale. Stessa tecnica in verticale 4:5 per `public/shop/cappello-ny.jpg`, pronta
se il cappello andrà in vendita.

## Catalogo ampliato (v21)
Il profilo Instagram ha 237 contenuti; sul sito ne era finita solo una selezione
ristretta. Scaricato altro materiale con `gallery-dl` e aggiunti **11 pezzi** allo
shop (12 → 23), coprendo categorie che prima mancavano: t-shirt, felpe, mocassini.

**Criterio di selezione, chiesto dalla cliente**: solo foto dei capi. Escluse tutte
le foto indossate da persone (comprese quelle di spalle, già bocciate in
precedenza) e i contenuti puramente grafici del brand (poster, citazioni, pattern).

Titoli e descrizioni ricavati dalle **didascalie reali** dei post; a ogni pezzo è
collegato il suo post Instagram. **Nessun prezzo inserito**: alcune didascalie
contengono prezzi pubblicati dall'artista nel 2024 (Dalì blu 180€, Goku 230€) ma
sono vecchi e i capi erano "in pronta consegna" allora — vanno riconfermati da lei
prima di finire sul sito.

Aggiunta all'elenco `FOTO_ESCLUSE` anche `jeans-01.jpg` (i quindici girasoli):
nella foto c'è una persona.

## Categoria T-shirt, ordine dello shop, ordine della home (v22)
- **Nuova categoria «T-shirt e felpe»**: chiesta dalla cliente. Il nome copre anche
  la felpa, così i tre pezzi in cotone (teschio, Santamarea, farfalla «Free») stanno
  insieme invece di finire in «Altro».
- **Ordine dello shop**: i pezzi non seguono più l'ordine di inserimento ma un
  ordine di categoria — **giubbotti, scarpe**, poi jeans, t-shirt, altro. Sono i
  pezzi più forti e più cari: vanno visti per primi. L'ordine è in `shop.ts`
  (`ordineCategorie`), dentro ogni categoria resta l'ordine di `prodotti.json`.
- **Home: «Categorie» prima di «In evidenza»** (proposta della cliente, condivisa).
  Motivo: dopo aver visto 4 pezzi nella sezione Shop, il visitatore ha bisogno di
  **orientarsi** — «cosa posso far dipingere?» — prima di guardare altre immagini.
  Le categorie rispondono a quella domanda, «In evidenza» invece ispira: prima si
  orienta, poi si sogna.
