// Central site configuration — contacts, socials, navigation.
// Update these values in one place.

export const site = {
  name: "MementoLab",
  tagline: "L'arte che indossi",
  description:
    "MementoLab trasforma la moda in arte indossabile: capi unici dipinti a mano — giubbotti, jeans, scarpe e pezzi speciali. Ogni creazione è irripetibile.",
  // Indirizzo ufficiale del sito. Serve per i link canonici, la sitemap, le
  // anteprime sui social e i dati prodotto per Google.
  // Quando mementolab.it sarà attivo basta impostare su Vercel la variabile
  // NEXT_PUBLIC_SITE_URL=https://mementolab.it — nessuna modifica al codice.
  // Vedi docs/DOMINIO.md
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mementolab.vercel.app",
  locale: "it_IT",
  city: "Napoli",
  email: "mementolab97@gmail.com",
  whatsapp: "393485924413", // per i link wa.me (senza +)
  phoneDisplay: "+39 348 592 4413",
  instagram: "https://www.instagram.com/mementolab_/",
  instagramHandle: "@mementolab_",
  instagramDM: "https://ig.me/m/mementolab_", // apre direttamente il DM
  tiktok: "https://www.tiktok.com/@mementolab_",
  tiktokHandle: "@mementolab_",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/chi-sono", label: "Chi sono" },
  { href: "/processo", label: "Processo" },
  { href: "/commissioni", label: "Commissioni" },
  { href: "/contatti", label: "Contatti" },
] as const;

export const categories = [
  {
    slug: "giubbotti",
    label: "Giubbotti",
    blurb: "Denim e pelle che diventano tela: opere che si indossano sulle spalle.",
  },
  {
    slug: "jeans",
    label: "Jeans",
    blurb: "La mia base preferita. Dettagli dipinti a mano su denim vissuto.",
  },
  {
    slug: "scarpe",
    label: "Scarpe",
    blurb: "Sneaker e pelle reinterpretate, dal ritocco pittorico al decon-recon.",
  },
  {
    slug: "altro",
    label: "Altro",
    blurb: "Tele, accessori e pezzi speciali nati da una commissione o da un'idea.",
  },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];
