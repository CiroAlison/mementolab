import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionSpiral } from "@/components/SectionSpiral";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Lo shop di MementoLab sta prendendo forma: presto potrai acquistare i pezzi unici dipinti a mano direttamente online. Nel frattempo scrivimi su Instagram o richiedi una commissione.",
  alternates: { canonical: "/shop" },
};

// Anteprima dei pezzi in arrivo — segnaposto, verrà popolata con i prodotti reali.
const teasers = [
  { label: "Giubbotti", note: "Pezzi unici" },
  { label: "Jeans", note: "Edizione singola" },
  { label: "Scarpe", note: "Su misura" },
  { label: "Special", note: "Collezione" },
];

export default function ShopPage() {
  return (
    <>
      {/* ——— HERO SHOP ——— */}
      <section className="relative overflow-hidden py-20 text-center sm:py-28">
        <SectionSpiral className="-left-24 -top-10 h-80 w-80 sm:h-96 sm:w-96" />
        <SectionSpiral reverse className="-right-24 bottom-0 h-64 w-64 sm:h-80 sm:w-80" />
        <Reveal className="wrap relative z-10 mx-auto max-w-2xl">
          <p className="eyebrow">Shop</p>
          <h1 className="mt-3 text-balance font-display text-5xl leading-[0.95] text-ink sm:text-6xl md:text-7xl">
            Lo shop sta prendendo forma
          </h1>
          <p className="mt-6 text-pretty font-sans text-base leading-relaxed text-ink/75 sm:text-lg">
            Sto preparando uno spazio dove potrai acquistare i pezzi unici
            direttamente online — ogni capo un&apos;opera irripetibile, pronta da
            indossare. Nel frattempo, il modo più veloce per averne uno è
            scrivermi su Instagram o richiedere una commissione su misura.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={site.instagramDM}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Scrivimi su Instagram
            </a>
            <Link href="/commissioni" className="btn-ghost">
              Richiedi un pezzo custom
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ——— ANTEPRIMA CATEGORIE (segnaposto “in arrivo”) ——— */}
      <section className="relative overflow-hidden pb-24">
        <SectionSpiral reverse className="-left-16 top-0 h-64 w-64 sm:h-80 sm:w-80" />
        <div className="wrap relative z-10">
          <Reveal className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {teasers.map((t) => (
              <div
                key={t.label}
                className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-lg border border-ink/10 bg-paper-soft/60"
              >
                {/* filigrana spirale nel riquadro */}
                <SectionSpiral
                  className="inset-0 h-full w-full"
                  opacity={0.07}
                />
                <span className="absolute left-4 top-4 rounded-full bg-ink/90 px-3 py-1 font-sans text-[0.7rem] uppercase tracking-wide2 text-paper">
                  In arrivo
                </span>
                <div className="relative z-10 p-5">
                  <p className="font-display text-2xl leading-tight text-ink">
                    {t.label}
                  </p>
                  <p className="mt-0.5 font-sans text-xs text-ink/60">
                    {t.note}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal
            delay={0.1}
            className="mx-auto mt-14 max-w-xl text-center font-sans text-sm leading-relaxed text-ink/60"
          >
            <p>
              Vuoi essere tra i primi a sapere quando apre lo shop? Seguimi su{" "}
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-ink hover:text-flame"
              >
                Instagram {site.instagramHandle}
              </a>{" "}
              — lì annuncio ogni nuovo pezzo disponibile.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
