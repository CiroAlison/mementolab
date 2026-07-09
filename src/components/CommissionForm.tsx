"use client";

import { useRef, useState } from "react";
import { commissionSchema, itemTypeOptions, type CommissionInput } from "@/lib/validation";
import { site } from "@/lib/site";

type Errors = Record<string, string[] | undefined>;
type Status = "idle" | "sending" | "wa" | "email" | "error";

const field =
  "w-full rounded-lg border border-ink/20 bg-white/70 px-4 py-3 font-sans text-sm text-ink placeholder:text-ink/40 transition focus:border-ink focus:outline-none focus:ring-2 focus:ring-flame/40";
const labelCls = "mb-1.5 block font-sans text-sm font-medium text-ink";

const itemLabel = (v: string) =>
  itemTypeOptions.find((o) => o.value === v)?.label ?? v;

function waLink(d: CommissionInput) {
  const msg = [
    "Ciao MementoLab! 🎨 Vorrei richiedere un pezzo custom.",
    "",
    `• Nome: ${d.name}`,
    `• Tipo di capo: ${itemLabel(d.itemType)}`,
    d.budget ? `• Budget: ${d.budget}` : null,
    "",
    `La mia idea: ${d.idea}`,
    "",
    `(email: ${d.email}${d.phone ? ` · tel: ${d.phone}` : ""})`,
  ]
    .filter((l) => l !== null)
    .join("\n");
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
}

export function CommissionForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(): CommissionInput | null {
    setErrors({});
    const fd = new FormData(formRef.current!);
    const parsed = commissionSchema.safeParse(Object.fromEntries(fd.entries()));
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      setStatus("error");
      return null;
    }
    return parsed.data;
  }

  function sendWhatsApp() {
    const d = validate();
    if (!d) return;
    window.open(waLink(d), "_blank", "noopener");
    setStatus("wa");
  }

  async function sendEmail() {
    const d = validate();
    if (!d) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/commissioni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(d),
      });
      if (!res.ok) throw new Error();
      setStatus("email");
      formRef.current?.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "wa" || status === "email") {
    return (
      <div className="rounded-xl border border-ink/15 bg-white/60 p-8 text-center">
        <p className="font-display text-4xl text-ink">Ci siamo! ✦</p>
        <p className="mt-3 text-pretty font-sans text-sm leading-relaxed text-ink/70">
          {status === "wa"
            ? "Ti ho aperto WhatsApp con la richiesta già scritta: premi invio per mandarmela e ti rispondo io."
            : "Ho ricevuto la tua richiesta. Ti rispondo il prima possibile per dare vita al tuo pezzo unico."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={site.instagramDM} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            Scrivimi in DM su Instagram
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        sendWhatsApp();
      }}
      noValidate
      className="space-y-5"
    >
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
          <label htmlFor="name" className={labelCls}>Nome *</label>
          <input id="name" name="name" className={field} placeholder="Il tuo nome" />
          <FieldError e={errors.name} />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>Email *</label>
          <input id="email" name="email" type="email" className={field} placeholder="tua@email.it" />
          <FieldError e={errors.email} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelCls}>Telefono</label>
          <input id="phone" name="phone" className={field} placeholder="Facoltativo" />
          <FieldError e={errors.phone} />
        </div>
        <div>
          <label htmlFor="itemType" className={labelCls}>Tipo di capo *</label>
          <select id="itemType" name="itemType" className={field} defaultValue="">
            <option value="" disabled>Scegli…</option>
            {itemTypeOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <FieldError e={errors.itemType} />
        </div>
      </div>

      <div>
        <label htmlFor="budget" className={labelCls}>Budget indicativo</label>
        <input id="budget" name="budget" className={field} placeholder="Es. 150–250€ (facoltativo)" />
        <FieldError e={errors.budget} />
      </div>

      <div>
        <label htmlFor="idea" className={labelCls}>La tua idea *</label>
        <textarea
          id="idea"
          name="idea"
          rows={5}
          className={field}
          placeholder="Raccontami cosa hai in mente: un'opera, un tema, un ricordo, i colori che ami…"
        />
        <FieldError e={errors.idea} />
      </div>

      <div className="space-y-3 pt-2">
        <button
          type="submit"
          className="btn inline-flex w-full items-center justify-center gap-2 bg-[#25D366] text-white hover:brightness-95 sm:w-auto"
        >
          <svg viewBox="0 0 32 32" className="h-5 w-5 fill-current" aria-hidden>
            <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-2.1A12 12 0 1 0 16 3zm0 21.9a9.9 9.9 0 0 1-5-1.4l-.4-.2-4.9 1.3 1.3-4.7-.2-.4A9.9 9.9 0 1 1 16 24.9zm5.4-7.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1l-.9 1.2c-.2.2-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2c-.1-.3 0-.5.1-.6l.5-.5.3-.5c.1-.2 0-.4 0-.5l-1-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4z" />
          </svg>
          Invia su WhatsApp
        </button>

        <p className="font-sans text-xs text-ink/60">
          Preferisci?{" "}
          <button
            type="button"
            onClick={sendEmail}
            disabled={status === "sending"}
            className="font-medium text-ink underline underline-offset-2 hover:text-ink/70 disabled:opacity-60"
          >
            {status === "sending" ? "Invio…" : "Invia via email"}
          </button>{" "}
          oppure{" "}
          <a
            href={site.instagramDM}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ink underline underline-offset-2 hover:text-ink/70"
          >
            scrivimi in DM su Instagram
          </a>
          .
        </p>
      </div>

      {status === "error" && Object.keys(errors).length === 0 && (
        <p className="font-sans text-sm text-flame-deep">
          Qualcosa è andato storto. Riprova o scrivimi su WhatsApp.
        </p>
      )}
    </form>
  );
}

function FieldError({ e }: { e?: string[] }) {
  if (!e?.length) return null;
  return <p className="mt-1 font-sans text-xs text-flame-deep">{e[0]}</p>;
}
