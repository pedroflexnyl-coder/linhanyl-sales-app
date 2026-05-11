"use client";

import { useActionState } from "react";
import { repLoginAction } from "@/actions/auth";

export function LoginForm() {
  const [state, action, pending] = useActionState(repLoginAction, null);

  return (
    <form action={action} className="flex w-full flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-foreground">
          Senha de acesso
        </span>
        <input
          type="password"
          name="password"
          required
          autoFocus
          inputMode="numeric"
          autoComplete="current-password"
          placeholder="••••"
          className="rounded-xl border border-border bg-surface px-4 py-3 text-lg outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
        />
      </label>
      {state?.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-brand py-3 text-base font-semibold text-white shadow-sm transition active:scale-[0.98] hover:bg-brand-dark disabled:opacity-50"
      >
        {pending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
