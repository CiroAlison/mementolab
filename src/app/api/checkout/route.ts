import { NextResponse } from "next/server";
import { getProduct } from "@/lib/shop";
import { site } from "@/lib/site";

// ——— PAGAMENTI ONLINE ———
// Questo è il checkout vero, GIÀ SCRITTO ma DISATTIVATO.
//
// Resta spento finché non esistono: la Partita IVA, un account Stripe e le
// variabili d'ambiente. Finché `SHOP_PAGAMENTI` non vale "on", questa rotta
// risponde 503 e non può muovere un centesimo.
//
// Per accenderlo: vedi docs/PAGAMENTI.md (5 passaggi, ~20 minuti).

export const runtime = "nodejs";

const ATTIVO = process.env.SHOP_PAGAMENTI === "on";

export async function POST(req: Request) {
  if (!ATTIVO || !process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      {
        error: "pagamenti-non-attivi",
        message:
          "I pagamenti online non sono ancora attivi. Scrivimi su Instagram o WhatsApp per acquistare.",
      },
      { status: 503 },
    );
  }

  let body: { productId?: string; size?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "richiesta-non-valida" }, { status: 400 });
  }

  const product = body.productId ? getProduct(body.productId) : undefined;
  if (!product) {
    return NextResponse.json({ error: "pezzo-inesistente" }, { status: 404 });
  }
  if (product.status === "venduto") {
    return NextResponse.json({ error: "pezzo-venduto" }, { status: 409 });
  }
  if (typeof product.priceEur !== "number") {
    return NextResponse.json({ error: "prezzo-mancante" }, { status: 409 });
  }

  // import dinamico: la libreria si carica solo quando i pagamenti sono attivi
  const { default: Stripe } = await import("stripe");
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    // NON elenchiamo i metodi di pagamento: così Stripe mostra da solo TUTTI
    // quelli attivati nel pannello (carte, Apple Pay, Google Pay, Klarna,
    // PayPal, Satispay…). Basta spuntarli su Stripe, senza toccare il codice.
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: Math.round(product.priceEur * 100), // in centesimi
          product_data: {
            name: product.title,
            description: [product.base, body.size && `Taglia ${body.size}`]
              .filter(Boolean)
              .join(" · "),
            images: [`${site.url}${product.image}`],
          },
        },
      },
    ],
    // servono per spedire il pezzo
    shipping_address_collection: { allowed_countries: ["IT"] },
    phone_number_collection: { enabled: true },
    locale: "it",
    metadata: {
      productId: product.id,
      size: body.size ?? "",
    },
    success_url: `${site.url}/shop/${product.id}?ordine=ok`,
    cancel_url: `${site.url}/shop/${product.id}`,
  });

  return NextResponse.json({ url: session.url });
}
