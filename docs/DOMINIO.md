# Dominio — mementolab.it

**Stato**: `mementolab.it` è **libero** (verificato sul registro italiano
`whois.nic.it` → `Status: AVAILABLE`).
Il sito oggi vive su `https://mementolab.vercel.app`.

> `mementolab.com` è occupato: è parcheggiato da HugeDomains e in vendita a
> **$4.395**. Per questo si è scelto il `.it`, che per un brand napoletano è anche
> più credibile.

## 1. Comprare il dominio (lo fa il proprietario)

Il `.it` **non si può comprare da Vercel** (non supporta quell'estensione): serve
un registrar. Vanno tutti bene, cambia solo il prezzo:

| Registrar | Note |
|---|---|
| **Aruba** (aruba.it) | Il più usato in Italia, pannello in italiano |
| **Netsons** (netsons.com) | Italiano, spesso più economico |
| **Register.it** | Storico, assistenza in italiano |
| **Namecheap** | Estero, interfaccia in inglese, prezzi competitivi |

Indicativamente **10–25 € l'anno**. Al momento dell'acquisto:
- ✅ attivare il **rinnovo automatico** (se scade, si perde)
- ✅ attivare la **protezione privacy** sui dati del titolare, se offerta
- ❌ **non** serve comprare hosting, email o "pacchetti sito": il sito è già su
  Vercel. Serve **solo il dominio**.

## 2. Aggiungere il dominio su Vercel

1. [vercel.com](https://vercel.com) → progetto **mementolab**
2. **Settings** → **Domains** → **Add Domain**
3. Scrivere `mementolab.it` e confermare
4. Vercel proporrà di aggiungere anche `www.mementolab.it`: **accettare**
5. Vercel mostrerà i valori DNS da copiare → passaggio 3

## 3. Puntare il dominio a Vercel (dal pannello del registrar)

Nella sezione **DNS** del registrar, inserire:

| Tipo | Nome / Host | Valore |
|------|-------------|--------|
| `A` | `@` (oppure vuoto) | `76.76.21.21` |
| `CNAME` | `www` | *il valore che mostra Vercel* |

> ⚠️ **Usare sempre i valori che compaiono nel pannello Vercel**: l'IP dell'`A`
> record è quello standard, ma il `CNAME` per `www` è **diverso per ogni
> progetto** (tipo `xxxxxxxx.vercel-dns-017.com`). Copiarlo da lì.

Se il registrar ha già dei record `A` o `CNAME` sul dominio (pagina "in
costruzione" di default), **vanno rimossi** o entrano in conflitto.

I DNS possono richiedere **da pochi minuti a 24 ore**. Vercel emette il
certificato HTTPS da solo, gratis.

## 4. Dire al sito il suo nuovo indirizzo

Quando il dominio risponde, su Vercel → **Settings → Environment Variables**:

| Nome | Valore |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://mementolab.it` |

Poi **Redeploy**. Serve perché il sito usa quell'indirizzo per i link canonici,
la sitemap, le anteprime sui social e i dati prodotto di Google.
Nel codice non c'è niente da cambiare: `src/lib/site.ts` legge la variabile.

## 5. Ultimi passaggi

- In Vercel → **Domains**, impostare `mementolab.it` come dominio **primario**
  (così `www` e il vecchio indirizzo `.vercel.app` reindirizzano lì)
- Aggiornare il link nella **bio di Instagram** e su TikTok
- Se e quando si attiveranno i pagamenti, il dominio proprio è anche un requisito
  di fiducia per Stripe (vedi [`PAGAMENTI.md`](./PAGAMENTI.md))

## Come verificare che sia andato tutto bene

```bash
# il dominio punta a Vercel?
dig +short mementolab.it
# il sito risponde in HTTPS?
curl -s -o /dev/null -w "%{http_code}\n" https://mementolab.it
```
