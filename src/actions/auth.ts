"use server";

import { redirect } from "next/navigation";
import {
  loginRep,
  loginAdmin,
  logoutRep,
  logoutAdmin,
  setEmpresa,
  clearEmpresa,
} from "@/lib/auth";
import { isEmpresaSlug } from "@/lib/empresas";

export async function repLoginAction(_prev: unknown, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const ok = await loginRep(password);
  if (!ok) {
    return { error: "Senha incorreta. Tente novamente." };
  }
  redirect("/selecionar");
}

export async function adminLoginAction(_prev: unknown, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const ok = await loginAdmin(password);
  if (!ok) {
    return { error: "Senha de administrador incorreta." };
  }
  redirect("/admin/painel");
}

export async function repLogoutAction() {
  await logoutRep();
  redirect("/");
}

export async function adminLogoutAction() {
  await logoutAdmin();
  redirect("/admin");
}

export async function selecionarEmpresaAction(formData: FormData) {
  const empresa = String(formData.get("empresa") ?? "");
  if (!isEmpresaSlug(empresa)) {
    redirect("/selecionar");
  }
  await setEmpresa(empresa);
  redirect("/home");
}

export async function trocarEmpresaAction() {
  await clearEmpresa();
  redirect("/selecionar");
}
