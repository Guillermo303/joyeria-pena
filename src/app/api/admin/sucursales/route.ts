import { NextResponse } from "next/server";
import { getCurrentUser, isStaff } from "@/lib/auth";
import { getAllSucursales, createSucursal } from "@/lib/sucursales";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !isStaff(user.role)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 403 });
  }
  const sucursales = await getAllSucursales();
  return NextResponse.json({ sucursales });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "No autorizado." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const address = typeof body?.address === "string" ? body.address.trim() : "";

  if (!name) {
    return NextResponse.json({ error: "El nombre de la sucursal es obligatorio." }, { status: 400 });
  }

  try {
    const id = await createSucursal({ name, address: address || null });
    return NextResponse.json({ id }, { status: 201 });
  } catch (err) {
    console.error("Error al crear sucursal:", err);
    return NextResponse.json(
      { error: "No pudimos conectar con el servidor. Intenta de nuevo más tarde." },
      { status: 500 },
    );
  }
}
