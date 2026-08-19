import Image from "next/image";
import { Reveal } from "./Reveal";
import { SectionSpiral } from "./SectionSpiral";

// Recensioni REALI dei clienti: sono gli screenshot delle chat che l'artista ha
// pubblicato lei stessa nelle storie in evidenza di Instagram (@mementolab_).
//
// ⚠️ PRIVACY: gli screenshot sono ritagliati sui SOLI fumetti dei messaggi —
// niente intestazione della chat, niente foto profilo, niente cognomi. Si usa
// il solo nome di battesimo. Se un domani se ne aggiungono altri, ritagliarli
// allo stesso modo.
//
// ⚠️ Non inserire MAI testimonianze inventate: oltre a essere poco credibili,
// in Italia e in UE le recensioni false sono una pratica commerciale scorretta.
type Recensione = {
  src: string;
  w: number;
  h: number;
  author: string;
  role: string;
};

const recensioni: Recensione[] = [
  {
    src: "/recensioni/ofelia.jpg",
    w: 900,
    h: 553,
    author: "Ofelia",
    role: "giubbotto dipinto a mano",
  },
  {
    src: "/recensioni/yle.jpg",
    w: 900,
    h: 593,
    author: "Yle",
    role: "commissione custom",
  },
  {
    src: "/recensioni/rafaella.jpg",
    w: 900,
    h: 459,
    author: "Rafaella",
    role: "cliente dall'estero",
  },
  {
    src: "/recensioni/rosa.jpg",
    w: 900,
    h: 277,
    author: "Rosa",
    role: "giubbotto in denim",
  },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <SectionSpiral
        className="left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2"
        opacity={0.04}
      />
      <div className="wrap relative z-10">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow">Dicono di noi</p>
          <h2 className="mt-2 font-display text-4xl text-ink sm:text-5xl">
            Le parole di chi l&apos;ha ricevuto
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty font-sans text-sm leading-relaxed text-ink/70">
            Messaggi veri, arrivati dopo la consegna. Nessuno di questi è stato
            scritto per il sito.
          </p>
        </Reveal>

        {/* impaginazione a colonne: ogni screenshot mantiene la sua altezza */}
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {recensioni.map((r, i) => (
            <Reveal
              key={r.author}
              as="article"
              delay={i * 0.07}
              className="break-inside-avoid overflow-hidden rounded-2xl border border-ink/10 bg-white/70 shadow-sm"
            >
              <Image
                src={r.src}
                alt={`Messaggio di ${r.author} dopo aver ricevuto il pezzo`}
                width={r.w}
                height={r.h}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
                className="w-full"
              />
              <div className="flex items-baseline justify-between gap-3 px-4 py-3">
                <p className="font-display text-xl text-ink">{r.author}</p>
                <p className="font-sans text-[0.7rem] uppercase tracking-wide2 text-ink/45">
                  {r.role}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* citazione istituzionale */}
        <Reveal delay={0.1} className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-balance font-display text-2xl leading-snug text-ink sm:text-3xl">
            «MementoLab trasforma la moda in arte indossabile. Ogni creazione è un
            pezzo irripetibile.»
          </p>
          <p className="mt-3 font-sans text-xs uppercase tracking-wide2 text-ink/50">
            NEA Connect
          </p>
        </Reveal>
      </div>
    </section>
  );
}
