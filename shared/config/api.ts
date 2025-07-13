export const API_ENDPOINTS = {
  endpoint: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
    version: "v1",
  },
  product: {
    base: "/api/v1/product",
    create: "/api/v1/product",
    list: (qs: string = "") => `/api/v1/product${qs ? `?${qs}` : ""}`,
    detail: (id: string) => `/api/v1/product/${id}`,
    update: (id: string) => `/api/v1/product/${id}`,
    delete: (id: string) => `/api/v1/product/${id}`
  },
  dashboard: {
    base: "/api/v1/dashboard",
    create: "/api/v1/dashboard",
    list: (qs: string = "") => `/api/v1/dashboard${qs ? `?${qs}` : ""}`,
    detail: (id: string) => `/api/v1/dashboard/${id}`,
    update: (id: string) => `/api/v1/dashboard/${id}`,
    delete: (id: string) => `/api/v1/dashboard/${id}`,
    templates: "/api/v1/dashboard/templates",
    clone: (id: string) => `/api/v1/dashboard/${id}/clone`
  },
  widgets: {
    base: "/api/v1/widgets",
    create: "/api/v1/widgets",
    list: (qs: string = "") => `/api/v1/widgets${qs ? `?${qs}` : ""}`,
    detail: (id: string) => `/api/v1/widgets/${id}`,
    update: (id: string) => `/api/v1/widgets/${id}`,
    delete: (id: string) => `/api/v1/widgets/${id}`,
    data: (id: string) => `/api/v1/widgets/${id}/data`
  },
  widgetTemplates: {
    base: "/api/v1/widget-templates",
    list: (qs: string = "") => `/api/v1/widget-templates${qs ? `?${qs}` : ""}`,
    detail: (id: string) => `/api/v1/widget-templates/${id}`,
    categories: "/api/v1/widget-templates/categories"
  }
};
