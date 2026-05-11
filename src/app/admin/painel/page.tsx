import { Header } from "@/components/Header";
import { CATEGORIAS } from "@/lib/categorias";
import { getAdminClient, type Documento } from "@/lib/supabase";
import { UploadForm } from "./UploadForm";
import { DocumentoRow } from "./DocumentoRow";

async function listarDocumentos(): Promise<{
  docs: Documento[];
  erro?: string;
}> {
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("documentos")
      .select("*")
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

export default async function PainelPage() {
  const { docs, erro } = await listarDocumentos();

  const porCategoria = new Map<string, Documento[]>();
  for (const d of docs) {
    const lista = porCategoria.get(d.categoria) ?? [];
    lista.push(d);
    porCategoria.set(d.categoria, lista);
  }

  return (
    <>
      <Header title="Painel administrativo" variant="admin" />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">
        {erro && (
          <div className="mb-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900 ring-1 ring-amber-200">
            <p className="font-semibold">Supabase não configurado</p>
            <p className="mt-1 text-xs">{erro}</p>
            <p className="mt-2 text-xs">
              Defina as variáveis no arquivo{" "}
              <code className="rounded bg-white px-1 py-0.5">.env.local</code>{" "}
              e reinicie o servidor.
            </p>
          </div>
        )}

        <section className="mb-8 rounded-2xl bg-surface p-5 shadow-sm ring-1 ring-border">
          <h2 className="mb-1 text-lg font-bold text-foreground">
            Adicionar material
          </h2>
          <p className="mb-4 text-sm text-muted">
            PDFs, imagens ou documentos. Tamanho máximo: 20MB.
          </p>
          <UploadForm />
        </section>

        <section>
          <h2 className="mb-4 text-lg font-bold text-foreground">
            Materiais publicados ({docs.length})
          </h2>

          {docs.length === 0 && !erro && (
            <div className="rounded-2xl bg-surface px-6 py-12 text-center ring-1 ring-border">
              <p className="text-sm text-muted">
                Nenhum material publicado ainda. Adicione o primeiro acima.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-6">
            {CATEGORIAS.map((cat) => {
              const lista = porCategoria.get(cat.slug) ?? [];
              if (lista.length === 0) return null;
              return (
                <div key={cat.slug}>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted">
                    {cat.titulo} ({lista.length})
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {lista.map((doc) => (
                      <DocumentoRow key={doc.id} doc={doc} />
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
