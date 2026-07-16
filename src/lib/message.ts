// Costruisce lo STESSO messaggio precompilato per tutti i canali
// (WhatsApp, DM Instagram, email). Con qualche emoji per renderlo più caldo.
import type { CommissionInput, ContactInput } from "./validation";
import { itemTypeOptions } from "./validation";

const itemLabel = (v: string) =>
  itemTypeOptions.find((o) => o.value === v)?.label ?? v;

export function commissionMessage(d: CommissionInput) {
  return [
    "🎨 Richiesta pezzo custom — MementoLab",
    "",
    `👋 Nome: ${d.name}`,
    `🧥 Capo: ${itemLabel(d.itemType)}`,
    d.budget ? `💰 Budget: ${d.budget}` : null,
    "",
    `💡 La mia idea: ${d.idea}`,
    "",
    `✉️ Email: ${d.email}`,
    d.phone ? `📞 Telefono: ${d.phone}` : null,
  ]
    .filter((l) => l !== null)
    .join("\n");
}

export function commissionSubject(d: CommissionInput) {
  return `Richiesta pezzo custom — ${d.name}`;
}

export function contactMessage(d: ContactInput) {
  return [
    "👋 Ciao MementoLab!",
    "",
    `Sono ${d.name}.`,
    "",
    `💬 ${d.message}`,
    "",
    `✉️ Email: ${d.email}`,
  ].join("\n");
}

export function contactSubject(d: ContactInput) {
  return `Messaggio dal sito — ${d.name}`;
}
