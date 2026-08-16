# Shop — come gestire i pezzi in vendita

Il sito è costruito **attorno allo shop**: la home mostra i pezzi in evidenza
subito sotto l'intro, e ogni pezzo ha un pulsante **«Lo voglio»**.

## Dove si modifica

Un solo file: **`src/lib/shop.ts`**. Non serve toccare nient'altro.

```ts
{
  id: "watch-me",                       // identificativo unico (senza spazi)
  title: "Watch me",                    // nome del pezzo
  base: "Giubbotto vintage in pelle",   // su cosa è realizzato
  category: "giubbotti",                // giubbotti | jeans | scarpe | altro
  image: "/gallery/giubbotti-01.jpg",   // foto (vedi sotto)
  price: "180€",                        // se lo togli mostra "Prezzo su richiesta"
  status: "disponibile",                // disponibile | su-ordinazione | venduto
  blurb: "Descrizione breve…",
  featured: true,                       // true = compare anche in home
}
```

### I tre stati
| `status` | Cosa mostra | Quando usarlo |
|---|---|---|
| `disponibile` | badge "Disponibile" + «Lo voglio» | pezzo pronto, da spedire subito |
| `su-ordinazione` | badge "Su ordinazione" + «Lo voglio» | lo dipingi su richiesta |
| `venduto` | badge "Venduto", nessun pulsante | pezzo non più acquistabile |

### Prezzi
Se `price` è assente la scheda mostra **"Prezzo su richiesta"**. È lo stato
attuale di tutti i pezzi: appena l'artista fornisce i prezzi reali basta
aggiungere `price: "180€"` al pezzo.

### Foto
Metti la foto in `public/gallery/` (o crea `public/shop/`) e indica il percorso
in `image`. Formato consigliato: **verticale 4:5**, foto pulita del capo (senza
persona), luce naturale.

## Come compra il cliente

Non c'è un carrello né pagamenti online: sarebbe stato un peso inutile per una
produzione di pezzi unici. Il flusso è quello che l'artista già usa:

1. il cliente preme **«Lo voglio»**
2. il sito **copia un messaggio già scritto** con nome del pezzo, capo e prezzo
3. si apre il **DM di Instagram** (canale principale) — in alternativa WhatsApp
4. il cliente incolla e invia; si accordano su taglia, prezzo e spedizione

> Instagram **non permette** di precompilare il testo di un DM: per questo il
> messaggio viene copiato negli appunti e va incollato. È il massimo che si può
> fare, ed è il motivo per cui la schermata mostra sempre il messaggio con un
> tasto «Copia» di riserva.

## Se un domani si vuole un vero e-commerce
Serviranno: pagamenti (Stripe/PayPal), carrello, gestione scorte e spedizioni.
La struttura dati in `shop.ts` (prezzo, stato, categoria) è già compatibile: si
tratterebbe di collegarla a un checkout, non di rifare il sito.
