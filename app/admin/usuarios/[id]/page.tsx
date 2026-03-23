"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { adminApi } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { RolBadge, ScoreBadge } from "@/components/ui/Badge";

interface UsuarioDetalle {
  usuario: { id: number; email: string; rol: string; creadoEn: string };
  proyectos: { id: number; nombre: string; sector: string }[];
  recsPerProyecto: Record<number, number>;
}

export default function AdminUsuarioDetallePage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<UsuarioDetalle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.usuarios.get(Number(id)).then((r) => setData(r.data)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>;
  if (!data) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/admin/usuarios" className="text-sm text-blue-600 hover:underline mb-6 block">← Volver a usuarios</Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Detalle de usuario</h1>

      <Card className="mb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3"><span className="text-sm text-gray-500 w-24">Email:</span><span className="font-medium">{data.usuario.email}</span></div>
          <div className="flex items-center gap-3"><span className="text-sm text-gray-500 w-24">Rol:</span><RolBadge rol={data.usuario.rol} /></div>
          <div className="flex items-center gap-3"><span className="text-sm text-gray-500 w-24">Registro:</span><span className="text-sm">{new Date(data.usuario.creadoEn).toLocaleDateString("es")}</span></div>
        </div>
      </Card>

      <h2 className="font-semibold text-gray-900 mb-3">Proyectos ({data.proyectos.length})</h2>
      {data.proyectos.length === 0 ? (
        <Card><p className="text-gray-500 text-sm">Sin proyectos</p></Card>
      ) : (
        <div className="space-y-2">
          {data.proyectos.map((p) => (
            <Card key={p.id}>
              <div className="flex items-center justify-between">
                <div><p className="font-medium text-gray-900">{p.nombre}</p><p className="text-xs text-gray-500">{p.sector}</p></div>
                <div className="text-sm text-gray-600">{data.recsPerProyecto[p.id] ?? 0} recomendaciones</div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}