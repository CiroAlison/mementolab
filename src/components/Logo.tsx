import Image from "next/image";
import Link from "next/link";

// Wordmark reale MementoLab (immagine trasparente estratta dal logo ufficiale).
// variant "cream" per sfondi scuri (footer), default navy per sfondo arancione.
export function Logo({
  className = "",
  variant = "ink",
  onNavigate,
}: {
  className?: string;
  variant?: "ink" | "cream";
  onNavigate?: () => void;
}) {
  const src =
    variant === "cream" ? "/brand/wordmark-cream.png" : "/brand/wordmark-full.png";
  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label="MementoLab — home"
      className={`group relative block h-6 w-[168px] sm:h-7 sm:w-[196px] ${className}`}
    >
      <Image src={src} alt="MementoLab" fill priority className="object-contain object-left" />
    </Link>
  );
}
