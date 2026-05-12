"use server";

import { revalidatePath } from "next/cache";
import { isAdminAuthed } from "@/lib/auth";
import { getAdminClient, BUCKET } from "@/lib/supabase";
import { isEmpresaSlug } from "@/lib/empresas";

const CATEGORIAS_VALIDAS = new Set([
  "catalogo",
  "precos",
  "cartelas",
  "politicas",
  "treinamentos",
]);

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

export type CreateUploadUrlResult =
  | { ok: true; signedUrl: string; token: string; path: string; publicUrl: string }
  | { ok: false; error: string };

export async function createUploadUrlAction(
  empresa: string,
  categoria: string,
  titulo: string,
  filename: string
): Promise<CreateUploadUrlResult> {
  if (!(await isAdminAuthed())) {
    return { ok: false, error: "Não autorizado." };
  }
  if (!isEmpresaSlug(empresa)) {
    return { ok: false, error: "Empresa inválida." };
  }
  if (!CATEGORIAS_VALIDAS.has(categoria)) {
    return { ok: false, error: "Categoria inválida." };
  }
  if (titulo.trim().length < 2) {
    return { ok: false, error: "Informe um título." };
  }

  const ext = (filename.split(".").pop() ?? "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
  const path = `${empresa}/${categoria}/${Date.now()}-${slugify(titulo)}.${ext}`;

  const supabase = getAdminClient();
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUploadUrl(path);
  if (error || !data) {
    return { ok: false, error: `Erro ao preparar upload: ${error?.message ?? "desconhecido"}` };
  }

  const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);

  return {
    ok: true,
    signedUrl: data.signedUrl,
    token: data.token,
    path: data.path,
    publicUrl: pub.publicUrl,
  };
}

export type ConfirmUploadResult = { ok: true } | { ok: false; error: string };

export async function confirmUploadAction(
  empresa: string,
  categoria: string,
  titulo: string,
  descricao: string,
  path: string,
  publicUrl: string,
  ext: string
): Promise<ConfirmUploadResult> {
  if (!(await isAdminAuthed())) {
    return { ok: false, error: "Não autorizado." };
  }
  if (!isEmpresaSlug(empresa)) {
    return { ok: false, error: "Empresa inválida." };
  }
  if (!CATEGORIAS_VALIDAS.has(categoria)) {
    return { ok: false, error: "Categoria inválida." };
  }

  const tipo =
    ext === "pdf"
      ? "pdf"
      : ["png", "jpg", "jpeg", "webp"].includes(ext)
        ? "imagem"
        : "outro";

  const supabase = getAdminClient();
  const { error } = await supabase.from("documentos").insert({
    empresa,
    categoria,
    titulo: titulo.trim(),
    descricao: descricao.trim() || null,
    arquivo_url: publicUrl,
    arquivo_path: path,
    tipo,
  });
  if (error) {
    await supabase.storage.from(BUCKET).remove([path]);
    return { ok: false, error: `Erro ao salvar: ${error.message}` };
  }

  revalidatePath("/admin/painel");
  revalidatePath(`/categoria/${categoria}`);
  return { ok: true };
}

export async function deleteDocumentoAction(formData: FormData): Promise<void> {
  if (!(await isAdminAuthed())) return;

  const id = String(formData.get("id") ?? "");
  const path = String(formData.get("path") ?? "");
  const categoria = String(formData.get("categoria") ?? "");
  if (!id) return;

  const supabase = getAdminClient();
  if (path) await supabase.storage.from(BUCKET).remove([path]);
  await supabase.from("documentos").delete().eq("id", id);

  revalidatePath("/admin/painel");
  if (categoria) revalidatePath(`/categoria/${categoria}`);
}
