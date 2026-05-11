"use client";

import { useState, useRef, useTransition } from "react";
import { Upload } from "lucide-react";
import { createUploadUrlAction, confirmUploadAction } from "@/actions/admin";
import { getBrowserClient, BUCKET } from "@/lib/supabase";
import { CATEGORIAS } from "@/lib/categorias";

const MAX_FILE_MB = 50;

type Feedback = { kind: "error" | "success"; text: string } | null;

export function UploadForm() {
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFeedback(null);

    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    const categoria = String(data.get("categoria") ?? "");
    const titulo = String(data.get("titulo") ?? "").trim();
    const descricao = String(data.get("descricao") ?? "").trim();
    const file = data.get("arquivo") as File | null;

    if (!categoria) {
      setFeedback({ kind: "error", text: "Selecione uma categoria." });
      return;
    }
    if (titulo.length < 2) {
      setFeedback({ kind: "error", text: "Informe um título." });
      return;
    }
    if (!file || file.size === 0) {
      setFeedback({ kind: "error", text: "Selecione um arquivo." });
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setFeedback({
        kind: "error",
        text: `Arquivo maior que ${MAX_FILE_MB}MB.`,
      });
      return;
    }

    startTransition(async () => {
      const prep = await createUploadUrlAction(categoria, titulo, file.name);
      if (!prep.ok) {
        setFeedback({ kind: "error", text: prep.error });
        return;
      }

      const supabase = getBrowserClient();
      const { error: uploadErr } = await supabase.storage
        .from(BUCKET)
        .uploadToSignedUrl(prep.path, prep.token, file, {
          contentType: file.type || undefined,
          upsert: false,
        });
      if (uploadErr) {
        setFeedback({
          kind: "error",
          text: `Erro no upload: ${uploadErr.message}`,
        });
        return;
      }

      const ext = (file.name.split(".").pop() ?? "bin").toLowerCase();
      const result = await confirmUploadAction(
        categoria,
        titulo,
        descricao,
        prep.path,
        prep.publicUrl,
        ext
      );
      if (!result.ok) {
        setFeedback({ kind: "error", text: result.error });
        return;
      }

      setFeedback({
        kind: "success",
        text: "Documento adicionado com sucesso.",
      });
      formEl.reset();
    });
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-3">
      <label className="flex flex-col gap-1">
        <span className="text-xs font-medium text-muted">Categoria</span>
        <select
          name="categoria"
          required
          defaultValue=""
          className="rounded-xl border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
        >
          <option value="" disabled>
            Selecione...
          </option>
          {CATEGORIAS.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.titulo}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-xs font-medium text-muted">Título</span>
        <input
          type="text"
          name="titulo"
          required
          maxLength={80}
          placeholder="Ex: Tabela de preços nylon — Maio 2026"
          className="rounded-xl border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-xs font-medium text-muted">
          Descrição (opcional)
        </span>
        <input
          type="text"
          name="descricao"
          maxLength={140}
          placeholder="Detalhes ou observação"
          className="rounded-xl border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-xs font-medium text-muted">
          Arquivo (até {MAX_FILE_MB}MB)
        </span>
        <input
          type="file"
          name="arquivo"
          required
          accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx,.xls,.xlsx"
          className="rounded-xl border border-border bg-surface px-3 py-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-brand/10 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-brand"
        />
      </label>

      {feedback?.kind === "error" && (
        <p className="text-sm text-red-600">{feedback.text}</p>
      )}
      {feedback?.kind === "success" && (
        <p className="text-sm text-emerald-700">{feedback.text}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98] hover:bg-brand-dark disabled:opacity-50"
      >
        <Upload className="h-4 w-4" />
        {pending ? "Enviando..." : "Publicar material"}
      </button>
    </form>
  );
}
