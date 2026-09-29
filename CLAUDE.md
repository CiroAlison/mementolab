# Istruzioni per Claude — MementoLab

Sito live: **https://mementolab.it** · Deploy automatico a ogni `git push`.

---

## 🚨 REGOLE NON NEGOZIABILI

### 1. MAI cicli di attesa contro il sito pubblicato

**VIETATO**, in qualsiasi forma:

```bash
until curl -s https://mementolab.it/... ; do sleep 10; done   # ❌ MAI
while ! curl ... ; do sleep ...; done                          # ❌ MAI
```

**È già successo**: un ciclo di questo tipo è rimasto attivo **16 giorni**,
~138.000 richieste, e ha fatto scattare la protezione anti-bot di Vercel. Peggio:
si autoalimentava — quando Vercel iniziava a rispondere con la pagina di
sicurezza, la condizione d'uscita non si verificava mai, quindi il ciclo non si
fermava e teneva viva la protezione.

**Al suo posto usa il comando sicuro**, che ha un numero massimo di tentativi e
termina sempre:

```bash
npm run verifica              # un controllo solo
npm run verifica -- --attendi # aspetta il deploy, max 10 tentativi poi si arrende
```

### 2. I test si fanno IN LOCALE, non sul sito pubblicato

```bash
npm run build && npm start    # poi prova su http://localhost:3000
```

Il sito pubblicato si guarda **dal browser**, con **una o due richieste**, mai di più.

### 3. Pulisci sempre prima di chiudere

Prima di concludere un intervento, verifica di non aver lasciato niente acceso:

```bash
npm run stop        # chiude server di prova e cicli rimasti
```

Se hai avviato qualcosa in background (`run_in_background`), **controlla che sia
finito** prima di dire che hai concluso. Un'attività che non si chiude da sola è
un bug, non un dettaglio.

### 4. Niente prezzi inventati

I prezzi dei pezzi li fornisce solo la cliente. In assenza: `"Prezzo su richiesta"`.
Non dedurli, non stimarli, non recuperarli da vecchi post senza conferma.

### 5. Niente contenuti inventati

Testimonianze, recensioni, disponibilità dei pezzi: **solo se reali**. In Italia e
in UE le recensioni false sono una pratica commerciale scorretta. È già successo di
doverne rimuovere due lasciate come segnaposto.

---

## Trappole tecniche già incontrate

| Trappola | Regola |
|---|---|
| Pannelli/modali | Sempre `createPortal(..., document.body)`: dentro elementi animati con `transform` un `position: fixed` si ancora all'antenato, non alla finestra |
| Aprire Instagram/WhatsApp | Sempre un `<a href>` vero, **mai** `window.open` da codice: solo così iOS/Android aprono l'app |
| Copia negli appunti | Deve stare dentro il gesto dell'utente (`onClick`), mai dopo un `await` |
| Loghi modificati | Alzare il suffisso di versione (`?v=3` → `?v=4`) o il cliente vede la cache vecchia |
| Favicon | `src/app/favicon.ico` ha la precedenza sui meta tag: va rigenerato anche lui |
| Test di animazioni | In scheda nascosta le animazioni si congelano: azzerare `transform` prima di misurare |

---

## Dove sta scritto cosa

| File | Contenuto |
|---|---|
| `PROGRESS.md` | Cronologia di tutte le versioni |
| `DECISIONS.md` | Ogni scelta e il perché, più i bug risolti |
| `docs/SHOP.md` | Gestire i pezzi in vendita |
| `docs/PAGAMENTI.md` | Attivare i pagamenti (pronti ma spenti, manca la P.IVA) |
| `docs/DOMINIO.md` | Dominio e DNS |
| `docs/BRAND-ASSETS.md` | Rigenerare loghi e favicon |

## Dati e struttura

- I pezzi in vendita: **`src/data/prodotti.json`** (file dati, non codice)
- Aggiungere un pezzo: `npm run pezzo -- <link-post-instagram> --prezzo 180`
- Pagamenti: `/api/checkout` esiste ma è **spento** (`SHOP_PAGAMENTI` non impostata).
  **Non attivarlo** finché la cliente non conferma di avere la Partita IVA.
