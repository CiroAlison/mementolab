"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Work } from "@/lib/gallery";
import { categories, type CategorySlug } from "@/lib/site";
import { blurFor } from "@/lib/blur";

type Filter = "tutti" | CategorySlug;

export function Gallery({
  works,
  initial = "tutti",
}: {
  works: Work[];
  initial?: Filter;
}) {
  const [filter, setFilter] = useState<Filter>(initial);
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const filtered = useMemo(
    () => (filter === "tutti" ? works : works.filter((w) => w.category === filter)),
    [filter, works],
  );

  const close = useCallback(() => setActive(null), []);
  const go = useCallback(
    (dir: number) => {
      setActive((i) => {
        if (i === null) return i;
        return (i + dir + filtered.length) % filtered.length;
      });
    },
    [filtered.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, go]);

  const chips: Filter[] = ["tutti", ...categories.map((c) => c.slug)];
  const current = active !== null ? filtered[active] : null;

  return (
    <div>
      {/* Filtri */}
      <div
        role="tablist"
        aria-label="Filtra per categoria"
        className="mb-10 flex flex-wrap gap-2"
      >
        {chips.map((c) => {
          const label =
            c === "tutti"
              ? "Tutti"
              : categories.find((cat) => cat.slug === c)!.label;
          const selected = filter === c;
          return (
            <button
              key={c}
              role="tab"
              aria-selected={selected}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-5 py-2 font-sans text-sm tracking-wide transition-all duration-300 ${
                selected
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/20 text-ink/70 hover:border-ink/50 hover:text-ink"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Griglia */}
      <motion.ul
        layout
        className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((w, i) => (
            <motion.li
              key={w.id}
              layout
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={() => setActive(i)}
                className="group relative block w-full overflow-hidden rounded-lg bg-paper-deep text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flame focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                aria-label={`Apri: ${w.title}`}
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={w.src}
                    alt={`${w.title}${w.reference ? ` — ${w.reference}` : ""}, ${w.base}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    placeholder={blurFor(w.src) ? "blur" : "empty"}
                    blurDataURL={blurFor(w.src)}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-paper opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="font-display text-xl leading-tight">{w.title}</p>
                    <p className="mt-0.5 font-sans text-xs text-paper/80">{w.base}</p>
                  </div>
                </div>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
          >
            <button
              onClick={close}
              aria-label="Chiudi"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full text-paper/80 transition hover:bg-paper/10 hover:text-paper"
            >
              <span className="text-2xl leading-none">×</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Precedente"
              className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-paper/70 transition hover:bg-paper/10 hover:text-paper sm:left-6"
            >
              <span className="text-3xl leading-none">‹</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Successivo"
              className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-paper/70 transition hover:bg-paper/10 hover:text-paper sm:right-6"
            >
              <span className="text-3xl leading-none">›</span>
            </button>

            <motion.div
              key={current.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="grid max-h-full w-full max-w-4xl gap-6 overflow-y-auto md:grid-cols-[1.3fr_1fr] md:items-center"
            >
              <div className="relative mx-auto max-h-[70vh] w-full">
                <Image
                  src={current.src}
                  alt={`${current.title}, ${current.base}`}
                  width={900}
                  height={1200}
                  className="mx-auto max-h-[70vh] w-auto rounded-lg object-contain"
                />
              </div>
              <div className="text-paper">
                <p className="eyebrow text-flame">
                  {categories.find((c) => c.slug === current.category)?.label}
                  {current.reference ? ` · ${current.reference}` : ""}
                </p>
                <h2 className="mt-2 font-display text-4xl text-paper">
                  {current.title}
                </h2>
                <p className="mt-4 text-pretty font-sans text-sm leading-relaxed text-paper/80">
                  {current.story}
                </p>
                <dl className="mt-6 space-y-2 border-t border-paper/15 pt-5 font-sans text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-paper/50">Capo</dt>
                    <dd className="text-right text-paper/90">{current.base}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-paper/50">Tecnica</dt>
                    <dd className="text-right text-paper/90">{current.medium}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-paper/50">Anno</dt>
                    <dd className="text-right text-paper/90">{current.year}</dd>
                  </div>
                </dl>
                <a
                  href={current.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block font-sans text-sm text-flame transition hover:underline"
                >
                  Vedi su Instagram →
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
