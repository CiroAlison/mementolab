import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { HeroScroll } from "@/components/HeroScroll";
import { Testimonials } from "@/components/Testimonials";
import { ProductCard } from "@/components/ProductCard";
import { featuredProducts } from "@/lib/shop";
import { categories, site } from "@/lib/site";
import { blurFor } from "@/lib/blur";
import { ParallaxImage } from "@/components/ParallaxImage";
import { SectionSpiral } from "@/components/SectionSpiral";

// Foto rappresentativa di ogni categoria.
// NOTA: `altro` è provvisoria — l'artista fornirà una foto dedicata.
const categoryImage: Record<string, string> = {
  giubbotti: "/gallery/giubbotti-01.jpg",
  jeans: "/gallery/jeans-09.jpg",
  scarpe: "/gallery/scarpe-03.jpg",
  altro: "/gallery/x-sangennaro.jpg",
};

export default function Home() {
  return (
    <>
      {/* ——— HERO dinamico (spirale + scroll reveal) ——— */}
      <HeroScroll />

      {/* ——— SHOP: subito in primo piano ——— */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <SectionSpiral className="-right-24 -top-10 h-72 w-72 sm:h-96 sm:w-96" />
        <div className="wrap relative z-10">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Shop</p>
              <h2 className="mt-2 text-balance font-display text-4xl leading-[1] text-ink sm:text-5xl md:text-6xl">
                Portati a casa un pezzo unico
              </h2>
              <p className="mt-4 max-w-lg text-pretty font-sans text-base leading-relaxed text-ink/75">
                Ogni capo è dipinto a mano, uno alla volta. Scegli quello che ti
                piace e scrivimi: ci mettiamo d&apos;accordo in due messaggi.
              </p>
            </div>
            <Link href="/shop" className="btn-primary shrink-0">
              Vai allo shop
            </Link>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.slice(0, 3).map((p, i) => (
              <Reveal key={p.id} delay={i * 0.07}>
                <ProductCard product={p} priority={i === 0} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 text-center">
            <Link
              href="/shop"
              className="link-underline font-sans text-sm text-ink/80 hover:text-ink"
            >
              Vedi tutti i pezzi →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ——— MANIFESTO ——— */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <SectionSpiral className="-left-24 top-0 h-72 w-72 sm:h-96 sm:w-96" />
        <SectionSpiral reverse className="-right-24 bottom-0 h-64 w-64 sm:h-80 sm:w-80" />
        <Reveal className="wrap relative z-10 mx-auto max-w-3xl text-center">
          <div className="relative mx-auto mb-8 h-14 w-14">
            <Image src="/brand/spiral.png?v=3" alt="" fill className="object-contain" />
          </div>
          <p className="text-balance font-display text-3xl leading-[1.05] text-ink sm:text-4xl md:text-5xl">
            Prendo un capo vissuto — un giubbotto, un jeans, un paio di scarpe — e
            lo trasformo in qualcosa che nessun altro potrà avere uguale.
          </p>
        </Reveal>
      </section>

      {/* ——— CATEGORIE ——— */}
      <section className="relative overflow-hidden pb-20 sm:pb-28">
        <SectionSpiral reverse className="-left-16 -top-4 h-64 w-64 sm:h-80 sm:w-80" />
        <div className="wrap relative z-10">
          <Reveal className="mb-10">
            <p className="eyebrow">Cosa personalizzo</p>
            <h2 className="mt-2 font-display text-4xl text-ink sm:text-5xl">
              Le categorie
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.06}>
                <Link
                  href="/shop"
                  className="group flex h-full flex-col overflow-hidden rounded-lg bg-ink text-paper"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={categoryImage[c.slug]}
                      alt={c.label}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
                      placeholder={blurFor(categoryImage[c.slug]) ? "blur" : "empty"}
                      blurDataURL={blurFor(categoryImage[c.slug])}
                      className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-2xl text-paper">{c.label}</h3>
                    <p className="mt-2 flex-1 text-pretty font-sans text-sm leading-relaxed text-paper/70">
                      {c.blurb}
                    </p>
                    <span className="mt-4 font-sans text-sm text-flame-soft">
                      Scopri →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— CHI SONO (teaser, sezione navy) ——— */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <SectionSpiral cream className="-right-28 -top-16 h-96 w-96" opacity={0.05} />
        <div className="wrap relative z-10 grid gap-12 py-20 sm:py-28 md:grid-cols-2 md:items-center">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <ParallaxImage
              src="/gallery/jeans-03.jpg"
              alt="L'artista di MementoLab al lavoro in studio"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow text-flame-soft">Chi sono</p>
            <h2 className="mt-3 font-display text-4xl text-paper sm:text-5xl">
              Ho fatto della mia passione il mio lavoro.
            </h2>
            <p className="mt-5 text-pretty font-sans text-base leading-relaxed text-paper/80">
              Ho iniziato con la custom art nel 2020, in un periodo difficile che
              mi ha fatto riscoprire l&apos;amore per l&apos;arte. Da allora non
              mi sono più fermata: ogni pezzo è una sfida nuova.
            </p>
            <Link href="/chi-sono" className="btn-onInk mt-8">
              La mia storia
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ——— TESTIMONIANZE ——— */}
      <Testimonials />

      {/* ——— CTA FINALE ——— */}
      <section className="relative overflow-hidden py-20 text-center sm:py-28">
        <SectionSpiral reverse className="-left-20 -bottom-16 h-80 w-80" />
        <Reveal className="wrap relative z-10 mx-auto max-w-2xl">
          <p className="eyebrow">Su misura</p>
          <h2 className="mt-3 text-balance font-display text-4xl text-ink sm:text-6xl">
            Hai un&apos;idea in mente?
          </h2>
          <p className="mt-5 text-pretty font-sans text-base leading-relaxed text-ink/80">
            Dal capo che indossi già a un pezzo pensato da zero: raccontami la tua
            idea e la trasformo in un&apos;opera da indossare.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/shop" className="btn-primary">
              Scopri lo shop
            </Link>
            <Link href="/commissioni" className="btn-ghost">
              Richiedi un pezzo custom
            </Link>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Instagram
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
