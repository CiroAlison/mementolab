// ——— SHOP ———
// Questo è l'UNICO file da modificare per gestire i pezzi in vendita.
// Per ogni pezzo puoi impostare foto, titolo, prezzo e disponibilità.
//
// Come aggiungere un pezzo:
//   1. metti la foto in `public/gallery/` (o in `public/shop/`)
//   2. aggiungi un oggetto qui sotto nell'array `products`
//   3. `status`:  "disponibile" = pronto da comprare
//                 "su-ordinazione" = lo dipingo su richiesta
//                 "venduto" = mostrato ma non acquistabile
//   4. `price`: lascialo `undefined` per mostrare "Prezzo su richiesta"
//   5. `instagramPost`: link al post del pezzo — viene messo nel messaggio
//      d'acquisto, così vedi subito di quale pezzo si tratta

import type { CategorySlug } from "./site";

export type ProductStatus = "disponibile" | "su-ordinazione" | "venduto";

export type Product = {
  id: string;
  title: string;
  /** Su quale capo è realizzato (mostrato sotto al titolo) */
  base: string;
  category: CategorySlug;
  image: string;
  /** Es. "180€". Se assente mostra "Prezzo su richiesta". */
  price?: string;
  status: ProductStatus;
  /** Descrizione breve mostrata nella scheda */
  blurb: string;
  /** Post Instagram del pezzo: finisce nel messaggio così l'artista vede subito
   *  di quale pezzo si tratta (Instagram non permette di allegare foto da un link). */
  instagramPost?: string;
  /** In evidenza nella home */
  featured?: boolean;
};

export const statusLabel: Record<ProductStatus, string> = {
  disponibile: "Disponibile",
  "su-ordinazione": "Su ordinazione",
  venduto: "Venduto",
};

// NOTA: i prezzi non sono ancora stati forniti dall'artista, quindi tutti i
// pezzi mostrano "Prezzo su richiesta". Appena arrivano i prezzi reali basta
// aggiungere `price: "180€"` al pezzo corrispondente.
export const products: Product[] = [
  {
    id: "watch-me",
    title: "Watch me",
    base: "Giubbotto vintage in pelle",
    category: "giubbotti",
    image: "/gallery/giubbotti-01.jpg",
    instagramPost: "https://www.instagram.com/p/CbQXeAcIjtw/",
    status: "su-ordinazione",
    blurb:
      "Un giubbotto vintage in pelle punteggiato di occhi dipinti a mano: ovunque ti giri, qualcuno ti osserva.",
    featured: true,
  },
  {
    id: "goku",
    title: "Goku Super Saiyan",
    base: "Giacca in denim",
    category: "giubbotti",
    image: "/gallery/giubbotti-06.jpg",
    instagramPost: "https://www.instagram.com/p/C6eTRYRo_hW/",
    status: "su-ordinazione",
    blurb: "Quando la cultura pop diventa un pezzo unico: Goku su denim.",
    featured: true,
  },
  {
    id: "luffy",
    title: "Luffy · Gear 5",
    base: "Giubbotto in denim",
    category: "giubbotti",
    image: "/gallery/x-popmix.jpg",
    instagramPost: "https://www.instagram.com/p/C37zUHDoib5/",
    status: "su-ordinazione",
    blurb: "Rufy in versione Gear 5 sulla schiena di un giubbotto di jeans.",
  },
  {
    id: "paperone-jacket",
    title: "Zio Paperone",
    base: "Giubbotto in denim",
    category: "giubbotti",
    image: "/gallery/giubbotti-03.jpg",
    instagramPost: "https://www.instagram.com/p/DGL0eVoInYA/",
    status: "su-ordinazione",
    blurb: "Denim e oro: un omaggio pop al papero più ricco del mondo.",
  },
  {
    id: "starry-jeans",
    title: "Notte stellata",
    base: "Jeans · tasca dipinta",
    category: "jeans",
    image: "/gallery/jeans-09.jpg",
    instagramPost: "https://www.instagram.com/p/CN-S4mwHcuz/",
    status: "su-ordinazione",
    blurb:
      "La Notte stellata di Van Gogh dipinta sulla tasca: ogni versione è diversa dall'altra.",
    featured: true,
  },
  {
    id: "starry-sogno",
    title: "Notte stellata · sogno",
    base: "Jeans",
    category: "jeans",
    image: "/gallery/x-starry-sogno.jpg",
    instagramPost: "https://www.instagram.com/p/COdegnfHalh/",
    status: "su-ordinazione",
    blurb:
      "«Non so nulla con certezza, ma la vista delle stelle mi fa sognare.»",
  },
  {
    id: "dsquared-starry",
    title: "Notte stellata",
    base: "Sneaker Dsquared2",
    category: "scarpe",
    image: "/gallery/scarpe-01.jpg",
    instagramPost: "https://www.instagram.com/p/Cfq_iqqIMtl/",
    status: "su-ordinazione",
    blurb: "La Notte stellata di Van Gogh che avvolge un paio di Dsquared2.",
    featured: true,
  },
  {
    id: "af1-masters",
    title: "Van Gogh · Dalí · Monet",
    base: "Nike Air Force 1",
    category: "scarpe",
    image: "/gallery/scarpe-03.jpg",
    instagramPost: "https://www.instagram.com/p/DBPGsBkx3br/",
    status: "su-ordinazione",
    blurb: "Un mix di capolavori su un paio di AF1, nate per una mostra.",
  },
  {
    id: "af1-denim",
    title: "AF1 Denim · Decon-Recon",
    base: "Nike Air Force 1",
    category: "scarpe",
    image: "/gallery/scarpe-04.jpg",
    instagramPost: "https://www.instagram.com/p/DBeU1ZDoYuR/",
    status: "su-ordinazione",
    blurb:
      "Decostruite e ricostruite interamente in denim, cucite a mano una cucitura alla volta.",
  },
  {
    id: "charizard",
    title: "Charizard",
    base: "Adidas Stan Smith",
    category: "scarpe",
    image: "/gallery/x-charizard.jpg",
    instagramPost: "https://www.instagram.com/p/C9pAY2nIor-/",
    status: "su-ordinazione",
    blurb: "Dipingere su una superficie così piccola è stata una bella sfida.",
  },
  {
    id: "sangennaro",
    title: "San Gennaro",
    base: "Opera su tela",
    category: "altro",
    image: "/gallery/x-sangennaro.jpg",
    instagramPost: "https://www.instagram.com/p/DAGxin-ItTI/",
    status: "su-ordinazione",
    blurb:
      "San Gennaro e il Vesuvio: un omaggio a Napoli, dipinto a mano su tela.",
    featured: true,
  },
  {
    id: "adamo",
    title: "La creazione di Adamo",
    base: "Camicia",
    category: "altro",
    image: "/gallery/giubbotti-09.jpg",
    instagramPost: "https://www.instagram.com/p/COaWiqzHcpA/",
    status: "su-ordinazione",
    blurb: "Le mani della Creazione di Adamo dipinte su una camicia.",
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export function productsByCategory(slug: CategorySlug) {
  return products.filter((p) => p.category === slug);
}

export const priceLabel = (p: Product) => p.price ?? "Prezzo su richiesta";
