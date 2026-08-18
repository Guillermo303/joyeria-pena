import { redirect } from "next/navigation";
import { getCurrentUser, isStaff } from "@/lib/auth";
import { getAllSucursales } from "@/lib/sucursales";
import NuevaVentaForm from "@/components/admin/NuevaVentaForm";
import pool from "@/lib/db";
import type { RowDataPacket } from "mysql2";

export const metadata = {
  title: "Joyería Peña - Nueva Venta",
};

export default async function NuevaVentaPage() {
  const user = await getCurrentUser();
  if (!user || !isStaff(user.role)) {
    redirect("/login");
  }

  const sucursales = await getAllSucursales();

  let ownSucursal: { id: number; name: string } | null = null;
  if (user.role === "vendedor") {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT s.id, s.name FROM users u
       JOIN sucursales s ON s.id = u.sucursal_id
       WHERE u.id = ? LIMIT 1`,
      [user.userId],
    );
    ownSucursal = rows[0] ? { id: rows[0].id, name: rows[0].name } : null;
  }

  return (
    <div>
      <h1 className="font-display text-headline-md text-tertiary mb-2">Nueva Venta</h1>
      <p className="font-body text-body-md text-on-surface-variant mb-12">
        Registra una venta hecha en tienda. Se guarda a tu nombre para los reportes de Socios.
      </p>

      {user.role === "vendedor" && !ownSucursal ? (
        <div className="border border-error bg-error-container/20 p-8 max-w-xl">
          <p className="font-body text-body-md text-error">
            Tu cuenta no tiene una sucursal asignada todavía. Pide a un admin que te asigne una
            desde el panel de Usuarios antes de registrar ventas.
          </p>
        </div>
      ) : (
        <div className="max-w-xl">
          <NuevaVentaForm sucursales={sucursales} lockedSucursal={ownSucursal} />
        </div>
      )}
    </div>
  );
}
