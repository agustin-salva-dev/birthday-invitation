import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { updateGuestSchema } from "@/lib/validations";
import type { ApiResult } from "@/types";
import type { Guest } from "@prisma/client";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<ApiResult<Guest>>> {
  const session = req.cookies.get("admin_session");
  if (session?.value !== "authenticated") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = updateGuestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Datos inválidos" },
        { status: 400 },
      );
    }

    const updatedGuest = await db.guest.update({
      where: { id },
      data: { name: parsed.data.name },
    });

    return NextResponse.json({ data: updatedGuest });
  } catch (error) {
    console.error("[PATCH /api/guests/[id]] Unexpected error:", error);
    return NextResponse.json(
      { error: "No se pudo actualizar el invitado" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<ApiResult<{ success: boolean }>>> {
  const session = req.cookies.get("admin_session");
  if (session?.value !== "authenticated") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await db.guest.delete({
      where: { id },
    });

    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    console.error("[DELETE /api/guests/[id]] Unexpected error:", error);
    return NextResponse.json(
      { error: "No se pudo eliminar el invitado" },
      { status: 500 },
    );
  }
}
