import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { getPrisma } from "@/lib/prisma";
import { escapeHtml, sendEmail } from "@/lib/notify";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dati non validi", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const data = parsed.data;
  if (data.website) return NextResponse.json({ ok: true });

  const prisma = getPrisma();
  if (prisma) {
    try {
      await prisma.contactMessage.create({
        data: { name: data.name, email: data.email, message: data.message },
      });
    } catch (err) {
      console.error("[contatti] salvataggio DB fallito:", err);
    }
  } else {
    console.warn("[contatti] DATABASE_URL non configurato — messaggio da:", data.email);
  }

  await sendEmail(
    `Nuovo messaggio — ${data.name}`,
    `<h2>Nuovo messaggio dal sito</h2>
     <p><strong>Nome:</strong> ${escapeHtml(data.name)}</p>
     <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
     <p><strong>Messaggio:</strong><br/>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>`,
  );

  return NextResponse.json({ ok: true });
}
