"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useParams } from "next/navigation";
import { proyectosApi } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const schema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  sector: z.string().optional(),
  ubicacion: z.string().optional(),
  descripcion: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function EditarProyectoPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    proyectosApi.get(Number(id)).then((res) => reset(res.data));
  }, [id, reset]);

  const onSubmit = async (data: FormData) => {
    await proyectosApi.update(Number(id), data as Record<string, string>);
    router.push("/proyectos");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/proyectos" className="text-sm text-blue-600 hover:underline">← Volver a proyectos</Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Editar proyecto</h1>
      </div>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Nombre del proyecto" error={errors.nombre?.message} {...register("nombre")} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Sector" {...register("sector")} />
            <Input label="Ubicación" {...register("ubicacion")} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Descripción</label>
            <textarea rows={5} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("descripcion")} />
          </div>
          <div className="flex justify-end gap-3">
            <Link href="/proyectos"><Button variant="secondary" type="button">Cancelar</Button></Link>
            <Button type="submit" loading={isSubmitting}>Guardar cambios</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}