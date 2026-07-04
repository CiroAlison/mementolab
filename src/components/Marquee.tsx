"use client";

import type { ReactNode } from "react";

// Carosello a scorrimento infinito (auto). Si mette in pausa al passaggio del mouse.
// Il contenuto viene duplicato per un loop senza salti.
export function Marquee({
  children,
  reverse = false,
  speed = 45,
  className = "",
}: {
  children: ReactNode;
  reverse?: boolean;
  speed?: number;
  className?: string;
}) {
  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused] sm:gap-5"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 gap-4 sm:gap-5" aria-hidden={false}>
          {children}
        </div>
        <div className="flex shrink-0 gap-4 sm:gap-5" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
