import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { updateUserRole, deleteUser } from "@/lib/users";

const VALID_ROLES = ["cliente", "vendedor", "socio", "admin"];

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "No autorizado." }, { status: 403 });
  }

  const { id } = await params;
  const userId = Number(id);
  const body = await request.json().catch(() => null);
  const role = typeof body?.role === "string" ? body.role : "";

  if (!VALID_ROLES.includes(role)) {
    return NextResponse.json({ error: "Rol inválido." }, { status: 400 });
  }
  if (userId === user.userId && role !== "admin") {
    return NextResponse.json(
      { error: "No puedes quitarte tu propio rol de admin." },
      { status: 400 },
    );
  }

  try {
    await updateUserRole(userId, role as never);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error al actualizar rol:", err);
    return NextResponse.json(
      { error: "No pudimos conectar con el servidor. Intenta de nuevo más tarde." },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "No autorizado." }, { status: 403 });
  }

  const { id } = await params;
  const userId = Number(id);
  if (userId === user.userId) {
    return NextResponse.json({ error: "No puedes eliminar tu propia cuenta." }, { status: 400 });
  }

  try {
    await deleteUser(userId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
    return NextResponse.json(
      { error: "No pudimos conectar con el servidor. Intenta de nuevo más tarde." },
      { status: 500 },
    );
  }
}
