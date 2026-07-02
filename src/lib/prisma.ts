// Client Prisma con singleton (evita connessioni multiple in dev).
// È opzionale: se DATABASE_URL non è configurato, `getPrisma()` restituisce null
// e le API degradano con eleganza (vedi le route in /api).

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export function getPrisma(): PrismaClient | null {
  if (!process.env.DATABASE_URL) return null;
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  return globalForPrisma.prisma;
}
