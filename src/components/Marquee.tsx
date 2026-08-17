"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Carosello auto-scorrevole MA anche trascinabile col dito / mouse.
// Su mobile puoi scorrere e fermarti dove vuoi; l'auto-scroll riprende da fermo.
export function Marquee({
  children,
  reverse = false,
  speed = 45, // secondi per scorrere una "copia" del contenuto
  className = "",
}: {
  children: ReactNode;
  reverse?: boolean;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const half = () => el.scrollWidth / 2 || 1;
    // parti dal centro così si può scorrere in entrambi i sensi
    el.scrollLeft = half() / 2;

    let hover = false;
    let interacting = false;
    let idle: ReturnType<typeof setTimeout> | undefined;
    const markInteract = () => {
      interacting = true;
      if (idle) clearTimeout(idle);
      idle = setTimeout(() => {
        interacting = false;
      }, 1500);
    };

    const onEnter = () => (hover = true);
    const onLeave = () => (hover = false);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("pointerdown", markInteract);
    el.addEventListener("touchstart", markInteract, { passive: true });
    el.addEventListener("wheel", markInteract, { passive: true });
    el.addEventListener("scroll", () => {
      // wrap continuo per il loop infinito
      const h = half();
      if (el.scrollLeft <= 0) el.scrollLeft += h;
      else if (el.scrollLeft >= h * 2) el.scrollLeft -= h;
    });

    let raf = 0;
    let last = 0;
    const dir = reverse ? -1 : 1;
    const step = (now: number) => {
      if (!last) last = now;
      const dt = (now - last) / 1000;
      last = now;
      if (!reduce && !hover && !interacting) {
        const pxPerSec = half() / speed;
        el.scrollLeft += dir * pxPerSec * dt;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      if (idle) clearTimeout(idle);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [reverse, speed]);

  return (
    <div
      ref={ref}
      className={`no-scrollbar flex cursor-grab gap-4 overflow-x-auto overscroll-x-contain active:cursor-grabbing sm:gap-5 ${className}`}
    >
      <div className="flex shrink-0 gap-4 sm:gap-5">{children}</div>
      <div className="flex shrink-0 gap-4 sm:gap-5" aria-hidden>
        {children}
      </div>
    </div>
  );
}
