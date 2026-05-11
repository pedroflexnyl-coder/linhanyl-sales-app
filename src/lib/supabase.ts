import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const BUCKET = "documentos";

// Client for read-only public reads (uses anon key, no session)
export function getPublicClient() {
  if (!url || !anonKey) {
    throw new Error(
      "Supabase não configurado. Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no .env.local"
    );
  }
  return createClient(url, anonKey, { auth: { persistSession: false } });
}

// Browser client — uses publishable key. Safe to call from client components.
export function getBrowserClient() {
  if (!url || !anonKey) {
    throw new Error("Supabase não configurado.");
  }
  return createClient(url, anonKey, { auth: { persistSession: false } });
}

// Server-side admin client — only for server actions/routes guarded by admin auth
export function getAdminClient() {
  if (!url || !serviceKey) {
    throw new Error(
      "Supabase admin não configurado. Defina SUPABASE_SERVICE_ROLE_KEY no .env.local"
    );
  }
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

export type Documento = {
  id: string;
  categoria: string;
  titulo: string;
  descricao: string | null;
  arquivo_url: string;
  arquivo_path: string;
  tipo: string;
  criado_em: string;
};
