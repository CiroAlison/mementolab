"use client";

import { motion } from "framer-motion";
import { SpiralNode } from "./SpiralNode";

export type Step = { n: string; title: string; text: string };

export function ProcessTimeline({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative mx-auto max-w-4xl">
      {/* linea verticale centrale (solo desktop) */}
      <div className="absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-ink/10 md:block" />

      {steps.map((s, i) => {
        const flip = i % 2 === 1;
        return (
          <li
            key={s.n}
            className="relative flex flex-col gap-2 border-b border-ink/10 py-8 last:border-0 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8 md:border-0"
          >
            {/* NUMERO gigante outline */}
            <motion.div
              initial={{ opacity: 0, x: flip ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`flex items-center ${
                flip ? "md:order-3 md:justify-start" : "md:order-1 md:justify-end"
              }`}
            >
              <span
                className="select-none font-display text-6xl leading-none text-transparent sm:text-7xl md:text-[8.5rem]"
                style={{ WebkitTextStroke: "2px #F1500F" }}
              >
                {s.n}
              </span>
            </motion.div>

            {/* nodo spirale (solo desktop, sulla linea) */}
            <div className="hidden md:order-2 md:block">
              <SpiralNode />
            </div>

            {/* CONTENUTO */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={
                flip ? "md:order-1 md:pr-6 md:text-right" : "md:order-3 md:pl-6"
              }
            >
              <p className="eyebrow mb-1">Fase {s.n}</p>
              <h3 className="font-display text-3xl text-ink sm:text-4xl">
                {s.title}
              </h3>
              <p
                className={`mt-3 max-w-sm text-pretty font-sans text-sm leading-relaxed text-ink/70 ${
                  flip ? "md:ml-auto" : ""
                }`}
              >
                {s.text}
              </p>
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}
