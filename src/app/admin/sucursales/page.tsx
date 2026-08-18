import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getAllSucursales } from "@/lib/sucursales";
import SucursalesManager from "@/components/admin/SucursalesManager";

export const metadata = {
  title: "Joyería Peña - Sucursales",
};

export default async function SucursalesPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    redirect("/admin");
  }

  const sucursales = await getAllSucursales();

  return (
    <div>
      <h1 className="font-display text-headline-md text-tertiary mb-2">Sucursales</h1>
      <p className="font-body text-body-md text-on-surface-variant mb-12">
        Catálogo de tiendas físicas. Asigna vendedores a una sucursal desde{" "}
        <a href="/admin/usuarios" className="text-secondary hover:text-primary transition-colors">
          Usuarios
        </a>
        .
      </p>
      <div className="max-w-xl">
        <SucursalesManager initialSucursales={sucursales} />
      </div>
    </div>
  );
}
