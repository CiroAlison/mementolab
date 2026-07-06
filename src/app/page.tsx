import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { HeroScroll } from "@/components/HeroScroll";
import { Marquee } from "@/components/Marquee";
import { InMovimento } from "@/components/InMovimento";
import { Testimonials } from "@/components/Testimonials";
import { works } from "@/lib/gallery";
import { categories, site } from "@/lib/site";
import { blurFor } from "@/lib/blur";
import { ParallaxImage } from "@/components/ParallaxImage";
import { SectionSpiral } from "@/components/SectionSpiral";

const categoryImage: Record<string, string> = {
  giubbotti: "/gallery/giubbotti-01.jpg",
  jeans: "/gallery/jeans-04.jpg",
  scarpe: "/gallery/scarpe-03.jpg",
  altro: "/gallery/altro-03.jpg",
};

export default function Home() {
  return (
    <>
      {/* ——— HERO dinamico (spirale + scroll reveal) ——— */}
      <HeroScroll />

      {/* ——— MANIFESTO ——— */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <SectionSpiral className="-left-24 top-0 h-72 w-72 sm:h-96 sm:w-96" />
        <SectionSpiral reverse className="-right-24 bottom-0 h-64 w-64 sm:h-80 sm:w-80" />
        <Reveal className="wrap relative z-10 mx-auto max-w-3xl text-center">
          <div className="relative mx-auto mb-8 h-14 w-14">
            <Image src="/brand/spiral.png" alt="" fill className="object-contain" />
          </div>
          <p className="text-balance font-display text-3xl leading-[1.05] text-ink sm:text-4xl md:text-5xl">
            Prendo un capo vissuto — un giubbotto, un jeans, un paio di scarpe — e
            lo trasformo in qualcosa che nessun altro potrà avere uguale.
          </p>
        </Reveal>
      </section>

      {/* ——— IN EVIDENZA (carosello) ——— */}
      <section className="relative overflow-hidden py-8">
        <SectionSpiral className="-right-16 -top-4 h-64 w-64 sm:h-80 sm:w-80" />
        <Reveal className="wrap relative z-10 mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Selezione</p>
            <h2 className="mt-2 font-display text-4xl text-ink sm:text-5xl">
              In evidenza
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="link-underline shrink-0 font-sans text-sm text-ink/80 hover:text-ink"
          >
            Tutte le opere →
          </Link>
        </Reveal>

        <Marquee speed={70}>
          {works.map((w) => (
            <Link
              key={w.id}
              href="/portfolio"
              className="group relative block w-[230px] shrink-0 overflow-hidden rounded-lg bg-ink/10 sm:w-[280px]"
              aria-label={w.title}
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={w.src}
                  alt={`${w.title}, ${w.base}`}
                  fill
                  sizes="280px"
                  placeholder={blurFor(w.src) ? "blur" : "empty"}
                  blurDataURL={blurFor(w.src)}
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
          ))}
        </Marquee>
      </section>

      {/* ——— CATEGORIE (carosello, direzione opposta) ——— */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <SectionSpiral reverse className="-left-16 -top-4 h-64 w-64 sm:h-80 sm:w-80" />
        <Reveal className="wrap relative z-10 mb-10">
          <p className="eyebrow">Cosa personalizzo</p>
          <h2 className="mt-2 font-display text-4xl text-ink sm:text-5xl">
            Le categorie
          </h2>
        </Reveal>
        <Marquee reverse speed={55}>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/portfolio?cat=${c.slug}`}
              className="group flex w-[280px] shrink-0 flex-col overflow-hidden rounded-lg bg-ink text-paper sm:w-[340px]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={categoryImage[c.slug]}
                  alt={c.label}
                  fill
                  sizes="340px"
                  placeholder={blurFor(categoryImage[c.slug]) ? "blur" : "empty"}
                  blurDataURL={blurFor(categoryImage[c.slug])}
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
          ))}
        </Marquee>
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
              mi sono più fermata: a un certo punto ho trovato il coraggio di
              lasciare il posto fisso per dedicarmi anima e corpo a MementoLab.
            </p>
            <Link href="/chi-sono" className="btn-onInk mt-8">
              La mia storia
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ——— TESTIMONIANZE ——— */}
      <Testimonials />

      {/* ——— IN MOVIMENTO (video) ——— */}
      <InMovimento />

      {/* ——— CTA COMMISSIONI ——— */}
      <section className="relative overflow-hidden py-20 text-center sm:py-28">
        <SectionSpiral reverse className="-left-20 -bottom-16 h-80 w-80" />
        <Reveal className="wrap relative z-10 mx-auto max-w-2xl">
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
              Instagram
            </a>
            <a
              href={site.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              TikTok
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
