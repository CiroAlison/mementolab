# Shop — come gestire i pezzi in vendita

Il sito è costruito **attorno allo shop**: la home mostra i pezzi in evidenza
subito sotto l'intro, e ogni pezzo ha un pulsante **«Lo voglio»**.

## Aggiungere un pezzo (il modo veloce)

Serve solo il **link del post Instagram** e, se ce l'hai, il **prezzo**:

```bash
npm run pezzo -- https://www.instagram.com/p/ABC123/ --prezzo 180
```

Lo script fa tutto da solo:
1. scarica la foto dal post (usa i cookie di Chrome: devi essere loggato su Instagram)
2. la salva in `public/shop/`
3. ricava **titolo** e **descrizione** dalla didascalia del post
4. **indovina la categoria** (giubbotti / jeans / scarpe / altro) dalla didascalia
5. aggiunge la scheda al catalogo con il **link al post** già collegato

Se vuoi precisare qualcosa:

```bash
npm run pezzo -- https://www.instagram.com/p/ABC123/ \
  --prezzo 180 --titolo "Notte stellata" --capo "Jeans Levi's" --cat jeans --evidenza
```

| Opzione | A cosa serve |
|---|---|
| `--prezzo 180` | Prezzo in euro, come numero. Senza → "Prezzo su richiesta" |
| `--titolo "..."` | Nome del pezzo (altrimenti dalla didascalia) |
| `--capo "..."` | Su cosa è dipinto, es. "Giubbotto in denim" |
| `--cat` | `giubbotti` `jeans` `scarpe` `altro` (altrimenti la indovina) |
| `--stato` | `disponibile` `su-ordinazione` `venduto` (default: su-ordinazione) |
| `--evidenza` | Mostra il pezzo anche in home |

Poi si pubblica come sempre:

```bash
git add -A && git commit -m "Shop: nuovo pezzo" && git push
```

## Modificare a mano

I pezzi stanno in **`src/data/prodotti.json`** — un file dati normale, senza codice.
Per cambiare un prezzo basta aprire il file e scriverlo:

```json
{
  "id": "watch-me",
  "title": "Watch me",
  "base": "Giubbotto vintage in pelle",
  "category": "giubbotti",
  "image": "/gallery/giubbotti-01.jpg",
  "gallery": ["/shop/watch-me-2.jpg"],
  "priceEur": 180,
  "sizes": ["S", "M", "L"],
  "status": "disponibile",
  "blurb": "Descrizione breve, esce nella scheda…",
  "story": "Racconto più lungo, esce nella pagina del pezzo…",
  "instagramPost": "https://www.instagram.com/p/CbQXeAcIjtw/",
  "featured": true
}
```

### I tre stati
| `status` | Cosa mostra | Quando usarlo |
|---|---|---|
| `disponibile` | badge "Disponibile" + «Lo voglio» | pezzo pronto, da spedire subito |
| `su-ordinazione` | badge "Su ordinazione" + «Lo voglio» | lo dipingi su richiesta |
| `venduto` | badge "Venduto", nessun pulsante | pezzo non più acquistabile |

### Prezzi
Il prezzo si scrive **come numero**: `"priceEur": 180`. Il sito lo formatta da solo
(`180 €`) e domani il pagamento online userà lo stesso valore, senza doppioni.
Se manca, la scheda mostra **"Prezzo su richiesta"** — lo stato attuale di tutti i pezzi.

### Campi facoltativi
| Campo | A cosa serve |
|---|---|
| `gallery` | Altre foto (retro, dettagli) mostrate nella pagina del pezzo |
| `sizes` | Taglie selezionabili; quella scelta finisce nel messaggio |
| `story` | Racconto lungo per la pagina del pezzo (la scheda usa `blurb`) |

## La pagina di ogni pezzo
Ogni pezzo ha la sua pagina: **`/shop/<id>`** (es. `/shop/watch-me`). Si genera da
sola dai dati — non c'è niente da creare a mano. Contiene foto grande, prezzo,
racconto, rassicurazioni, link al post Instagram, pezzi correlati e una barra fissa
in basso col prezzo e «Lo voglio» su cellulare.

## Come compra il cliente

Non c'è un carrello né pagamenti online: sarebbe un peso inutile per pezzi unici.
Premendo **«Lo voglio»** si apre un pannello (dal basso su cellulare) con la foto
del pezzo, il prezzo e il messaggio già pronto, e due modi per mandarlo:

| Canale | Cosa succede |
|---|---|
| **WhatsApp** | Il messaggio arriva **già scritto**: il cliente preme solo invio. Zero passaggi. |
| **Instagram** | Il messaggio viene **copiato** e si apre il DM: il cliente deve **incollare**. |

### Perché su Instagram bisogna incollare
**Non è un difetto del sito: Instagram non lo permette.** I link `ig.me/m/utente`
non accettano un parametro con il testo — a differenza di WhatsApp (`wa.me/?text=`).
Il parametro `?ref=` che si legge in giro **non** scrive nulla nella chat: manda solo
un codice a un webhook, e funziona unicamente con l'API Messaging di Meta
(account professionale + app Meta + server + revisione). Fonte: [Meta for
Developers — ig.me links](https://developers.facebook.com/docs/messenger-platform/instagram/features/ig-me-links/).

Per questo il messaggio contiene anche il **link al post Instagram del pezzo**
(campo `instagramPost`): appena il cliente incolla, si vede subito di quale pezzo
si tratta, con tanto di anteprima.

## Se un domani si vuole un vero e-commerce
Serviranno: pagamenti (Stripe/PayPal), carrello, gestione scorte e spedizioni.
La struttura dati in `shop.ts` (prezzo, stato, categoria) è già compatibile: si
tratterebbe di collegarla a un checkout, non di rifare il sito.

## Pagamenti online
Sono **già pronti ma spenti**, in attesa della Partita IVA.
Guida completa per accenderli: [`PAGAMENTI.md`](./PAGAMENTI.md).
