import Link from "next/link";
import { SpiralMark } from "./SpiralMark";

// Wordmark MEMENT·O·LAB — la "O" è la spirale dipinta.
export function Logo({
  className = "",
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label="MementoLab — home"
      className={`group inline-flex items-center font-display uppercase leading-none tracking-brand ${className}`}
    >
      <span className="text-[1.65rem] sm:text-[1.9rem]">Mement</span>
      <SpiralMark
        className="mx-[0.02em] h-[1.15em] w-[1.15em] shrink-0 transition-transform duration-700 group-hover:rotate-45"
        title="O"
      />
      <span className="text-[1.65rem] sm:text-[1.9rem]">Lab</span>
    </Link>
  );
}
