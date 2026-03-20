"use client";

import React, { useState } from "react";
import "./login.css"; // Tus estilos personalizados

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState<{ type: "error" | "success" | "info"; message: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: email, password }),
                credentials: "include",
            });

            if (!res.ok) {
                setAlert({ type: "error", message: "Usuario o contraseña incorrectos." });
                return;
            }

            // Redirige al inicio
            window.location.href = "/";
        } catch (err) {
            setAlert({ type: "error", message: "Error de conexión con el servidor." });
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1 className="brand-logo">Syntia</h1>
                    <p className="brand-tagline">
                        Plataforma de recomendaciones de subvenciones
                    </p>
                </div>

                {alert && (
                    <div className={`alert ${alert.type}`}>
                        <span>{alert.type === "error" ? "⚠️" : alert.type === "success" ? "✅" : "👋"}</span>
                        <span>{alert.message}</span>
                    </div>
                )}

                <h5>Accede a tu cuenta</h5>

                <form onSubmit={handleSubmit} className="login-form">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoFocus
                    />

                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Entrar →</button>
                </form>

                <p className="register-link">
                    ¿No tienes cuenta? <a href="/registro">Regístrate gratis</a>
                </p>
            </div>

            <footer className="login-footer">
                &copy; {new Date().getFullYear()} Syntia · <a href="/aviso-legal">Aviso legal</a>
            </footer>
        </div>
    );
}