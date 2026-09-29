#!/usr/bin/env node
/**
 * Controlla che il sito pubblicato risponda — IN MODO SICURO.
 *
 *   npm run verifica                 un solo giro di controlli
 *   npm run verifica -- --attendi    aspetta il deploy: max 10 tentativi, poi si arrende
 *   npm run verifica -- --cerca "testo"   verifica che una frase sia online
 *
 * PERCHÉ ESISTE
 * Un ciclo `until curl ...; do sleep; done` lasciato attivo ha martellato il sito
 * per 16 giorni (~138.000 richieste) facendo scattare la protezione anti-bot di
 * Vercel. Peggio: si autoalimentava, perché quando Vercel iniziava a rispondere
 * con la pagina di sicurezza la condizione d'uscita non si verificava mai.
 *
 * Questo script non può fare quella fine:
 *  - numero massimo di tentativi, sempre (MAX_TENTATIVI)
 *  - pausa lunga fra un tentativo e l'altro (PAUSA_MS)
 *  - riconosce la pagina di sicurezza di Vercel e SI FERMA invece di insistere
 *  - termina sempre con un codice d'uscita, non resta mai appeso
 */

const SITO = process.env.SITO ?? "https://mementolab.it";
const MAX_TENTATIVI = 10;
const PAUSA_MS = 15000;
const TIMEOUT_MS = 20000;

const PAGINE = ["/", "/shop", "/shop/watch-me", "/chi-sono", "/commissioni", "/contatti"];

const argv = process.argv.slice(2);
const attendi = argv.includes("--attendi");
const cerca = (() => {
  const i = argv.indexOf("--cerca");
  return i !== -1 ? argv[i + 1] : undefined;
})();

const pausa = (ms) => new Promise((r) => setTimeout(r, ms));

async function chiedi(percorso) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(SITO + percorso, {
      signal: ctrl.signal,
      redirect: "manual",
      headers: { "User-Agent": "MementoLab-verifica/1.0" },
    });
    const testo = res.status === 200 ? await res.text() : "";
    return { stato: res.status, testo };
  } catch (e) {
    return { stato: 0, testo: "", errore: String(e.name === "AbortError" ? "timeout" : e.message) };
  } finally {
    clearTimeout(t);
  }
}

/** La protezione anti-bot di Vercel: se scatta, fermarsi. Insistere la peggiora. */
const bloccatoDaVercel = (r) =>
  r.stato === 403 || /Vercel Security Checkpoint|verificando il tuo browser/i.test(r.testo);

async function unGiro() {
  const esiti = [];
  for (const p of PAGINE) {
    const r = await chiedi(p);
    esiti.push({ pagina: p, ...r });
    if (bloccatoDaVercel(r)) return { esiti, bloccato: true };
  }
  return { esiti, bloccato: false };
}

function stampa(esiti) {
  for (const e of esiti) {
    const segno = e.stato === 200 ? "✓" : e.stato === 0 ? "✗" : "!";
    console.log(`  ${segno} ${e.pagina.padEnd(18)} ${e.stato || e.errore}`);
  }
}

const tentativi = attendi ? MAX_TENTATIVI : 1;

for (let n = 1; n <= tentativi; n++) {
  if (tentativi > 1) console.log(`\nTentativo ${n} di ${tentativi}`);
  const { esiti, bloccato } = await unGiro();
  stampa(esiti);

  if (bloccato) {
    console.log(`
⛔ Vercel ha attivato la protezione anti-bot su questo indirizzo di rete.
   MI FERMO QUI: insistere la peggiora e la tiene attiva più a lungo.
   Il sito funziona comunque per i visitatori reali — verifica dal browser,
   o dal telefono con i dati mobili (indirizzo diverso).
   Riprova fra qualche ora.`);
    process.exit(2);
  }

  const tutteOk = esiti.every((e) => e.stato === 200);
  const frasePresente = !cerca || esiti.some((e) => e.testo.includes(cerca));

  if (tutteOk && frasePresente) {
    console.log(cerca ? `\n✓ Tutto online e «${cerca}» è pubblicato.` : "\n✓ Tutto online.");
    process.exit(0);
  }

  if (cerca && tutteOk && !frasePresente) {
    console.log(`  · «${cerca}» non ancora online (deploy in corso?)`);
  }

  if (n < tentativi) await pausa(PAUSA_MS);
}

console.log(`
✗ Non tutto risulta a posto dopo ${tentativi} tentativo/i. MI FERMO.
  Non riavviare questo comando in un ciclo: controlla dal browser.`);
process.exit(1);
