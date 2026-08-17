"use client";

import { useRef, useState } from "react";
import { commissionSchema, itemTypeOptions, type CommissionInput } from "@/lib/validation";
import { commissionMessage, commissionSubject } from "@/lib/message";
import { site } from "@/lib/site";
import { copyText, waLink, mailLink } from "@/lib/send";
import { SentPanel, type Channel } from "./SentPanel";

type Errors = Record<string, string[] | undefined>;

const field =
  "w-full rounded-lg border border-ink/20 bg-white/70 px-4 py-3 font-sans text-sm text-ink placeholder:text-ink/40 transition focus:border-ink focus:outline-none focus:ring-2 focus:ring-flame/40";
const labelCls = "mb-1.5 block font-sans text-sm font-medium text-ink";

export function CommissionForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<Channel | null>(null);
  const [sentMessage, setSentMessage] = useState("");

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

  // Preparano soltanto: ad aprire l'app ci pensa il LINK vero (vedi sotto).
  // Se i dati non sono validi si annulla la navigazione con preventDefault.
  function prepara(
    e: React.MouseEvent<HTMLAnchorElement>,
    canale: Channel,
    href: (msg: string, d: NonNullable<ReturnType<typeof validate>>) => string,
  ) {
    const d = validate();
    if (!d) {
      e.preventDefault();
      return;
    }
    const msg = commissionMessage(d);
    setSentMessage(msg);
    if (canale === "ig") copyText(msg);
    // l'href viene letto DOPO questo handler: qui possiamo ancora aggiornarlo
    e.currentTarget.href = href(msg, d);
    setDone(canale);
  }

  if (done) {
    return (
      <SentPanel
        channel={done}
        message={sentMessage}
        onBack={() => setDone(null)}
      />
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={(e) => e.preventDefault()}
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
        {/* Link VERI: iOS e Android aprono l'app solo se si tocca un <a>. */}
        <a
          href={site.instagramDM}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => prepara(e, "ig", () => site.instagramDM)}
          className="btn inline-flex w-full items-center justify-center gap-2 bg-gradient-to-tr from-[#FA7E1E] via-[#D62976] to-[#962FBF] text-white hover:brightness-105 sm:w-auto"
        >
          <IgIcon />
          Invia su Instagram
        </a>

        <p className="font-sans text-xs text-ink/60">
          Oppure invia lo stesso messaggio su{" "}
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => prepara(e, "wa", (msg) => waLink(site.whatsapp, msg))}
            className="font-medium text-ink underline underline-offset-2 hover:text-ink/70"
          >
            WhatsApp
          </a>{" "}
          o via{" "}
          <a
            href={`mailto:${site.email}`}
            onClick={(e) =>
              prepara(e, "email", (msg, d) =>
                mailLink(site.email, commissionSubject(d), msg),
              )
            }
            className="font-medium text-ink underline underline-offset-2 hover:text-ink/70"
          >
            email
          </a>
          .
        </p>
      </div>
    </form>
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

function FieldError({ e }: { e?: string[] }) {
  if (!e?.length) return null;
  return <p className="mt-1 font-sans text-xs text-flame-deep">{e[0]}</p>;
}
