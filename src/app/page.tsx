import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SpiralMark } from "@/components/SpiralMark";
import { featuredWorks } from "@/lib/gallery";
import { categories, site } from "@/lib/site";

const heroImage = "/gallery/jeans-01.jpg";
const categoryImage: Record<string, string> = {
  giubbotti: "/gallery/giubbotti-01.jpg",
  jeans: "/gallery/jeans-02.jpg",
  scarpe: "/gallery/scarpe-03.jpg",
  altro: "/gallery/altro-03.jpg",
};

export default function Home() {
  return (
    <>
      {/* ——— HERO ——— */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        <Image
          src={heroImage}
          alt="Giubbotto in denim con i girasoli di Van Gogh dipinti a mano"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/30" />
        <div className="wrap relative z-10 pb-16 pt-32 sm:pb-24">
          <p className="animate-fade-up eyebrow text-paper/80">
            {site.city} · Custom wearable art
          </p>
          <h1 className="animate-fade-up mt-4 max-w-4xl text-balance font-display text-5xl font-medium leading-[0.95] text-paper sm:text-7xl md:text-8xl">
            L&apos;arte che indossi.
          </h1>
          <p className="animate-fade-up mt-6 max-w-xl text-pretty font-sans text-base leading-relaxed text-paper/85 sm:text-lg">
            Capi unici dipinti a mano, un pezzo alla volta. Giubbotti, jeans e
            scarpe che diventano opere irripetibili.
          </p>
          <div className="animate-fade-up mt-9 flex flex-wrap gap-3">
            <Link href="/portfolio" className="btn-primary">
              Esplora il portfolio
            </Link>
            <Link
              href="/commissioni"
              className="btn border border-paper/40 text-paper hover:bg-paper hover:text-ink"
            >
              Richiedi un pezzo custom
            </Link>
          </div>
        </div>
      </section>

      {/* ——— MANIFESTO ——— */}
      <section className="wrap py-20 sm:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SpiralMark className="mx-auto mb-8 h-12 w-12 text-flame" aria-hidden />
          <p className="text-balance font-display text-3xl leading-snug text-ink sm:text-4xl md:text-5xl">
            Ogni pezzo nasce da una tela diversa: un giubbotto vissuto, un jeans,
            un paio di scarpe. Li trasformo in qualcosa che nessun altro potrà
            avere uguale.
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
            className="link-underline hidden shrink-0 font-sans text-sm text-ink/70 hover:text-ink sm:block"
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
                className="group relative block overflow-hidden rounded-lg bg-paper-deep"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/75 to-transparent opacity-70 transition-opacity group-hover:opacity-90" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-paper">
                    <p className="font-display text-2xl leading-tight">
                      {w.title}
                    </p>
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
          className="mt-8 block text-center font-sans text-sm text-flame sm:hidden"
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
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-ink/10 bg-white/40 transition-colors hover:border-ink/25"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={categoryImage[c.slug]}
                    alt={c.label}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-2xl text-ink">{c.label}</h3>
                  <p className="mt-2 text-pretty font-sans text-sm leading-relaxed text-ink/65">
                    {c.blurb}
                  </p>
                  <span className="mt-4 font-sans text-sm text-flame">
                    Scopri →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ——— CHI SONO (teaser) ——— */}
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
            <p className="eyebrow text-flame">Chi sono</p>
            <h2 className="mt-3 font-display text-4xl text-paper sm:text-5xl">
              Ho fatto della mia passione il mio lavoro.
            </h2>
            <p className="mt-5 text-pretty font-sans text-base leading-relaxed text-paper/80">
              Ho iniziato con la custom art nel 2020, in un periodo difficile che
              mi ha fatto riscoprire l&apos;amore per l&apos;arte. Da allora non
              mi sono più fermata: ho continuato a studiare, a dipingere e, a un
              certo punto, ho trovato il coraggio di lasciare il posto fisso per
              dedicarmi anima e corpo a MementoLab.
            </p>
            <Link href="/chi-sono" className="btn-primary mt-8">
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
          <p className="mt-5 text-pretty font-sans text-base leading-relaxed text-ink/70">
            Dal capo che indossi già a un pezzo pensato da zero: raccontami la tua
            idea e la trasformo in un&apos;opera da indossare.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/commissioni" className="btn-ink">
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
