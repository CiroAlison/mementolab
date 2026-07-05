"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

export type Step = { n: string; title: string; text: string };

export function ProcessScrolly({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(
      steps.length - 1,
      Math.max(0, Math.floor(v * steps.length)),
    );
    setActive(idx);
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const step = steps[active];

  return (
    <section
      ref={ref}
      style={{ height: `${steps.length * 62}vh` }}
      className="relative bg-paper"
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="wrap grid w-full items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* DIAL: spirale che ruota + anello di avanzamento */}
          <div className="relative mx-auto flex aspect-square w-[62vw] max-w-[360px] items-center justify-center sm:w-[42vh]">
            <svg
              className="absolute inset-0 h-full w-full -rotate-90"
              viewBox="0 0 100 100"
              fill="none"
            >
              <circle cx="50" cy="50" r="47" stroke="#0A2A4C" strokeOpacity="0.1" strokeWidth="1" />
              <motion.circle
                cx="50"
                cy="50"
                r="47"
                stroke="#F1500F"
                strokeWidth="1.5"
                strokeLinecap="round"
                style={{ pathLength: reduce ? 1 : scrollYProgress }}
              />
            </svg>
            <motion.div
              style={reduce ? undefined : { rotate }}
              className="relative h-[64%] w-[64%]"
            >
              <Image src="/brand/spiral.png" alt="" fill className="object-contain" />
            </motion.div>
          </div>

          {/* TESTO: fase attiva (crossfade sovrapposto, senza vuoti) */}
          <div>
            <div className="relative min-h-[280px]">
              <AnimatePresence>
                <motion.div
                  key={active}
                  className="absolute inset-x-0 top-0"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -22 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className="font-display text-6xl leading-none text-transparent sm:text-7xl"
                      style={{ WebkitTextStroke: "2px #F1500F" }}
                    >
                      {step.n}
                    </span>
                    <span className="eyebrow">
                      Fase {active + 1} di {steps.length}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-md text-pretty font-sans text-base leading-relaxed text-ink/70">
                    {step.text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* indicatore fasi */}
            <div className="flex gap-2">
              {steps.map((s, i) => (
                <span
                  key={s.n}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === active ? "w-8 bg-flame" : "w-2 bg-ink/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
