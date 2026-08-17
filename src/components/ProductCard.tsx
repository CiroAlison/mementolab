"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BuySheet } from "./BuySheet";
import { blurFor } from "@/lib/blur";
import { statusLabel, priceLabel, type Product } from "@/lib/shop";

// Scheda prodotto "premium": la card si solleva, la foto respira, il pulsante
// compare in overlay sul desktop. Su cellulare il pulsante è sempre visibile
// (il passaggio del dito non esiste) e la griglia sta a 2 colonne.
export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const sold = product.status === "venduto";

  return (
    <>
      <motion.article
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-ink/10 bg-paper-soft/50 sm:rounded-2xl"
        whileHover={reduce || sold ? undefined : { y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      >
        <Link
          href={`/shop/${product.id}`}
          aria-label={`${product.title} — vedi il pezzo`}
          className="relative block aspect-[4/5] w-full overflow-hidden bg-ink/5"
        >
          <motion.div
            className="absolute inset-0"
            whileHover={reduce || sold ? undefined : { scale: 1.07 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={product.image}
              alt={`${product.title} — ${product.base}`}
              fill
              sizes="(max-width: 640px) 46vw, (max-width: 1024px) 31vw, 23vw"
              placeholder={blurFor(product.image) ? "blur" : "empty"}
              blurDataURL={blurFor(product.image)}
              priority={priority}
              className={`object-cover ${sold ? "opacity-60 grayscale" : ""}`}
            />
          </motion.div>

          {/* velo scuro che sale al passaggio (solo desktop) */}
          <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:block" />

          <span className="absolute left-2 top-2 rounded-full bg-ink/85 px-2.5 py-1 font-sans text-[0.6rem] uppercase tracking-wide2 text-paper backdrop-blur sm:left-3 sm:top-3 sm:text-[0.65rem]">
            {statusLabel[product.status]}
          </span>

          {!sold && (
            <span className="pointer-events-none absolute inset-x-3 bottom-3 hidden translate-y-3 rounded-full bg-paper px-4 py-2.5 text-center font-sans text-sm font-medium text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 lg:block">
              Vedi il pezzo
            </span>
          )}
        </Link>

        <div className="flex flex-1 flex-col p-3.5 sm:p-5">
          <h3 className="font-display text-lg leading-tight text-ink sm:text-2xl">
            <Link href={`/shop/${product.id}`} className="hover:text-ink/70">
              {product.title}
            </Link>
          </h3>
          <p className="mt-0.5 font-sans text-[0.6rem] uppercase tracking-wide2 text-ink/50 sm:text-[0.7rem]">
            {product.base}
          </p>
          <p className="mt-2 hidden flex-1 text-pretty font-sans text-sm leading-relaxed text-ink/70 sm:block">
            {product.blurb}
          </p>

          <p className="mt-3 font-display text-lg text-ink sm:text-2xl">
            {priceLabel(product)}
          </p>

          {sold ? (
            <span className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-ink/15 px-4 py-2 font-sans text-xs text-ink/45 sm:text-sm">
              Venduto
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="btn mt-3 w-full bg-gradient-to-tr from-[#FA7E1E] via-[#D62976] to-[#962FBF] px-4 py-2.5 text-xs text-white hover:brightness-105 sm:text-sm"
            >
              Lo voglio
            </button>
          )}
        </div>
      </motion.article>

      <BuySheet product={product} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
