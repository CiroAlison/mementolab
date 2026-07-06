// Consegna delle richieste dei form via email.
// 1) Se RESEND_API_KEY è configurata → invio via Resend (consigliato).
// 2) Altrimenti fallback su FormSubmit (https://formsubmit.co) — SENZA chiavi:
//    invia direttamente all'email del brand. NB: alla PRIMA richiesta FormSubmit
//    manda una mail di attivazione all'indirizzo destinatario: va confermata una volta.
// 3) Se nessuno dei due è disponibile → logga soltanto (i form non si rompono).

import { site } from "./site";

export async function sendEmail(subject: string, html: string) {
  const to = process.env.NOTIFY_TO || site.email;

  // 1) Resend
  const key = process.env.RESEND_API_KEY;
  if (key) {
    try {
      const from =
        process.env.NOTIFY_FROM || "MementoLab <onboarding@resend.dev>";
      const { Resend } = await import("resend");
      const resend = new Resend(key);
      await resend.emails.send({ from, to, subject, html });
      return { sent: true, via: "resend" as const };
    } catch (err) {
      console.error("[notify] Resend fallito, provo FormSubmit:", err);
    }
  }

  // 2) FormSubmit (keyless)
  if (to) {
    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: subject,
            _template: "box",
            Messaggio: htmlToText(html),
          }),
        },
      );
      if (res.ok) return { sent: true, via: "formsubmit" as const };
      console.error("[notify] FormSubmit HTTP", res.status);
    } catch (err) {
      console.error("[notify] FormSubmit fallito:", err);
    }
  }

  return { sent: false, reason: "nessun canale email configurato" };
}

function htmlToText(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();
}

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
