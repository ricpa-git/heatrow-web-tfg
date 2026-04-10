/* empty css                                  */
import { e as createComponent, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_BfkuFWeA.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_C7_6nSmZ.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
export { renderers } from '../../renderers.mjs';

const API_URL = "https://heatrowclub.netlify.app/admin/login";
const emptyForm = {
  title: "",
  description: "",
  date: "",
  location: "",
  image: "",
  dice_link: "",
  dj_ids: []
};
function EventosAdmin() {
  const [events, setEvents] = useState([]);
  const [djs, setDjs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  useEffect(() => {
    loadEvents();
    loadDjs();
  }, []);
  async function loadEvents() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/events`, { credentials: "include" });
      const data = await res.json();
      setEvents(data);
    } catch {
      setError("Error al cargar eventos");
    } finally {
      setLoading(false);
    }
  }
  async function loadDjs() {
    try {
      const res = await fetch(`${API_URL}/djs`, { credentials: "include" });
      const data = await res.json();
      setDjs(data);
    } catch {
    }
  }
  function openNew() {
    setEditingId(null);
    setForm(emptyForm);
    setModal(true);
  }
  function openEdit(event) {
    setEditingId(event.id);
    setForm({
      title: event.title,
      description: event.description || "",
      date: event.date?.slice(0, 10) || "",
      location: event.location || "",
      image: event.image || "",
      dice_link: event.dice_link || "",
      dj_ids: event.djs?.map((d) => parseInt(d.id)) || []
    });
    setModal(true);
  }
  async function handleSubmit() {
    if (!form.title.trim()) {
      setError("El título es obligatorio");
      return;
    }
    if (!form.date) {
      setError("La fecha es obligatoria");
      return;
    }
    console.log("dj_ids:", form.dj_ids, form.dj_ids.map((x) => typeof x));
    setError(null);
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}/events/${editingId}` : `${API_URL}/events`;
    console.log("Enviando:", JSON.stringify(form));
    try {
      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        const msg = await res.text();
        setError(`Error: ${msg}`);
        return;
      }
      setModal(false);
      loadEvents();
    } catch {
      setError("Error de conexión con el servidor");
    }
  }
  async function handleDelete(id) {
    try {
      await fetch(`${API_URL}/events/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      setConfirmDelete(null);
      loadEvents();
    } catch {
      setError("Error al eliminar el evento");
    }
  }
  function toggleDj(id) {
    const intId = parseInt(id);
    setForm((f) => ({
      ...f,
      dj_ids: f.dj_ids.includes(intId) ? f.dj_ids.filter((d) => d !== intId) : [...f.dj_ids, intId]
    }));
  }
  const formatDate = (d) => new Date(d).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "Gestión de eventos" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: openNew,
          className: "bg-white text-black font-bold px-5 py-2 rounded-lg  hover:text-[oklch(50.5%_0.213_27.518)] transition",
          children: "+ Nuevo evento"
        }
      )
    ] }),
    error && /* @__PURE__ */ jsx("p", { className: "text-red-500 mb-4", children: error }),
    loading ? /* @__PURE__ */ jsx("p", { className: "text-zinc-400", children: "Cargando eventos..." }) : events.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-zinc-400", children: "No hay eventos. Crea el primero." }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-xl border border-zinc-800", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-zinc-900 text-zinc-400 uppercase text-xs", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "ID" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Título" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Fecha" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Ubicación" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "DJs" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Acciones" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: events.map((event, i) => /* @__PURE__ */ jsxs("tr", { className: i % 2 === 0 ? "bg-zinc-950" : "bg-zinc-900", children: [
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-zinc-500", children: event.id }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-semibold", children: event.title }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-zinc-400", children: formatDate(event.date) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-zinc-400", children: event.location || "—" }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-zinc-400", children: event.djs?.map((d) => d.name).join(" · ") || "—" }),
        "                  ",
        /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 flex gap-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => openEdit(event),
              className: "bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1 rounded-lg text-xs transition",
              children: "Editar"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setConfirmDelete(event.id),
              className: "bg-red-900 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs transition",
              children: "Eliminar"
            }
          )
        ] })
      ] }, event.id)) })
    ] }) }),
    modal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/70 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-zinc-900 rounded-2xl p-8 w-full max-w-lg border border-zinc-700 flex flex-col gap-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: editingId ? "Editar evento" : "Nuevo evento" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          className: "bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none",
          placeholder: "Título",
          value: form.title,
          onChange: (e) => setForm((f) => ({ ...f, title: e.target.value }))
        }
      ),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          className: "bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none resize-none",
          placeholder: "Descripción",
          rows: 3,
          value: form.description,
          onChange: (e) => setForm((f) => ({ ...f, description: e.target.value }))
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "date",
          className: "bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none",
          value: form.date,
          onChange: (e) => setForm((f) => ({ ...f, date: e.target.value }))
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          className: "bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none",
          placeholder: "Ubicación",
          value: form.location,
          onChange: (e) => setForm((f) => ({ ...f, location: e.target.value }))
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          className: "bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none",
          placeholder: "URL imagen",
          value: form.image,
          onChange: (e) => setForm((f) => ({ ...f, image: e.target.value }))
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          className: "bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none",
          placeholder: "Link de Dice",
          value: form.dice_link,
          onChange: (e) => setForm((f) => ({ ...f, dice_link: e.target.value }))
        }
      ),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-zinc-400 text-sm mb-2", children: "DJs asignados:" }),
        djs.length > 0 ? /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-2", children: djs.map((dj) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => toggleDj(dj.id),
            className: `px-3 py-1 rounded-full text-sm border transition ${form.dj_ids.includes(dj.id) ? "bg-white text-black border-white" : "bg-zinc-800 text-zinc-300 border-zinc-700"}`,
            children: dj.name
          },
          dj.id
        )) }) : /* @__PURE__ */ jsx(
          "input",
          {
            className: "bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none mb-2",
            placeholder: "Escribe el nombre del DJ",
            value: form.dj_manual || "",
            onChange: (e) => setForm((f) => ({ ...f, dj_manual: e.target.value }))
          }
        ),
        form.dj_manual && /* @__PURE__ */ jsxs("div", { className: "text-zinc-300 text-xs mt-1", children: [
          "Se añadirá: ",
          form.dj_manual
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mt-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleSubmit,
            className: "flex-1 bg-white text-black font-bold py-2 rounded-lg  hover:text-[oklch(50.5%_0.213_27.518)] transition",
            children: editingId ? "Guardar cambios" : "Crear evento"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setModal(false),
            className: "flex-1 bg-zinc-800 text-white py-2 rounded-lg  hover:text-[oklch(50.5%_0.213_27.518)] transition",
            children: "Cancelar"
          }
        )
      ] })
    ] }) }),
    confirmDelete && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/70 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-zinc-900 rounded-2xl p-8 w-full max-w-sm border border-zinc-700 flex flex-col gap-4 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "¿Eliminar evento?" }),
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
    ] }) })
  ] });
}

const $$Eventos = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Eventos" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "EventosAdmin", EventosAdmin, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/components/admin/EventosAdmin.jsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/pages/admin/eventos.astro", void 0);

const $$file = "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/pages/admin/eventos.astro";
const $$url = "/admin/eventos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Eventos,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
