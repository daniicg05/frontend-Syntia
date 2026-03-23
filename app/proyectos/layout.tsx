import { Navbar } from "@/components/Navbar";
export default function ProyectosLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-gray-50"><Navbar /><main className="max-w-7xl mx-auto px-4 py-8">{children}</main></div>;
}