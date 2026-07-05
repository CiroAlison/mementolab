"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export type Step = { n: string; title: string; text: string };

export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.6", "end 0.75"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative mx-auto max-w-2xl pl-2">
      {/* linea base */}
      <div className="absolute left-[15px] top-3 h-[calc(100%-1.5rem)] w-px bg-ink/15" />
      {/* linea di avanzamento che si riempie scorrendo */}
      <motion.div
        style={reduce ? { scaleY: 1 } : { scaleY: lineScale }}
        className="absolute left-[15px] top-3 h-[calc(100%-1.5rem)] w-px origin-top bg-flame"
      />

      <ol className="space-y-8">
        {steps.map((s) => (
          <motion.li
            key={s.n}
            initial={reduce ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative pl-12 sm:pl-16"
          >
            {/* pallino con numero */}
            <span className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-flame font-display text-sm font-medium text-paper shadow-sm">
              {s.n}
            </span>
            <div className="group relative overflow-hidden rounded-xl border border-ink/10 bg-white/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-white/70 sm:p-6">
              {/* numero fantasma decorativo */}
              <span className="pointer-events-none absolute -right-2 -top-6 font-display text-8xl text-ink/[0.05] transition-transform duration-500 group-hover:scale-110">
                {s.n}
              </span>
              <h3 className="relative font-display text-2xl text-ink">{s.title}</h3>
              <p className="relative mt-2 text-pretty font-sans text-sm leading-relaxed text-ink/70">
                {s.text}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
