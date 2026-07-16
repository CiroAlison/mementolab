"use client";

import { useRef, useState } from "react";
import { commissionSchema, itemTypeOptions, type CommissionInput } from "@/lib/validation";
import { commissionMessage, commissionSubject } from "@/lib/message";
import { site } from "@/lib/site";

type Errors = Record<string, string[] | undefined>;
type Done = null | "wa" | "email" | "ig";

const field =
  "w-full rounded-lg border border-ink/20 bg-white/70 px-4 py-3 font-sans text-sm text-ink placeholder:text-ink/40 transition focus:border-ink focus:outline-none focus:ring-2 focus:ring-flame/40";
const labelCls = "mb-1.5 block font-sans text-sm font-medium text-ink";

export function CommissionForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<Done>(null);

  function validate(): CommissionInput | null {
    setErrors({});
    const fd = new FormData(formRef.current!);
    const parsed = commissionSchema.safeParse(Object.fromEntries(fd.entries()));
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      return null;
    }
    return parsed.data;
  }

  function sendWhatsApp() {
    const d = validate();
    if (!d) return;
    window.open(
      `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(commissionMessage(d))}`,
      "_blank",
      "noopener",
    );
    setDone("wa");
  }

  function sendEmail() {
    const d = validate();
    if (!d) return;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      commissionSubject(d),
    )}&body=${encodeURIComponent(commissionMessage(d))}`;
    setDone("email");
  }

  async function sendInstagram() {
    const d = validate();
    if (!d) return;
    try {
      await navigator.clipboard.writeText(commissionMessage(d));
    } catch {
      /* se la copia non è permessa, apriamo comunque il DM */
    }
    window.open(site.instagramDM, "_blank", "noopener");
    setDone("ig");
  }

  if (done) {
    return (
      <div className="rounded-xl border border-ink/15 bg-white/60 p-8 text-center">
        <p className="font-display text-4xl text-ink">Ci siamo! ✦</p>
        <p className="mt-3 text-pretty font-sans text-sm leading-relaxed text-ink/70">
          {done === "wa" &&
            "Ti ho aperto WhatsApp con la richiesta già scritta: premi invio per mandarmela."}
          {done === "email" &&
            "Ti ho aperto l'email con il messaggio già pronto: premi invia."}
          {done === "ig" &&
            "Ho copiato la richiesta negli appunti e aperto il DM su Instagram: incollala (⌘/Ctrl + V) e invia."}
        </p>
        <button
          type="button"
          onClick={() => setDone(null)}
          className="btn-ghost mt-6"
        >
          Torna al modulo
        </button>
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
          <WaIcon />
          Invia su WhatsApp
        </button>

        <p className="font-sans text-xs text-ink/60">
          Oppure invia lo stesso messaggio via{" "}
          <button
            type="button"
            onClick={sendEmail}
            className="font-medium text-ink underline underline-offset-2 hover:text-ink/70"
          >
            email
          </button>{" "}
          o{" "}
          <button
            type="button"
            onClick={sendInstagram}
            className="font-medium text-ink underline underline-offset-2 hover:text-ink/70"
          >
            DM su Instagram
          </button>
          .
        </p>
      </div>
    </form>
  );
}

function WaIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-2.1A12 12 0 1 0 16 3zm0 21.9a9.9 9.9 0 0 1-5-1.4l-.4-.2-4.9 1.3 1.3-4.7-.2-.4A9.9 9.9 0 1 1 16 24.9zm5.4-7.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1l-.9 1.2c-.2.2-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2c-.1-.3 0-.5.1-.6l.5-.5.3-.5c.1-.2 0-.4 0-.5l-1-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4z" />
    </svg>
  );
}

function FieldError({ e }: { e?: string[] }) {
  if (!e?.length) return null;
  return <p className="mt-1 font-sans text-xs text-flame-deep">{e[0]}</p>;
}
