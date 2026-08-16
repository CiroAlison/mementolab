"use client";

import { useState } from "react";
import type { Product } from "@/lib/shop";
import { productMessage } from "@/lib/message";
import { copyText, openTab, waLink } from "@/lib/send";
import { site } from "@/lib/site";

// Bottone d'acquisto di un pezzo. Come per i form, l'apertura della scheda è
// SINCRONA (niente await) altrimenti il browser blocca il popup.
export function BuyButton({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const [sent, setSent] = useState(false);
  const sold = product.status === "venduto";

  function buyInstagram() {
    const msg = productMessage(product);
    copyText(msg);
    openTab(site.instagramDM);
    setSent(true);
    setTimeout(() => setSent(false), 6000);
  }

  if (sold) {
    return (
      <span
        className={`inline-flex w-full items-center justify-center rounded-full border border-ink/15 px-5 py-2.5 font-sans text-sm text-ink/45 ${className}`}
      >
        Venduto
      </span>
    );
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={buyInstagram}
        className="btn inline-flex w-full items-center justify-center gap-2 bg-gradient-to-tr from-[#FA7E1E] via-[#D62976] to-[#962FBF] text-white hover:brightness-105"
      >
        {sent ? "Messaggio copiato ✓" : "Lo voglio"}
      </button>

      <p className="mt-2 text-center font-sans text-xs text-ink/55">
        {sent ? (
          <>Incolla il messaggio nella chat e invialo.</>
        ) : (
          <>
            oppure{" "}
            <button
              type="button"
              onClick={() => openTab(waLink(site.whatsapp, productMessage(product)))}
              className="font-medium text-ink underline underline-offset-2 hover:text-ink/70"
            >
              chiedi su WhatsApp
            </button>
          </>
        )}
      </p>
    </div>
  );
}
