"use client";

import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Users, FolderOpen, Star, FileText } from "lucide-react";

interface Stats { totalUsuarios: number; totalProyectos: number; totalRecomendaciones: number; totalConvocatorias: number; }

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.dashboard().then((res) => setStats(res.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>;

  const cards = [
    { label: "Usuarios", value: stats?.totalUsuarios, icon: Users, color: "bg-blue-100 text-blue-600" },
    { label: "Proyectos", value: stats?.totalProyectos, icon: FolderOpen, color: "bg-green-100 text-green-600" },
    { label: "Recomendaciones", value: stats?.totalRecomendaciones, icon: Star, color: "bg-purple-100 text-purple-600" },
    { label: "Convocatorias", value: stats?.totalConvocatorias, icon: FileText, color: "bg-orange-100 text-orange-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Panel de administración</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${color}`}><Icon className="h-6 w-6" /></div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{value ?? 0}</p>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}