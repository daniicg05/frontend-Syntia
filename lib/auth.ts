"use client";

import Cookies from "js-cookie";
import { authApi } from "./api";

export interface JwtPayload {
  sub: string;
  rol: string;
  iat: number;
  exp: number;
}

function decodeToken(token: string): JwtPayload | null {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export function getToken(): string | undefined {
  return Cookies.get("syntia_token");
}

export function getUser(): JwtPayload | null {
  const token = getToken();
  if (!token) return null;
  const payload = decodeToken(token);
  if (!payload) return null;
  if (payload.exp * 1000 < Date.now()) {
    Cookies.remove("syntia_token");
    return null;
  }
  return payload;
}

export function isAuthenticated(): boolean {
  return getUser() !== null;
}

export function isAdmin(): boolean {
  return getUser()?.rol === "ADMIN";
}

export async function login(email: string, password: string) {
  const res = await authApi.login(email, password);
  const { token, rol } = res.data;
  Cookies.set("syntia_token", token, {
    expires: 1,
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
  });
  return { token, rol, email: res.data.email };
}

export async function registro(
  email: string,
  password: string,
  confirmarPassword: string
) {
  const res = await authApi.registro(email, password, confirmarPassword);
  const { token } = res.data;
  Cookies.set("syntia_token", token, {
    expires: 1,
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
  });
  return res.data;
}

export function logout() {
  Cookies.remove("syntia_token");
  window.location.href = "/login";
}