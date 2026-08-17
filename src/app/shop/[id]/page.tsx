import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { SectionSpiral } from "@/components/SectionSpiral";
import { ProductCard } from "@/components/ProductCard";
import { ProductBuy } from "@/components/ProductBuy";
import { blurFor } from "@/lib/blur";
import { products, getProduct, relatedProducts, priceLabel, statusLabel } from "@/lib/shop";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const p = getProduct(params.id);
  if (!p) return { title: "Pezzo non trovato" };
  return {
    title: p.title,
    description: `${p.title} — ${p.base}. ${p.blurb}`,
    alternates: { canonical: `/shop/${p.id}` },
    openGraph: {
      title: `${p.title} — MementoLab`,
      description: p.blurb,
      images: [{ url: p.image }],
    },
  };
}

// Rassicurazioni: sono il motivo per cui chi non ti conosce si fida e compra.
const garanzie = [
  { t: "Pezzo unico", d: "Ne esiste uno solo al mondo" },
  { t: "Dipinto a mano", d: "Nessuna stampa, solo pennello" },
  { t: "Spedizione", d: "In tutta Italia, imballato con cura" },
];

export default function ProductPage({ params }: { params: { id: string } }) {
  const p = getProduct(params.id);
  if (!p) notFound();

  const foto = [p.image, ...(p.gallery ?? [])];
  const venduto = p.status === "venduto";
  const altri = relatedProducts(p);

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-8 sm:pt-12">
        <SectionSpiral className="-right-24 -top-10 h-72 w-72 sm:h-96 sm:w-96" />

        <div className="wrap relative z-10">
          {/* briciole */}
          <nav className="mb-6 font-sans text-xs text-ink/50">
            <Link href="/shop" className="hover:text-ink">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink/70">{p.title}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
            {/* ——— FOTO ——— */}
            <Reveal className="lg:sticky lg:top-24 lg:self-start">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink/5">
                <Image
                  src={foto[0]}
                  alt={`${p.title} — ${p.base}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 45vw"
                  placeholder={blurFor(foto[0]) ? "blur" : "empty"}
                  blurDataURL={blurFor(foto[0])}
                  className={`object-cover ${venduto ? "opacity-70 grayscale" : ""}`}
                />
                <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-3 py-1.5 font-sans text-[0.65rem] uppercase tracking-wide2 text-paper backdrop-blur">
                  {statusLabel[p.status]}
                </span>
              </div>

              {foto.length > 1 && (
                <div className="mt-3 grid grid-cols-4 gap-3">
                  {foto.slice(1, 5).map((src) => (
                    <div
                      key={src}
                      className="relative aspect-square overflow-hidden rounded-lg bg-ink/5"
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="20vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </Reveal>

            {/* ——— INFO ——— */}
            <Reveal delay={0.08} className="flex flex-col">
              <p className="eyebrow">{p.base}</p>
              <h1 className="mt-2 text-balance font-display text-4xl leading-[1] text-ink sm:text-5xl md:text-6xl">
                {p.title}
              </h1>

              <p className="mt-5 font-display text-3xl text-ink sm:text-4xl">
                {priceLabel(p)}
              </p>

              <p className="mt-5 text-pretty font-sans text-base leading-relaxed text-ink/80">
                {p.story ?? p.blurb}
              </p>

              {/* acquisto */}
              <ProductBuy product={p} />

              {/* rassicurazioni */}
              <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-ink/10 sm:grid-cols-3">
                {garanzie.map((g) => (
                  <li
                    key={g.t}
                    className="bg-paper-soft/40 p-4 outline outline-1 outline-ink/5"
                  >
                    <p className="font-sans text-sm font-medium text-ink">{g.t}</p>
                    <p className="mt-0.5 font-sans text-xs leading-relaxed text-ink/60">
                      {g.d}
                    </p>
                  </li>
                ))}
              </ul>

              {p.instagramPost && (
                <a
                  href={p.instagramPost}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-6 self-start font-sans text-sm text-ink/70 hover:text-ink"
                >
                  Guarda questo pezzo su Instagram →
                </a>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— ALTRI PEZZI ——— */}
      {altri.length > 0 && (
        <section className="relative overflow-hidden pb-24">
          <SectionSpiral reverse className="-left-20 top-0 h-64 w-64 sm:h-80 sm:w-80" />
          <div className="wrap relative z-10">
            <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-3xl text-ink sm:text-4xl">
                Ti potrebbe piacere
              </h2>
              <Link
                href="/shop"
                className="link-underline font-sans text-sm text-ink/80 hover:text-ink"
              >
                Tutti i pezzi →
              </Link>
            </Reveal>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
              {altri.map((a, i) => (
                <Reveal key={a.id} delay={i * 0.05}>
                  <ProductCard product={a} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* dati strutturati: aiuta Google a mostrare il pezzo come prodotto */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.title,
            image: `${site.url}${p.image}`,
            description: p.blurb,
            brand: { "@type": "Brand", name: site.name },
            ...(typeof p.priceEur === "number"
              ? {
                  offers: {
                    "@type": "Offer",
                    price: p.priceEur,
                    priceCurrency: "EUR",
                    availability:
                      p.status === "venduto"
                        ? "https://schema.org/SoldOut"
                        : "https://schema.org/InStock",
                    url: `${site.url}/shop/${p.id}`,
                  },
                }
              : {}),
          }),
        }}
      />
    </>
  );
}
