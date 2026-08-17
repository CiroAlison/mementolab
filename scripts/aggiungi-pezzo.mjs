#!/usr/bin/env node
/**
 * Aggiunge un pezzo allo shop partendo dal link del post Instagram.
 *
 *   npm run pezzo -- <link-instagram> [opzioni]
 *
 * Esempi:
 *   npm run pezzo -- https://www.instagram.com/p/ABC123/ --prezzo 180
 *   npm run pezzo -- https://www.instagram.com/p/ABC123/ --prezzo "180€" \
 *                    --titolo "Notte stellata" --capo "Jeans Levi's" --cat jeans
 *
 * Cosa fa da solo:
 *   1. scarica la foto del post (gallery-dl, con i cookie di Chrome)
 *   2. la salva in public/shop/<id>.jpg
 *   3. ricava titolo e descrizione dalla didascalia (se non li passi tu)
 *   4. indovina la categoria dalla didascalia (se non la passi tu)
 *   5. aggiunge la scheda in src/data/prodotti.json con il link al post
 *
 * Opzioni: --prezzo --titolo --capo --cat --stato --evidenza --id
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const ROOT = path.resolve(import.meta.dirname, "..");
const DATA = path.join(ROOT, "src/data/prodotti.json");
const IMGDIR = path.join(ROOT, "public/shop");
const CATEGORIE = ["giubbotti", "jeans", "scarpe", "altro"];
const STATI = ["disponibile", "su-ordinazione", "venduto"];

// ——— argomenti ———
const argv = process.argv.slice(2);
const url = argv.find((a) => a.startsWith("http"));
const opt = (name) => {
  const i = argv.indexOf(`--${name}`);
  if (i === -1) return undefined;
  // prende tutte le parole fino all'opzione successiva, così funziona anche
  // se le virgolette si perdono per strada (--capo Giubbotto in denim)
  const parole = [];
  for (let j = i + 1; j < argv.length && !argv[j].startsWith("--"); j++) parole.push(argv[j]);
  return parole.length ? parole.join(" ") : undefined;
};
const has = (name) => argv.includes(`--${name}`);

if (!url) {
  console.error(`
Serve il link del post Instagram.

  npm run pezzo -- https://www.instagram.com/p/ABC123/ --prezzo 180

Opzioni:
  --prezzo <numero>   es. 180   (senza = "Prezzo su richiesta")
  --titolo <testo>    altrimenti lo ricavo dalla didascalia
  --capo <testo>      es. "Giubbotto in denim"
  --cat <categoria>   ${CATEGORIE.join(" | ")}   (altrimenti la indovino)
  --stato <stato>     ${STATI.join(" | ")}   (default: su-ordinazione)
  --evidenza          mostra il pezzo anche in home
  --id <slug>         forza l'identificativo
`);
  process.exit(1);
}

const shortcode = url.match(/\/(?:p|reel)\/([A-Za-z0-9_-]+)/)?.[1];
if (!shortcode) {
  console.error("❌ Non riconosco il link. Serve un post tipo https://www.instagram.com/p/ABC123/");
  process.exit(1);
}

// ——— 1. scarico post + didascalia ———
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "pezzo-"));
console.log("⬇️  Scarico il post da Instagram…");
try {
  execFileSync(
    "python3",
    ["-m", "gallery_dl", "--cookies-from-browser", "chrome", "--write-metadata",
     "-D", tmp, "--range", "1", url],
    { stdio: ["ignore", "pipe", "pipe"] },
  );
} catch (e) {
  console.error("❌ Download fallito. Sei loggato su Instagram in Chrome?");
  console.error(String(e.stderr || e.message).split("\n").slice(-4).join("\n"));
  process.exit(1);
}

const files = fs.readdirSync(tmp);
const imgName = files.find((f) => /\.(jpe?g|png|webp)$/i.test(f));
if (!imgName) {
  console.error("❌ Nessuna immagine trovata nel post.");
  process.exit(1);
}
const metaName = files.find((f) => f.endsWith(".json"));
const meta = metaName ? JSON.parse(fs.readFileSync(path.join(tmp, metaName), "utf8")) : {};
const caption = (meta.description || "").replace(/\s+/g, " ").trim();

// ——— 2. dati della scheda ———
const slug = (s) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
   .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);

const prodotti = JSON.parse(fs.readFileSync(DATA, "utf8"));

// titolo: dalla prima frase della didascalia se non passato
const primaFrase = caption.split(/[.!?\n·|—]/)[0].replace(/#\w+/g, "").trim();
const titolo = opt("titolo") || (primaFrase ? primaFrase.slice(0, 48) : "Pezzo unico");

let id = opt("id") || slug(titolo) || shortcode.toLowerCase();
if (prodotti.some((p) => p.id === id)) id = `${id}-${shortcode.slice(0, 5).toLowerCase()}`;

// categoria: indovinata dalla didascalia
const testo = `${caption} ${opt("capo") || ""}`.toLowerCase();
const indovinaCat = () => {
  if (/(giubbott|giacca|jacket|bomber|pelle)/.test(testo)) return "giubbotti";
  if (/(jeans|denim|pantalon|levi)/.test(testo)) return "jeans";
  if (/(scarp|sneaker|air force|af1|nike|adidas|mocassin|stan smith|dsquared)/.test(testo)) return "scarpe";
  return "altro";
};
const cat = opt("cat") || indovinaCat();
if (!CATEGORIE.includes(cat)) {
  console.error(`❌ Categoria "${cat}" non valida. Usa: ${CATEGORIE.join(", ")}`);
  process.exit(1);
}

const stato = opt("stato") || "su-ordinazione";
if (!STATI.includes(stato)) {
  console.error(`❌ Stato "${stato}" non valido. Usa: ${STATI.join(", ")}`);
  process.exit(1);
}

// prezzo: numero in euro (il sito lo formatta da solo)
const prezzoRaw = opt("prezzo");
const prezzo = prezzoRaw ? Number(String(prezzoRaw).replace(/[^\d.,]/g, "").replace(",", ".")) : undefined;
if (prezzoRaw && !Number.isFinite(prezzo)) {
  console.error(`❌ Prezzo "${prezzoRaw}" non valido. Scrivi un numero, es. --prezzo 180`);
  process.exit(1);
}

// descrizione: dalla didascalia, ripulita dagli hashtag
const blurb =
  caption.replace(/#\w+/g, "").replace(/\s+/g, " ").trim().slice(0, 180) ||
  "Pezzo unico dipinto a mano.";

// ——— 3. salvo la foto ———
fs.mkdirSync(IMGDIR, { recursive: true });
const ext = path.extname(imgName).toLowerCase() === ".png" ? ".png" : ".jpg";
const dest = path.join(IMGDIR, `${id}${ext}`);
fs.copyFileSync(path.join(tmp, imgName), dest);
fs.rmSync(tmp, { recursive: true, force: true });

// ——— 4. aggiungo al catalogo ———
const nuovo = {
  id,
  title: titolo,
  base: opt("capo") || "Pezzo unico dipinto a mano",
  category: cat,
  image: `/shop/${id}${ext}`,
  ...(prezzo !== undefined ? { priceEur: prezzo } : {}),
  status: stato,
  blurb,
  instagramPost: `https://www.instagram.com/p/${shortcode}/`,
  ...(has("evidenza") ? { featured: true } : {}),
};
prodotti.push(nuovo);
fs.writeFileSync(DATA, JSON.stringify(prodotti, null, 2) + "\n");

console.log(`
✅ Pezzo aggiunto (${prodotti.length} in catalogo)

   ${nuovo.title}
   capo      ${nuovo.base}
   categoria ${nuovo.category}
   prezzo    ${nuovo.priceEur !== undefined ? nuovo.priceEur + " €" : "Prezzo su richiesta"}
   stato     ${nuovo.status}
   foto      public/shop/${id}${ext}
   in home   ${nuovo.featured ? "sì" : "no"}

Ritocca quello che vuoi in src/data/prodotti.json, poi:
   git add -A && git commit -m "Shop: ${nuovo.title}" && git push
`);
