import { NextRequest, NextResponse } from "next/server";

function decodeTokenPayload(token: string) {
  try {
    const payload = token.split(".")[1];
    const decoded = Buffer.from(
      payload.replace(/-/g, "+").replace(/_/g, "/"),
      "base64"
    ).toString("utf-8");
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

const PROTECTED_USER = ["/dashboard", "/perfil", "/proyectos"];
const PROTECTED_ADMIN = ["/admin"];
const PUBLIC = ["/", "/login", "/registro", "/aviso-legal"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isUserRoute = PROTECTED_USER.some((p) => pathname.startsWith(p));
  const isAdminRoute = PROTECTED_ADMIN.some((p) => pathname.startsWith(p));

  if (!isUserRoute && !isAdminRoute) return NextResponse.next();

  const token = request.cookies.get("syntia_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const payload = decodeTokenPayload(token);
  if (!payload || payload.exp * 1000 < Date.now()) {
    const res = NextResponse.redirect(new URL("/login", request.url));
    res.cookies.delete("syntia_token");
    return res;
  }

  if (isAdminRoute && payload.rol !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/perfil/:path*", "/proyectos/:path*", "/admin/:path*"],
};