import { NextRequest, NextResponse } from "next/server";
import { adminAuthSchema } from "@/lib/validations";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const session = req.cookies.get("admin_session");
  if (session?.value === "authenticated") {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function DELETE(): Promise<NextResponse> {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("admin_session");
  return response;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();

    const parsed = adminAuthSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "PIN inválido" }, { status: 400 });
    }

    const { pin } = parsed.data;
    const adminPin = process.env.ADMIN_PIN;

    if (!adminPin) {
      console.error("[POST /api/admin/auth] ADMIN_PIN env var not set");
      return NextResponse.json(
        { error: "Configuración del servidor incorrecta" },
        { status: 500 },
      );
    }

    if (pin !== adminPin) {
      return NextResponse.json({ error: "PIN incorrecto" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[POST /api/admin/auth] Unexpected error:", error);
    return NextResponse.json({ error: "Error inesperado" }, { status: 500 });
  }
}
