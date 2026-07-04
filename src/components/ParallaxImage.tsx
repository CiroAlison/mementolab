"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { blurFor } from "@/lib/blur";

// Immagine con parallasse leggera allo scroll + blur-up.
// Va inserita in un contenitore posizionato (relative + overflow-hidden).
export function ParallaxImage({
  src,
  alt,
  sizes,
  priority = false,
  className = "object-cover",
  distance = 28,
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [-distance, distance],
  );
  const blur = blurFor(src);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {/* scale > 1 lascia margine per la traslazione senza mostrare bordi */}
      <motion.div style={{ y, scale: 1.18 }} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder={blur ? "blur" : "empty"}
          blurDataURL={blur}
          className={className}
        />
      </motion.div>
    </div>
  );
}
