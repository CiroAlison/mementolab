import Image from "next/image";

// Filigrana decorativa: spirale che ruota lenta sullo sfondo di una sezione.
// `cream` = versione bianca/crema (per sezioni blu); altrimenti navy (per sezioni arancioni/chiare).
// Il contenitore-sezione deve essere `relative overflow-hidden`.
export function SectionSpiral({
  cream = false,
  reverse = false,
  className = "",
  opacity = 0.06,
}: {
  cream?: boolean;
  reverse?: boolean;
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute z-0 ${className}`}
      style={{ opacity }}
    >
      <Image
        src={cream ? "/brand/spiral-cream.png" : "/brand/spiral.png"}
        alt=""
        fill
        className={`object-contain ${reverse ? "spin-slow-rev" : "spin-slow"}`}
      />
    </div>
  );
}
