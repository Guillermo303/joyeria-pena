import type { RowDataPacket } from "mysql2";
import pool from "@/lib/db";

export type SalesReportRow = {
  sucursalId: number;
  sucursalName: string;
  vendedorId: number;
  vendedorName: string;
  totalVentas: number;
  numeroVentas: number;
};

interface ReportRow extends RowDataPacket {
  sucursal_id: number;
  sucursal_name: string;
  vendedor_id: number;
  vendedor_name: string;
  total_ventas: string;
  numero_ventas: number;
}

export async function getSalesReport(filters: {
  year: number;
  month?: number | null;
  sucursalId?: number | null;
}): Promise<SalesReportRow[]> {
  const conditions = ["o.source = 'tienda'", "YEAR(o.created_at) = ?"];
  const params: (number | string)[] = [filters.year];

  if (filters.month) {
    conditions.push("MONTH(o.created_at) = ?");
    params.push(filters.month);
  }
  if (filters.sucursalId) {
    conditions.push("o.sucursal_id = ?");
    params.push(filters.sucursalId);
  }

  const [rows] = await pool.query<ReportRow[]>(
    `SELECT
       s.id AS sucursal_id, s.name AS sucursal_name,
       u.id AS vendedor_id, u.name AS vendedor_name,
       SUM(o.total) AS total_ventas,
       COUNT(*) AS numero_ventas
     FROM orders o
     JOIN sucursales s ON s.id = o.sucursal_id
     JOIN users u ON u.id = o.vendedor_id
     WHERE ${conditions.join(" AND ")}
     GROUP BY s.id, s.name, u.id, u.name
     ORDER BY s.name ASC, total_ventas DESC`,
    params,
  );

  return rows.map((r) => ({
    sucursalId: r.sucursal_id,
    sucursalName: r.sucursal_name,
    vendedorId: r.vendedor_id,
    vendedorName: r.vendedor_name,
    totalVentas: Number(r.total_ventas),
    numeroVentas: r.numero_ventas,
  }));
}
