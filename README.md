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

## Variabili d'ambiente
Copia `.env.example` in `.env.local` e configura le variabili. I form funzionano
anche senza credenziali (degradano con eleganza); per **salvare** le richieste e
ricevere **notifiche email** servono `DATABASE_URL` (Neon) e `RESEND_API_KEY` (Resend).

Con il database configurato:

```bash
npx prisma db push   # crea le tabelle su Neon
```

## Struttura
- `src/app` — pagine (home, portfolio, chi-sono, processo, commissioni, contatti) e API
- `src/components` — UI (Header, Footer, Logo, Gallery, form…)
- `src/lib` — dati e configurazione (`site.ts`, `gallery.ts`, `validation.ts`)
- `prisma/schema.prisma` — modelli dati
- `public/gallery` — immagini delle opere

Vedi [`PROGRESS.md`](./PROGRESS.md) e [`DECISIONS.md`](./DECISIONS.md) per stato e scelte.
