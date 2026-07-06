"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

// Bottone WhatsApp fisso, appare dopo un piccolo scroll.
export function WhatsAppFab() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={`https://wa.me/${site.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Scrivici su WhatsApp"
      className={`group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] py-3 pl-3 pr-3 text-white shadow-lg shadow-ink/20 transition-all duration-300 hover:pr-5 sm:bottom-7 sm:right-7 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg viewBox="0 0 32 32" className="h-6 w-6 fill-current" aria-hidden>
        <path d="M16.004 3C9.383 3 4 8.383 4 15.004c0 2.116.553 4.174 1.605 5.996L4 29l8.2-2.148a11.94 11.94 0 0 0 5.804 1.48h.005C22.62 28.332 28 22.95 28 16.33 28 9.71 22.625 3 16.004 3zm0 21.86h-.004a9.86 9.86 0 0 1-5.024-1.377l-.36-.214-4.867 1.276 1.3-4.744-.235-.374a9.83 9.83 0 0 1-1.51-5.25c0-5.44 4.43-9.868 9.87-9.868 2.636 0 5.114 1.028 6.98 2.894a9.82 9.82 0 0 1 2.89 6.982c0 5.44-4.43 9.868-9.87 9.868zm5.41-7.39c-.297-.15-1.758-.867-2.03-.966-.272-.099-.47-.148-.668.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.76-1.653-2.057-.173-.297-.019-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.496.099-.198.05-.372-.025-.52-.074-.15-.668-1.612-.916-2.207-.241-.579-.486-.5-.668-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.478s1.065 2.875 1.213 3.073c.148.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
      </svg>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover:max-w-[8rem] group-hover:opacity-100">
        Scrivimi
      </span>
    </a>
  );
}
