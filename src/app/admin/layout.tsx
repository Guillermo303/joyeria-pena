import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser, isStaff } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";

const roleLabel: Record<string, string> = {
  admin: "Admin",
  socio: "Socio",
  vendedor: "Vendedor / Cajero",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!isStaff(user.role)) redirect("/cuenta");

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background font-body">
      <header className="border-b border-outline-variant bg-surface-container-lowest">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 h-20 flex items-center justify-between">
          <Link href="/admin" className="font-display text-headline-sm text-tertiary uppercase tracking-widest">
            Joyería Peña · Panel
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/admin"
              className="font-body text-label-caps text-tertiary hover:text-secondary transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/admin/ventas/nueva"
              className="font-body text-label-caps text-tertiary hover:text-secondary transition-colors"
            >
              Nueva Venta
            </Link>
            {(user.role === "admin" || user.role === "socio") && (
              <Link
                href="/admin/reportes"
                className="font-body text-label-caps text-tertiary hover:text-secondary transition-colors"
              >
                Reportes
              </Link>
            )}
            {user.role === "admin" && (
              <>
                <Link
                  href="/admin/usuarios"
                  className="font-body text-label-caps text-tertiary hover:text-secondary transition-colors"
                >
                  Usuarios
                </Link>
                <Link
                  href="/admin/sucursales"
                  className="font-body text-label-caps text-tertiary hover:text-secondary transition-colors"
                >
                  Sucursales
                </Link>
              </>
            )}
            <Link
              href="/"
              className="font-body text-label-caps text-on-surface-variant hover:text-secondary transition-colors"
            >
              Ver Tienda
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="font-body text-body-md text-tertiary leading-tight">{user.name}</p>
              <p className="font-body text-label-caps text-on-surface-variant uppercase">
                {roleLabel[user.role] ?? user.role}
              </p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-[1200px] mx-auto px-5 md:px-10 py-10 w-full">{children}</main>
    </div>
  );
}
