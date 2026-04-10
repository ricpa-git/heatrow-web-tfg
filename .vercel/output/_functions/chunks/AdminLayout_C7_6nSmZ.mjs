import { e as createComponent, r as renderTemplate, o as defineScriptVars, p as renderSlot, k as renderComponent, l as renderHead, g as addAttribute, h as createAstro } from './astro/server_BfkuFWeA.mjs';
import 'piccolore';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
/* empty css                       */

const sections = [
  { href: "/admin", label: "Dashboard", icon: "fi fi-rr-apps" },
  { href: "/admin/eventos", label: "Gestión de eventos", icon: "fi fi-rr-calendar" },
  { href: "/admin/djs", label: "Gestión de DJs", icon: "fi fi-rr-music-alt" },
  { href: "/admin/usuarios", label: "Gestión de usuarios", icon: "fi fi-rr-users" },
  { href: "/admin/subscriptores", label: "Gestión de subs", icon: "fi fi-rr-envelope" }
];
function AdminSidebar({ currentPath = "" }) {
  const [collapsed, setCollapsed] = useState(false);
  return /* @__PURE__ */ jsxs(
    "aside",
    {
      className: `transition-all duration-300 bg-zinc-950 border-r border-zinc-800 flex flex-col h-full ${collapsed ? "w-16 px-2" : "w-56 px-4"}`,
      style: { minHeight: "100vh" },
      children: [
        /* @__PURE__ */ jsx("div", { className: `flex ${collapsed ? "justify-center" : "justify-end"} pt-4 pb-4`, children: /* @__PURE__ */ jsx(
          "button",
          {
            className: "bg-zinc-800 text-zinc-100 px-3 py-2 rounded-lg border border-zinc-700 hover:text-[oklch(50.5%_0.213_27.518)] transition",
            onClick: () => setCollapsed((v) => !v),
            "aria-label": collapsed ? "Expandir menú" : "Contraer menú",
            children: collapsed ? "▶" : "◀"
          }
        ) }),
        /* @__PURE__ */ jsx("nav", { className: "flex flex-col gap-4", children: sections.map((section) => {
          const isActive = currentPath === section.href;
          return /* @__PURE__ */ jsxs(
            "a",
            {
              href: section.href,
              className: `font-semibold transition whitespace-nowrap overflow-hidden ${collapsed ? "text-xs px-0 text-center" : "text-base px-2"} ${isActive ? "text-[oklch(50.5%_0.213_27.518)]" : "text-zinc-100 hover:text-[oklch(50.5%_0.213_27.518)]"}`,
              title: section.label,
              children: [
                /* @__PURE__ */ jsx("i", { className: `${section.icon} text-lg mr-2`, "aria-hidden": "true" }),
                !collapsed && section.label
              ]
            },
            section.href
          );
        }) })
      ]
    }
  );
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$AdminLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title } = Astro2.props;
  const apiUrl = "https://heatrowclub.netlify.app/admin/login";
  return renderTemplate(_a || (_a = __template(['<html lang="es" data-astro-cid-2kanml4j> <head><meta charset="UTF-8"><title>', ' - Heatrow Admin</title><link rel="stylesheet" href="https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css"><!-- Favicon para diferentes resoluciones --><link rel="icon" type="image/png" sizes="32x32" href="/favicon2.png"><link rel="icon" type="image/png" sizes="64x64" href="/favicon2.png"><link rel="icon" type="image/png" sizes="128x128" href="/favicon2.png"><link rel="icon" type="image/png" sizes="256x256" href="/favicon2.png"><!-- Si tienes SVG, puedes dejarlo como fallback --><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', ">", `</head> </html> <body class="admin-body bg-black text-white min-h-screen" class="bg-black text-white min-h-screen" style="font-family: 'Inter', system-ui, sans-serif;" data-astro-cid-2kanml4j> <header class="w-full flex items-center justify-between px-8 py-4 bg-zinc-900 border-b border-zinc-800" data-astro-cid-2kanml4j> <div class="flex items-center gap-3" data-astro-cid-2kanml4j> <img src="/logo1.png" alt="Logo" class="w-16 h-16 object-contain" data-astro-cid-2kanml4j> <a href="/admin" data-astro-cid-2kanml4j><span class="text-xl font-extrabold tracking-wide" data-astro-cid-2kanml4j>HEATROW CLUB - Administradores</span></a> </div> <div class="flex items-center gap-4" data-astro-cid-2kanml4j> <a href="/" class="bg-zinc-100 text-black font-bold px-4 py-2 rounded-lg hover:bg-zinc-200 transition" data-astro-cid-2kanml4j>Volver a la web</a> <button id="logout-btn" class="bg-zinc-800 text-zinc-200 px-4 py-2 rounded-lg border border-zinc-700 hover:bg-zinc-700 transition" data-astro-cid-2kanml4j>Logout</button> </div> </header> <div class="flex min-h-[calc(100vh-64px)]" data-astro-cid-2kanml4j> `, ' <main class="flex-1 p-10" data-astro-cid-2kanml4j> ', " </main> </div> <script>(function(){", '\n  document.getElementById("logout-btn")?.addEventListener("click", async () => {\n    await fetch(`${apiUrl}/auth/logout`, {\n      method: "POST",\n      credentials: "include",\n    });\n    window.location.href = "/admin/login";\n  });\n})();</script></body>'], ['<html lang="es" data-astro-cid-2kanml4j> <head><meta charset="UTF-8"><title>', ' - Heatrow Admin</title><link rel="stylesheet" href="https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css"><!-- Favicon para diferentes resoluciones --><link rel="icon" type="image/png" sizes="32x32" href="/favicon2.png"><link rel="icon" type="image/png" sizes="64x64" href="/favicon2.png"><link rel="icon" type="image/png" sizes="128x128" href="/favicon2.png"><link rel="icon" type="image/png" sizes="256x256" href="/favicon2.png"><!-- Si tienes SVG, puedes dejarlo como fallback --><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', ">", `</head> </html> <body class="admin-body bg-black text-white min-h-screen" class="bg-black text-white min-h-screen" style="font-family: 'Inter', system-ui, sans-serif;" data-astro-cid-2kanml4j> <header class="w-full flex items-center justify-between px-8 py-4 bg-zinc-900 border-b border-zinc-800" data-astro-cid-2kanml4j> <div class="flex items-center gap-3" data-astro-cid-2kanml4j> <img src="/logo1.png" alt="Logo" class="w-16 h-16 object-contain" data-astro-cid-2kanml4j> <a href="/admin" data-astro-cid-2kanml4j><span class="text-xl font-extrabold tracking-wide" data-astro-cid-2kanml4j>HEATROW CLUB - Administradores</span></a> </div> <div class="flex items-center gap-4" data-astro-cid-2kanml4j> <a href="/" class="bg-zinc-100 text-black font-bold px-4 py-2 rounded-lg hover:bg-zinc-200 transition" data-astro-cid-2kanml4j>Volver a la web</a> <button id="logout-btn" class="bg-zinc-800 text-zinc-200 px-4 py-2 rounded-lg border border-zinc-700 hover:bg-zinc-700 transition" data-astro-cid-2kanml4j>Logout</button> </div> </header> <div class="flex min-h-[calc(100vh-64px)]" data-astro-cid-2kanml4j> `, ' <main class="flex-1 p-10" data-astro-cid-2kanml4j> ', " </main> </div> <script>(function(){", '\n  document.getElementById("logout-btn")?.addEventListener("click", async () => {\n    await fetch(\\`\\${apiUrl}/auth/logout\\`, {\n      method: "POST",\n      credentials: "include",\n    });\n    window.location.href = "/admin/login";\n  });\n})();</script></body>'])), title, addAttribute(Astro2.generator, "content"), renderHead(), renderComponent($$result, "AdminSidebar", AdminSidebar, { "client:load": true, "currentPath": Astro2.url.pathname, "client:component-hydration": "load", "client:component-path": "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/components/admin/AdminSidebar.jsx", "client:component-export": "default", "data-astro-cid-2kanml4j": true }), renderSlot($$result, $$slots["default"]), defineScriptVars({ apiUrl }));
}, "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
