import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getAllUsers } from "@/lib/users";
import UsersTable from "@/components/admin/UsersTable";
import CreateUserForm from "@/components/admin/CreateUserForm";

export const metadata = {
  title: "Joyería Peña - Usuarios",
};

export default async function UsuariosPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "admin") {
    redirect("/admin");
  }

  const users = await getAllUsers();

  return (
    <div>
      <h1 className="font-display text-headline-md text-tertiary mb-2">Usuarios</h1>
      <p className="font-body text-body-md text-on-surface-variant mb-12">
        Administra las cuentas de staff (vendedores/cajeros, socios y admins) y las cuentas de
        clientes registrados en la tienda.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <UsersTable initialUsers={users} currentUserId={currentUser.userId} />
        </div>
        <div className="lg:col-span-4">
          <CreateUserForm />
        </div>
      </div>
    </div>
  );
}
