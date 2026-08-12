import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import type { RowDataPacket } from "mysql2";
import pool from "@/lib/db";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth";

interface UserRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password_hash: string;
}

const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 días

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json(
      { error: "Correo y contraseña son obligatorios." },
      { status: 400 },
    );
  }

  // Mensaje genérico en ambos casos para no revelar si el correo existe.
  const invalidCredentials = NextResponse.json(
    { error: "Correo o contraseña incorrectos." },
    { status: 401 },
  );

  let user: UserRow | undefined;
  try {
    const [rows] = await pool.query<UserRow[]>(
      "SELECT id, name, email, password_hash FROM users WHERE email = ? LIMIT 1",
      [email],
    );
    user = rows[0];
  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    return NextResponse.json(
      { error: "No pudimos conectar con el servidor. Intenta de nuevo más tarde." },
      { status: 500 },
    );
  }

  if (!user) return invalidCredentials;

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return invalidCredentials;

  const token = await createSessionToken({ userId: user.id, name: user.name, email: user.email });
  const response = NextResponse.json({ user: { name: user.name, email: user.email } });
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}
