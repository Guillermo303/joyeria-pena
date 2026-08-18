import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getAllSucursales } from "@/lib/sucursales";
import { getSalesReport } from "@/lib/reports";

export const metadata = {
  title: "Joyería Peña - Reportes",
};

const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export default async function ReportesPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string; month?: string; sucursalId?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user || (user.role !== "admin" && user.role !== "socio")) {
    redirect("/admin");
  }

  const params = await searchParams;
  const currentYear = new Date().getFullYear();
  const year = Number(params.year) || currentYear;
  const month = params.month ? Number(params.month) : null;
  const sucursalId = params.sucursalId ? Number(params.sucursalId) : null;

  const [sucursales, rows] = await Promise.all([
    getAllSucursales(),
    getSalesReport({ year, month, sucursalId }),
  ]);

  const grandTotal = rows.reduce((sum, r) => sum + r.totalVentas, 0);
  const totalVentas = rows.reduce((sum, r) => sum + r.numeroVentas, 0);
  const yearOptions = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <div>
      <h1 className="font-display text-headline-md text-tertiary mb-2">Reportes de Ventas</h1>
      <p className="font-body text-body-md text-on-surface-variant mb-12">
        Ventas registradas en tienda (no incluye pedidos en línea), agrupadas por sucursal y
        vendedor.
      </p>

      <form
        method="get"
        className="flex flex-wrap items-end gap-6 mb-10 border border-outline-variant bg-surface-container-lowest p-6"
      >
        <label className="flex flex-col gap-2">
          <span className="font-body text-label-caps text-on-surface-variant uppercase tracking-widest">
            Año
          </span>
          <select
            name="year"
            defaultValue={year}
            className="bg-transparent border border-outline-variant px-2 py-2 font-body text-body-md text-tertiary"
          >
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-body text-label-caps text-on-surface-variant uppercase tracking-widest">
            Mes
          </span>
          <select
            name="month"
            defaultValue={month ?? ""}
            className="bg-transparent border border-outline-variant px-2 py-2 font-body text-body-md text-tertiary"
          >
            <option value="">Todo el año</option>
            {months.map((m, i) => (
              <option key={m} value={i + 1}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-body text-label-caps text-on-surface-variant uppercase tracking-widest">
            Sucursal
          </span>
          <select
            name="sucursalId"
            defaultValue={sucursalId ?? ""}
            className="bg-transparent border border-outline-variant px-2 py-2 font-body text-body-md text-tertiary"
          >
            <option value="">Todas</option>
            {sucursales.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="bg-tertiary text-on-tertiary font-body text-button uppercase px-8 py-2.5 hover:bg-primary transition-colors duration-300"
        >
          Filtrar
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div className="bg-surface-container-lowest border border-outline-variant/30 p-8">
          <span className="font-body text-label-caps text-on-surface-variant uppercase tracking-widest block mb-2">
            Total del Periodo
          </span>
          <span className="font-display text-headline-sm text-tertiary">
            ${grandTotal.toLocaleString("es-MX")}
          </span>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant/30 p-8">
          <span className="font-body text-label-caps text-on-surface-variant uppercase tracking-widest block mb-2">
            Número de Ventas
          </span>
          <span className="font-display text-headline-sm text-tertiary">{totalVentas}</span>
        </div>
      </div>

      <div className="border border-outline-variant bg-surface-container-lowest overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th className="font-body text-label-caps text-on-surface-variant uppercase p-4 border-b border-outline-variant/50">
                Sucursal
              </th>
              <th className="font-body text-label-caps text-on-surface-variant uppercase p-4 border-b border-outline-variant/50">
                Vendedor
              </th>
              <th className="font-body text-label-caps text-on-surface-variant uppercase p-4 border-b border-outline-variant/50 text-right">
                # Ventas
              </th>
              <th className="font-body text-label-caps text-on-surface-variant uppercase p-4 border-b border-outline-variant/50 text-right">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="font-body text-body-md text-tertiary">
            {rows.map((r) => (
              <tr key={`${r.sucursalId}-${r.vendedorId}`} className="border-b border-surface-variant">
                <td className="p-4">{r.sucursalName}</td>
                <td className="p-4">{r.vendedorName}</td>
                <td className="p-4 text-right">{r.numeroVentas}</td>
                <td className="p-4 text-right">${r.totalVentas.toLocaleString("es-MX")}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-on-surface-variant">
                  No hay ventas registradas para ese periodo/sucursal.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
