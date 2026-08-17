"use client";

import { useState } from "react";
import { BuySheet } from "./BuySheet";
import type { Product } from "@/lib/shop";

// Blocco d'acquisto della pagina del pezzo: taglia (se serve) e pulsante grande.
export function ProductBuy({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<string | undefined>();
  const venduto = product.status === "venduto";


  if (venduto) {
    return (
      <div className="mt-8 rounded-xl border border-ink/15 bg-ink/5 p-5 text-center">
        <p className="font-display text-2xl text-ink">Questo pezzo è stato venduto</p>
        <p className="mt-1 font-sans text-sm text-ink/60">
          Posso dipingerne uno nuovo, diverso e solo tuo.
        </p>
        <a href="/commissioni" className="btn-primary mt-4 inline-flex">
          Richiedi un pezzo simile
        </a>
      </div>
    );
  }

  return (
    <>
      {product.sizes && product.sizes.length > 0 && (
        <div className="mt-7">
          <p className="font-sans text-sm font-medium text-ink">Taglia</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s === size ? undefined : s)}
                className={`min-w-[3rem] rounded-full border px-4 py-2 font-sans text-sm transition ${
                  s === size
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/20 text-ink hover:border-ink/50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn mt-7 w-full bg-gradient-to-tr from-[#FA7E1E] via-[#D62976] to-[#962FBF] py-4 text-base text-white hover:brightness-105"
      >
        Lo voglio
      </button>
      <p className="mt-2 text-center font-sans text-xs text-ink/55">
        Nessun impegno: ci mettiamo d&apos;accordo prima. Di solito rispondo in
        poche ore.
      </p>

      <BuySheet
        product={product}
        size={size}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
