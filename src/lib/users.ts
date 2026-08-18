import bcrypt from "bcryptjs";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "@/lib/db";
import type { Role } from "@/lib/auth";

export type StaffUser = {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
};

interface UserRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  role: Role;
  created_at: string;
}

export async function getAllUsers(): Promise<StaffUser[]> {
  const [rows] = await pool.query<UserRow[]>(
    "SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC",
  );
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    role: r.role,
    createdAt: new Date(r.created_at).toISOString(),
  }));
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
  role: Role;
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
    "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
    [input.name, input.email, passwordHash, input.role],
  );
  return { id: result.insertId };
}

export async function updateUserRole(id: number, role: Role): Promise<void> {
  await pool.query("UPDATE users SET role = ? WHERE id = ?", [role, id]);
}

export async function deleteUser(id: number): Promise<void> {
  await pool.query("DELETE FROM users WHERE id = ?", [id]);
}
