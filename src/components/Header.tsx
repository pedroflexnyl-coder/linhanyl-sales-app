import Link from "next/link";
import { ArrowLeft, LogOut } from "lucide-react";
import { Logo } from "./Logo";
import { repLogoutAction, adminLogoutAction } from "@/actions/auth";

type Props = {
  backHref?: string;
  title?: string;
  variant?: "rep" | "admin";
};

export function Header({ backHref, title, variant = "rep" }: Props) {
  const logoutAction = variant === "admin" ? adminLogoutAction : repLogoutAction;

  return (
    <header className="safe-top sticky top-0 z-10 bg-brand text-white shadow-sm">
      <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
        {backHref ? (
          <Link
            href={backHref}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10"
            aria-label="Voltar"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
        ) : (
          <Logo size="sm" tone="white" />
        )}
        {title && (
          <h1 className="flex-1 truncate text-base font-semibold">{title}</h1>
        )}
        {!title && <div className="flex-1" />}
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10"
            aria-label="Sair"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </form>
      </div>
    </header>
  );
}
