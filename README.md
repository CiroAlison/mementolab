# MementoLab — L'arte che indossi

Sito web premium per **MementoLab**, brand di custom wearable art: capi unici
dipinti a mano (giubbotti, jeans, scarpe e pezzi speciali).

## Stack
- [Next.js 14](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS · Framer Motion
- Prisma + Neon (Postgres serverless) · Resend (email)
- Deploy su Vercel

## Sviluppo

```bash
npm install
npm run dev      # http://localhost:3000
```

> Node 20+ richiesto.

## Contatti / richieste
I form **non usano il database**: precompilano lo stesso messaggio (con emoji) e lo
mandano via **Instagram** (canale primario), **WhatsApp** o **email**. Il database
**Neon è dormiente** (collegato ma non usato) — vedi `DECISIONS.md` per il perché e
come riattivarlo.

## Brand assets (logo, spirale, favicon)
Tutti i loghi derivano dalla **scansione reale** della spirale. Per rigenerarli:

```bash
cd scripts/brand && python3 extract-spiral.py && python3 build-assets.py
```

Guida completa: [`docs/BRAND-ASSETS.md`](./docs/BRAND-ASSETS.md).

## Shop
Il sito è costruito attorno allo shop. Per aggiungere/modificare pezzi, prezzi e
disponibilità si tocca **un solo file**: `src/lib/shop.ts`.
Guida completa: [`docs/SHOP.md`](./docs/SHOP.md).

## Struttura
- `src/app` — pagine (home, shop, chi-sono, processo, commissioni, contatti) e API
- `src/components` — UI (Header, Footer, Logo, ProductCard, BuyButton, form…)
- `src/lib` — dati e configurazione (`site.ts`, `shop.ts`, `message.ts`, `send.ts`, `validation.ts`)
- `public/brand` — logo, spirale, wordmark, favicon (generati da `scripts/brand/`)
- `public/gallery` — immagini delle opere
- `prisma/schema.prisma` — modelli dati (DB dormiente)

Vedi [`PROGRESS.md`](./PROGRESS.md) e [`DECISIONS.md`](./DECISIONS.md) per stato e scelte.
