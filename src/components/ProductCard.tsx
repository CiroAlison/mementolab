import Image from "next/image";
import { BuyButton } from "./BuyButton";
import { blurFor } from "@/lib/blur";
import { statusLabel, priceLabel, type Product } from "@/lib/shop";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const sold = product.status === "venduto";

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-ink/10 bg-paper-soft/50">
      <div className="relative aspect-[4/5] overflow-hidden bg-ink/5">
        <Image
          src={product.image}
          alt={`${product.title} — ${product.base}`}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          placeholder={blurFor(product.image) ? "blur" : "empty"}
          blurDataURL={blurFor(product.image)}
          priority={priority}
          className={`object-cover transition-transform duration-700 group-hover:scale-[1.04] ${
            sold ? "opacity-70" : ""
          }`}
        />
        <span className="absolute left-3 top-3 rounded-full bg-ink/85 px-3 py-1 font-sans text-[0.65rem] uppercase tracking-wide2 text-paper backdrop-blur">
          {statusLabel[product.status]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl leading-tight text-ink">
          {product.title}
        </h3>
        <p className="mt-0.5 font-sans text-xs uppercase tracking-wide2 text-ink/50">
          {product.base}
        </p>
        <p className="mt-3 flex-1 text-pretty font-sans text-sm leading-relaxed text-ink/70">
          {product.blurb}
        </p>

        <p className="mt-4 font-display text-2xl text-ink">
          {priceLabel(product)}
        </p>

        <BuyButton product={product} className="mt-4" />
      </div>
    </article>
  );
}
