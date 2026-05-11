"use server";

import { revalidatePath } from "next/cache";
import { isAdminAuthed } from "@/lib/auth";
import { getAdminClient, BUCKET } from "@/lib/supabase";

const CATEGORIAS_VALIDAS = new Set([
  "catalogo",
  "precos",
  "cartelas",
  "politicas",
  "treinamentos",
]);

export async function uploadDocumentoAction(
  _prev: unknown,
  formData: FormData
): Promise<{ error?: string; success?: string }> {
  if (!(await isAdminAuthed())) {
    return { error: "Não autorizado." };
  }

  const categoria = String(formData.get("categoria") ?? "");
  const titulo = String(formData.get("titulo") ?? "").trim();
  const descricao = String(formData.get("descricao") ?? "").trim();
  const file = formData.get("arquivo") as File | null;

  if (!CATEGORIAS_VALIDAS.has(categoria)) return { error: "Categoria inválida." };
  if (titulo.length < 2) return { error: "Informe um título." };
  if (!file || file.size === 0) return { error: "Selecione um arquivo." };
  if (file.size > 20 * 1024 * 1024) return { error: "Arquivo maior que 20MB." };

  const supabase = getAdminClient();
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const safeName = titulo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
  const path = `${categoria}/${Date.now()}-${safeName}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const { error: uploadErr } = await supabase.storage
    .from(BUCKET)
    .upload(path, buffer, { contentType: file.type, upsert: false });
  if (uploadErr) return { error: `Erro no upload: ${uploadErr.message}` };

  const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
  const tipo = ext === "pdf" ? "pdf" : ["png", "jpg", "jpeg", "webp"].includes(ext) ? "imagem" : "outro";

  const { error: dbErr } = await supabase.from("documentos").insert({
    categoria,
    titulo,
    descricao: descricao || null,
    arquivo_url: pub.publicUrl,
    arquivo_path: path,
    tipo,
  });
  if (dbErr) {
    await supabase.storage.from(BUCKET).remove([path]);
    return { error: `Erro ao salvar: ${dbErr.message}` };
  }

  revalidatePath("/admin/painel");
  revalidatePath(`/categoria/${categoria}`);
  return { success: "Documento adicionado com sucesso." };
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
