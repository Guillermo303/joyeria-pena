import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LogoutButton from "@/components/LogoutButton";
import { getCurrentUser } from "@/lib/auth";

export const metadata = {
  title: "Joyería Peña - Mi Cuenta",
};

export default async function CuentaPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <Header />
      <main className="flex-grow pt-20 flex items-center justify-center px-5 md:px-20 py-24">
        <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant/30 p-10">
          <h1 className="font-display text-headline-md text-tertiary mb-2">Mi Cuenta</h1>
          <p className="font-body text-body-md text-on-surface-variant mb-10">
            Bienvenido de vuelta, {user.name}.
          </p>

          <dl className="flex flex-col gap-6 mb-10">
            <div>
              <dt className="font-body text-label-caps text-on-surface-variant uppercase tracking-widest mb-1">
                Nombre
              </dt>
              <dd className="font-body text-body-md text-tertiary">{user.name}</dd>
            </div>
            <div>
              <dt className="font-body text-label-caps text-on-surface-variant uppercase tracking-widest mb-1">
                Correo Electrónico
              </dt>
              <dd className="font-body text-body-md text-tertiary">{user.email}</dd>
            </div>
          </dl>

          <LogoutButton />
        </div>
      </main>
      <Footer />
    </>
  );
}
