import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";

type Props = {
  href: string;
  titulo: string;
  descricao: string;
  Icone: LucideIcon;
};

export function CategoryCard({ href, titulo, descricao, Icone }: Props) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-border transition active:scale-[0.98] hover:shadow-md"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
        <Icone className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="truncate text-base font-semibold text-foreground">
          {titulo}
        </h2>
        <p className="truncate text-sm text-muted">{descricao}</p>
      </div>
      <ChevronRight className="h-5 w-5 text-muted" />
    </Link>
  );
}
