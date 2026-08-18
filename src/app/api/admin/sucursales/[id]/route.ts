import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { deleteSucursal } from "@/lib/sucursales";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "No autorizado." }, { status: 403 });
  }

  const { id } = await params;
  try {
    await deleteSucursal(Number(id));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error al eliminar sucursal:", err);
    return NextResponse.json(
      { error: "No pudimos conectar con el servidor. Intenta de nuevo más tarde." },
      { status: 500 },
    );
  }
}
