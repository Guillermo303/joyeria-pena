"use client";

import { useState, type FormEvent } from "react";

type Sucursal = { id: number; name: string; address: string | null };
type Item = { productName: string; unitPrice: string; quantity: string };

const emptyItem = (): Item => ({ productName: "", unitPrice: "", quantity: "1" });

export default function NuevaVentaForm({
  sucursales,
  lockedSucursal,
}: {
  sucursales: Sucursal[];
  lockedSucursal: { id: number; name: string } | null;
}) {
  const [sucursalId, setSucursalId] = useState<string>(
    lockedSucursal ? String(lockedSucursal.id) : "",
  );
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [items, setItems] = useState<Item[]>([emptyItem()]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const total = items.reduce((sum, i) => {
    const price = Number(i.unitPrice) || 0;
    const qty = Number(i.quantity) || 0;
    return sum + price * qty;
  }, 0);

  function updateItem(index: number, patch: Partial<Item>) {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, ...patch } : it)));
  }

  function addItem() {
    setItems((prev) => [...prev, emptyItem()]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const res = await fetch("/api/ventas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sucursalId: sucursalId ? Number(sucursalId) : null,
          customerName,
          customerEmail,
          customerPhone,
          items: items.map((i) => ({
            productName: i.productName,
            unitPrice: Number(i.unitPrice),
            quantity: Number(i.quantity),
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "No se pudo registrar la venta.");
        return;
      }
      setSuccess(`Venta registrada por $${total.toLocaleString("es-MX")}.`);
      setCustomerName("");
      setCustomerEmail("");
      setCustomerPhone("");
      setItems([emptyItem()]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-outline-variant bg-surface-container-lowest p-8 flex flex-col gap-8"
    >
      <div>
        <span className="font-body text-label-caps text-on-surface-variant uppercase tracking-widest block mb-2">
          Sucursal
        </span>
        {lockedSucursal ? (
          <p className="font-body text-body-md text-tertiary">{lockedSucursal.name}</p>
        ) : (
          <select
            required
            value={sucursalId}
            onChange={(e) => setSucursalId(e.target.value)}
            className="w-full bg-transparent border border-outline-variant px-2 py-2 font-body text-body-md text-tertiary"
          >
            <option value="" disabled>
              Selecciona una sucursal
            </option>
            {sucursales.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <label className="flex flex-col gap-2">
          <span className="font-body text-label-caps text-on-surface-variant uppercase tracking-widest">
            Cliente (opcional)
          </span>
          <input
            type="text"
            placeholder="Cliente de mostrador"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full bg-transparent border-0 border-b border-tertiary focus:ring-0 focus:border-secondary py-2 font-body text-body-md text-tertiary"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-body text-label-caps text-on-surface-variant uppercase tracking-widest">
            Teléfono (opcional)
          </span>
          <input
            type="text"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className="w-full bg-transparent border-0 border-b border-tertiary focus:ring-0 focus:border-secondary py-2 font-body text-body-md text-tertiary"
          />
        </label>
      </div>
      <label className="flex flex-col gap-2 -mt-4">
        <span className="font-body text-label-caps text-on-surface-variant uppercase tracking-widest">
          Correo (opcional)
        </span>
        <input
          type="email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          className="w-full bg-transparent border-0 border-b border-tertiary focus:ring-0 focus:border-secondary py-2 font-body text-body-md text-tertiary"
        />
      </label>

      <div className="flex flex-col gap-4">
        <span className="font-body text-label-caps text-on-surface-variant uppercase tracking-widest">
          Piezas Vendidas
        </span>
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-12 gap-3 items-end">
            <div className="col-span-6">
              <input
                type="text"
                required
                placeholder="Nombre de la pieza"
                value={item.productName}
                onChange={(e) => updateItem(index, { productName: e.target.value })}
                className="w-full bg-transparent border-0 border-b border-tertiary focus:ring-0 focus:border-secondary py-2 font-body text-body-md text-tertiary"
              />
            </div>
            <div className="col-span-3">
              <input
                type="number"
                required
                min="0"
                step="0.01"
                placeholder="Precio"
                value={item.unitPrice}
                onChange={(e) => updateItem(index, { unitPrice: e.target.value })}
                className="w-full bg-transparent border-0 border-b border-tertiary focus:ring-0 focus:border-secondary py-2 font-body text-body-md text-tertiary"
              />
            </div>
            <div className="col-span-2">
              <input
                type="number"
                required
                min="1"
                step="1"
                placeholder="Cant."
                value={item.quantity}
                onChange={(e) => updateItem(index, { quantity: e.target.value })}
                className="w-full bg-transparent border-0 border-b border-tertiary focus:ring-0 focus:border-secondary py-2 font-body text-body-md text-tertiary"
              />
            </div>
            <div className="col-span-1 flex justify-end">
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  aria-label="Quitar pieza"
                  className="text-on-surface-variant hover:text-error transition-colors pb-2"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="self-start font-body text-label-caps text-secondary hover:text-primary transition-colors uppercase tracking-widest"
        >
          + Agregar Pieza
        </button>
      </div>

      <div className="flex justify-between border-t border-outline-variant pt-6">
        <span className="font-body text-body-lg text-on-surface-variant">Total</span>
        <span className="font-display text-headline-sm text-tertiary">
          ${total.toLocaleString("es-MX")}
        </span>
      </div>

      {error && (
        <p className="font-body text-body-md text-error" role="alert">
          {error}
        </p>
      )}
      {success && (
        <p className="font-body text-body-md text-secondary" role="status">
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-tertiary text-on-tertiary font-body text-button uppercase py-4 hover:bg-primary transition-colors duration-300 disabled:opacity-60"
      >
        {loading ? "Registrando…" : "Registrar Venta"}
      </button>
    </form>
  );
}
