import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rsvpSchema } from "@/lib/validations";
import type { ApiResult } from "@/types";
import type { Guest } from "@prisma/client";

export async function PATCH(
  req: NextRequest,
): Promise<NextResponse<ApiResult<Pick<Guest, "id" | "name" | "status">>>> {
  try {
    const body = await req.json();

    const parsed = rsvpSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos inválidos" },
        { status: 400 },
      );
    }

    const { guestId, status, companions } = parsed.data;

    const existing = await db.guest.findUnique({ where: { id: guestId } });
    if (!existing) {
      return NextResponse.json(
        { error: "Invitado no encontrado" },
        { status: 404 },
      );
    }

    const updated = await db.guest.update({
      where: { id: guestId },
      data: {
        status,
        companions: status === "CONFIRMED" ? companions : 0,
      },
      select: { id: true, name: true, status: true, companions: true },
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("[PATCH /api/rsvp] Unexpected error:", error);
    return NextResponse.json(
      { error: "No se pudo registrar tu respuesta. Intentá de nuevo." },
      { status: 500 },
    );
  }
}
