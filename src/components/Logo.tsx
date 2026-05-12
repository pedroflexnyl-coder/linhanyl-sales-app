import type { EmpresaSlug } from "@/lib/empresas";
import { EMPRESAS } from "@/lib/empresas";

type Props = {
  size?: "sm" | "md" | "lg";
  tone?: "brand" | "white";
  empresa?: EmpresaSlug;
};

export function Logo({ size = "md", tone = "brand", empresa = "linhanyl" }: Props) {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  } as const;
  const color = tone === "white" ? "text-white" : "text-brand";
  const emp = EMPRESAS[empresa];

  return (
    <span className={`font-bold tracking-tight ${sizes[size]} ${color}`}>
      {emp.nome}
      <span className="font-light opacity-70">®</span>
    </span>
  );
}

export function LogoBlock({ empresa = "linhanyl" }: { empresa?: EmpresaSlug }) {
  const emp = EMPRESAS[empresa];
  return (
    <div className="flex flex-col items-center gap-1">
      <Logo size="lg" empresa={empresa} />
      <span className="text-xs uppercase tracking-[0.2em] text-muted">
        {emp.tagline}
      </span>
    </div>
  );
}
