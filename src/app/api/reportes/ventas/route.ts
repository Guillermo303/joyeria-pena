import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getSalesReport } from "@/lib/reports";

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user || (user.role !== "admin" && user.role !== "socio")) {
    return NextResponse.json({ error: "No autorizado." }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const year = Number(searchParams.get("year")) || new Date().getFullYear();
  const monthParam = searchParams.get("month");
  const month = monthParam ? Number(monthParam) : null;
  const sucursalParam = searchParams.get("sucursalId");
  const sucursalId = sucursalParam ? Number(sucursalParam) : null;

  try {
    const rows = await getSalesReport({ year, month, sucursalId });
    return NextResponse.json({ rows });
  } catch (err) {
    console.error("Error al generar reporte:", err);
    return NextResponse.json(
      { error: "No pudimos conectar con el servidor. Intenta de nuevo más tarde." },
      { status: 500 },
    );
  }
}
