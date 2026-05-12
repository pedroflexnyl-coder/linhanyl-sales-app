import { redirect } from "next/navigation";
import Link from "next/link";
import { isRepAuthed, getEmpresa } from "@/lib/auth";
import { LogoBlock } from "@/components/Logo";
import { LoginForm } from "./LoginForm";

export default async function Page() {
  if (await isRepAuthed()) {
    const empresa = await getEmpresa();
    redirect(empresa ? "/home" : "/selecionar");
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-12">
      <div className="flex w-full max-w-sm flex-col items-center gap-10">
        <LogoBlock />
        <LoginForm />
        <Link
          href="/admin"
          className="text-xs text-muted underline-offset-4 hover:underline"
        >
          Acesso administrador
        </Link>
      </div>
    </main>
  );
}
