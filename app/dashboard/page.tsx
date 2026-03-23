"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { dashboardApi } from "@/lib/api";
import { getUser } from "@/lib/auth";
import { Card } from "@/components/ui/Card";
import { ScoreBadge } from "@/components/ui/Badge";
import { TrendingUp, FolderOpen, Star } from "lucide-react";

interface RecomendacionDTO {
  id: number;
  puntuacion: number;
  explicacion: string;
  convocatoria: { titulo: string };
  proyecto: { id: number; nombre: string };
}

interface DashboardData {
  email: string;
  totalRecomendaciones: number;
  topRecomendaciones: Record<string, RecomendacionDTO[]>;
  roadmap: { proyecto: { id: number; nombre: string }; recomendacion: RecomendacionDTO }[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = getUser();

  useEffect(() => {
    dashboardApi
      .get()
      .then((res) => setData(res.data))
      .catch(() => setError("No se pudieron cargar los datos del dashboard"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Bienvenido, {user?.sub?.split("@")[0]}
        </h1>
        <p className="text-gray-500 mt-1">Aquí tienes el resumen de tu actividad en Syntia</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Star className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{data?.totalRecomendaciones ?? 0}</p>
              <p className="text-sm text-gray-500">Recomendaciones totales</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-xl">
              <FolderOpen className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {Object.keys(data?.topRecomendaciones ?? {}).length}
              </p>
              <p className="text-sm text-gray-500">Proyectos activos</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-xl">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{data?.roadmap?.length ?? 0}</p>
              <p className="text-sm text-gray-500">Oportunidades en roadmap</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Top recomendaciones */}
      {data && Object.keys(data.topRecomendaciones).length > 0 && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Top recomendaciones por proyecto</h2>
            <Link href="/proyectos" className="text-sm text-blue-600 hover:underline">
              Ver todos
            </Link>
          </div>
          <div className="space-y-4">
            {Object.entries(data.topRecomendaciones).map(([proyectoNombre, recs]) =>
              recs.length > 0 ? (
                <div key={proyectoNombre}>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    {proyectoNombre}
                  </p>
                  <div className="space-y-2">
                    {recs.map((rec) => (
                      <div
                        key={rec.id}
                        className="flex items-start justify-between gap-4 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {rec.convocatoria.titulo}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                            {rec.explicacion}
                          </p>
                        </div>
                        <ScoreBadge score={rec.puntuacion} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null
            )}
          </div>
        </Card>
      )}

      {data && Object.keys(data.topRecomendaciones).length === 0 && (
        <Card>
          <div className="text-center py-8">
            <FolderOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Aún no tienes proyectos ni recomendaciones</p>
            <Link
              href="/proyectos/nuevo"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Crear tu primer proyecto
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}