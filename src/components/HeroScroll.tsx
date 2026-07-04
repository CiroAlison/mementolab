"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { SpiralMark } from "./SpiralMark";

export function HeroScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // La spirale ruota e si rimpicciolisce salendo mentre si scrolla
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 0.42]);
  const spiralY = useTransform(scrollYProgress, [0, 1], ["0%", "-38%"]);
  // Il nome si rivela con un wipe da sinistra
  const wordClip = useTransform(
    scrollYProgress,
    [0.12, 0.55],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const wordOpacity = useTransform(scrollYProgress, [0.12, 0.4], [0, 1]);
  const revealOpacity = useTransform(scrollYProgress, [0.55, 0.85], [0, 1]);
  const revealY = useTransform(scrollYProgress, [0.55, 0.85], [30, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section ref={ref} className="relative h-[240vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* spirali di sfondo che ruotano lente */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[20%] top-[8%] h-[55vh] w-[55vh] opacity-[0.10]"
        >
          <Image src="/brand/spiral.svg" alt="" fill className="spin-slow object-contain" />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[18%] bottom-[6%] h-[48vh] w-[48vh] opacity-[0.10]"
        >
          <Image src="/brand/spiral.svg" alt="" fill className="spin-slow-rev object-contain" />
        </div>

        {/* Spirale protagonista (vettoriale, nitida) */}
        <motion.div
          style={reduce ? undefined : { rotate, scale, y: spiralY }}
          className="relative h-[46vh] max-h-[420px] w-[46vh] max-w-[420px] drop-shadow-[0_10px_40px_rgba(10,42,76,0.22)]"
        >
          <SpiralMark className="h-full w-full" />
        </motion.div>

        {/* Wordmark che si rivela */}
        <motion.div
          style={reduce ? undefined : { clipPath: wordClip, opacity: wordOpacity }}
          className="relative mt-6 h-[10vh] max-h-20 w-[min(80vw,640px)]"
        >
          <Image
            src="/brand/wordmark-full.png"
            alt="MementoLab"
            fill
            priority
            className="object-contain"
          />
        </motion.div>

        {/* Tagline + CTA rivelate nella seconda metà */}
        <motion.div
          style={reduce ? undefined : { opacity: revealOpacity, y: revealY }}
          className="mt-7 flex flex-col items-center px-6 text-center"
        >
          <p className="max-w-md text-balance font-display text-2xl leading-tight text-ink sm:text-3xl">
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
          className="absolute bottom-8 flex flex-col items-center gap-2 text-ink/70"
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
