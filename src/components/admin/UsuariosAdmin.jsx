import { useEffect, useState } from "react";

const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:5257/api";

const inputCls = "w-full bg-zinc-900 border border-zinc-800 text-white px-3 py-2 text-sm outline-none focus:border-zinc-600 transition";
const btnPrimary = "bg-white text-black font-semibold px-4 py-2 text-sm hover:bg-zinc-100 transition";
const btnSecondary = "border border-zinc-700 text-zinc-300 px-4 py-2 text-sm hover:border-zinc-500 hover:text-white transition";
const btnDanger = "bg-red-600 text-white font-semibold px-4 py-2 text-sm hover:bg-red-500 transition";

export default function UsuariosAdmin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => { loadUsers(); }, []);

  async function loadUsers() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/users`, { credentials: "include" });
      setUsers(await res.json());
    } catch {
      setError("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    if (!form.username.trim() || !form.email.trim() || (!editingId && !form.password.trim())) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError(null);
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}/users/${editingId}` : `${API_URL}/users`;
    try {
      const res = await fetch(url, { method, credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) { setError(`Error: ${await res.text()}`); return; }
      setModal(false);
      setForm({ username: "", email: "", password: "" });
      setEditingId(null);
      loadUsers();
    } catch {
      setError("Error de conexión con el servidor");
    }
  }

  function openEdit(user) { setEditingId(user.id); setForm({ username: user.username, email: user.email, password: "" }); setModal(true); }
  function closeModal() { setModal(false); setEditingId(null); setForm({ username: "", email: "", password: "" }); setError(null); }

  async function handleDelete(id) {
    try {
      await fetch(`${API_URL}/users/${id}`, { method: "DELETE", credentials: "include" });
      setConfirmDelete(null);
      loadUsers();
    } catch {
      setError("Error al eliminar el usuario");
    }
  }

  const formatDate = (d) => new Date(d).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <button onClick={() => setModal(true)} className={btnPrimary}>+ Nuevo usuario</button>
      </div>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      {loading ? (
        <p className="text-zinc-600 text-sm">Cargando...</p>
      ) : users.length === 0 ? (
        <p className="text-zinc-600 text-sm">No hay usuarios.</p>
      ) : (
        <div className="border border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="px-4 py-2.5 text-left text-xs text-zinc-500 uppercase tracking-wider font-medium">ID</th>
                <th className="px-4 py-2.5 text-left text-xs text-zinc-500 uppercase tracking-wider font-medium">Usuario</th>
                <th className="px-4 py-2.5 text-left text-xs text-zinc-500 uppercase tracking-wider font-medium">Email</th>
                <th className="px-4 py-2.5 text-left text-xs text-zinc-500 uppercase tracking-wider font-medium">Creado</th>
                <th className="px-4 py-2.5 text-left text-xs text-zinc-500 uppercase tracking-wider font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-zinc-800 hover:bg-zinc-900 transition">
                  <td className="px-4 py-3 text-zinc-600 tabular-nums">{user.id}</td>
                  <td className="px-4 py-3 font-medium">{user.username}</td>
                  <td className="px-4 py-3 text-zinc-400">{user.email}</td>
                  <td className="px-4 py-3 text-zinc-400">{formatDate(user.created_At)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <button onClick={() => openEdit(user)} className="text-xs text-zinc-400 hover:text-white transition">Editar</button>
                      <button onClick={() => setConfirmDelete(user.id)} className="text-xs text-red-500 hover:text-red-400 transition">Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-md">
            <div className="px-6 py-4 border-b border-zinc-800">
              <h2 className="text-base font-semibold">{editingId ? "Editar usuario" : "Nuevo usuario admin"}</h2>
            </div>
            <div className="px-6 py-5 flex flex-col gap-3">
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <input className={inputCls} placeholder="Nombre de usuario" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} />
              <input className={inputCls} placeholder="Email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              <input className={inputCls} placeholder={editingId ? "Nueva contraseña (opcional)" : "Contraseña"} type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
            </div>
            <div className="px-6 py-4 border-t border-zinc-800 flex gap-2 justify-end">
              <button onClick={closeModal} className={btnSecondary}>Cancelar</button>
              <button onClick={handleSubmit} className={btnPrimary}>{editingId ? "Guardar" : "Crear usuario"}</button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-sm">
            <div className="px-6 py-4 border-b border-zinc-800">
              <h2 className="text-base font-semibold">Eliminar usuario</h2>
            </div>
            <div className="px-6 py-5">
              <p className="text-zinc-400 text-sm">Esta acción no se puede deshacer.</p>
            </div>
            <div className="px-6 py-4 border-t border-zinc-800 flex gap-2 justify-end">
              <button onClick={() => setConfirmDelete(null)} className={btnSecondary}>Cancelar</button>
              <button onClick={() => handleDelete(confirmDelete)} className={btnDanger}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
