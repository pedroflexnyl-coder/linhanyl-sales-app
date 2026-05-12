export type EmpresaSlug = "linhanyl" | "flexnyl";

export type Empresa = {
  slug: EmpresaSlug;
  nome: string;
  tagline: string;
  cor: string;
  corEscura: string;
};

export const EMPRESAS: Record<EmpresaSlug, Empresa> = {
  linhanyl: {
    slug: "linhanyl",
    nome: "Linhanyl",
    tagline: "Qualidade em todos os pontos",
    cor: "#2d7a2d",
    corEscura: "#1e5c1e",
  },
  flexnyl: {
    slug: "flexnyl",
    nome: "Flexnyl",
    tagline: "Nyl Zíperes",
    cor: "#2d7a2d",
    corEscura: "#1e5c1e",
  },
};

export const EMPRESAS_LISTA: Empresa[] = [
  EMPRESAS.linhanyl,
  EMPRESAS.flexnyl,
];

export function isEmpresaSlug(s: string): s is EmpresaSlug {
  return s === "linhanyl" || s === "flexnyl";
}
