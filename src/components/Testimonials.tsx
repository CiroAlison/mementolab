import { Reveal } from "./Reveal";
import { SectionSpiral } from "./SectionSpiral";

type Quote = { text: string; author: string; role?: string };

// Recensioni REALI dei clienti, trascritte dagli screenshot che l'artista ha
// pubblicato lei stessa nelle storie in evidenza di Instagram (@mementolab_).
// Usiamo solo il nome di battesimo, non il cognome.
// ⚠️ Non inserire mai testimonianze inventate: oltre a essere poco credibili,
// in Italia e in UE le recensioni false sono una pratica commerciale scorretta.
const quotes: Quote[] = [
  {
    text: "Ho appena ricevuto la giacca. È stupenda e la taglia è perfetta. Gli occhi sono ancora più belli dal vivo. Grazie mille anche per gli acquerelli e la piccola tela, un pensiero carinissimo.",
    author: "Ofelia",
    role: "giubbotto dipinto a mano",
  },
  {
    text: "Non ci posso credere, è troppo bello. Mi rendi soddisfatta e felice, non sai quanto vale per me.",
    author: "Yle",
    role: "commissione custom",
  },
  {
    text: "I received the jacket! It is even more beautiful in person. Thank you so much.",
    author: "Rafaella",
    role: "cliente dall'estero",
  },
  {
    text: "È bellissima davvero, grazie di cuore per tutto.",
    author: "Rosa",
    role: "giubbotto in denim",
  },
  {
    text: "MementoLab trasforma la moda in arte indossabile. Ogni creazione è un pezzo irripetibile, dipinto a mano e pensato per chi vuole raccontare la propria personalità.",
    author: "NEA Connect",
    role: "sul progetto MementoLab",
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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
