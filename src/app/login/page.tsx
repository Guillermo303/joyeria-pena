"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "No se pudo iniciar sesión.");
        return;
      }
      router.push("/cuenta");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="flex-grow pt-20 flex items-center justify-center px-5 md:px-20 py-24">
        <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant/30 p-10">
          <h1 className="font-display text-headline-md text-tertiary mb-2">Iniciar Sesión</h1>
          <p className="font-body text-body-md text-on-surface-variant mb-10">
            Accede a tu cuenta de Joyería Peña.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <label className="flex flex-col gap-2">
              <span className="font-body text-label-caps text-on-surface-variant uppercase tracking-widest">
                Correo Electrónico
              </span>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-tertiary focus:ring-0 focus:border-secondary py-2 font-body text-body-md text-tertiary"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-body text-label-caps text-on-surface-variant uppercase tracking-widest">
                Contraseña
              </span>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              className="bg-tertiary text-on-tertiary font-body text-button uppercase px-8 py-4 hover:bg-primary transition-colors duration-300 disabled:opacity-60"
            >
              {loading ? "Ingresando…" : "Ingresar"}
            </button>
          </form>

          <p className="font-body text-body-md text-on-surface-variant mt-8">
            ¿No tienes cuenta?{" "}
            <Link href="/registro" className="text-secondary hover:text-primary transition-colors duration-300">
              Regístrate
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
