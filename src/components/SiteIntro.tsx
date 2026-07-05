"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  animate,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";

export function SiteIntro() {
  const [show, setShow] = useState(false);
  const deg = useMotionValue(0);
  // La spirale reale si "dipinge" con una spazzata circolare
  const mask = useMotionTemplate`conic-gradient(from -95deg, #000 ${deg}deg, rgba(0,0,0,0) ${deg}deg)`;

  useEffect(() => {
    if (sessionStorage.getItem("ml_intro_seen")) return;
    setShow(true);
    const ctrl = animate(deg, 360, { duration: 1.6, ease: [0.42, 0, 0.2, 1] });
    const t = setTimeout(() => {
      sessionStorage.setItem("ml_intro_seen", "1");
      setShow(false);
    }, 4000);
    return () => {
      ctrl.stop();
      clearTimeout(t);
    };
  }, [deg]);

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
          <motion.div
            className="relative h-32 w-32 sm:h-44 sm:w-44"
            initial={{ scale: 0.82, rotate: -18 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            style={{ WebkitMaskImage: mask, maskImage: mask }}
          >
            <Image
              src="/brand/spiral.png"
              alt=""
              fill
              priority
              className="object-contain"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-8 h-9 w-72 sm:h-10 sm:w-80"
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
            transition={{ delay: 1.85, duration: 0.6 }}
            className="mt-5 font-sans text-xs uppercase tracking-wide2 text-ink/70"
          >
            L&apos;arte che indossi
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
