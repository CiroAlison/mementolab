// Crea/aggiorna le tabelle sul database SOLO se DATABASE_URL è configurato.
// Viene eseguito durante il build (anche su Vercel), così appena colleghi Neon
// le tabelle vengono create automaticamente. Se non c'è il DB, salta e basta.
import { execSync } from "node:child_process";

if (!process.env.DATABASE_URL) {
  console.log("[db-push] DATABASE_URL non configurato — salto la creazione tabelle.");
  process.exit(0);
}

try {
  console.log("[db-push] Sincronizzo lo schema sul database…");
  execSync("prisma db push --skip-generate --accept-data-loss", {
    stdio: "inherit",
  });
  console.log("[db-push] Tabelle pronte.");
} catch (err) {
  // Non bloccare il build se il push fallisce (es. DB non raggiungibile).
  console.error("[db-push] Push fallito (il sito resta online):", err?.message);
}
