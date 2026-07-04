import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ParallaxImage } from "@/components/ParallaxImage";

export const metadata: Metadata = {
  title: "Processo creativo",
  description:
    "Come nasce un pezzo MementoLab: dall'idea al capo finito. Materiali, fasi di lavorazione e tempistiche della custom art dipinta a mano.",
  alternates: { canonical: "/processo" },
};

const steps = [
  {
    n: "01",
    title: "L'idea",
    text: "Partiamo dalla tua ispirazione: un'opera d'arte, un ricordo, un personaggio, un'atmosfera. Ne parliamo insieme finché l'idea non è chiara.",
  },
  {
    n: "02",
    title: "Il capo",
    text: "Scegliamo la tela: puoi affidarmi un capo che già ami — un giubbotto, un jeans, un paio di scarpe — oppure lo fornisco io.",
  },
  {
    n: "03",
    title: "Lo studio",
    text: "Preparo un bozzetto e definisco composizione, colori e proporzioni, per adattare il soggetto alla forma del capo.",
  },
  {
    n: "04",
    title: "La pittura",
    text: "Dipingo a mano con colori acrilici pensati per il tessuto e la pelle. Ogni pennellata è unica: nessun pezzo è mai identico a un altro.",
  },
  {
    n: "05",
    title: "La finitura",
    text: "Fisso il colore perché resista all'uso e ai lavaggi, e curo ogni dettaglio prima della consegna.",
  },
  {
    n: "06",
    title: "La consegna",
    text: "Il tuo pezzo unico è pronto da indossare. Ti accompagno con i consigli giusti per prendertene cura nel tempo.",
  },
];

export default function ProcessoPage() {
  return (
    <div>
      <section className="wrap py-16 sm:py-24">
        <header className="max-w-2xl">
          <p className="eyebrow">Processo creativo</p>
          <h1 className="mt-3 font-display text-5xl text-ink sm:text-7xl">
            Come nasce un pezzo
          </h1>
          <p className="mt-5 text-pretty font-sans text-base leading-relaxed text-ink/70">
            Ogni commissione è un piccolo viaggio a due: dalla prima idea al capo
            finito. Ecco le fasi che seguiamo insieme.
          </p>
        </header>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} as="article" delay={(i % 3) * 0.08}>
              <span className="font-display text-6xl text-ink/20">{s.n}</span>
              <h2 className="-mt-3 font-display text-3xl text-ink">{s.title}</h2>
              <p className="mt-3 text-pretty font-sans text-sm leading-relaxed text-ink/70">
                {s.text}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Materiali & tempi */}
      <section className="bg-paper-soft">
        <div className="wrap grid gap-10 py-20 sm:py-24 md:grid-cols-2 md:items-center md:gap-16">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <ParallaxImage
              src="/gallery/scarpe-04.jpg"
              alt="Dettaglio di una lavorazione a mano MementoLab"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl text-ink sm:text-5xl">
              Materiali &amp; tempi
            </h2>
            <dl className="mt-6 divide-y divide-ink/10 font-sans text-sm">
              {[
                ["Tecnica", "Pittura acrilica a mano su tessuto, denim e pelle"],
                ["Fissaggio", "Trattamento che protegge il colore da uso e lavaggi"],
                ["Basi", "Giubbotti, jeans, scarpe, camicie, tele e accessori"],
                ["Tempi indicativi", "Da 1 a 3 settimane, in base alla complessità"],
                ["Spedizione", "In tutta Italia; su richiesta anche all'estero"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 py-3.5">
                  <dt className="text-ink/50">{k}</dt>
                  <dd className="text-right font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-pretty text-sm leading-relaxed text-ink/60">
              I tempi sono indicativi: ogni pezzo è dipinto a mano e merita la sua
              cura. Ti aggiorno lungo tutte le fasi.
            </p>
            <Link href="/commissioni" className="btn-primary mt-8">
              Richiedi il tuo pezzo
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
