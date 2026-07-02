// Notifiche email via Resend — opzionale.
// Se RESEND_API_KEY non è configurato, la funzione non fa nulla (no-op)
// e le API continuano a funzionare.

import { site } from "./site";

export async function sendEmail(subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { sent: false, reason: "RESEND_API_KEY mancante" };

  const from = process.env.NOTIFY_FROM || "MementoLab <onboarding@resend.dev>";
  const to = process.env.NOTIFY_TO || site.email;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(key);
    await resend.emails.send({ from, to, subject, html });
    return { sent: true };
  } catch (err) {
    console.error("[notify] invio email fallito:", err);
    return { sent: false, reason: "errore invio" };
  }
}

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
