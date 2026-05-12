import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { getEmpresa } from "@/lib/auth";
import { CONTATOS_POR_EMPRESA } from "@/lib/contatos";
import { EMPRESAS } from "@/lib/empresas";

export default async function ContatosPage() {
  const empresa = await getEmpresa();
  if (!empresa) redirect("/selecionar");

  const { contatos, endereco } = CONTATOS_POR_EMPRESA[empresa];
  const emp = EMPRESAS[empresa];

  return (
    <>
      <Header backHref="/home" title="Contatos Úteis" empresa={empresa} />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">
        <p className="mb-4 text-sm text-muted">
          Contatos da <span className="font-semibold text-brand">{emp.nome}</span>.
        </p>
        <ul className="flex flex-col gap-3">
          {contatos.map((c) => (
            <li
              key={c.setor}
              className="rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border"
            >
              <h2 className="text-base font-semibold text-foreground">
                {c.setor}
              </h2>
              {c.descricao && (
                <p className="mt-0.5 text-sm text-muted">{c.descricao}</p>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {c.telefone && (
                  <a
                    href={`tel:${c.telefone.replace(/\D/g, "")}`}
                    className="flex items-center gap-2 rounded-xl bg-brand/10 px-3 py-2 text-sm font-medium text-brand active:scale-[0.98]"
                  >
                    <Phone className="h-4 w-4" />
                    {c.telefone}
                  </a>
                )}
                {c.whatsapp && (
                  <a
                    href={`https://wa.me/${c.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 active:scale-[0.98]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                )}
                {c.email && (
                  <a
                    href={`mailto:${c.email}`}
                    className="flex items-center gap-2 rounded-xl bg-background px-3 py-2 text-sm font-medium text-foreground ring-1 ring-border active:scale-[0.98]"
                  >
                    <Mail className="h-4 w-4" />
                    {c.email}
                  </a>
                )}
              </div>
            </li>
          ))}

          <li className="rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border">
            <h2 className="text-base font-semibold text-foreground">
              Endereço
            </h2>
            <p className="mt-1 text-sm text-muted">{endereco.texto}</p>
            <a
              href={endereco.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-brand/10 px-3 py-2 text-sm font-medium text-brand active:scale-[0.98]"
            >
              <MapPin className="h-4 w-4" />
              Ver no mapa
            </a>
          </li>
        </ul>

        <p className="mt-6 text-center text-xs text-muted">
          Para atualizar contatos, editar{" "}
          <code className="rounded bg-background px-1 py-0.5">
            src/lib/contatos.ts
          </code>
        </p>
      </main>
    </>
  );
}
