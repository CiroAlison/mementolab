import { NextResponse } from "next/server";
import { commissionSchema } from "@/lib/validation";
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

  const parsed = commissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dati non validi", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot: se compilato, è spam → fingiamo successo
  if (data.website) return NextResponse.json({ ok: true });

  // 1) Persistenza (best-effort: solo se il DB è configurato)
  const prisma = getPrisma();
  if (prisma) {
    try {
      await prisma.commission.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          itemType: data.itemType,
          idea: data.idea,
          budget: data.budget || null,
        },
      });
    } catch (err) {
      console.error("[commissioni] salvataggio DB fallito:", err);
    }
  } else {
    console.warn("[commissioni] DATABASE_URL non configurato — richiesta:", {
      name: data.name,
      email: data.email,
      itemType: data.itemType,
    });
  }

  // 2) Notifica email (best-effort)
  await sendEmail(
    `Nuova commissione — ${data.name}`,
    `<h2>Nuova richiesta di commissione</h2>
     <p><strong>Nome:</strong> ${escapeHtml(data.name)}</p>
     <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
     <p><strong>Telefono:</strong> ${escapeHtml(data.phone || "—")}</p>
     <p><strong>Tipo di capo:</strong> ${escapeHtml(data.itemType)}</p>
     <p><strong>Budget:</strong> ${escapeHtml(data.budget || "—")}</p>
     <p><strong>Idea:</strong><br/>${escapeHtml(data.idea).replace(/\n/g, "<br/>")}</p>`,
  );

  return NextResponse.json({ ok: true });
}
