import { NextResponse } from "next/server";
import { getCurrentUser, isStaff } from "@/lib/auth";
import { createInStoreSale, type SaleItemInput } from "@/lib/sales";
import pool from "@/lib/db";
import type { RowDataPacket } from "mysql2";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user || !isStaff(user.role)) {
    return NextResponse.json({ error: "No autorizado." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const customerName =
    typeof body?.customerName === "string" && body.customerName.trim()
      ? body.customerName.trim()
      : "Cliente de mostrador";
  const customerEmail = typeof body?.customerEmail === "string" ? body.customerEmail.trim() : "";
  const customerPhone = typeof body?.customerPhone === "string" ? body.customerPhone.trim() : "";
  const rawItems = Array.isArray(body?.items) ? body.items : [];

  const items: SaleItemInput[] = rawItems
    .map((i: unknown) => {
      const item = i as Record<string, unknown>;
      return {
        productName: typeof item.productName === "string" ? item.productName.trim() : "",
        unitPrice: Number(item.unitPrice),
        quantity: Number(item.quantity),
      };
    })
    .filter(
      (i: SaleItemInput) =>
        i.productName && Number.isFinite(i.unitPrice) && i.unitPrice > 0 &&
        Number.isFinite(i.quantity) && i.quantity > 0,
    );

  if (items.length === 0) {
    return NextResponse.json(
      { error: "Agrega al menos una pieza con precio y cantidad válidos." },
      { status: 400 },
    );
  }

  // Un vendedor solo puede registrar ventas para su propia sucursal
  // (evita que se le "regalen" ventas a otra sucursal por error o a proposito).
  // Admin/socio pueden elegir cualquier sucursal desde el body.
  let sucursalId: number | null = null;
  if (user.role === "vendedor") {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT sucursal_id FROM users WHERE id = ? LIMIT 1",
      [user.userId],
    );
    sucursalId = rows[0]?.sucursal_id ?? null;
    if (!sucursalId) {
      return NextResponse.json(
        { error: "Tu cuenta no tiene una sucursal asignada. Pide a un admin que te asigne una." },
        { status: 400 },
      );
    }
  } else {
    sucursalId = typeof body?.sucursalId === "number" ? body.sucursalId : null;
    if (!sucursalId) {
      return NextResponse.json({ error: "Selecciona una sucursal." }, { status: 400 });
    }
  }

  try {
    const orderId = await createInStoreSale({
      vendedorId: user.userId,
      sucursalId,
      customerName,
      customerEmail: customerEmail || null,
      customerPhone: customerPhone || null,
      items,
    });
    return NextResponse.json({ id: orderId }, { status: 201 });
  } catch (err) {
    console.error("Error al registrar venta:", err);
    return NextResponse.json(
      { error: "No pudimos conectar con el servidor. Intenta de nuevo más tarde." },
      { status: 500 },
    );
  }
}
