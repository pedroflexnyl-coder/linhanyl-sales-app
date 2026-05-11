"use client";

import { useActionState, useRef, useEffect } from "react";
import { Upload } from "lucide-react";
import { uploadDocumentoAction } from "@/actions/admin";
import { CATEGORIAS } from "@/lib/categorias";

export function UploadForm() {
  const [state, action, pending] = useActionState(uploadDocumentoAction, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={action} className="flex flex-col gap-3">
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
        <span className="text-xs font-medium text-muted">Arquivo</span>
        <input
          type="file"
          name="arquivo"
          required
          accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx,.xls,.xlsx"
          className="rounded-xl border border-border bg-surface px-3 py-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-brand/10 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-brand"
        />
      </label>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state?.success && (
        <p className="text-sm text-emerald-700">{state.success}</p>
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
