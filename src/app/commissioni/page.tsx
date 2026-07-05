import type { Metadata } from "next";
import Image from "next/image";
import { CommissionForm } from "@/components/CommissionForm";
import { Faq, type FaqItem } from "@/components/Faq";
import { SectionSpiral } from "@/components/SectionSpiral";

const faq: FaqItem[] = [
  {
    q: "Posso far dipingere un capo che ho già?",
    a: "Certo, è la scelta che preferisco: dai nuova vita a un capo a cui tieni. In alternativa posso fornirti io la base (giubbotto, jeans, scarpe).",
  },
  {
    q: "Quanto tempo serve?",
    a: "In genere da 1 a 3 settimane, in base alla complessità del soggetto e alla lista d'attesa del momento. Ti do sempre una stima prima di iniziare.",
  },
  {
    q: "Quanto costa un pezzo custom?",
    a: "Ogni pezzo è un'opera unica: il prezzo dipende dal capo, dal soggetto e dal livello di dettaglio. Raccontami la tua idea e ti mando un preventivo senza impegno.",
  },
  {
    q: "Come si cura un capo dipinto?",
    a: "Il colore viene fissato per resistere all'uso. Consiglio lavaggio a mano o in lavatrice a basse temperature, al rovescio, senza asciugatrice: così il dipinto dura nel tempo.",
  },
  {
    q: "Spedisci in tutta Italia?",
    a: "Sì, spedisco in tutta Italia e, su richiesta, anche all'estero. La spedizione può essere inclusa nel preventivo.",
  },
];

export const metadata: Metadata = {
  title: "Commissioni",
  description:
    "Richiedi un pezzo custom dipinto a mano da MementoLab. Racconta la tua idea: tipo di capo, ispirazione e budget. Ogni commissione è un'opera unica.",
  alternates: { canonical: "/commissioni" },
};

const points = [
  "Puoi partire da un capo tuo o da uno che fornisco io.",
  "Ogni pezzo è dipinto a mano ed è irripetibile.",
  "Ti accompagno in ogni fase, dal bozzetto alla consegna.",
];

export default function CommissioniPage() {
  return (
    <>
    <section className="wrap grid gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="eyebrow">Commissioni</p>
        <h1 className="mt-3 text-balance font-display text-5xl leading-[0.95] text-ink sm:text-6xl">
          Richiedi il tuo pezzo custom
        </h1>
        <p className="mt-5 text-pretty font-sans text-base leading-relaxed text-ink/70">
          Hai un&apos;idea in mente? Raccontamela. Insieme la trasformiamo in
          un&apos;opera da indossare, pensata solo per te.
        </p>
        <ul className="mt-8 space-y-3">
          {points.map((p) => (
            <li
              key={p}
              className="flex items-start gap-3 font-sans text-sm text-ink/80"
            >
              <span className="relative mt-0.5 block h-5 w-5 shrink-0">
                <Image src="/brand/spiral.png" alt="" fill className="object-contain" />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-ink/10 bg-paper-soft/60 p-6 sm:p-8">
        <CommissionForm />
      </div>
    </section>

    <section className="relative overflow-hidden pb-20 sm:pb-28">
      <SectionSpiral reverse className="-right-20 bottom-0 h-72 w-72" />
      <div className="wrap relative z-10 mx-auto max-w-3xl">
        <p className="eyebrow">Domande frequenti</p>
        <h2 className="mb-8 mt-2 font-display text-4xl text-ink sm:text-5xl">
          Come funziona
        </h2>
        <Faq items={faq} />
      </div>
    </section>
    </>
  );
}
