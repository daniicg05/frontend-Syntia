"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminApi } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Plus, Download, Trash2, Pencil } from "lucide-react";

interface Convocatoria {
  id: number;
  titulo: string;
  tipo: string;
  sector: string;
  ubicacion: string;
  fuente: string;
  fechaCierre: string;
}

export default function AdminConvocatoriasPage() {
  const [convocatorias, setConvocatorias] = useState<Convocatoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [importando, setImportando] = useState(false);
  const [msg, setMsg] = useState("");

  const cargar = () => adminApi.convocatorias.list().then((r) => setConvocatorias(r.data)).finally(() => setLoading(false));
  useEffect(() => { cargar(); }, []);

  const importar = async () => {
    setImportando(true); setMsg("");
    try {
      const res = await adminApi.convocatorias.importarBdns();
      setMsg(res.data.mensaje);
      cargar();
    } catch {
      setMsg("Error al importar desde BDNS");
    } finally {
      setImportando(false);
    }
  };

  const eliminar = async (id: number) => {
    if (!confirm("¿Eliminar esta convocatoria?")) return;
    await adminApi.convocatorias.delete(id);
    setConvocatorias((prev) => prev.filter((c) => c.id !== id));
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Convocatorias ({convocatorias.length})</h1>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={importar} loading={importando}>
            <Download className="h-4 w-4" />Importar BDNS
          </Button>
          <Link href="/admin/convocatorias/nueva"><Button><Plus className="h-4 w-4" />Nueva</Button></Link>
        </div>
      </div>

      {msg && <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-700 text-sm rounded-lg">{msg}</div>}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Título</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700 hidden md:table-cell">Tipo</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700 hidden lg:table-cell">Sector</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700 hidden lg:table-cell">Cierre</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {convocatorias.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900 max-w-xs truncate">{c.titulo}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{c.tipo || "-"}</td>
                  <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{c.sector || "-"}</td>
                  <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{c.fechaCierre ? new Date(c.fechaCierre).toLocaleDateString("es") : "-"}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/convocatorias/${c.id}/editar`}><Button variant="secondary" size="sm"><Pencil className="h-3.5 w-3.5" /></Button></Link>
                      <Button variant="danger" size="sm" onClick={() => eliminar(c.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}