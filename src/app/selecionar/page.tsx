import { redirect } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { isRepAuthed } from "@/lib/auth";
import { EMPRESAS_LISTA } from "@/lib/empresas";
import { selecionarEmpresaAction, repLogoutAction } from "@/actions/auth";

export default async function SelecionarPage() {
  if (!(await isRepAuthed())) redirect("/");

  return (
    <main className="flex flex-1 flex-col px-6 py-10">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-8">
        <header className="flex flex-col items-center gap-2 pt-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Selecione a empresa
          </h1>
          <p className="text-sm text-muted">
            Qual marca você quer consultar agora?
          </p>
        </header>

        <div className="flex flex-col gap-3">
          {EMPRESAS_LISTA.map((emp) => (
            <form key={emp.slug} action={selecionarEmpresaAction}>
              <input type="hidden" name="empresa" value={emp.slug} />
              <button
                type="submit"
                className="flex w-full items-center gap-4 rounded-2xl bg-surface p-5 shadow-sm ring-1 ring-border transition active:scale-[0.98] hover:shadow-md hover:ring-brand/30"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                  <span className="text-xl font-bold">
                    {emp.nome[0]}
                  </span>
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <h2 className="text-lg font-bold text-foreground">
                    {emp.nome}
                    <span className="ml-0.5 text-xs font-normal text-muted">®</span>
                  </h2>
                  <p className="truncate text-xs uppercase tracking-wider text-muted">
                    {emp.tagline}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted" />
              </button>
            </form>
          ))}
        </div>

        <form action={repLogoutAction} className="mt-auto pt-8 text-center">
          <button
            type="submit"
            className="text-xs text-muted underline-offset-4 hover:underline"
          >
            Sair do app
          </button>
        </form>
      </div>
    </main>
  );
}
