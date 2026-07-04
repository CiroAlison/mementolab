"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import {
  SPIRAL_CENTERLINE,
  SPIRAL_NAVY,
  SPIRAL_SKY,
  SPIRAL_SPECKLES,
} from "@/lib/spiralPaths";

// Spirale vettoriale del brand (viewBox 200x200). Nitida a qualsiasi dimensione.
// `draw`: la spirale si "dipinge" da sola (stile reel), tramite maschera animata.
export function SpiralMark({
  className = "",
  cream = false,
  draw = false,
  duration = 1.9,
  delay = 0,
}: {
  className?: string;
  cream?: boolean;
  draw?: boolean;
  duration?: number;
  delay?: number;
}) {
  const id = useId().replace(/:/g, "");
  const navy = cream ? "#FBF1E4" : "#0A2A4C";
  const sky = cream ? "#CFE3F0" : "#2E93C8";

  const Fills = (
    <>
      <path d={SPIRAL_NAVY} fill={navy} />
      <path d={SPIRAL_SKY} fill={sky} opacity={0.9} />
    </>
  );
  const Speckles = SPIRAL_SPECKLES.map(([cx, cy, r], i) => (
    <circle key={i} cx={cx} cy={cy} r={r} fill={navy} />
  ));

  if (!draw) {
    return (
      <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden>
        {Fills}
        {Speckles}
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      role="img"
      aria-label="MementoLab"
    >
      <defs>
        <mask id={`m-${id}`}>
          <motion.path
            d={SPIRAL_CENTERLINE}
            stroke="#fff"
            strokeWidth={24}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration, delay, ease: [0.45, 0, 0.2, 1] }}
          />
        </mask>
      </defs>
      <g mask={`url(#m-${id})`}>{Fills}</g>
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay + duration * 0.82, duration: 0.4 }}
        style={{ transformOrigin: "center" }}
      >
        {Speckles}
      </motion.g>
    </svg>
  );
}
