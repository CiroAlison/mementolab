"use client";

import { useState } from "react";
import { commissionSchema, itemTypeOptions } from "@/lib/validation";
import { site } from "@/lib/site";

type Errors = Record<string, string[] | undefined>;
type Status = "idle" | "sending" | "ok" | "error";

const field =
  "w-full rounded-lg border border-ink/20 bg-white/70 px-4 py-3 font-sans text-sm text-ink placeholder:text-ink/40 transition focus:border-ink focus:outline-none focus:ring-2 focus:ring-flame/40";
const labelCls = "mb-1.5 block font-sans text-sm font-medium text-ink";

export function CommissionForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    const parsed = commissionSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/commissioni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("bad response");
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-xl border border-ink/15 bg-white/60 p-8 text-center">
        <p className="font-display text-4xl text-ink">Grazie! ✦</p>
        <p className="mt-3 text-pretty font-sans text-sm leading-relaxed text-ink/70">
          Ho ricevuto la tua richiesta. Ti risponderò il prima possibile per
          dare vita insieme al tuo pezzo unico.
        </p>
        <a
          href={`https://wa.me/${site.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-6"
        >
          Scrivimi anche su WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Nome *
          </label>
          <input id="name" name="name" className={field} placeholder="Il tuo nome" />
          <FieldError e={errors.name} />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={field}
            placeholder="tua@email.it"
          />
          <FieldError e={errors.email} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelCls}>
            Telefono
          </label>
          <input id="phone" name="phone" className={field} placeholder="Facoltativo" />
          <FieldError e={errors.phone} />
        </div>
        <div>
          <label htmlFor="itemType" className={labelCls}>
            Tipo di capo *
          </label>
          <select id="itemType" name="itemType" className={field} defaultValue="">
            <option value="" disabled>
              Scegli…
            </option>
            {itemTypeOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <FieldError e={errors.itemType} />
        </div>
      </div>

      <div>
        <label htmlFor="budget" className={labelCls}>
          Budget indicativo
        </label>
        <input
          id="budget"
          name="budget"
          className={field}
          placeholder="Es. 150–250€ (facoltativo)"
        />
        <FieldError e={errors.budget} />
      </div>

      <div>
        <label htmlFor="idea" className={labelCls}>
          La tua idea *
        </label>
        <textarea
          id="idea"
          name="idea"
          rows={5}
          className={field}
          placeholder="Raccontami cosa hai in mente: un'opera, un tema, un ricordo, i colori che ami…"
        />
        <FieldError e={errors.idea} />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-primary disabled:opacity-60"
        >
          {status === "sending" ? "Invio in corso…" : "Invia la richiesta"}
        </button>
        <span className="font-sans text-xs text-ink/50">
          Oppure scrivimi su{" "}
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-flame hover:underline"
          >
            WhatsApp
          </a>
        </span>
      </div>

      {status === "error" && Object.keys(errors).length === 0 && (
        <p className="font-sans text-sm text-flame-deep">
          Qualcosa è andato storto nell&apos;invio. Riprova o scrivimi su WhatsApp.
        </p>
      )}
    </form>
  );
}

function FieldError({ e }: { e?: string[] }) {
  if (!e?.length) return null;
  return <p className="mt-1 font-sans text-xs text-flame-deep">{e[0]}</p>;
}
