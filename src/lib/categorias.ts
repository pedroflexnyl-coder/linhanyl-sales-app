import {
  BookOpen,
  DollarSign,
  Palette,
  FileText,
  GraduationCap,
  Phone,
  type LucideIcon,
} from "lucide-react";

export type CategoriaSlug =
  | "catalogo"
  | "precos"
  | "cartelas"
  | "politicas"
  | "treinamentos";

export type Categoria = {
  slug: CategoriaSlug;
  titulo: string;
  descricao: string;
  icone: LucideIcon;
};

export const CATEGORIAS: Categoria[] = [
  {
    slug: "catalogo",
    titulo: "Catálogo de Produtos",
    descricao: "Linhas, fios e produtos",
    icone: BookOpen,
  },
  {
    slug: "precos",
    titulo: "Listas de Preços",
    descricao: "Tabelas vigentes",
    icone: DollarSign,
  },
  {
    slug: "cartelas",
    titulo: "Cartelas de Cores",
    descricao: "Mostruários e referências",
    icone: Palette,
  },
  {
    slug: "politicas",
    titulo: "Políticas Comerciais",
    descricao: "Condições e regras",
    icone: FileText,
  },
  {
    slug: "treinamentos",
    titulo: "Treinamentos & Materiais",
    descricao: "Apresentações e guias",
    icone: GraduationCap,
  },
];

export const ITEM_CONTATOS = {
  slug: "contatos" as const,
  titulo: "Contatos Úteis",
  descricao: "Fábrica, financeiro e SAC",
  icone: Phone,
};

export function getCategoria(slug: string): Categoria | undefined {
  return CATEGORIAS.find((c) => c.slug === slug);
}
