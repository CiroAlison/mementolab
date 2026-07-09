import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

// Endpoint temporaneo di verifica DB (rimosso dopo il test).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const prisma = getPrisma();
  if (!prisma) return NextResponse.json({ db: false });
  try {
    const commissions = await prisma.commission.count();
    const messages = await prisma.contactMessage.count();
    return NextResponse.json({ db: true, commissions, messages });
  } catch (err) {
    return NextResponse.json({ db: true, error: String(err) }, { status: 500 });
  }
}
