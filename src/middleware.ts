
// Este archivo protege la ruta /admin
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async ({ request, redirect, cookies }, next) => {
  const url = new URL(request.url);

  if (url.pathname.startsWith("/admin") && !url.pathname.startsWith("/admin/login")) {
    // Comprobar si hay sesión activa preguntando al backend
    try {
      const res = await fetch(`${import.meta.env.PUBLIC_API_URL}/auth/me`, {
        headers: {
          cookie: request.headers.get("cookie") || ""
        }
      });

      if (!res.ok) return redirect("/admin/login");

      const data = await res.json();
      if (data.role !== "admin") return redirect("/admin/login");

    } catch {
      return redirect("/admin/login");
    }
  }

  return next();
});