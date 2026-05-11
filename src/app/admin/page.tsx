import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminAuthed } from "@/lib/auth";
import { LogoBlock } from "@/components/Logo";
import { AdminLoginForm } from "./AdminLoginForm";

export default async function AdminLoginPage() {
  if (await isAdminAuthed()) redirect("/admin/painel");

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-12">
      <div className="flex w-full max-w-sm flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-2">
          <LogoBlock />
          <span className="mt-2 rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-foreground">
            Acesso administrador
          </span>
        </div>
        <AdminLoginForm />
        <Link
          href="/"
          className="text-xs text-muted underline-offset-4 hover:underline"
        >
          ← Voltar para acesso de representante
        </Link>
      </div>
    </main>
  );
}
