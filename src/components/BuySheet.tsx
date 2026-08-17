"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/shop";
import { priceLabel } from "@/lib/shop";
import { productMessage } from "@/lib/message";
import { copyText, openTab, waLink } from "@/lib/send";
import { site } from "@/lib/site";

// Pannello d'acquisto. Su cellulare sale dal basso (bottom sheet), su desktop
// è una finestra centrata.
//
// Perché due canali: WhatsApp accetta il testo nel link, quindi il messaggio
// arriva GIÀ SCRITTO. Instagram no: Meta non permette di precompilare un DM
// (vedi docs/SHOP.md), quindi lì il messaggio va copiato e incollato — per
// questo lo copiamo automaticamente e lo mostriamo bello grande.
export function BuySheet({
  product,
  open,
  onClose,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const msg = productMessage(product);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  function goWhatsApp() {
    openTab(waLink(site.whatsapp, msg));
    onClose();
  }

  function goInstagram() {
    copyText(msg);
    setCopied(true);
    openTab(site.instagramDM);
  }

  function justCopy() {
    copyText(msg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Acquista ${product.title}`}
            className="relative max-h-[92svh] w-full overflow-y-auto rounded-t-3xl bg-paper p-5 sm:max-w-md sm:rounded-3xl sm:p-7"
            initial={{ y: "100%", opacity: 0.6, scale: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.6 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* maniglia mobile */}
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-ink/20 sm:hidden" />

            <div className="flex items-center gap-4">
              <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-ink/10">
                <Image
                  src={product.image}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="font-display text-2xl leading-tight text-ink">
                  {product.title}
                </p>
                <p className="mt-0.5 font-sans text-xs uppercase tracking-wide2 text-ink/50">
                  {product.base}
                </p>
                <p className="mt-1 font-display text-xl text-ink">
                  {priceLabel(product)}
                </p>
              </div>
            </div>

            <p className="mt-5 font-sans text-sm text-ink/70">
              Messaggio pronto da inviare:
            </p>
            <pre className="mt-2 max-h-32 overflow-y-auto whitespace-pre-wrap rounded-xl bg-ink/5 p-3 font-sans text-xs leading-relaxed text-ink/80">
              {msg}
            </pre>

            <div className="mt-5 space-y-2.5">
              <button
                type="button"
                onClick={goWhatsApp}
                className="btn flex w-full items-center justify-center gap-2 bg-[#25D366] text-white hover:brightness-105"
              >
                <WaIcon />
                Invia su WhatsApp
              </button>
              <p className="text-center font-sans text-[0.7rem] text-ink/50">
                Il messaggio è già scritto: premi solo invio.
              </p>

              <button
                type="button"
                onClick={goInstagram}
                className="btn mt-3 flex w-full items-center justify-center gap-2 bg-gradient-to-tr from-[#FA7E1E] via-[#D62976] to-[#962FBF] text-white hover:brightness-105"
              >
                <IgIcon />
                {copied ? "Copiato ✓ — apri e incolla" : "Invia su Instagram"}
              </button>
              <p className="text-center font-sans text-[0.7rem] text-ink/50">
                Instagram non permette di scrivere il messaggio in automatico:
                lo copio io, tu incollalo nella chat.
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3 border-t border-ink/10 pt-4">
              <button
                type="button"
                onClick={justCopy}
                className="font-sans text-xs text-ink/70 underline underline-offset-2 hover:text-ink"
              >
                {copied ? "Copiato ✓" : "Copia messaggio"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="font-sans text-xs text-ink/50 hover:text-ink"
              >
                Chiudi
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.34 4.95L2 22l5.23-1.37a9.9 9.9 0 0 0 4.81 1.23h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.9 9.9 0 0 0 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.1.81.83-3.02-.2-.31a8.24 8.24 0 0 1-1.26-4.21c0-4.55 3.7-8.25 8.25-8.25 2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.84c0 4.55-3.7 8.25-8.26 8.25Zm4.53-6.18c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.84-.85 2.04s.87 2.37 1 2.53c.12.17 1.72 2.62 4.16 3.68.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}

function IgIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
