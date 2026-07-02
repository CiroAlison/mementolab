import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Chi sono",
  description:
    "La storia dietro MementoLab: dalla riscoperta dell'arte nel 2020 alla scelta di farne un mestiere. Custom art dipinta a mano a Napoli.",
  alternates: { canonical: "/chi-sono" },
};

const milestones = [
  {
    year: "2020",
    text: "Nasce il viaggio nella custom art, in un periodo difficile che mi ha fatto riscoprire una passione di sempre.",
  },
  {
    year: "Studio",
    text: "Una laurea in Servizio sociale e un master in Criminologia, senza mai smettere di dipingere.",
  },
  {
    year: "La scelta",
    text: "Il coraggio di lasciare il posto fisso per dedicarmi anima e corpo a MementoLab.",
  },
  {
    year: "Oggi",
    text: "Un nuovo logo, una nuova estetica e la voglia di affrontare ogni pezzo come una sfida.",
  },
];

export default function ChiSonoPage() {
  return (
    <div>
      {/* Intro */}
      <section className="wrap grid gap-10 py-16 sm:py-24 md:grid-cols-2 md:items-center md:gap-16">
        <Reveal className="relative aspect-[4/5] overflow-hidden rounded-lg bg-paper-deep">
          <Image
            src="/gallery/jeans-03.jpg"
            alt="L'artista di MementoLab mentre dipinge una tela nel suo studio"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow">Chi sono</p>
          <h1 className="mt-3 text-balance font-display text-5xl leading-[0.95] text-ink sm:text-6xl">
            L&apos;arte è sempre stata la mia lingua.
          </h1>
          <div className="mt-6 space-y-4 text-pretty font-sans text-base leading-relaxed text-ink/75">
            <p>
              Sono l&apos;artista dietro MementoLab. Ho intrapreso questo viaggio
              nel mondo della custom art nel 2020, in un momento complicato che
              ha messo a dura prova tutti noi. Proprio lì ho ritrovato una
              passione che ho sempre avuto fin da piccola: quella per l&apos;arte
              e la creatività in ogni sua forma.
            </p>
            <p>
              In questi anni ho continuato a lavorare e a studiare — una laurea
              in Servizio sociale, un master in Criminologia — ma con il pensiero
              fisso di realizzare quello che era diventato il mio sogno nel
              cassetto: diventare una brava customizer e fare della mia passione
              il mio primo lavoro.
            </p>
            <p>
              Per questo, qualche tempo fa, ho trovato il coraggio di lasciare un
              lavoro sicuro per dedicarmi anima e corpo a questo progetto. Spero
              che il tempo mi dia ragione.
            </p>
          </div>
          <p className="mt-6 font-display text-2xl italic text-ink">
            — {site.city}, Italia
          </p>
        </Reveal>
      </section>

      {/* Milestones */}
      <section className="bg-ink text-paper">
        <div className="wrap py-20 sm:py-28">
          <Reveal className="mb-12 flex items-center gap-4">
            <span className="relative block h-10 w-10 shrink-0">
              <Image src="/brand/spiral-cream.png" alt="" fill className="object-contain" />
            </span>
            <h2 className="font-display text-4xl text-paper sm:text-5xl">
              Il percorso
            </h2>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-lg border border-paper/15 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m, i) => (
              <Reveal
                key={m.year}
                as="article"
                delay={i * 0.08}
                className="bg-ink p-7 outline outline-1 outline-paper/10"
              >
                <p className="font-display text-3xl text-flame">{m.year}</p>
                <p className="mt-3 text-pretty font-sans text-sm leading-relaxed text-paper/75">
                  {m.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ispirazioni */}
      <section className="wrap py-20 text-center sm:py-28">
        <Reveal className="mx-auto max-w-3xl">
          <p className="eyebrow">Ispirazioni</p>
          <h2 className="mt-3 text-balance font-display text-3xl leading-snug text-ink sm:text-4xl">
            Da Van Gogh a Basquiat, da Klimt alla cultura pop: prendo un
            capolavoro o un&apos;idea e la faccio vivere su un capo, perché
            l&apos;arte non resti appesa a una parete ma si possa indossare.
          </h2>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/portfolio" className="btn-primary">
              Guarda le opere
            </Link>
            <Link href="/processo" className="btn-ghost">
              Come nasce un pezzo
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
