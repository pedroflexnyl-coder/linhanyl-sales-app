import { Trash2, ExternalLink, FileText, ImageIcon } from "lucide-react";
import { deleteDocumentoAction } from "@/actions/admin";
import type { Documento } from "@/lib/supabase";

export function DocumentoRow({ doc }: { doc: Documento }) {
  return (
    <li className="flex items-center gap-3 rounded-xl bg-surface p-3 ring-1 ring-border">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
        {doc.tipo === "imagem" ? (
          <ImageIcon className="h-4 w-4" />
        ) : (
          <FileText className="h-4 w-4" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">
          {doc.titulo}
        </p>
        {doc.descricao && (
          <p className="truncate text-xs text-muted">{doc.descricao}</p>
        )}
      </div>
      <a
        href={doc.arquivo_url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-background hover:text-foreground"
        aria-label="Abrir"
      >
        <ExternalLink className="h-4 w-4" />
      </a>
      <form action={deleteDocumentoAction}>
        <input type="hidden" name="id" value={doc.id} />
        <input type="hidden" name="path" value={doc.arquivo_path} />
        <input type="hidden" name="categoria" value={doc.categoria} />
        <button
          type="submit"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-red-600 hover:bg-red-50"
          aria-label="Excluir"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </form>
    </li>
  );
}
