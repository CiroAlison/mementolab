"use client";

import { motion } from "framer-motion";

// Transizione morbida tra le pagine. Solo opacità (nessuna trasformazione,
// così non rompe le sezioni `position: sticky` dell'hero e del processo).
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
