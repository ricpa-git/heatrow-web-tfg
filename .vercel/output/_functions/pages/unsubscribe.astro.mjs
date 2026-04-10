/* empty css                               */
import { e as createComponent, g as addAttribute, l as renderHead, r as renderTemplate, h as createAstro } from '../chunks/astro/server_BfkuFWeA.mjs';
import 'piccolore';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Unsubscribe = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Unsubscribe;
  const email = Astro2.url.searchParams.get("email") || "";
  const apiUrl = "https://heatrowclub.netlify.app/admin/login";
  let success = false;
  let error = false;
  if (email) {
    try {
      const res = await fetch(`${apiUrl}/subscribers/unsubscribe?email=${encodeURIComponent(email)}`);
      if (res.ok) success = true;
      else error = true;
    } catch {
      error = true;
    }
  }
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><title>Darse de baja - Heatrow Club</title><!-- Favicon para diferentes resoluciones --><link rel="icon" type="image/png" sizes="32x32" href="/favicon2.png"><link rel="icon" type="image/png" sizes="64x64" href="/favicon2.png"><link rel="icon" type="image/png" sizes="128x128" href="/favicon2.png"><link rel="icon" type="image/png" sizes="256x256" href="/favicon2.png"><!-- Si tienes SVG, puedes dejarlo como fallback --><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}>${renderHead()}</head> <body class="bg-black text-white min-h-screen flex items-center justify-center" style="font-family: 'Inter', system-ui, sans-serif;"> <div class="text-center px-8 max-w-md"> <img src="/logo1.png" alt="Heatrow Club" class="w-32 mx-auto mb-8"> ${!email && renderTemplate`<div> <h1 class="text-2xl font-bold mb-4 text-red-500">Enlace inválido</h1> <p class="text-zinc-400">Este enlace no contiene un email válido.</p> </div>`} ${email && success && renderTemplate`<div> <h1 class="text-2xl font-bold mb-4">Te has dado de baja</h1> <p class="text-zinc-400 mb-6">Ya no recibirás más emails de Heatrow Club.</p> <a href="/" class="border border-white text-white px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition">
Volver al inicio
</a> </div>`} ${email && error && renderTemplate`<div> <h1 class="text-2xl font-bold mb-4 text-red-500">Error</h1> <p class="text-zinc-400">No se ha podido procesar la baja. Contacta con nosotros.</p> </div>`} </div> </body></html>`;
}, "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/pages/unsubscribe.astro", void 0);
const $$file = "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/pages/unsubscribe.astro";
const $$url = "/unsubscribe";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Unsubscribe,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
