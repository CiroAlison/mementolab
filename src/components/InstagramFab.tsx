"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

// Bottone Instagram fisso: apre direttamente il DM. Appare dopo un po' di scroll.
export function InstagramFab() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={site.instagramDM}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Scrivimi in DM su Instagram"
      className={`group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-gradient-to-tr from-[#FA7E1E] via-[#D62976] to-[#962FBF] py-3 pl-3 pr-3 text-white shadow-lg shadow-ink/20 transition-all duration-300 hover:pr-5 sm:bottom-7 sm:right-7 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
      </svg>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover:max-w-[8rem] group-hover:opacity-100">
        Scrivimi in DM
      </span>
    </a>
  );
}
