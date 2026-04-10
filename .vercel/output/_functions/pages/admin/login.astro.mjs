/* empty css                                  */
import { e as createComponent, g as addAttribute, l as renderHead, n as renderScript, r as renderTemplate, h as createAstro } from '../../chunks/astro/server_BfkuFWeA.mjs';
import 'piccolore';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const apiUrl = "https://heatrowclub.netlify.app/admin/login";
  try {
    const res = await fetch(`${apiUrl}/auth/me`, {
      headers: { cookie: Astro2.request.headers.get("cookie") || "" }
    });
    if (res.ok) {
      const data = await res.json();
      if (data.role === "admin") return Astro2.redirect("/admin");
    }
  } catch {
  }
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><title>Admin - Heatrow Club</title><!-- Favicon para diferentes resoluciones --><link rel="icon" type="image/png" sizes="32x32" href="/favicon2.png"><link rel="icon" type="image/png" sizes="64x64" href="/favicon2.png"><link rel="icon" type="image/png" sizes="128x128" href="/favicon2.png"><link rel="icon" type="image/png" sizes="256x256" href="/favicon2.png"><!-- Si tienes SVG, puedes dejarlo como fallback --><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}>${renderHead()}</head> <body class="bg-black min-h-screen flex flex-col items-center justify-center"> <div class="flex flex-col items-center"> <div class="bg-zinc-900 p-8 -xl w-full max-w-sm"> <h1 class="text-white text-2xl font-bold mb-2 text-center">Panel de Administración</h1> <p class="text-white font-bold mb-4 text-center">Inicia sesión como administrador</p> <div id="error" class="hidden text-red-500 text-sm mb-4 text-center"></div> <div class="flex flex-col gap-4"> <input id="username" type="text" placeholder="Usuario" class="bg-zinc-800 text-white px-4 py-2 -lg outline-none focus:ring-2 focus:ring-white"> <input id="password" type="password" placeholder="Contraseña" class="bg-zinc-800 text-white px-4 py-2 -lg outline-none focus:ring-2 focus:ring-white"> <button id="loginBtn" class="bg-white text-black font-bold py-2 -lg hover:bg-zinc-200 transition">
Entrar
</button> </div> </div> <div class="mt-6"> <p class="text-[oklch(50.5%_0.213_27.518)] text-sm opacity-80 flex items-center gap-1"> <span>&copy;</span> Heatrow Club
</p> </div> </div> <!-- maneja el login --> ${renderScript($$result, "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/pages/admin/login.astro", void 0);
const $$file = "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
