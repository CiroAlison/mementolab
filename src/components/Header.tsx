"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { nav } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Chiudi il menu mobile al cambio pagina + blocca lo scroll quando aperto
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink/10 bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent bg-paper/0"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between sm:h-20">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Principale">
          {nav.slice(1).map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`link-underline font-sans text-sm tracking-wide transition-colors ${
                  active ? "text-flame" : "text-ink/80 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/commissioni" className="btn-primary !px-5 !py-2 text-xs">
            Richiedi un pezzo
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="flex w-6 flex-col items-end gap-[5px]">
            <span
              className={`h-px bg-ink transition-all duration-300 ${
                open ? "w-6 translate-y-[6px] rotate-45" : "w-6"
              }`}
            />
            <span
              className={`h-px bg-ink transition-all duration-300 ${
                open ? "w-0 opacity-0" : "w-4"
              }`}
            />
            <span
              className={`h-px bg-ink transition-all duration-300 ${
                open ? "w-6 -translate-y-[6px] -rotate-45" : "w-5"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 top-0 z-40 flex flex-col bg-paper transition-all duration-300 md:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <nav
          className="wrap mt-24 flex flex-col gap-1"
          aria-label="Menu mobile"
        >
          {nav.map((item, i) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`border-b border-ink/10 py-4 font-display text-3xl transition-colors ${
                  active ? "text-flame" : "text-ink"
                }`}
                style={{
                  transitionDelay: open ? `${80 + i * 40}ms` : "0ms",
                }}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/commissioni"
            className="btn-primary mt-8 self-start"
          >
            Richiedi un pezzo custom
          </Link>
        </nav>
      </div>
    </header>
  );
}
