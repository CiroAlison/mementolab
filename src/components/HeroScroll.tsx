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
  // Il nome MEMENTOLAB, SOTTO la spirale, si rivela con un wipe mentre si scrolla
  const wordClip = useTransform(
    scrollYProgress,
    [0.12, 0.5],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const wordOpacity = useTransform(scrollYProgress, [0.12, 0.32], [0, 1]);
  const revealOpacity = useTransform(scrollYProgress, [0.45, 0.8], [0, 1]);
  const revealY = useTransform(scrollYProgress, [0.45, 0.8], [24, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section ref={ref} className="relative h-[240vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Sfondo pulito: nessuna filigrana qui dietro la spirale che gira */}

        {/* Spirale protagonista — centrata in alto, mai sotto la barra, più piccola su mobile */}
        <div className="absolute inset-x-0 top-[10%] flex h-[38%] items-center justify-center sm:top-[8%] sm:h-[46%]">
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
              sizes="(max-width: 640px) 55vw, 38vh"
              className="h-full w-auto object-contain"
            />
          </motion.div>
        </div>

        {/* SOTTO la spirale: il nome che si rivela, poi claim + CTA */}
        <div className="absolute inset-x-0 top-[53%] flex flex-col items-center px-6 text-center">
          {/* Wordmark MEMENTOLAB (reveal legato allo scroll) */}
          <motion.div
            style={reduce ? undefined : { clipPath: wordClip, opacity: wordOpacity }}
            className="relative h-11 w-[min(78vw,520px)] sm:h-16"
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
            className="mt-5 flex flex-col items-center"
          >
            <p className="max-w-md text-balance font-display text-xl leading-tight text-ink sm:text-2xl">
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
