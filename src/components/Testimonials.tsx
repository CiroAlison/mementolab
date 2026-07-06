import { Reveal } from "./Reveal";
import { SectionSpiral } from "./SectionSpiral";

type Quote = { text: string; author: string; role?: string };

// La prima è reale (NEA Connect). Le altre due sono ESEMPI: sostituiscile con
// recensioni reali dei clienti quando le hai.
const quotes: Quote[] = [
  {
    text: "MementoLab trasforma la moda in arte indossabile. Ogni creazione è un pezzo irripetibile, dipinto a mano e pensato per chi vuole raccontare la propria personalità.",
    author: "NEA Connect",
    role: "sul progetto MementoLab",
  },
  {
    text: "Le ho affidato un giubbotto a cui tenevo tantissimo ed è tornato un'opera d'arte. Curata in ogni dettaglio.",
    author: "Un cliente",
    role: "commissione custom",
  },
  {
    text: "Ho regalato un paio di scarpe dipinte a mano: reazione da brividi. Non esiste niente di uguale al mondo.",
    author: "Una cliente",
    role: "regalo personalizzato",
  },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <SectionSpiral className="left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2" opacity={0.04} />
      <div className="wrap relative z-10">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow">Dicono di noi</p>
          <h2 className="mt-2 font-display text-4xl text-ink sm:text-5xl">
            Chi ha scelto un pezzo unico
          </h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal
              key={q.author + i}
              as="article"
              delay={i * 0.08}
              className="flex h-full flex-col rounded-2xl border border-ink/10 bg-white/40 p-6 sm:p-7"
            >
              <span className="font-display text-5xl leading-none text-flame/50" aria-hidden>
                &ldquo;
              </span>
              <blockquote className="mt-2 flex-1 text-pretty font-sans text-sm leading-relaxed text-ink/80">
                {q.text}
              </blockquote>
              <figcaption className="mt-5 border-t border-ink/10 pt-4">
                <p className="font-display text-xl text-ink">{q.author}</p>
                {q.role ? (
                  <p className="font-sans text-xs text-ink/50">{q.role}</p>
                ) : null}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
