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
