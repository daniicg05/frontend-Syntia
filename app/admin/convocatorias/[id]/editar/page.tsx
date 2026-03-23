"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useParams } from "next/navigation";
import { adminApi } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const schema = z.object({
  titulo: z.string().min(1, "El título es obligatorio"),
  tipo: z.string().optional(),
  sector: z.string().optional(),
  ubicacion: z.string().optional(),
  urlOficial: z.string().optional(),
  fuente: z.string().optional(),
  idBdns: z.string().optional(),
  numeroConvocatoria: z.string().optional(),
  fechaCierre: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function EditarConvocatoriaPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    adminApi.convocatorias.get(Number(id)).then((r) => {
      const d = r.data;
      reset({ ...d, fechaCierre: d.fechaCierre ? d.fechaCierre.split("T")[0] : "" });
    });
  }, [id, reset]);

  const onSubmit = async (data: FormData) => {
    await adminApi.convocatorias.update(Number(id), data);
    router.push("/admin/convocatorias");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/convocatorias" className="text-sm text-blue-600 hover:underline">← Volver a convocatorias</Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Editar convocatoria</h1>
      </div>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Título" error={errors.titulo?.message} {...register("titulo")} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Tipo" {...register("tipo")} />
            <Input label="Sector" {...register("sector")} />
            <Input label="Ubicación" {...register("ubicacion")} />
            <Input label="Fuente" {...register("fuente")} />
            <Input label="ID BDNS" {...register("idBdns")} />
            <Input label="Número de convocatoria" {...register("numeroConvocatoria")} />
            <Input label="Fecha de cierre" type="date" {...register("fechaCierre")} />
          </div>
          <Input label="URL oficial" type="url" {...register("urlOficial")} />
          <div className="flex justify-end gap-3">
            <Link href="/admin/convocatorias"><Button variant="secondary" type="button">Cancelar</Button></Link>
            <Button type="submit" loading={isSubmitting}>Guardar cambios</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}