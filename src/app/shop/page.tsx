import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionSpiral } from "@/components/SectionSpiral";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/shop";
import { categories, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Acquista i pezzi unici di MementoLab: giubbotti, jeans e scarpe dipinti a mano. Ogni capo è un'opera irripetibile. Scrivimi e te lo porti a casa.",
  alternates: { canonical: "/shop" },
};

const steps = [
  {
    n: "01",
    t: "Scegli il pezzo",
    d: "Guarda i pezzi qui sotto e premi «Lo voglio»: ti preparo il messaggio già scritto.",
  },
  {
    n: "02",
    t: "Ci accordiamo",
    d: "Ti confermo disponibilità, taglia, prezzo e tempi. Nessun impegno finché non sei sicuro.",
  },
  {
    n: "03",
    t: "Te lo spedisco",
    d: "Spedisco in tutta Italia (e su richiesta all'estero), imballato con cura.",
  },
];

export default function ShopPage() {
  return (
    <>
      {/* ——— HERO SHOP ——— */}
      <section className="relative overflow-hidden py-16 text-center sm:py-24">
        <SectionSpiral className="-left-24 -top-10 h-80 w-80 sm:h-96 sm:w-96" />
        <SectionSpiral reverse className="-right-24 bottom-0 h-64 w-64 sm:h-80 sm:w-80" />
        <Reveal className="wrap relative z-10 mx-auto max-w-2xl">
          <p className="eyebrow">Shop</p>
          <h1 className="mt-3 text-balance font-display text-5xl leading-[0.95] text-ink sm:text-6xl md:text-7xl">
            Portati a casa un pezzo unico
          </h1>
          <p className="mt-6 text-pretty font-sans text-base leading-relaxed text-ink/75 sm:text-lg">
            Ogni capo è dipinto a mano da me, uno alla volta: quando è tuo,
            nessun altro al mondo ne ha uno uguale. Scegli il pezzo che ti
            piace e scrivimi — ci mettiamo d&apos;accordo in due messaggi.
          </p>
        </Reveal>
      </section>

      {/* ——— GRIGLIA PRODOTTI ——— */}
      <section className="relative overflow-hidden pb-8">
        <div className="wrap relative z-10">
          <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">I pezzi</p>
              <h2 className="mt-2 font-display text-4xl text-ink sm:text-5xl">
                Disponibili ora
              </h2>
            </div>
            <p className="font-sans text-sm text-ink/60">
              {products.length} pezzi · dipinti a mano
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 0.05}>
                <ProductCard product={p} priority={i < 4} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— COME FUNZIONA ——— */}
      <section className="relative mt-20 overflow-hidden bg-ink text-paper sm:mt-28">
        <SectionSpiral cream className="-right-28 -top-16 h-96 w-96" opacity={0.05} />
        <div className="wrap relative z-10 py-20 sm:py-24">
          <Reveal className="mb-12 text-center">
            <p className="eyebrow text-flame-soft">Come funziona</p>
            <h2 className="mt-2 font-display text-4xl text-paper sm:text-5xl">
              Comprare è semplice
            </h2>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <p className="font-display text-4xl text-flame-soft">{s.n}</p>
                <h3 className="mt-2 font-display text-2xl text-paper">{s.t}</h3>
                <p className="mt-2 text-pretty font-sans text-sm leading-relaxed text-paper/75">
                  {s.d}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— NON TROVI QUELLO CHE CERCHI ——— */}
      <section className="relative overflow-hidden py-20 text-center sm:py-28">
        <SectionSpiral reverse className="-left-20 -bottom-16 h-80 w-80" />
        <Reveal className="wrap relative z-10 mx-auto max-w-2xl">
          <p className="eyebrow">Su misura</p>
          <h2 className="mt-3 text-balance font-display text-4xl text-ink sm:text-5xl">
            Non trovi quello che cerchi?
          </h2>
          <p className="mt-5 text-pretty font-sans text-base leading-relaxed text-ink/75">
            Posso dipingere quello che hai in mente — anche su un capo che possiedi
            già. Raccontami la tua idea e ti mando un preventivo senza impegno.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/commissioni" className="btn-primary">
              Richiedi un pezzo custom
            </Link>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Guarda su Instagram
            </a>
          </div>

          <p className="mt-10 font-sans text-xs text-ink/50">
            Categorie: {categories.map((c) => c.label).join(" · ")}
          </p>
        </Reveal>
      </section>
    </>
  );
}
