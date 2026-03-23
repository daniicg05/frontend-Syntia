import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("syntia_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      Cookies.remove("syntia_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ token: string; email: string; rol: string; expiration: number }>(
      "/auth/login",
      { email, password }
    ),
  registro: (email: string, password: string, confirmarPassword: string) =>
    api.post<{ token: string; email: string; rol: string; expiration: number }>(
      "/auth/registro",
      { email, password, confirmarPassword }
    ),
};

// ── Dashboard usuario ─────────────────────────────────────────────────────────
export const dashboardApi = {
  get: () => api.get("/usuario/dashboard"),
};

// ── Perfil ────────────────────────────────────────────────────────────────────
export const perfilApi = {
  get: () => api.get("/usuario/perfil"),
  save: (data: Record<string, string>) => api.put("/usuario/perfil", data),
};

// ── Proyectos ─────────────────────────────────────────────────────────────────
export const proyectosApi = {
  list: () => api.get("/usuario/proyectos"),
  get: (id: number) => api.get(`/usuario/proyectos/${id}`),
  create: (data: Record<string, string>) => api.post("/usuario/proyectos", data),
  update: (id: number, data: Record<string, string>) =>
    api.put(`/usuario/proyectos/${id}`, data),
  delete: (id: number) => api.delete(`/usuario/proyectos/${id}`),
};

// ── Recomendaciones ───────────────────────────────────────────────────────────
export const recomendacionesApi = {
  list: (proyectoId: number) =>
    api.get(`/usuario/proyectos/${proyectoId}/recomendaciones`),
  generar: (proyectoId: number) =>
    api.post(`/usuario/proyectos/${proyectoId}/recomendaciones/generar`),
  guiaEnriquecida: (proyectoId: number, recId: number) =>
    api.get(`/usuario/proyectos/${proyectoId}/recomendaciones/${recId}/guia-enriquecida`),
};

// ── Admin ─────────────────────────────────────────────────────────────────────
export const adminApi = {
  dashboard: () => api.get("/admin/dashboard"),
  usuarios: {
    list: () => api.get("/admin/usuarios"),
    get: (id: number) => api.get(`/admin/usuarios/${id}`),
    changeRol: (id: number, rol: string) =>
      api.put(`/admin/usuarios/${id}/rol`, { rol }),
    delete: (id: number) => api.delete(`/admin/usuarios/${id}`),
  },
  convocatorias: {
    list: () => api.get("/admin/convocatorias"),
    get: (id: number) => api.get(`/admin/convocatorias/${id}`),
    create: (data: Record<string, unknown>) =>
      api.post("/admin/convocatorias", data),
    update: (id: number, data: Record<string, unknown>) =>
      api.put(`/admin/convocatorias/${id}`, data),
    delete: (id: number) => api.delete(`/admin/convocatorias/${id}`),
    importarBdns: (pagina = 0, tamano = 20) =>
      api.post(`/admin/convocatorias/importar-bdns?pagina=${pagina}&tamano=${tamano}`),
  },
};