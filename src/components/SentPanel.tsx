"use client";

import { useState } from "react";
import { copyText, openTab } from "@/lib/send";
import { site } from "@/lib/site";

export type Channel = "ig" | "wa" | "email";

// Schermata mostrata dopo l'invio. Mostra SEMPRE il messaggio con un tasto
// "Copia": così, anche se il browser blocca gli appunti o la nuova scheda,
// il cliente può copiare e incollare a mano. Niente vicoli ciechi.
export function SentPanel({
  channel,
  message,
  onBack,
}: {
  channel: Channel;
  message: string;
  onBack: () => void;
}) {
  const [copied, setCopied] = useState(false);

  function copy() {
    copyText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="rounded-xl border border-ink/15 bg-white/60 p-6 text-center sm:p-8">
      <p className="font-display text-4xl text-ink">Ci siamo! ✦</p>

      <p className="mx-auto mt-3 max-w-md text-pretty font-sans text-sm leading-relaxed text-ink/70">
        {channel === "ig" &&
          "Ho copiato il messaggio e aperto la chat di Instagram: incollalo e invialo. Instagram non permette di scriverlo in automatico."}
        {channel === "wa" &&
          "Ti ho aperto WhatsApp con il messaggio già scritto: premi invio per mandarmelo."}
        {channel === "email" &&
          "Ti ho aperto l'email con il messaggio già pronto: premi invia."}
      </p>

      <pre className="mt-5 max-h-56 overflow-auto whitespace-pre-wrap rounded-lg border border-ink/10 bg-paper-soft/70 p-4 text-left font-sans text-xs leading-relaxed text-ink/80">
        {message}
      </pre>

      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={copy} className="btn-ghost">
          {copied ? "Copiato ✓" : "Copia messaggio"}
        </button>

        {channel === "ig" && (
          <button
            type="button"
            onClick={() => openTab(site.instagramDM)}
            className="btn inline-flex items-center justify-center bg-gradient-to-tr from-[#FA7E1E] via-[#D62976] to-[#962FBF] text-white hover:brightness-105"
          >
            Riapri Instagram
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onBack}
        className="mt-5 font-sans text-xs text-ink/60 underline underline-offset-2 hover:text-ink"
      >
        Torna al modulo
      </button>
    </div>
  );
}
