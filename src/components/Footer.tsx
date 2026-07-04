import Image from "next/image";
import Link from "next/link";
import { Logo } from "./Logo";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-paper text-ink">
      {/* spirale decorativa che ruota lenta */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 opacity-[0.07] sm:h-96 sm:w-96"
      >
        <Image src="/brand/spiral.png" alt="" fill className="spin-slow object-contain" />
      </div>
      <div className="wrap relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo variant="ink" />
          <p className="mt-5 max-w-xs text-pretty font-sans text-sm leading-relaxed text-ink/70">
            {site.tagline}. Capi unici dipinti a mano, un pezzo alla volta.
          </p>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 font-sans text-sm text-ink/80 transition-colors hover:text-flame"
          >
            <span aria-hidden>◍</span> {site.instagramHandle}
          </a>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow mb-4 text-flame">Naviga</p>
          <ul className="space-y-2.5 font-sans text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-ink/70 transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow mb-4 text-flame">Contatti</p>
          <ul className="space-y-2.5 font-sans text-sm text-ink/70">
            <li>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-ink"
              >
                WhatsApp · 348 592 4413
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-ink"
              >
                {site.email}
              </a>
            </li>
            <li>{site.city}, Italia</li>
            <li className="pt-2">
              <Link href="/commissioni" className="font-medium text-flame hover:underline">
                Richiedi un pezzo custom →
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="wrap relative flex flex-col gap-2 border-t border-ink/15 py-6 font-sans text-xs text-ink/50 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. Tutti i pezzi sono unici.
        </p>
        <p>Dipinto a mano a {site.city}.</p>
      </div>
    </footer>
  );
}
