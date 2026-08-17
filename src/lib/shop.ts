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
  /** Es. "180€". Se assente mostra "Prezzo su richiesta". */
  price?: string;
  status: ProductStatus;
  /** Descrizione breve mostrata nella scheda */
  blurb: string;
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

export const products = data as Product[];

export const featuredProducts = products.filter((p) => p.featured);

export function productsByCategory(slug: CategorySlug) {
  return products.filter((p) => p.category === slug);
}

export const priceLabel = (p: Product) => p.price ?? "Prezzo su richiesta";
