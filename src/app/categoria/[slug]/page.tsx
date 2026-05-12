import { notFound, redirect } from "next/navigation";
import { FileText, ImageIcon, Download } from "lucide-react";
import { Header } from "@/components/Header";
import { getCategoria } from "@/lib/categorias";
import { getPublicClient, type Documento } from "@/lib/supabase";
import { getEmpresa } from "@/lib/auth";
import type { EmpresaSlug } from "@/lib/empresas";

type Params = { slug: string };

async function fetchDocumentos(
  categoria: string,
  empresa: EmpresaSlug
): Promise<{
  docs: Documento[];
  erro?: string;
}> {
  try {
    const supabase = getPublicClient();
    const { data, error } = await supabase
      .from("documentos")
      .select("*")
      .eq("categoria", categoria)
      .eq("empresa", empresa)
      .order("criado_em", { ascending: false });
    if (error) return { docs: [], erro: error.message };
    return { docs: (data ?? []) as Documento[] };
  } catch (e) {
    return {
      docs: [],
      erro: e instanceof Error ? e.message : "Falha ao carregar.",
    };
  }
}

function formatarData(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const categoria = getCategoria(slug);
  if (!categoria) notFound();

  const empresa = await getEmpresa();
  if (!empresa) redirect("/selecionar");

  const { docs, erro } = await fetchDocumentos(slug, empresa);

  return (
    <>
      <Header backHref="/home" title={categoria.titulo} empresa={empresa} />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">
        {erro && (
          <div className="mb-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900 ring-1 ring-amber-200">
            <p className="font-semibold">Configuração pendente</p>
            <p className="mt-1 text-xs">{erro}</p>
          </div>
        )}

        {!erro && docs.length === 0 && (
          <div className="rounded-2xl bg-surface px-6 py-12 text-center ring-1 ring-border">
            <p className="text-sm text-muted">
              Nenhum material disponível ainda nesta categoria.
            </p>
          </div>
        )}

        <ul className="flex flex-col gap-3">
          {docs.map((doc) => (
            <li
              key={doc.id}
              className="rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  {doc.tipo === "imagem" ? (
                    <ImageIcon className="h-5 w-5" />
                  ) : (
                    <FileText className="h-5 w-5" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-base font-semibold text-foreground">
                    {doc.titulo}
                  </h2>
                  {doc.descricao && (
                    <p className="mt-0.5 line-clamp-2 text-sm text-muted">
                      {doc.descricao}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-muted">
                    {formatarData(doc.criado_em)}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <a
                  href={doc.arquivo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-xl bg-brand py-2 text-center text-sm font-semibold text-white active:scale-[0.98] hover:bg-brand-dark"
                >
                  Abrir
                </a>
                <a
                  href={doc.arquivo_url}
                  download
                  className="flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-border text-foreground hover:bg-background"
                  aria-label="Baixar"
                >
                  <Download className="h-4 w-4" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
