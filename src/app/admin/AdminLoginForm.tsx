"use client";

import { useActionState } from "react";
import { adminLoginAction } from "@/actions/auth";

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(adminLoginAction, null);

  return (
    <form action={action} className="flex w-full flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-foreground">
          Senha de administrador
        </span>
        <input
          type="password"
          name="password"
          required
          autoFocus
          autoComplete="current-password"
          placeholder="Sua senha"
          className="rounded-xl border border-border bg-surface px-4 py-3 text-lg outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
        />
      </label>
      {state?.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-foreground py-3 text-base font-semibold text-white shadow-sm transition active:scale-[0.98] hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Entrando..." : "Entrar como administrador"}
      </button>
    </form>
  );
}
