import type { Metadata } from "next";
import Image from "next/image";
import { CommissionForm } from "@/components/CommissionForm";

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
  );
}
