"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Reveal } from "./Reveal";
import { SectionSpiral } from "./SectionSpiral";
import { site } from "@/lib/site";

type Clip = { src: string; poster: string; title: string; note: string };

const clips: Clip[] = [
  { src: "/video/amore.mp4", poster: "/video/amore.jpg", title: "Pene d'amore", note: "Miniatura dipinta a mano" },
  { src: "/video/goodfeeling.mp4", poster: "/video/goodfeeling.jpg", title: "Good Feeling", note: "Capo custom" },
  { src: "/video/abstract.mp4", poster: "/video/abstract.jpg", title: "Don't cry baby", note: "Volto astratto" },
];

// Riproduce i video solo quando entrano in vista (performance).
function LazyVideo({ clip }: { clip: Clip }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      className="h-full w-full object-cover"
      poster={clip.poster}
      muted
      loop
      playsInline
      preload="none"
    >
      <source src={clip.src} type="video/mp4" />
    </video>
  );
}

export function InMovimento() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <SectionSpiral cream className="-left-24 top-1/2 h-96 w-96 -translate-y-1/2" opacity={0.05} />
      <div className="wrap relative z-10 py-20 sm:py-28">
        <Reveal className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-flame-soft">In movimento</p>
            <h2 className="mt-2 font-display text-4xl text-paper sm:text-5xl">
              Il gesto, dal vivo
            </h2>
            <p className="mt-3 max-w-md text-pretty font-sans text-sm leading-relaxed text-paper/70">
              Ogni pezzo prende vita a mano. Un assaggio del lavoro — il resto è
              su Instagram e TikTok.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <a href={site.tiktok} target="_blank" rel="noopener noreferrer" className="btn-onInk">
              Guarda su TikTok
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
          {clips.map((c, i) => (
            <Reveal
              key={c.src}
              as="article"
              delay={i * 0.08}
              className={i === 2 ? "col-span-2 md:col-span-1" : ""}
            >
              <div className="group relative overflow-hidden rounded-xl ring-1 ring-paper/10">
                <div className="relative aspect-[9/16]">
                  <LazyVideo clip={c} />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-display text-2xl leading-tight text-paper">
                      {c.title}
                    </p>
                    <p className="mt-0.5 font-sans text-xs text-paper/75">{c.note}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Link
          href={site.instagram}
          className="mt-8 inline-block font-sans text-sm text-flame-soft hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Altri video su Instagram →
        </Link>
      </div>
    </section>
  );
}
