import bcrypt from "bcryptjs";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "@/lib/db";
import type { Role } from "@/lib/auth";

export type StaffUser = {
  id: number;
  name: string;
  email: string;
  role: Role;
  sucursalId: number | null;
  sucursalName: string | null;
  createdAt: string;
};

interface UserRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  role: Role;
  sucursal_id: number | null;
  sucursal_name: string | null;
  created_at: string;
}

export async function getAllUsers(): Promise<StaffUser[]> {
  const [rows] = await pool.query<UserRow[]>(
    `SELECT u.id, u.name, u.email, u.role, u.sucursal_id, s.name AS sucursal_name, u.created_at
     FROM users u
     LEFT JOIN sucursales s ON s.id = u.sucursal_id
     ORDER BY u.created_at DESC`,
  );
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    role: r.role,
    sucursalId: r.sucursal_id,
    sucursalName: r.sucursal_name,
    createdAt: new Date(r.created_at).toISOString(),
  }));
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
  role: Role;
  sucursalId?: number | null;
}): Promise<{ id: number } | { error: string }> {
  const [existing] = await pool.query<RowDataPacket[]>(
    "SELECT id FROM users WHERE email = ? LIMIT 1",
    [input.email],
  );
  if (existing.length > 0) {
    return { error: "Ya existe una cuenta con ese correo." };
  }

  const passwordHash = await bcrypt.hash(input.password, 12);
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO users (name, email, password_hash, role, sucursal_id) VALUES (?, ?, ?, ?, ?)",
    [input.name, input.email, passwordHash, input.role, input.sucursalId ?? null],
  );
  return { id: result.insertId };
}

export async function updateUserRole(id: number, role: Role): Promise<void> {
  await pool.query("UPDATE users SET role = ? WHERE id = ?", [role, id]);
}

export async function updateUserSucursal(id: number, sucursalId: number | null): Promise<void> {
  await pool.query("UPDATE users SET sucursal_id = ? WHERE id = ?", [sucursalId, id]);
}

export async function deleteUser(id: number): Promise<void> {
  await pool.query("DELETE FROM users WHERE id = ?", [id]);
}
