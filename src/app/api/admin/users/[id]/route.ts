import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { updateUserRole, updateUserSucursal, deleteUser } from "@/lib/users";

const VALID_ROLES = ["cliente", "vendedor", "socio", "admin"];

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "No autorizado." }, { status: 403 });
  }

  const { id } = await params;
  const userId = Number(id);
  const body = await request.json().catch(() => null);

  try {
    if (typeof body?.role === "string") {
      const role = body.role;
      if (!VALID_ROLES.includes(role)) {
        return NextResponse.json({ error: "Rol inválido." }, { status: 400 });
      }
      if (userId === user.userId && role !== "admin") {
        return NextResponse.json(
          { error: "No puedes quitarte tu propio rol de admin." },
          { status: 400 },
        );
      }
      await updateUserRole(userId, role as never);
    }

    if ("sucursalId" in (body ?? {})) {
      const sucursalId =
        typeof body.sucursalId === "number" && Number.isFinite(body.sucursalId)
          ? body.sucursalId
          : null;
      await updateUserSucursal(userId, sucursalId);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error al actualizar usuario:", err);
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
