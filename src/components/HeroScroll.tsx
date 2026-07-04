"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export function HeroScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // La spirale ruota e si rimpicciolisce restando SEMPRE al centro e interamente visibile
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.62]);
  // Claim + CTA si rivelano scorrendo (niente wordmark qui)
  const revealOpacity = useTransform(scrollYProgress, [0.15, 0.5], [0, 1]);
  const revealY = useTransform(scrollYProgress, [0.15, 0.5], [26, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section ref={ref} className="relative h-[240vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* spirali di sfondo che ruotano lente */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[22%] top-[6%] h-[46vh] w-[46vh] opacity-[0.09]"
        >
          <Image src="/brand/spiral.png" alt="" fill className="spin-slow object-contain" />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[20%] bottom-[4%] h-[40vh] w-[40vh] opacity-[0.09]"
        >
          <Image src="/brand/spiral.png" alt="" fill className="spin-slow-rev object-contain" />
        </div>

        {/* Spirale protagonista — centrata in alto, mai sotto la barra, più piccola su mobile */}
        <div className="absolute inset-x-0 top-[11%] flex h-[40%] items-center justify-center sm:top-[9%] sm:h-[50%]">
          <motion.div
            style={reduce ? undefined : { rotate, scale }}
            className="relative h-full w-auto"
          >
            <Image
              src="/brand/spiral.png"
              alt="MementoLab"
              width={420}
              height={420}
              priority
              sizes="(max-width: 640px) 58vw, 40vh"
              className="h-full w-auto object-contain"
            />
          </motion.div>
        </div>

        {/* Claim + CTA che si rivelano */}
        <motion.div
          style={reduce ? undefined : { opacity: revealOpacity, y: revealY }}
          className="absolute inset-x-0 top-[58%] flex flex-col items-center px-6 text-center"
        >
          <p className="max-w-md text-balance font-display text-3xl leading-tight text-ink sm:text-4xl">
            Capi unici dipinti a mano. Ogni pezzo è un&apos;opera irripetibile.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/portfolio" className="btn-primary">
              Esplora il portfolio
            </Link>
            <Link href="/commissioni" className="btn-ghost">
              Richiedi un pezzo
            </Link>
          </div>
        </motion.div>

        {/* Hint scroll */}
        <motion.div
          style={reduce ? undefined : { opacity: hintOpacity }}
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-ink/70"
        >
          <span className="font-sans text-[0.7rem] uppercase tracking-wide2">
            Scorri
          </span>
          <span className="h-10 w-px animate-pulse bg-ink/40" />
        </motion.div>
      </div>
    </section>
  );
}
