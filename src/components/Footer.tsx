import Link from "next/link";

const footerLinks = [
  { href: "#", label: "Aviso de Privacidad" },
  { href: "#", label: "Términos de Servicio" },
  { href: "#", label: "Envíos y Devoluciones" },
  { href: "#", label: "Contacto" },
];

export default function Footer() {
  return (
    <footer className="w-full py-16 bg-surface-container-lowest border-t border-outline-variant flex flex-col items-center gap-8 px-5 md:px-20">
      <Link href="/" className="font-display text-headline-sm tracking-widest text-tertiary uppercase">
        JOYERÍA PEÑA
      </Link>
      <nav aria-label="Navegación del pie de página" className="flex flex-wrap justify-center gap-x-8 gap-y-4">
        {footerLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="font-body text-body-md text-on-surface-variant hover:text-secondary transition-colors duration-200 opacity-80 hover:opacity-100"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <p className="font-body text-label-caps text-on-surface-variant/60 text-center">
        © 2026 JOYERÍA PEÑA. TODOS LOS DERECHOS RESERVADOS.
      </p>
    </footer>
  );
}
