import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isRepArea =
    pathname.startsWith("/home") ||
    pathname.startsWith("/categoria") ||
    pathname.startsWith("/contatos");

  const isAdminPanel = pathname.startsWith("/admin/painel");

  if (isRepArea) {
    const rep = request.cookies.get("linhanyl_rep")?.value === "1";
    if (!rep) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (isAdminPanel) {
    const admin = request.cookies.get("linhanyl_admin")?.value === "1";
    if (!admin) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*", "/categoria/:path*", "/contatos/:path*", "/admin/painel/:path*"],
};
