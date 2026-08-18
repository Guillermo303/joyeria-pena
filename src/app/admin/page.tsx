import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

export const metadata = {
  title: "Joyería Peña - Panel",
};

export default async function AdminHomePage() {
  const user = await getCurrentUser();

  return (
    <div>
      <h1 className="font-display text-headline-md text-tertiary mb-2">
        Hola, {user?.name.split(" ")[0]}
      </h1>
      <p className="font-body text-body-md text-on-surface-variant mb-12">
        Panel interno de Joyería Peña.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          href="/admin/ventas/nueva"
          className="block border border-outline-variant bg-surface-container-lowest p-8 hover:border-secondary transition-colors"
        >
          <span className="material-symbols-outlined text-[32px] text-secondary mb-4 block font-light">
            point_of_sale
          </span>
          <h2 className="font-display text-headline-sm text-tertiary mb-2">Nueva Venta</h2>
          <p className="font-body text-body-md text-on-surface-variant">
            Registra una venta hecha en tienda.
          </p>
        </Link>

        {(user?.role === "admin" || user?.role === "socio") && (
          <Link
            href="/admin/reportes"
            className="block border border-outline-variant bg-surface-container-lowest p-8 hover:border-secondary transition-colors"
          >
            <span className="material-symbols-outlined text-[32px] text-secondary mb-4 block font-light">
              bar_chart
            </span>
            <h2 className="font-display text-headline-sm text-tertiary mb-2">Reportes</h2>
            <p className="font-body text-body-md text-on-surface-variant">
              Ventas por sucursal, mes/año y vendedor.
            </p>
          </Link>
        )}

        {user?.role === "admin" && (
          <>
            <Link
              href="/admin/usuarios"
              className="block border border-outline-variant bg-surface-container-lowest p-8 hover:border-secondary transition-colors"
            >
              <span className="material-symbols-outlined text-[32px] text-secondary mb-4 block font-light">
                group
              </span>
              <h2 className="font-display text-headline-sm text-tertiary mb-2">Usuarios</h2>
              <p className="font-body text-body-md text-on-surface-variant">
                Crea cuentas de staff y administra roles.
              </p>
            </Link>
            <Link
              href="/admin/sucursales"
              className="block border border-outline-variant bg-surface-container-lowest p-8 hover:border-secondary transition-colors"
            >
              <span className="material-symbols-outlined text-[32px] text-secondary mb-4 block font-light">
                storefront
              </span>
              <h2 className="font-display text-headline-sm text-tertiary mb-2">Sucursales</h2>
              <p className="font-body text-body-md text-on-surface-variant">
                Catálogo de tiendas físicas.
              </p>
            </Link>
          </>
        )}

        <Link
          href="/portal"
          className="block border border-outline-variant bg-surface-container-lowest p-8 hover:border-secondary transition-colors"
        >
          <span className="material-symbols-outlined text-[32px] text-secondary mb-4 block font-light">
            inventory_2
          </span>
          <h2 className="font-display text-headline-sm text-tertiary mb-2">Inventario</h2>
          <p className="font-body text-body-md text-on-surface-variant">
            Revisa el inventario de piezas.
          </p>
        </Link>
      </div>
    </div>
  );
}
