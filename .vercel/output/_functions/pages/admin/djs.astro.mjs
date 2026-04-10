/* empty css                                  */
import { e as createComponent, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_BfkuFWeA.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_C7_6nSmZ.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
export { renderers } from '../../renderers.mjs';

const API_URL = "https://heatrowclub.netlify.app/admin/login";
const emptyForm = { name: "", bio: "", image: "" };
function DjsAdmin() {
  const [djs, setDjs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  useEffect(() => {
    loadDjs();
  }, []);
  async function loadDjs() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/djs`, { credentials: "include" });
      const data = await res.json();
      setDjs(data);
    } catch {
      setError("Error al cargar DJs");
    } finally {
      setLoading(false);
    }
  }
  function openNew() {
    setEditingId(null);
    setForm(emptyForm);
    setModal(true);
  }
  function openEdit(dj) {
    setEditingId(dj.id);
    setForm({ name: dj.name, bio: dj.bio || "", image: dj.image || "" });
    setModal(true);
  }
  async function handleSubmit() {
    if (!form.name.trim()) {
      setError("El nombre es obligatorio");
      return;
    }
    setError(null);
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}/djs/${editingId}` : `${API_URL}/djs`;
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
      loadDjs();
    } catch {
      setError("Error de conexión con el servidor");
    }
  }
  async function handleDelete(id) {
    try {
      await fetch(`${API_URL}/djs/${id}`, { method: "DELETE", credentials: "include" });
      setConfirmDelete(null);
      loadDjs();
    } catch {
      setError("Error al eliminar el DJ");
    }
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "Gestión de DJs" }),
      /* @__PURE__ */ jsx("button", { onClick: openNew, className: "bg-white text-black font-bold px-5 py-2 rounded-lg  hover:text-[oklch(50.5%_0.213_27.518)] transition", children: "+ Nuevo DJ" })
    ] }),
    error && /* @__PURE__ */ jsx("p", { className: "text-red-500 mb-4", children: error }),
    loading ? /* @__PURE__ */ jsx("p", { className: "text-zinc-400", children: "Cargando DJs..." }) : djs.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-zinc-400", children: "No hay DJs. Crea el primero." }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-xl border border-zinc-800", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-zinc-900 text-zinc-400 uppercase text-xs", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "ID" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Nombre" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Bio" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Imagen" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Acciones" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: djs.map((dj, i) => /* @__PURE__ */ jsxs("tr", { className: i % 2 === 0 ? "bg-zinc-950" : "bg-zinc-900", children: [
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-zinc-500", children: dj.id }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-semibold", children: dj.name }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-zinc-400 max-w-xs truncate", children: dj.bio || "—" }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-zinc-400 max-w-xs truncate", children: dj.image || "—" }),
        /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 flex gap-2", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => openEdit(dj), className: "bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1 rounded-lg text-xs transition", children: "Editar" }),
          /* @__PURE__ */ jsx("button", { onClick: () => setConfirmDelete(dj.id), className: "bg-red-900 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs transition", children: "Eliminar" })
        ] })
      ] }, dj.id)) })
    ] }) }),
    modal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/70 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-zinc-900 rounded-2xl p-8 w-full max-w-lg border border-zinc-700 flex flex-col gap-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: editingId ? "Editar DJ" : "Nuevo DJ" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          className: "bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none",
          placeholder: "Nombre",
          value: form.name,
          onChange: (e) => setForm((f) => ({ ...f, name: e.target.value }))
        }
      ),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          className: "bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none resize-none",
          placeholder: "Bio",
          rows: 3,
          value: form.bio,
          onChange: (e) => setForm((f) => ({ ...f, bio: e.target.value }))
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
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mt-2", children: [
        /* @__PURE__ */ jsx("button", { onClick: handleSubmit, className: "flex-1 bg-white text-black font-bold py-2 rounded-lg  hover:text-[oklch(50.5%_0.213_27.518)] transition", children: editingId ? "Guardar cambios" : "Crear DJ" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setModal(false), className: "flex-1 bg-zinc-800 text-white py-2 rounded-lg  hover:text-[oklch(50.5%_0.213_27.518)] transition", children: "Cancelar" })
      ] })
    ] }) }),
    confirmDelete && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/70 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-zinc-900 rounded-2xl p-8 w-full max-w-sm border border-zinc-700 flex flex-col gap-4 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "¿Eliminar DJ?" }),
      /* @__PURE__ */ jsx("p", { className: "text-zinc-400", children: "Esta acción no se puede deshacer." }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(confirmDelete), className: "flex-1 bg-red-700 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition", children: "Eliminar" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setConfirmDelete(null), className: "flex-1 bg-zinc-800 text-white py-2 rounded-lg hover:bg-zinc-700 transition", children: "Cancelar" })
      ] })
    ] }) })
  ] });
}

const $$Djs = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Eventos" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "DjsAdmin", DjsAdmin, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/components/admin/DjsAdmin.jsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/pages/admin/djs.astro", void 0);

const $$file = "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/pages/admin/djs.astro";
const $$url = "/admin/djs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Djs,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
