/* empty css                               */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BfkuFWeA.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../chunks/AdminLayout_C7_6nSmZ.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
export { renderers } from '../renderers.mjs';

const API_URL$1 = "https://heatrowclub.netlify.app/admin/login";
function Estadisticas() {
  const [stats, setStats] = useState({ eventos: 0, djs: 0, suscriptores: 0 });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadStats() {
      try {
        const [eventsRes, djsRes, subsRes] = await Promise.all([
          fetch(`${API_URL$1}/events`, { credentials: "include" }),
          fetch(`${API_URL$1}/djs`, { credentials: "include" }),
          fetch(`${API_URL$1}/subscribers`, { credentials: "include" })
        ]);
        const [events, djs, subs] = await Promise.all([
          eventsRes.json(),
          djsRes.json(),
          subsRes.json()
        ]);
        setStats({
          eventos: events.length,
          djs: djs.length,
          suscriptores: subs.length
        });
      } catch {
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);
  const cards = [
    { label: "Eventos registrados", value: stats.eventos, href: "/admin/eventos" },
    { label: "DJs registrados", value: stats.djs, href: "/admin/djs" },
    { label: "Suscriptores", value: stats.suscriptores, href: "/admin/subscriptores" }
  ];
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-10", children: cards.map((card) => /* @__PURE__ */ jsxs(
    "a",
    {
      href: card.href,
      className: "bg-zinc-900 rounded-xl p-6 border border-zinc-800 hover:border-[oklch(50.5%_0.213_27.518)] hover:bg-zinc-800 transition-all duration-200 group",
      children: [
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold mb-2 group-hover:text-[oklch(50.5%_0.213_27.518)] transition-colors", children: loading ? /* @__PURE__ */ jsx("span", { className: "text-zinc-600", children: "—" }) : card.value }),
        /* @__PURE__ */ jsx("div", { className: "text-zinc-400 group-hover:text-zinc-200 transition-colors", children: card.label })
      ]
    },
    card.label
  )) });
}

const API_URL = "https://heatrowclub.netlify.app/admin/login";
function BienvenidaUsuario() {
  const [username, setUsername] = useState("");
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${API_URL}/auth/me`, { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setUsername(data.username || "");
        }
      } catch {
      }
    }
    fetchUser();
  }, []);
  return /* @__PURE__ */ jsx("p", { className: "text-zinc-400 mb-8", children: username ? `Bienvenido de nuevo, ${username}` : "Bienvenido al panel de Heatrow Club" });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Dashboard" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-3xl font-bold mb-2">Panel de administración</h1> ${renderComponent($$result2, "BienvenidaUsuario", BienvenidaUsuario, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/components/admin/BienvenidaUsuario.jsx", "client:component-export": "default" })} ${renderComponent($$result2, "DashboardStats", Estadisticas, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/components/admin/Estadisticas.jsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/pages/admin/index.astro", void 0);

const $$file = "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
