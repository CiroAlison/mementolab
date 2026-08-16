// Helper per l'invio dei messaggi precompilati.
//
// IMPORTANTE: queste funzioni devono restare SINCRONE e vanno chiamate
// direttamente dentro il click dell'utente. Se si mette un `await` prima di
// `window.open`, il browser perde la "user activation" e BLOCCA la finestra
// come popup (era questo il motivo per cui l'invio su Instagram non funzionava).

/** Copia il testo negli appunti. Ritorna true se sembra riuscita. */
export function copyText(text: string): boolean {
  try {
    if (navigator.clipboard?.writeText) {
      // niente await: così restiamo dentro il gesto dell'utente
      navigator.clipboard.writeText(text).catch(() => legacyCopy(text));
      return true;
    }
  } catch {
    /* si prova il metodo legacy */
  }
  return legacyCopy(text);
}

/** Fallback per Safari/iOS e contesti dove la Clipboard API non è permessa. */
function legacyCopy(text: string): boolean {
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-9999px";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

/** Apre un link in una nuova scheda restando dentro il gesto dell'utente. */
export function openTab(url: string) {
  const w = window.open(url, "_blank", "noopener,noreferrer");
  // se il popup viene bloccato, navighiamo nella stessa scheda
  if (!w) window.location.href = url;
}

export const waLink = (phone: string, text: string) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

export const mailLink = (email: string, subject: string, body: string) =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
