import Link from "next/link";

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-blue-600 text-sm hover:underline mb-8 inline-block">
          ← Volver al inicio
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Aviso Legal</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Información general</h2>
            <p>
              Syntia es una plataforma tecnológica de ayuda a la búsqueda de subvenciones y
              financiación pública para empresas y entidades. El acceso y uso de esta plataforma
              está sujeto a las condiciones descritas en el presente aviso legal.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Objeto del servicio</h2>
            <p>
              Syntia ofrece un servicio de análisis automatizado de proyectos mediante
              inteligencia artificial para identificar convocatorias de subvenciones públicas
              potencialmente compatibles, consultando la Base de Datos Nacional de Subvenciones
              (BDNS) del Ministerio de Hacienda.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Limitación de responsabilidad</h2>
            <p>
              Las recomendaciones generadas por Syntia tienen carácter meramente orientativo.
              La plataforma no garantiza la concesión de ninguna subvención ni asume
              responsabilidad por las decisiones tomadas en base a la información proporcionada.
              Se recomienda verificar siempre la información oficial en las fuentes originales.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Protección de datos</h2>
            <p>
              Los datos personales facilitados serán tratados conforme al Reglamento (UE)
              2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD). Los datos se utilizan
              exclusivamente para la prestación del servicio y no serán cedidos a terceros
              sin consentimiento expreso.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}