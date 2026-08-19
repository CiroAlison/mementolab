// ——— SHOP ———
// I pezzi in vendita stanno in `src/data/prodotti.json` (file dati, non codice).
//
// PER AGGIUNGERE UN PEZZO non serve toccare nulla a mano: basta il link del post
// Instagram e il prezzo.
//
//     npm run pezzo -- https://www.instagram.com/p/XXXXX/ --prezzo 180
//
// Lo script scarica la foto dal post, la mette in `public/shop/`, ricava titolo e
// descrizione dalla didascalia e aggiunge la scheda al catalogo. Vedi docs/SHOP.md.

import type { CategorySlug } from "./site";
import data from "@/data/prodotti.json";

export type ProductStatus = "disponibile" | "su-ordinazione" | "venduto";

export type Product = {
  id: string;
  title: string;
  /** Su quale capo è realizzato (mostrato sotto al titolo) */
  base: string;
  category: CategorySlug;
  image: string;
  /** Foto aggiuntive (retro, dettagli). La prima resta `image`. */
  gallery?: string[];
  /** Prezzo in EURO, come numero: 180 (non "180€"). È l'unico posto dove si
   *  scrive il prezzo: il sito lo formatta da solo e domani il pagamento userà
   *  lo stesso valore. Se manca, mostra "Prezzo su richiesta". */
  priceEur?: number;
  /** Taglie disponibili, se il capo ne ha. Es. ["S","M","L"] */
  sizes?: string[];
  status: ProductStatus;
  /** Descrizione breve mostrata nella scheda */
  blurb: string;
  /** Racconto più lungo, mostrato nella pagina del pezzo */
  story?: string;
  /** Post Instagram del pezzo: finisce nel messaggio d'acquisto, così si vede
   *  subito di quale pezzo si tratta. */
  instagramPost?: string;
  /** In evidenza nella home */
  featured?: boolean;
};

export const statusLabel: Record<ProductStatus, string> = {
  disponibile: "Disponibile",
  "su-ordinazione": "Su ordinazione",
  venduto: "Venduto",
};

// Ordine di presentazione nello shop: prima i pezzi più forti (giubbotti e
// scarpe), poi il resto. Dentro ogni categoria resta l'ordine di prodotti.json.
const ordineCategorie: CategorySlug[] = [
  "giubbotti",
  "scarpe",
  "jeans",
  "tshirt",
  "altro",
];

export const products = [...(data as Product[])].sort(
  (a, b) =>
    ordineCategorie.indexOf(a.category) - ordineCategorie.indexOf(b.category),
);

export const featuredProducts = products.filter((p) => p.featured);

export function productsByCategory(slug: CategorySlug) {
  return products.filter((p) => p.category === slug);
}

const euro = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

/** Prezzo da mostrare: "180 €" oppure "Prezzo su richiesta". */
export const priceLabel = (p: Product) =>
  typeof p.priceEur === "number" ? euro.format(p.priceEur) : "Prezzo su richiesta";

/** true quando il pezzo ha un prezzo e si potrà pagare online. */
export const hasPrice = (p: Product) => typeof p.priceEur === "number";

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

/** Altri pezzi da suggerire in fondo alla pagina di un pezzo. */
export function relatedProducts(p: Product, n = 4) {
  const stessaCategoria = products.filter(
    (x) => x.id !== p.id && x.category === p.category,
  );
  const altri = products.filter(
    (x) => x.id !== p.id && x.category !== p.category,
  );
  return [...stessaCategoria, ...altri].slice(0, n);
}
