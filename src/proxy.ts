import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const rep = request.cookies.get("linhanyl_rep")?.value === "1";
  const empresa = request.cookies.get("linhanyl_empresa")?.value;
  const admin = request.cookies.get("linhanyl_admin")?.value === "1";

  const isRepArea =
    pathname.startsWith("/home") ||
    pathname.startsWith("/categoria") ||
    pathname.startsWith("/contatos");

  const isSelecionar = pathname.startsWith("/selecionar");
  const isAdminPanel = pathname.startsWith("/admin/painel");

  if (isSelecionar) {
    if (!rep) return NextResponse.redirect(new URL("/", request.url));
  }

  if (isRepArea) {
    if (!rep) return NextResponse.redirect(new URL("/", request.url));
    if (!empresa) return NextResponse.redirect(new URL("/selecionar", request.url));
  }

  if (isAdminPanel) {
    if (!admin) return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/selecionar/:path*",
    "/home/:path*",
    "/categoria/:path*",
    "/contatos/:path*",
    "/admin/painel/:path*",
  ],
};
