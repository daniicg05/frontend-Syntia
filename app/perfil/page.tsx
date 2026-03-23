"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { perfilApi } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface PerfilForm {
  sector: string;
  ubicacion: string;
  tipoEntidad: string;
  objetivos: string;
  necesidadesFinanciacion: string;
  descripcionLibre: string;
}

export default function PerfilPage() {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<PerfilForm>();

  useEffect(() => {
    perfilApi.get()
      .then((res) => { if (res.data) reset(res.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [reset]);

  const onSubmit = async (data: PerfilForm) => {
    try {
      setError(""); setSuccess(false);
      await perfilApi.save(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("Error al guardar el perfil");
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" /></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Mi perfil</h1>
      <Card>
        {success && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg">Perfil guardado correctamente</div>}
        {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Sector" placeholder="Ej: Tecnología, Agricultura..." {...register("sector")} />
            <Input label="Ubicación" placeholder="Ej: Madrid, Cataluña..." {...register("ubicacion")} />
            <Input label="Tipo de entidad" placeholder="Ej: PYME, Startup, ONG..." {...register("tipoEntidad")} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Objetivos</label>
            <textarea rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Describe los objetivos de tu entidad..." {...register("objetivos")} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Necesidades de financiación</label>
            <textarea rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="¿Para qué necesitas financiación?" {...register("necesidadesFinanciacion")} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Descripción libre</label>
            <textarea rows={4} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Cualquier información adicional relevante..." {...register("descripcionLibre")} />
          </div>
          <div className="flex justify-end">
            <Button type="submit" loading={isSubmitting}>Guardar perfil</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}