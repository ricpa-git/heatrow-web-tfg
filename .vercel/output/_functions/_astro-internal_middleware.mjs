import { d as defineMiddleware, s as sequence } from './chunks/index_C_ISv1RY.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_BwhlhYCw.mjs';
import 'piccolore';
import './chunks/astro/server_BfkuFWeA.mjs';
import 'clsx';

const onRequest$1 = defineMiddleware(async ({ request, redirect, cookies }, next) => {
  const url = new URL(request.url);
  if (url.pathname.startsWith("/admin") && !url.pathname.startsWith("/admin/login")) {
    try {
      const cookieString = request.headers.get("cookie") || "";
      const res = await fetch(`${"https://heatrowclub.netlify.app/admin/login"}/auth/me`, {
        credentials: "include",
        headers: {
          cookie: cookieString,
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) return redirect("/admin/login");
      const data = await res.json();
      if (data.role !== "admin") return redirect("/admin/login");
    } catch (error) {
      console.error("Auth error:", error);
      return redirect("/admin/login");
    }
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
