"use client";

import { useState } from "react";
import { contactSchema } from "@/lib/validation";
import { site } from "@/lib/site";

type Errors = Record<string, string[] | undefined>;
type Status = "idle" | "sending" | "ok" | "error";

const field =
  "w-full rounded-lg border border-ink/20 bg-white/70 px-4 py-3 font-sans text-sm text-ink placeholder:text-ink/40 transition focus:border-ink focus:outline-none focus:ring-2 focus:ring-flame/40";
const labelCls = "mb-1.5 block font-sans text-sm font-medium text-ink";

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contatti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-xl border border-ink/15 bg-white/60 p-8 text-center">
        <p className="font-display text-4xl text-ink">Messaggio inviato ✦</p>
        <p className="mt-3 font-sans text-sm text-ink/70">
          Grazie per avermi scritto. Ti risponderò al più presto.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden
      />
      <div>
        <label htmlFor="c-name" className={labelCls}>
          Nome *
        </label>
        <input id="c-name" name="name" className={field} placeholder="Il tuo nome" />
        <FieldError e={errors.name} />
      </div>
      <div>
        <label htmlFor="c-email" className={labelCls}>
          Email *
        </label>
        <input
          id="c-email"
          name="email"
          type="email"
          className={field}
          placeholder="tua@email.it"
        />
        <FieldError e={errors.email} />
      </div>
      <div>
        <label htmlFor="c-message" className={labelCls}>
          Messaggio *
        </label>
        <textarea
          id="c-message"
          name="message"
          rows={5}
          className={field}
          placeholder="Scrivimi quello che vuoi…"
        />
        <FieldError e={errors.message} />
      </div>
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-ink disabled:opacity-60"
        >
          {status === "sending" ? "Invio…" : "Invia messaggio"}
        </button>
        <span className="font-sans text-xs text-ink/50">
          o su{" "}
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
          Invio non riuscito. Riprova o scrivimi su WhatsApp.
        </p>
      )}
    </form>
  );
}

function FieldError({ e }: { e?: string[] }) {
  if (!e?.length) return null;
  return <p className="mt-1 font-sans text-xs text-flame-deep">{e[0]}</p>;
}
