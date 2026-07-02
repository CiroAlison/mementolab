"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function SiteIntro() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    // Mostra l'intro una volta per sessione
    const seen = sessionStorage.getItem("ml_intro_seen");
    if (!seen) {
      setShow(true);
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => {
        sessionStorage.setItem("ml_intro_seen", "1");
        setShow(false);
        document.body.style.overflow = "";
      }, reduce ? 900 : 3000);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
      };
    }
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-flame"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={reduce ? { opacity: 1 } : { scale: 0, rotate: -220, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-32 w-32 sm:h-40 sm:w-40"
          >
            <Image
              src="/brand/spiral.png"
              alt=""
              fill
              priority
              className="object-contain drop-shadow-[0_6px_20px_rgba(10,42,76,0.25)]"
            />
          </motion.div>

          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ delay: 1.5, duration: 0.7 }}
            className="mt-5 font-sans text-xs uppercase tracking-wide2 text-ink/70"
          >
            L&apos;arte che indossi
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
