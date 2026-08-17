"use client";

import { useEffect, useState } from "react";
import { BuySheet } from "./BuySheet";
import { priceLabel, type Product } from "@/lib/shop";

// Blocco d'acquisto della pagina del pezzo: taglia (se serve), pulsante grande
// e — su cellulare — una barra fissa in basso col prezzo, così il pulsante è
// sempre a portata di pollice mentre si scorre.
export function ProductBuy({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<string | undefined>();
  const venduto = product.status === "venduto";

  // segnala al sito che in fondo c'è la barra d'acquisto (vedi globals.css)
  useEffect(() => {
    if (venduto) return;
    document.body.classList.add("ha-barra-acquisto");
    return () => document.body.classList.remove("ha-barra-acquisto");
  }, [venduto]);

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

      {/* barra fissa su cellulare */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-paper/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate font-sans text-xs text-ink/55">{product.title}</p>
            <p className="font-display text-xl leading-tight text-ink">
              {priceLabel(product)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="btn shrink-0 bg-gradient-to-tr from-[#FA7E1E] via-[#D62976] to-[#962FBF] px-6 py-3 text-sm text-white hover:brightness-105"
          >
            Lo voglio
          </button>
        </div>
      </div>

      <BuySheet
        product={product}
        size={size}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
