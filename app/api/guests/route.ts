import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { ApiResult } from "@/types";
import type { Guest } from "@prisma/client";

export async function GET(): Promise<NextResponse<ApiResult<Guest[]>>> {
  try {
    const guests = await db.guest.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        status: true,
        companions: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ data: guests });
  } catch (error) {
    console.error("[GET /api/guests] Unexpected error:", error);
    return NextResponse.json(
      { error: "No se pudo cargar la lista de invitados" },
      { status: 500 },
    );
  }
}

import { NextRequest } from "next/server";
import { createGuestSchema } from "@/lib/validations";

export async function POST(
  req: NextRequest,
): Promise<NextResponse<ApiResult<Guest>>> {
  const session = req.cookies.get("admin_session");
  if (session?.value !== "authenticated") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = createGuestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Datos inválidos" },
        { status: 400 },
      );
    }

    const newGuest = await db.guest.create({
      data: {
        name: parsed.data.name,
        status: "PENDING",
        companions: 0,
      },
    });

    return NextResponse.json({ data: newGuest }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/guests] Unexpected error:", error);
    return NextResponse.json(
      { error: "No se pudo crear el invitado" },
      { status: 500 },
    );
  }
}
