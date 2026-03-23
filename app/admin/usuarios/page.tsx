"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminApi } from "@/lib/api";
import { getUser } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { RolBadge } from "@/components/ui/Badge";
import { Eye, Trash2 } from "lucide-react";

interface Usuario { id: number; email: string; rol: string; creadoEn: string; }

export default function AdminUsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const me = getUser();

  const cargar = () => adminApi.usuarios.list().then((r) => setUsuarios(r.data)).finally(() => setLoading(false));
  useEffect(() => { cargar(); }, []);

  const cambiarRol = async (id: number, rolActual: string) => {
    const nuevoRol = rolActual === "ADMIN" ? "USUARIO" : "ADMIN";
    await adminApi.usuarios.changeRol(id, nuevoRol);
    setUsuarios((prev) => prev.map((u) => u.id === id ? { ...u, rol: nuevoRol } : u));
  };

  const eliminar = async (id: number) => {
    if (!confirm("¿Eliminar este usuario y todos sus datos?")) return;
    await adminApi.usuarios.delete(id);
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Usuarios ({usuarios.length})</h1>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-700">Email</th>
              <th className="text-left px-4 py-3 font-medium text-gray-700">Rol</th>
              <th className="text-left px-4 py-3 font-medium text-gray-700 hidden sm:table-cell">Registro</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {usuarios.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-900">{u.email}</td>
                <td className="px-4 py-3"><RolBadge rol={u.rol} /></td>
                <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{u.creadoEn ? new Date(u.creadoEn).toLocaleDateString("es") : "-"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/usuarios/${u.id}`}><Button variant="secondary" size="sm"><Eye className="h-3.5 w-3.5" /></Button></Link>
                    {me?.sub !== u.email && (
                      <>
                        <Button variant="ghost" size="sm" onClick={() => cambiarRol(u.id, u.rol)}>
                          {u.rol === "ADMIN" ? "→ Usuario" : "→ Admin"}
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => eliminar(u.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}