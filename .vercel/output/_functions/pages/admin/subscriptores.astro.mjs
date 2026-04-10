/* empty css                                  */
import { e as createComponent, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_BfkuFWeA.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_C7_6nSmZ.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
export { renderers } from '../../renderers.mjs';

const API_URL = "https://heatrowclub.netlify.app/admin/login";
function SubsAdmin() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [campaign, setCampaign] = useState({ subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [campaignResult, setCampaignResult] = useState(null);
  async function handleCampaign() {
    if (!campaign.subject.trim() || !campaign.message.trim()) {
      setError("El asunto y el mensaje son obligatorios");
      return;
    }
    setSending(true);
    setCampaignResult(null);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/subscribers/emails`, {
        credentials: "include"
      });
      const emails = await res.json();
      if (emails.length === 0) {
        setCampaignResult("No hay suscriptores activos");
        return;
      }
      let enviados = 0;
      for (const email of emails) {
        const ejs = window.emailjs;
        await ejs.send("service_zwo9za8", "template_cxd0vtq", {
          to_email: email,
          subject: campaign.subject,
          message: campaign.message,
          unsubscribe_url: `${window.location.origin}/unsubscribe?email=${encodeURIComponent(email)}`
        });
        enviados++;
      }
      setCampaignResult(`Campaña enviada a ${enviados} suscriptores`);
      setCampaign({ subject: "", message: "" });
    } catch {
      setError("Error al enviar la campaña");
    } finally {
      setSending(false);
    }
  }
  useEffect(() => {
    if (!window.emailjs) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
      script.onload = () => {
        window.emailjs.init("YInKJUQPM6IOOpXF9");
      };
      document.head.appendChild(script);
    }
    loadSubs();
  }, []);
  async function loadSubs() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/subscribers`, {
        credentials: "include"
      });
      const data = await res.json();
      setSubs(data);
    } catch {
      setError("Error al cargar suscriptores");
    } finally {
      setLoading(false);
    }
  }
  async function handleToggle(id) {
    try {
      await fetch(`${API_URL}/subscribers/${id}/toggle`, {
        method: "PUT",
        credentials: "include"
      });
      loadSubs();
    } catch {
      setError("Error al cambiar el estado");
    }
  }
  async function handleDelete(id) {
    try {
      await fetch(`${API_URL}/subscribers/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      setConfirmDelete(null);
      loadSubs();
    } catch {
      setError("Error al eliminar el suscriptor");
    }
  }
  const formatDate = (d) => new Date(d).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-6", children: /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "Gestión de suscriptores" }) }),
    error && /* @__PURE__ */ jsx("p", { className: "text-red-500 mb-4", children: error }),
    loading ? /* @__PURE__ */ jsx("p", { className: "text-zinc-400", children: "Cargando suscriptores..." }) : subs.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-zinc-400", children: "No hay suscriptores." }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-xl border border-zinc-800", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-zinc-900 text-zinc-400 uppercase text-xs", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "ID" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Email" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Suscrito el" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Activo" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Acciones" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: subs.map((sub, i) => /* @__PURE__ */ jsxs(
        "tr",
        {
          className: i % 2 === 0 ? "bg-zinc-950" : "bg-zinc-900",
          children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-zinc-500", children: sub.id }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-semibold", children: sub.email }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-zinc-400", children: formatDate(sub.subscribedAt) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx(
              "span",
              {
                className: `px-2 py-1 rounded-full text-xs font-bold ${sub.active ? "bg-green-900 text-green-300" : "bg-zinc-700 text-zinc-400"}`,
                children: sub.active ? "Activo" : "Inactivo"
              }
            ) }),
            /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 flex gap-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleToggle(sub.id),
                  className: "bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1 rounded-lg text-xs transition",
                  children: sub.active ? "Desactivar" : "Activar"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setConfirmDelete(sub.id),
                  className: "bg-red-900 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs transition",
                  children: "Eliminar"
                }
              )
            ] })
          ]
        },
        sub.id
      )) })
    ] }) }),
    confirmDelete && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/70 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-zinc-900 rounded-2xl p-8 w-full max-w-sm border border-zinc-700 flex flex-col gap-4 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "¿Eliminar suscriptor?" }),
      /* @__PURE__ */ jsx("p", { className: "text-zinc-400", children: "Esta acción no se puede deshacer." }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleDelete(confirmDelete),
            className: "flex-1 bg-red-700 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition",
            children: "Eliminar"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setConfirmDelete(null),
            className: "flex-1 bg-zinc-800 text-white py-2 rounded-lg hover:bg-zinc-700 transition",
            children: "Cancelar"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 border border-zinc-800 rounded-xl p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-4", children: "Enviar campaña" }),
      /* @__PURE__ */ jsx("p", { className: "text-zinc-400 text-sm mb-4", children: "Se enviará a todos los suscriptores activos." }),
      campaignResult && /* @__PURE__ */ jsx("p", { className: "text-green-400 mb-4", children: campaignResult }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 max-w-lg", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            className: "bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none",
            placeholder: "Asunto",
            value: campaign.subject,
            onChange: (e) => setCampaign((c) => ({ ...c, subject: e.target.value }))
          }
        ),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            className: "bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none resize-none",
            placeholder: "Mensaje",
            rows: 5,
            value: campaign.message,
            onChange: (e) => setCampaign((c) => ({ ...c, message: e.target.value }))
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleCampaign,
            disabled: sending,
            className: "bg-white text-black font-bold px-5 py-2 rounded-lg  hover:text-[oklch(50.5%_0.213_27.518)] transition disabled:opacity-50 w-fit",
            children: sending ? "Enviando..." : "Enviar campaña"
          }
        )
      ] })
    ] })
  ] });
}

const $$Subscriptores = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Suscriptores" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SubsAdmin", SubsAdmin, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/components/admin/SubsAdmin.jsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/pages/admin/subscriptores.astro", void 0);

const $$file = "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/pages/admin/subscriptores.astro";
const $$url = "/admin/subscriptores";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Subscriptores,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
