"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-ink/10 bg-flame/90 backdrop-blur-md"
            : "border-b border-transparent bg-flame/0"
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
                    active
                      ? "font-semibold text-ink after:w-full"
                      : "text-ink/75 hover:text-ink"
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
            onClick={() => setOpen(true)}
            aria-label="Apri menu"
            className="flex h-10 w-10 items-center justify-center md:hidden"
          >
            <div className="flex w-6 flex-col items-end gap-[5px]">
              <span className="h-px w-6 bg-ink" />
              <span className="h-px w-4 bg-ink" />
              <span className="h-px w-5 bg-ink" />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile menu — overlay a schermo intero, navy, distinto dalla pagina */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-ink text-paper md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="wrap flex h-16 items-center justify-between">
              <Logo variant="cream" onNavigate={() => setOpen(false)} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Chiudi menu"
                className="flex h-10 w-10 items-center justify-center text-paper"
              >
                <span className="text-3xl leading-none">×</span>
              </button>
            </div>

            <nav
              className="wrap mt-6 flex flex-1 flex-col"
              aria-label="Menu mobile"
            >
              {nav.map((item, i) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`block border-b border-paper/15 py-4 font-display text-3xl ${
                        active ? "italic text-flame-soft" : "text-paper"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
              <Link
                href="/commissioni"
                onClick={() => setOpen(false)}
                className="btn-onInk mt-8 self-start"
              >
                Richiedi un pezzo custom
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
