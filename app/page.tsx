import Link from "next/link";
import { Sparkles, Database, BookOpen } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-blue-600 font-bold text-xl">Syntia</span>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
              Iniciar sesión
            </Link>
            <Link href="/registro" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors">
              Registrarse
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full mb-6">
            <Sparkles className="h-4 w-4" />
            Impulsado por IA
          </div>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
            Encuentra subvenciones para <span className="text-blue-600">tu proyecto</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Syntia analiza tu proyecto con inteligencia artificial y encuentra las subvenciones
            públicas más compatibles de la Base de Datos Nacional de Subvenciones.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/registro" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold text-lg transition-colors">
              Empezar gratis
            </Link>
            <Link href="/login" className="text-gray-700 px-8 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 font-semibold text-lg transition-colors">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Todo lo que necesitas para acceder a financiación pública
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-5">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">Matching con IA</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Nuestro motor de IA analiza tu proyecto y lo compara con miles de convocatorias
                para encontrar las más adecuadas, con una puntuación de compatibilidad precisa.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
              <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mb-5">
                <Database className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">Integración con BDNS</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Acceso directo a la Base de Datos Nacional de Subvenciones, actualizada en
                tiempo real con convocatorias de todas las administraciones públicas españolas.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
              <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mb-5">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">Guías personalizadas</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Para cada subvención compatible, genera automáticamente una guía paso a paso
                de solicitud adaptada a tu proyecto y perfil de entidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-blue-600 font-bold">Syntia</span>
          <Link href="/aviso-legal" className="text-sm text-gray-500 hover:text-gray-700">
            Aviso legal
          </Link>
        </div>
      </footer>
    </div>
  );
}