import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getAllUsers, createUser } from "@/lib/users";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_ROLES = ["cliente", "vendedor", "socio", "admin"];

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "No autorizado." }, { status: 403 });
  }
  const users = await getAllUsers();
  return NextResponse.json({ users });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "No autorizado." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const role = typeof body?.role === "string" ? body.role : "";

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Nombre, correo y contraseña son obligatorios." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "El correo no es válido." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: "La contraseña debe tener al menos 8 caracteres." },
      { status: 400 },
    );
  }
  if (!VALID_ROLES.includes(role)) {
    return NextResponse.json({ error: "Rol inválido." }, { status: 400 });
  }

  try {
    const result = await createUser({ name, email, password, role: role as never });
    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }
    return NextResponse.json({ id: result.id }, { status: 201 });
  } catch (err) {
    console.error("Error al crear usuario:", err);
    return NextResponse.json(
      { error: "No pudimos conectar con el servidor. Intenta de nuevo más tarde." },
      { status: 500 },
    );
  }
}
