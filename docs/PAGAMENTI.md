# Pagamenti online — tutto pronto, da accendere

Il checkout è **già scritto e installato**, ma è **spento**. Non può muovere un
centesimo finché non si fanno i passaggi qui sotto.

> **Perché è spento:** l'artista non ha ancora la Partita IVA. Vendere online con
> continuità senza P.IVA non è regolare, e Stripe/PayPal chiedono comunque i dati
> fiscali per accreditare i soldi. Finché non c'è, i clienti acquistano scrivendo
> su Instagram o WhatsApp — che è come già funziona oggi.

## Cosa c'è già

| Pezzo | Stato | Dove |
|---|---|---|
| Prezzo come numero (`priceEur`) | ✅ pronto | `src/data/prodotti.json` |
| Taglie selezionabili (`sizes`) | ✅ pronto | idem |
| Pagina dedicata per ogni pezzo | ✅ online | `/shop/<id>` |
| Rotta di pagamento | ✅ scritta, **spenta** | `src/app/api/checkout/route.ts` |
| Libreria Stripe | ✅ installata | `stripe` |
| Dati prodotto per Google | ✅ online | schema.org su ogni pagina pezzo |

Con i pagamenti spenti la rotta risponde `503` e questo messaggio:
*"I pagamenti online non sono ancora attivi. Scrivimi su Instagram o WhatsApp."*

## Come si accende (≈20 minuti)

**1. Partita IVA.** Prerequisito. Serve anche per emettere le ricevute.

**2. Account Stripe** su [stripe.com](https://stripe.com) → registrazione con i dati
dell'attività (P.IVA, IBAN, documento). L'attivazione richiede poche ore.

**3. Scegliere i metodi di pagamento.** Nel pannello Stripe →
*Impostazioni → Metodi di pagamento*, si spuntano quelli che si vogliono:

- **Carte** (Visa, Mastercard, Amex)
- **Apple Pay** e **Google Pay** — si attivano da soli sui telefoni
- **Klarna** — paga in 3 rate
- **PayPal**
- **Satispay**, **Bancomat Pay** e altri

> Il codice **non elenca** i metodi apposta: mostra automaticamente tutti quelli
> spuntati nel pannello. Per aggiungerne uno domani basta una spunta su Stripe,
> senza toccare il sito.

**4. Chiavi su Vercel.** Progetto `mementolab` → *Settings → Environment Variables*:

| Nome | Valore |
|---|---|
| `STRIPE_SECRET_KEY` | la chiave segreta di Stripe (`sk_live_…`) |
| `SHOP_PAGAMENTI` | `on` |

**5. Prezzi nei pezzi.** In `src/data/prodotti.json`, per ogni pezzo da vendere:

```json
"priceEur": 180,
"status": "disponibile",
"sizes": ["S", "M", "L"]
```

Poi `git push`. Fatto: il pulsante «Lo voglio» porta al pagamento.

## Costi (indicativi, 2026)
- **Stripe**: ~1,5% + 0,25 € per carte europee; Klarna e PayPal costano di più.
- Nessun canone fisso: si paga solo sull'incassato.

## Cosa serve ancora, per legge
Prima di vendere davvero online vanno aggiunte (te le preparo io quando ci siamo):
- **Termini e condizioni di vendita**
- **Diritto di recesso**: 14 giorni per i resi. ⚠️ I pezzi **dipinti su misura**
  sono personalizzati e possono essere esclusi dal recesso, ma va scritto chiaro.
- **Costi e tempi di spedizione** dichiarati prima del pagamento
- Dati fiscali (P.IVA, sede) nel footer
- Privacy policy aggiornata con Stripe come responsabile del trattamento

## Test prima di andare live
Stripe ha una **modalità test**: con `sk_test_…` si simulano acquisti con la carta
`4242 4242 4242 4242` senza muovere soldi veri. Da fare sempre prima di attivare.
