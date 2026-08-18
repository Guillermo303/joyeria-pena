"use client";

import { useEffect, useState, type FormEvent } from "react";

type Sucursal = {
  id: number;
  name: string;
  address: string | null;
};

export default function SucursalesManager({
  initialSucursales,
}: {
  initialSucursales: Sucursal[];
}) {
  const [sucursales, setSucursales] = useState(initialSucursales);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState<number | null>(null);

  useEffect(() => setSucursales(initialSucursales), [initialSucursales]);

  async function handleCreate(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/sucursales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, address }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "No se pudo crear la sucursal.");
        return;
      }
      setSucursales((prev) => [...prev, { id: data.id, name, address: address || null }]);
      setName("");
      setAddress("");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number, sucursalName: string) {
    if (!confirm(`¿Eliminar la sucursal "${sucursalName}"?`)) return;
    setError(null);
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/sucursales/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "No se pudo eliminar.");
        return;
      }
      setSucursales((prev) => prev.filter((s) => s.id !== id));
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="border border-outline-variant bg-surface-container-lowest">
        {sucursales.length === 0 ? (
          <p className="p-6 font-body text-body-md text-on-surface-variant">
            Aún no hay sucursales registradas.
          </p>
        ) : (
          <ul>
            {sucursales.map((s) => (
              <li
                key={s.id}
                className="flex items-center justify-between p-4 border-b border-surface-variant last:border-b-0"
              >
                <div>
                  <p className="font-body text-body-md text-tertiary">{s.name}</p>
                  {s.address && (
                    <p className="font-body text-body-md text-on-surface-variant text-sm">
                      {s.address}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(s.id, s.name)}
                  disabled={busyId === s.id}
                  aria-label={`Eliminar ${s.name}`}
                  className="text-on-surface-variant hover:text-error transition-colors disabled:opacity-40"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form
        onSubmit={handleCreate}
        className="border border-outline-variant bg-surface-container-lowest p-8 flex flex-col gap-6"
      >
        <h2 className="font-display text-headline-sm text-tertiary">Nueva Sucursal</h2>
        <label className="flex flex-col gap-2">
          <span className="font-body text-label-caps text-on-surface-variant uppercase tracking-widest">
            Nombre
          </span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Sucursal Centro"
            className="w-full bg-transparent border-0 border-b border-tertiary focus:ring-0 focus:border-secondary py-2 font-body text-body-md text-tertiary"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-body text-label-caps text-on-surface-variant uppercase tracking-widest">
            Dirección (opcional)
          </span>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-transparent border-0 border-b border-tertiary focus:ring-0 focus:border-secondary py-2 font-body text-body-md text-tertiary"
          />
        </label>
        {error && (
          <p className="font-body text-body-md text-error" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="bg-tertiary text-on-tertiary font-body text-button uppercase py-4 hover:bg-primary transition-colors duration-300 disabled:opacity-60"
        >
          {loading ? "Creando…" : "Crear Sucursal"}
        </button>
      </form>
    </div>
  );
}
