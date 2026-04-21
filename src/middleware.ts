
// Este archivo protege la ruta /admin
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async ({ request, redirect }, next) => {
  const url = new URL(request.url);

  if (url.pathname.startsWith("/admin") && !url.pathname.startsWith("/admin/login")) {
    const cookieString = request.headers.get("cookie") || "";

    if (!cookieString) {
      return redirect("/admin/login");
    }

    try {
      const res = await fetch(`${import.meta.env.BACKEND_API_URL}/auth/me`, {
        headers: {
          cookie: cookieString,
        }
      });

      if (!res.ok) {
        console.warn("[middleware] /auth/me returned", res.status);
        return redirect("/admin/login");
      }

      const data = await res.json();
      if (data.role !== "admin") {
        console.warn("[middleware] role mismatch:", data.role);
        return redirect("/admin/login");
      }

    } catch (error) {
      console.error("[middleware] Auth error:", error);
      return redirect("/admin/login");
    }
  }

  return next();
});