import { cookies } from "next/headers";

const REP_COOKIE = "linhanyl_rep";
const ADMIN_COOKIE = "linhanyl_admin";
const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 30, // 30 days
};

export async function isRepAuthed(): Promise<boolean> {
  const store = await cookies();
  return store.get(REP_COOKIE)?.value === "1";
}

export async function isAdminAuthed(): Promise<boolean> {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === "1";
}

export async function loginRep(password: string): Promise<boolean> {
  const expected = process.env.REP_PASSWORD;
  if (!expected || password !== expected) return false;
  const store = await cookies();
  store.set(REP_COOKIE, "1", COOKIE_OPTS);
  return true;
}

export async function loginAdmin(password: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || password !== expected) return false;
  const store = await cookies();
  store.set(ADMIN_COOKIE, "1", COOKIE_OPTS);
  return true;
}

export async function logoutRep(): Promise<void> {
  const store = await cookies();
  store.delete(REP_COOKIE);
}

export async function logoutAdmin(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}
