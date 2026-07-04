"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SpiralMark } from "./SpiralMark";

export function SiteIntro() {
  const [show, setShow] = useState(false);

  // Mostra l'intro una sola volta per sessione (mount-once).
  useEffect(() => {
    if (sessionStorage.getItem("ml_intro_seen")) return;
    setShow(true);
    const t = setTimeout(() => {
      sessionStorage.setItem("ml_intro_seen", "1");
      setShow(false);
    }, 3400);
    return () => clearTimeout(t);
  }, []);

  // Blocca lo scroll mentre l'intro è visibile.
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-flame"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* La spirale si dipinge da sola (stile logo-reveal) */}
          <SpiralMark draw duration={1.9} className="h-36 w-36 sm:h-44 sm:w-44" />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.95, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-8 h-8 w-64 sm:h-10 sm:w-80"
          >
            <Image
              src="/brand/wordmark-full.png"
              alt="MementoLab"
              fill
              priority
              className="object-contain"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.6 }}
            className="mt-5 font-sans text-xs uppercase tracking-wide2 text-ink/70"
          >
            L&apos;arte che indossi
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
