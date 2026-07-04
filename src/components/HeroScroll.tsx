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
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  // Il nome si rivela con un wipe da sinistra
  const wordClip = useTransform(
    scrollYProgress,
    [0.12, 0.55],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const wordOpacity = useTransform(scrollYProgress, [0.12, 0.4], [0, 1]);
  const revealOpacity = useTransform(scrollYProgress, [0.5, 0.82], [0, 1]);
  const revealY = useTransform(scrollYProgress, [0.5, 0.82], [28, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section ref={ref} className="relative h-[240vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* spirali di sfondo che ruotano lente */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[20%] top-[6%] h-[50vh] w-[50vh] opacity-[0.10]"
        >
          <Image src="/brand/spiral.png" alt="" fill className="spin-slow object-contain" />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[18%] bottom-[4%] h-[44vh] w-[44vh] opacity-[0.10]"
        >
          <Image src="/brand/spiral.png" alt="" fill className="spin-slow-rev object-contain" />
        </div>

        {/* Spirale protagonista — centrata nella parte alta, mai sotto la barra */}
        <div className="absolute inset-x-0 top-[9%] flex h-[52%] items-center justify-center">
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
              sizes="(max-width: 640px) 62vw, 40vh"
              className="h-full w-auto object-contain drop-shadow-[0_10px_40px_rgba(10,42,76,0.18)]"
            />
          </motion.div>
        </div>

        {/* Blocco che si rivela: nome + claim + CTA */}
        <div className="absolute inset-x-0 top-[58%] flex flex-col items-center px-6 text-center">
          <motion.div
            style={reduce ? undefined : { clipPath: wordClip, opacity: wordOpacity }}
            className="relative h-14 w-[min(82vw,560px)] sm:h-16"
          >
            <Image
              src="/brand/wordmark-full.png"
              alt="MementoLab"
              fill
              priority
              className="object-contain"
            />
          </motion.div>

          <motion.div
            style={reduce ? undefined : { opacity: revealOpacity, y: revealY }}
            className="mt-6 flex flex-col items-center"
          >
            <p className="max-w-md text-balance font-display text-2xl leading-tight text-ink sm:text-3xl">
              Capi unici dipinti a mano. Ogni pezzo è un&apos;opera irripetibile.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/portfolio" className="btn-primary">
                Esplora il portfolio
              </Link>
              <Link href="/commissioni" className="btn-ghost">
                Richiedi un pezzo
              </Link>
            </div>
          </motion.div>
        </div>

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
