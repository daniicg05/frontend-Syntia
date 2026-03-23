"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { proyectosApi } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FolderOpen, Plus, MapPin, Tag, Trash2, Eye, Pencil } from "lucide-react";

interface Proyecto {
  id: number;
  nombre: string;
  sector: string;
  ubicacion: string;
  descripcion: string;
}

export default function ProyectosPage() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);

  const cargar = () => {
    proyectosApi.list()
      .then((res) => setProyectos(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { cargar(); }, []);

  const eliminar = async (id: number) => {
    if (!confirm("¿Eliminar este proyecto?")) return;
    await proyectosApi.delete(id);
    setProyectos((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mis proyectos</h1>
        <Link href="/proyectos/nuevo">
          <Button><Plus className="h-4 w-4" />Nuevo proyecto</Button>
        </Link>
      </div>

      {proyectos.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <FolderOpen className="h-14 w-14 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Sin proyectos todavía</h3>
            <p className="text-gray-500 mb-6">Crea tu primer proyecto para empezar a buscar subvenciones</p>
            <Link href="/proyectos/nuevo"><Button>Crear proyecto</Button></Link>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {proyectos.map((p) => (
            <Card key={p.id} className="flex flex-col gap-3 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-semibold text-gray-900 leading-tight">{p.nombre}</h2>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                {p.sector && <span className="flex items-center gap-1"><Tag className="h-3 w-3" />{p.sector}</span>}
                {p.ubicacion && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{p.ubicacion}</span>}
              </div>
              {p.descripcion && (
                <p className="text-sm text-gray-600 line-clamp-3">{p.descripcion}</p>
              )}
              <div className="flex gap-2 mt-auto pt-2 border-t border-gray-100">
                <Link href={`/proyectos/${p.id}/recomendaciones`} className="flex-1">
                  <Button variant="primary" size="sm" className="w-full">
                    <Eye className="h-3.5 w-3.5" />Recomendaciones
                  </Button>
                </Link>
                <Link href={`/proyectos/${p.id}/editar`}>
                  <Button variant="secondary" size="sm"><Pencil className="h-3.5 w-3.5" /></Button>
                </Link>
                <Button variant="danger" size="sm" onClick={() => eliminar(p.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}