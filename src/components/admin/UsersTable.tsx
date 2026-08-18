"use client";

import { useEffect, useState } from "react";
import type { Role } from "@/lib/auth";

type StaffUser = {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
};

const roleLabel: Record<Role, string> = {
  cliente: "Cliente",
  vendedor: "Vendedor / Cajero",
  socio: "Socio",
  admin: "Admin",
};

const roleOptions: Role[] = ["cliente", "vendedor", "socio", "admin"];

export default function UsersTable({
  initialUsers,
  currentUserId,
}: {
  initialUsers: StaffUser[];
  currentUserId: number;
}) {
  const [users, setUsers] = useState(initialUsers);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  // router.refresh() (llamado desde CreateUserForm tras crear un usuario)
  // vuelve a ejecutar el server component y nos pasa un `initialUsers`
  // nuevo; sin este efecto, el estado local quedaria pegado al primer
  // render y la tabla no reflejaria el usuario recien creado.
  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  async function handleRoleChange(id: number, role: Role) {
    setError(null);
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "No se pudo actualizar el rol.");
        return;
      }
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id: number, name: string) {
    if (!confirm(`¿Eliminar la cuenta de ${name}? Esta acción no se puede deshacer.`)) return;
    setError(null);
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "No se pudo eliminar el usuario.");
        return;
      }
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="border border-outline-variant bg-surface-container-lowest">
      {error && (
        <p className="font-body text-body-md text-error p-4 border-b border-outline-variant" role="alert">
          {error}
        </p>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[560px]">
          <thead>
            <tr>
              <th className="font-body text-label-caps text-on-surface-variant uppercase p-4 border-b border-outline-variant/50">
                Nombre
              </th>
              <th className="font-body text-label-caps text-on-surface-variant uppercase p-4 border-b border-outline-variant/50">
                Correo
              </th>
              <th className="font-body text-label-caps text-on-surface-variant uppercase p-4 border-b border-outline-variant/50">
                Rol
              </th>
              <th className="font-body text-label-caps text-on-surface-variant uppercase p-4 border-b border-outline-variant/50 text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="font-body text-body-md text-tertiary">
            {users.map((u) => (
              <tr key={u.id} className="border-b border-surface-variant">
                <td className="p-4">{u.name}</td>
                <td className="p-4 text-on-surface-variant">{u.email}</td>
                <td className="p-4">
                  <select
                    value={u.role}
                    disabled={busyId === u.id || u.id === currentUserId}
                    onChange={(e) => handleRoleChange(u.id, e.target.value as Role)}
                    className="bg-surface-container-low border border-outline-variant px-2 py-1 font-body text-body-md text-tertiary disabled:opacity-60"
                  >
                    {roleOptions.map((r) => (
                      <option key={r} value={r}>
                        {roleLabel[r]}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleDelete(u.id, u.name)}
                    disabled={busyId === u.id || u.id === currentUserId}
                    className="text-on-surface-variant hover:text-error transition-colors disabled:opacity-40"
                    aria-label={`Eliminar ${u.name}`}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-on-surface-variant">
                  No hay usuarios todavía.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
