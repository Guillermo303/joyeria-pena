import type { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "@/lib/db";

export type Sucursal = {
  id: number;
  name: string;
  address: string | null;
};

interface SucursalRow extends RowDataPacket {
  id: number;
  name: string;
  address: string | null;
}

export async function getAllSucursales(): Promise<Sucursal[]> {
  const [rows] = await pool.query<SucursalRow[]>(
    "SELECT id, name, address FROM sucursales ORDER BY name ASC",
  );
  return rows.map((r) => ({ id: r.id, name: r.name, address: r.address }));
}

export async function createSucursal(input: {
  name: string;
  address?: string | null;
}): Promise<number> {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO sucursales (name, address) VALUES (?, ?)",
    [input.name, input.address ?? null],
  );
  return result.insertId;
}

export async function deleteSucursal(id: number): Promise<void> {
  await pool.query("DELETE FROM sucursales WHERE id = ?", [id]);
}
