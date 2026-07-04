import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { HeroScroll } from "@/components/HeroScroll";
import { featuredWorks } from "@/lib/gallery";
import { categories, site } from "@/lib/site";

const categoryImage: Record<string, string> = {
  giubbotti: "/gallery/giubbotti-01.jpg",
  jeans: "/gallery/jeans-02.jpg",
  scarpe: "/gallery/scarpe-03.jpg",
  altro: "/gallery/altro-03.jpg",
};

export default function Home() {
  return (
    <>
      {/* ——— HERO dinamico (spirale + scroll reveal) ——— */}
      <HeroScroll />

      {/* ——— MANIFESTO ——— */}
      <section className="wrap relative py-20 sm:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="relative mx-auto mb-8 h-14 w-14">
            <Image src="/brand/spiral.svg" alt="" fill className="object-contain" />
          </div>
          <p className="text-balance font-display text-3xl leading-[1.05] text-ink sm:text-4xl md:text-5xl">
            Prendo un capo vissuto — un giubbotto, un jeans, un paio di scarpe — e
            lo trasformo in qualcosa che nessun altro potrà avere uguale.
          </p>
        </Reveal>
      </section>

      {/* ——— IN EVIDENZA ——— */}
      <section className="wrap pb-8">
        <Reveal className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Selezione</p>
            <h2 className="mt-2 font-display text-4xl text-ink sm:text-5xl">
              In evidenza
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="link-underline hidden shrink-0 font-sans text-sm text-ink/80 hover:text-ink sm:block"
          >
            Tutte le opere →
          </Link>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {featuredWorks.slice(0, 4).map((w, i) => (
            <Reveal
              key={w.id}
              as="article"
              delay={i * 0.08}
              className={i === 0 ? "col-span-2 lg:col-span-1" : ""}
            >
              <Link
                href="/portfolio"
                className="group relative block overflow-hidden rounded-lg bg-ink/10 ring-1 ring-ink/10"
              >
                <div
                  className={`relative ${i === 0 ? "aspect-square lg:aspect-[3/4]" : "aspect-[3/4]"}`}
                >
                  <Image
                    src={w.src}
                    alt={`${w.title}, ${w.base}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-paper">
                    <p className="font-display text-2xl leading-tight">{w.title}</p>
                    <p className="mt-0.5 font-sans text-xs text-paper/80">
                      {w.reference ?? w.base}
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Link
          href="/portfolio"
          className="mt-8 block text-center font-sans text-sm text-ink underline sm:hidden"
        >
          Tutte le opere →
        </Link>
      </section>

      {/* ——— CATEGORIE ——— */}
      <section className="wrap py-20 sm:py-28">
        <Reveal className="mb-10">
          <p className="eyebrow">Cosa personalizzo</p>
          <h2 className="mt-2 font-display text-4xl text-ink sm:text-5xl">
            Le categorie
          </h2>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal key={c.slug} as="article" delay={i * 0.06}>
              <Link
                href={`/portfolio?cat=${c.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-lg bg-ink text-paper"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={categoryImage[c.slug]}
                    alt={c.label}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-2xl text-paper">{c.label}</h3>
                  <p className="mt-2 text-pretty font-sans text-sm leading-relaxed text-paper/70">
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
      </section>

      {/* ——— CHI SONO (teaser, sezione navy) ——— */}
      <section className="bg-ink text-paper">
        <div className="wrap grid gap-12 py-20 sm:py-28 md:grid-cols-2 md:items-center">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <Image
              src="/gallery/jeans-03.jpg"
              alt="L'artista di MementoLab al lavoro in studio"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
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
              mi sono più fermata: a un certo punto ho trovato il coraggio di
              lasciare il posto fisso per dedicarmi anima e corpo a MementoLab.
            </p>
            <Link href="/chi-sono" className="btn-onInk mt-8">
              La mia storia
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ——— CTA COMMISSIONI ——— */}
      <section className="wrap py-20 text-center sm:py-28">
        <Reveal className="mx-auto max-w-2xl">
          <p className="eyebrow">Su commissione</p>
          <h2 className="mt-3 text-balance font-display text-4xl text-ink sm:text-6xl">
            Hai un&apos;idea in mente?
          </h2>
          <p className="mt-5 text-pretty font-sans text-base leading-relaxed text-ink/80">
            Dal capo che indossi già a un pezzo pensato da zero: raccontami la tua
            idea e la trasformo in un&apos;opera da indossare.
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
              Seguimi su Instagram
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
