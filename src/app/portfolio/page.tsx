import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { SectionSpiral } from "@/components/SectionSpiral";
import { works } from "@/lib/gallery";
import { categories, type CategorySlug } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "La galleria delle opere MementoLab: giubbotti, jeans, scarpe e pezzi speciali dipinti a mano. Ogni capo è un pezzo unico.",
  alternates: { canonical: "/portfolio" },
};

const validCats = categories.map((c) => c.slug);

export default function PortfolioPage({
  searchParams,
}: {
  searchParams: { cat?: string };
}) {
  const cat = searchParams.cat;
  const initial =
    cat && validCats.includes(cat as CategorySlug)
      ? (cat as CategorySlug)
      : "tutti";

  return (
    <div className="relative overflow-hidden py-16 sm:py-24">
      <SectionSpiral className="-right-24 top-8 h-80 w-80" />
      <div className="wrap relative z-10">
      <header className="mb-12 max-w-2xl">
        <p className="eyebrow">Portfolio</p>
        <h1 className="mt-3 font-display text-5xl text-ink sm:text-7xl">
          Opere da indossare
        </h1>
        <p className="mt-5 text-pretty font-sans text-base leading-relaxed text-ink/70">
          Ogni pezzo è dipinto a mano ed è irripetibile. Tocca un&apos;opera per
          scoprire la storia, i materiali e il capo su cui è nata.
        </p>
      </header>
      <Gallery works={works} initial={initial} />
      </div>
    </div>
  );
}
