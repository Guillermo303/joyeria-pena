"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/colecciones", label: "Colecciones" },
  { href: "/#bespoke", label: "A Medida" },
  { href: "/#heritage", label: "Nosotros" },
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
  }, [drawerOpen]);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out backdrop-blur-md border-b border-outline-variant ${
          scrolled ? "bg-surface-container-lowest/95 shadow-sm" : "bg-surface/90"
        }`}
      >
        <div className="flex justify-between items-center px-5 md:px-20 h-20 w-full max-w-[1440px] mx-auto">
          <button
            aria-label="Abrir menú"
            className="text-tertiary hover:text-secondary transition-colors duration-300 md:hidden flex items-center justify-center p-2"
            onClick={() => setDrawerOpen(true)}
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          <nav aria-label="Navegación principal" className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-label-caps text-tertiary hover:text-secondary transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-secondary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <Link
            href="/"
            className="font-display text-display-lg tracking-[0.2em] text-tertiary absolute left-1/2 transform -translate-x-1/2 uppercase text-lg md:text-xl"
          >
            JOYERÍA PEÑA
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/portal"
              className="hidden md:flex font-body text-label-caps text-tertiary hover:text-secondary transition-colors duration-300 relative group"
            >
              Portal Inventario
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-secondary transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="#"
              className="hidden md:flex font-body text-label-caps text-tertiary hover:text-secondary transition-colors duration-300 relative group"
            >
              Cuenta
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-secondary transition-all duration-300 group-hover:w-full" />
            </Link>
            <button
              aria-label="Bolsa de compras"
              className="text-tertiary hover:text-secondary transition-colors duration-300 flex items-center justify-center p-2"
            >
              <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        aria-hidden={!drawerOpen}
        className={`fixed inset-y-0 left-0 z-[60] flex flex-col p-8 h-full w-80 bg-background shadow-2xl transform transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-12">
          <span className="font-display text-headline-md tracking-widest text-tertiary uppercase">
            Joyería Peña
          </span>
          <button
            aria-label="Cerrar menú"
            className="text-tertiary hover:text-secondary transition-colors duration-300"
            onClick={() => setDrawerOpen(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav className="flex flex-col gap-8 flex-grow">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setDrawerOpen(false)}
              className="font-body text-label-caps text-on-surface-variant hover:text-secondary transition-colors duration-300 flex items-center gap-4 group"
            >
              <span className="material-symbols-outlined group-hover:text-secondary">diamond</span>
              {link.label}
            </Link>
          ))}
          <Link
            href="/portal"
            onClick={() => setDrawerOpen(false)}
            className="font-body text-label-caps text-on-surface-variant hover:text-secondary transition-colors duration-300 flex items-center gap-4 group mt-auto"
          >
            <span className="material-symbols-outlined group-hover:text-secondary">inventory_2</span>
            Portal Inventario
          </Link>
          <Link
            href="#"
            onClick={() => setDrawerOpen(false)}
            className="font-body text-label-caps text-on-surface-variant hover:text-secondary transition-colors duration-300 flex items-center gap-4 group"
          >
            <span className="material-symbols-outlined group-hover:text-secondary">person</span>
            Cuenta
          </Link>
        </nav>
      </div>
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-tertiary/20 z-[55] backdrop-blur-sm"
          onClick={() => setDrawerOpen(false)}
        />
      )}
    </>
  );
}
