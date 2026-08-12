import Link from "next/link";
import Footer from "@/components/Footer";
import { getInventory, getInventoryMetrics, type StockStatus } from "@/lib/inventory";

export const metadata = {
  title: "Joyería Peña - Portal de Inventario",
};

const statusLabel: Record<StockStatus, string> = {
  "in-stock": "En Stock",
  "low-stock": "Stock Bajo",
  "sold-out": "Agotado",
};

const statusClasses: Record<StockStatus, string> = {
  "in-stock": "bg-surface-container-high text-tertiary",
  "low-stock": "bg-secondary-container/30 text-on-secondary-container",
  "sold-out": "bg-error-container/30 text-on-error-container",
};

const sidebarLinks = [
  { href: "/colecciones", icon: "diamond", label: "Colecciones" },
  { href: "/#bespoke", icon: "auto_awesome", label: "A Medida" },
  { href: "/#heritage", icon: "history", label: "Nosotros" },
];

export default async function PortalPage() {
  const [inventory, metrics] = await Promise.all([getInventory(), getInventoryMetrics()]);

  return (
    <div className="bg-background text-on-background font-body antialiased flex flex-1">
      {/* Sidebar */}
      <nav className="bg-surface h-full w-80 shadow-2xl fixed inset-y-0 left-0 z-[60] flex-col p-8 hidden md:flex">
        <div className="mb-12">
          <Link href="/" className="font-display text-headline-md tracking-widest text-tertiary uppercase">
            JOYERÍA PEÑA
          </Link>
        </div>
        <ul className="flex flex-col gap-4 flex-1">
          {sidebarLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="flex items-center gap-4 py-3 px-4 font-body text-label-caps uppercase text-on-surface-variant hover:bg-surface-variant transition-colors duration-300"
              >
                <span className="material-symbols-outlined">{link.icon}</span>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/portal"
              className="flex items-center gap-4 py-3 px-4 font-body text-label-caps uppercase text-secondary font-bold hover:bg-surface-variant transition-colors duration-300"
            >
              <span className="material-symbols-outlined">inventory_2</span>
              Portal Inventario
            </Link>
          </li>
          <li>
            <Link
              href="/cuenta"
              className="flex items-center gap-4 py-3 px-4 font-body text-label-caps uppercase text-on-surface-variant hover:bg-surface-variant transition-colors duration-300"
            >
              <span className="material-symbols-outlined">person</span>
              Cuenta
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen w-full md:pl-80">
        <header className="bg-surface fixed top-0 w-full z-50 border-b border-outline-variant flex justify-between items-center px-5 md:px-20 h-20 max-w-[1440px] mx-auto md:hidden">
          <Link href="/" className="text-primary hover:text-secondary transition-colors duration-300 flex items-center">
            <span className="material-symbols-outlined">menu</span>
          </Link>
          <h1 className="font-display text-tertiary uppercase tracking-[0.2em]">JOYERÍA PEÑA</h1>
          <button className="text-primary hover:text-secondary transition-colors duration-300 flex items-center">
            <span className="material-symbols-outlined">shopping_bag</span>
          </button>
        </header>

        <main className="flex-1 px-5 md:px-20 pt-32 pb-30 max-w-[1440px] mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <h1 className="font-display text-display-lg text-tertiary mb-2">Portal de Inventario</h1>
              <p className="font-body text-body-md text-on-surface-variant">
                Administra los niveles de existencias y las solicitudes recientes.
              </p>
            </div>
            <button className="bg-tertiary text-on-tertiary font-body text-button uppercase px-8 py-4 hover:bg-primary transition-colors duration-300 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">add</span>
              Agregar Pieza
            </button>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-30">
            <div className="bg-surface-container-lowest border border-outline-variant/30 p-10 flex flex-col justify-between min-h-[160px]">
              <span className="font-body text-label-caps text-on-surface-variant uppercase tracking-widest">
                SKUs Activos
              </span>
              <span className="font-display text-headline-sm text-tertiary">{metrics.activeSkus}</span>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/30 p-10 flex flex-col justify-between min-h-[160px]">
              <span className="font-body text-label-caps text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
                Alertas de Stock Bajo
                <span className="w-2 h-2 rounded-full bg-secondary-container inline-block" />
              </span>
              <span className="font-display text-headline-sm text-tertiary">{metrics.lowStockAlerts}</span>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/30 p-10 flex flex-col justify-between min-h-[160px]">
              <span className="font-body text-label-caps text-on-surface-variant uppercase tracking-widest">
                Reparaciones Pendientes
              </span>
              <span className="font-display text-headline-sm text-tertiary">{metrics.pendingRepairs}</span>
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-8 border-b border-tertiary pb-4">
              <h2 className="font-display text-headline-sm text-tertiary">Existencias Actuales</h2>
              <div className="relative w-64">
                <span className="material-symbols-outlined absolute left-0 bottom-2 text-on-surface-variant text-[20px]">
                  search
                </span>
                <input
                  className="w-full bg-transparent border-0 border-b border-tertiary focus:ring-0 focus:border-secondary pl-8 py-2 font-body text-label-caps text-tertiary placeholder:text-outline placeholder:tracking-widest uppercase"
                  placeholder="BUSCAR SKU O NOMBRE"
                  type="text"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr>
                    <th className="font-body text-label-caps text-on-surface-variant uppercase pb-4 border-b border-outline-variant/50 w-24">
                      Pieza
                    </th>
                    <th className="font-body text-label-caps text-on-surface-variant uppercase pb-4 border-b border-outline-variant/50">
                      SKU
                    </th>
                    <th className="font-body text-label-caps text-on-surface-variant uppercase pb-4 border-b border-outline-variant/50">
                      Colección
                    </th>
                    <th className="font-body text-label-caps text-on-surface-variant uppercase pb-4 border-b border-outline-variant/50">
                      Stock
                    </th>
                    <th className="font-body text-label-caps text-on-surface-variant uppercase pb-4 border-b border-outline-variant/50">
                      Estado
                    </th>
                    <th className="font-body text-label-caps text-on-surface-variant uppercase pb-4 border-b border-outline-variant/50 text-right">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="font-body text-body-md text-tertiary">
                  {inventory.map((item) => (
                    <tr
                      key={item.sku}
                      className="border-b border-surface-variant h-20 hover:bg-surface-container-low transition-colors duration-200"
                    >
                      <td className="py-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className="w-12 h-12 object-cover border border-outline-variant/30"
                          alt={item.name}
                          src={item.image}
                        />
                      </td>
                      <td className="py-4 font-mono text-sm tracking-wider">{item.sku}</td>
                      <td className="py-4">{item.collection}</td>
                      <td className="py-4">{item.stock}</td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 font-body text-[10px] uppercase tracking-wider ${statusClasses[item.status]}`}
                        >
                          {statusLabel[item.status]}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button className="text-on-surface-variant hover:text-tertiary transition-colors">
                          <span className="material-symbols-outlined">more_horiz</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
