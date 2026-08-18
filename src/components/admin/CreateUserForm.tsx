"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { Role } from "@/lib/auth";

const roleOptions: { value: Role; label: string }[] = [
  { value: "vendedor", label: "Vendedor / Cajero" },
  { value: "socio", label: "Socio" },
  { value: "admin", label: "Admin" },
  { value: "cliente", label: "Cliente" },
];

type Sucursal = { id: number; name: string; address: string | null };

export default function CreateUserForm({ sucursales }: { sucursales: Sucursal[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("vendedor");
  const [sucursalId, setSucursalId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          sucursalId: sucursalId ? Number(sucursalId) : null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "No se pudo crear el usuario.");
        return;
      }
      setName("");
      setEmail("");
      setPassword("");
      setRole("vendedor");
      setSucursalId("");
      setSuccess(true);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-outline-variant bg-surface-container-lowest p-8 flex flex-col gap-6"
    >
      <h2 className="font-display text-headline-sm text-tertiary">Nuevo Usuario</h2>

      <label className="flex flex-col gap-2">
        <span className="font-body text-label-caps text-on-surface-variant uppercase tracking-widest">
          Nombre
        </span>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-transparent border-0 border-b border-tertiary focus:ring-0 focus:border-secondary py-2 font-body text-body-md text-tertiary"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-body text-label-caps text-on-surface-variant uppercase tracking-widest">
          Correo
        </span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-transparent border-0 border-b border-tertiary focus:ring-0 focus:border-secondary py-2 font-body text-body-md text-tertiary"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-body text-label-caps text-on-surface-variant uppercase tracking-widest">
          Contraseña Temporal
        </span>
        <input
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-transparent border-0 border-b border-tertiary focus:ring-0 focus:border-secondary py-2 font-body text-body-md text-tertiary"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-body text-label-caps text-on-surface-variant uppercase tracking-widest">
          Rol
        </span>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
          className="w-full bg-transparent border border-outline-variant px-2 py-2 font-body text-body-md text-tertiary"
        >
          {roleOptions.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-body text-label-caps text-on-surface-variant uppercase tracking-widest">
          Sucursal (opcional)
        </span>
        <select
          value={sucursalId}
          onChange={(e) => setSucursalId(e.target.value)}
          className="w-full bg-transparent border border-outline-variant px-2 py-2 font-body text-body-md text-tertiary"
        >
          <option value="">Sin asignar</option>
          {sucursales.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </label>

      {error && (
        <p className="font-body text-body-md text-error" role="alert">
          {error}
        </p>
      )}
      {success && (
        <p className="font-body text-body-md text-secondary" role="status">
          Usuario creado correctamente.
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-tertiary text-on-tertiary font-body text-button uppercase py-4 hover:bg-primary transition-colors duration-300 disabled:opacity-60"
      >
        {loading ? "Creando…" : "Crear Usuario"}
      </button>
    </form>
  );
}
