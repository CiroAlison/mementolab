"use client";

import { useEffect, useState } from "react";
import { copyText } from "@/lib/send";
import { site } from "@/lib/site";

export type Channel = "ig" | "wa" | "email";

// Schermata mostrata dopo aver compilato un modulo (commissioni o contatti).
//
// Su WhatsApp ed email il messaggio viaggia dentro il link: è già scritto e la
// schermata serve solo da conferma.
//
// Su Instagram no — Meta non permette di precompilare un DM — quindi il
// messaggio va incollato. Il punto debole non è la copia: è che il cliente
// arriva su Instagram, trova la chat vuota e in quel momento non ha più nessuna
// istruzione davanti. Per questo il percorso Instagram NON esce subito: prima
// mostra qui i tre passi, poi apre l'app. E se il cliente torna indietro senza
// aver inviato, glielo ricordiamo.
export function SentPanel({
  channel,
  message,
  onBack,
}: {
  channel: Channel;
  message: string;
  onBack: () => void;
}) {
  const [copiato, setCopiato] = useState(false);
  const [tornato, setTornato] = useState(false);

  function copia() {
    copyText(message);
    setCopiato(true);
    setTimeout(() => setCopiato(false), 2500);
  }

  // Promemoria al ritorno: pretendiamo di aver visto la pagina sparire davvero
  // (l'utente è uscito verso l'app) e poi tornare. Un semplice cambio di
  // finestra non deve far comparire nulla.
  useEffect(() => {
    if (channel !== "ig") return;
    let uscito = false;
    const alCambio = () => {
      if (document.visibilityState === "hidden") {
        uscito = true;
      } else if (uscito) {
        setTornato(true);
      }
    };
    document.addEventListener("visibilitychange", alCambio);
    return () => document.removeEventListener("visibilitychange", alCambio);
  }, [channel]);

  // ——— INSTAGRAM: istruzioni prima di uscire ———
  if (channel === "ig") {
    return (
      <div className="rounded-xl border border-ink/15 bg-white/60 p-6 text-center sm:p-8">
        {tornato ? (
          <>
            <p className="font-display text-3xl leading-tight text-ink">
              Sei riuscito a inviarlo?
            </p>
            <p className="mx-auto mt-3 max-w-sm text-pretty font-sans text-sm leading-relaxed text-ink/70">
              Se la chat era vuota nessun problema: il messaggio è ancora
              copiato, puoi riprovare.
            </p>
          </>
        ) : (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#1DBF73] text-3xl text-white">
              ✓
            </div>
            <p className="mt-4 font-display text-3xl leading-tight text-ink">
              Messaggio copiato
            </p>

            <div className="mx-auto mt-5 max-w-sm rounded-2xl border border-ink/10 bg-ink/5 p-4 text-left">
              <p className="font-sans text-sm font-semibold text-ink">
                Ora fai così:
              </p>
              <ol className="mt-3 space-y-2.5 font-sans text-sm leading-relaxed text-ink/80">
                <li className="flex gap-2.5">
                  <span className="font-semibold text-ink">1.</span>
                  <span>Tocca il pulsante qui sotto: si apre Instagram.</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-semibold text-ink">2.</span>
                  <span>
                    Nella chat <strong>tieni premuto</strong> sulla barra del
                    messaggio.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-semibold text-ink">3.</span>
                  <span>
                    Tocca <strong>&laquo;Incolla&raquo;</strong> e invia.
                  </span>
                </li>
              </ol>
            </div>
          </>
        )}

        {/* Link VERO: iOS e Android aprono l'app di Instagram solo se l'utente
            tocca un <a> (universal link). Ricopiamo per sicurezza. */}
        <a
          href={site.instagramDM}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => copyText(message)}
          className="btn mx-auto mt-5 flex w-full max-w-sm items-center justify-center gap-2 bg-gradient-to-tr from-[#FA7E1E] via-[#D62976] to-[#962FBF] py-4 text-base text-white hover:brightness-105"
        >
          {tornato ? "Riprova su Instagram" : "Apri Instagram"}
        </a>

        <details className="mx-auto mt-5 max-w-sm text-left">
          <summary className="cursor-pointer font-sans text-xs text-ink/60 hover:text-ink">
            Vedi il messaggio
          </summary>
          <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap rounded-lg border border-ink/10 bg-paper-soft/70 p-3 font-sans text-xs leading-relaxed text-ink/80">
            {message}
          </pre>
        </details>

        <div className="mt-4 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={copia}
            className="font-sans text-xs text-ink/70 underline underline-offset-2 hover:text-ink"
          >
            {copiato ? "Copiato ✓" : "Copia di nuovo"}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="font-sans text-xs text-ink/50 hover:text-ink"
          >
            Torna al modulo
          </button>
        </div>
      </div>
    );
  }

  // ——— WHATSAPP / EMAIL: il messaggio è già scritto, serve solo la conferma ———
  return (
    <div className="rounded-xl border border-ink/15 bg-white/60 p-6 text-center sm:p-8">
      <p className="font-display text-4xl text-ink">Ci siamo! ✦</p>

      <p className="mx-auto mt-3 max-w-md text-pretty font-sans text-sm leading-relaxed text-ink/70">
        {channel === "wa"
          ? "Ti ho aperto WhatsApp con il messaggio già scritto: premi invio per mandarmelo."
          : "Ti ho aperto l'email con il messaggio già pronto: premi invia."}
      </p>

      <pre className="mt-5 max-h-56 overflow-auto whitespace-pre-wrap rounded-lg border border-ink/10 bg-paper-soft/70 p-4 text-left font-sans text-xs leading-relaxed text-ink/80">
        {message}
      </pre>

      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={copia} className="btn-ghost">
          {copiato ? "Copiato ✓" : "Copia messaggio"}
        </button>
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
