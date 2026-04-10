/* empty css                                  */
import { e as createComponent, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_BfkuFWeA.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_C7_6nSmZ.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
export { renderers } from '../../renderers.mjs';

const API_URL = "https://heatrowclub.netlify.app/admin/login";
function UsuariosAdmin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  useEffect(() => {
    loadUsers();
  }, []);
  async function loadUsers() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/users`, { credentials: "include" });
      const data = await res.json();
      setUsers(data);
    } catch {
      setError("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  }
  async function handleSubmit() {
    if (!form.username.trim() || !form.email.trim() || !editingId && !form.password.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError(null);
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}/users/${editingId}` : `${API_URL}/users`;
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
      setForm({ username: "", email: "", password: "" });
      setEditingId(null);
      loadUsers();
    } catch {
      setError("Error de conexión con el servidor");
    }
  }
  function openEdit(user) {
    setEditingId(user.id);
    setForm({ username: user.username, email: user.email, password: "" });
    setModal(true);
  }
  async function handleDelete(id) {
    try {
      await fetch(`${API_URL}/users/${id}`, { method: "DELETE", credentials: "include" });
      setConfirmDelete(null);
      loadUsers();
    } catch {
      setError("Error al eliminar el usuario");
    }
  }
  const formatDate = (d) => new Date(d).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "Gestión de usuarios" }),
      /* @__PURE__ */ jsx("button", { onClick: () => setModal(true), className: "bg-white text-black font-bold px-5 py-2 rounded-lg hover:text-[oklch(50.5%_0.213_27.518)] transition", children: "+ Nuevo usuario" })
    ] }),
    error && /* @__PURE__ */ jsx("p", { className: "text-red-500 mb-4", children: error }),
    loading ? /* @__PURE__ */ jsx("p", { className: "text-zinc-400", children: "Cargando usuarios..." }) : users.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-zinc-400", children: "No hay usuarios." }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-xl border border-zinc-800", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-zinc-900 text-zinc-400 uppercase text-xs", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "ID" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Usuario" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Email" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Creado" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-left", children: "Acciones" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: users.map((user, i) => /* @__PURE__ */ jsxs("tr", { className: i % 2 === 0 ? "bg-zinc-950" : "bg-zinc-900", children: [
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-zinc-500", children: user.id }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-semibold", children: user.username }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-zinc-400", children: user.email }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-zinc-400", children: formatDate(user.created_At) }),
        /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 flex gap-2", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => openEdit(user), className: "bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1 rounded-lg text-xs transition", children: "Editar" }),
          /* @__PURE__ */ jsx("button", { onClick: () => setConfirmDelete(user.id), className: "bg-red-900 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs transition", children: "Eliminar" })
        ] })
      ] }, user.id)) })
    ] }) }),
    modal && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/70 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-zinc-900 rounded-2xl p-8 w-full max-w-lg border border-zinc-700 flex flex-col gap-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: editingId ? "Editar usuario" : "Nuevo usuario admin" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          className: "bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none",
          placeholder: "Nombre de usuario",
          value: form.username,
          onChange: (e) => setForm((f) => ({ ...f, username: e.target.value }))
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          className: "bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none",
          placeholder: "Email",
          type: "email",
          value: form.email,
          onChange: (e) => setForm((f) => ({ ...f, email: e.target.value }))
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          className: "bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none",
          placeholder: "Contraseña",
          type: "password",
          value: form.password,
          onChange: (e) => setForm((f) => ({ ...f, password: e.target.value }))
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mt-2", children: [
        /* @__PURE__ */ jsx("button", { onClick: handleSubmit, className: "flex-1 bg-white text-black font-bold py-2 rounded-lg  hover:text-[oklch(50.5%_0.213_27.518)] transition", children: editingId ? "Guardar cambios" : "Crear usuario" }),
        /* @__PURE__ */ jsx("button", { onClick: () => {
          setModal(false);
          setEditingId(null);
          setForm({ username: "", email: "", password: "" });
        }, className: "flex-1 bg-zinc-800 text-white py-2 rounded-lg  hover:text-[oklch(50.5%_0.213_27.518)] transition", children: "Cancelar" })
      ] })
    ] }) }),
    confirmDelete && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/70 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-zinc-900 rounded-2xl p-8 w-full max-w-sm border border-zinc-700 flex flex-col gap-4 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "¿Eliminar usuario?" }),
      /* @__PURE__ */ jsx("p", { className: "text-zinc-400", children: "Esta acción no se puede deshacer." }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(confirmDelete), className: "flex-1 bg-red-700 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition", children: "Eliminar" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setConfirmDelete(null), className: "flex-1 bg-zinc-800 text-white py-2 rounded-lg hover:bg-zinc-700 transition", children: "Cancelar" })
      ] })
    ] }) })
  ] });
}

const $$Usuarios = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Usuarios" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "UsuariosAdmin", UsuariosAdmin, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/components/admin/UsuariosAdmin.jsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/pages/admin/usuarios.astro", void 0);

const $$file = "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/pages/admin/usuarios.astro";
const $$url = "/admin/usuarios";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Usuarios,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
