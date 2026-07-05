"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

// Sezione "reveal del nome": scorrendo, il wordmark MEMENTOLAB si svela con un wipe.
// Posizionata dopo i caroselli (non sotto la spirale interattiva).
export function BrandReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "center 0.55"],
  });
  const clip = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const spiralOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section
      ref={ref}
      className="wrap flex flex-col items-center py-24 text-center sm:py-32"
    >
      <motion.div
        style={reduce ? undefined : { opacity: spiralOpacity }}
        className="relative mb-6 h-12 w-12 sm:h-14 sm:w-14"
      >
        <Image src="/brand/spiral.png" alt="" fill className="object-contain" />
      </motion.div>

      <div
        className="relative h-12 w-[min(92vw,760px)] sm:h-20 md:h-24"
        aria-label="MementoLab"
        role="img"
      >
        <motion.div
          style={reduce ? undefined : { clipPath: clip }}
          className="absolute inset-0"
        >
          <Image
            src="/brand/wordmark-full.png"
            alt="MementoLab"
            fill
            className="object-contain"
          />
        </motion.div>
      </div>

      <p className="eyebrow mt-6">L&apos;arte che indossi</p>
    </section>
  );
}
