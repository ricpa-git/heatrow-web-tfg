import { useEffect, useState } from "react";

const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:5257/api";

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
      const data = await res.json();
      setUsers(data);
      
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestión de usuarios</h1>
        <button onClick={() => setModal(true)} className="bg-white text-black font-bold px-5 py-2 rounded-lg hover:text-[oklch(50.5%_0.213_27.518)] transition">
          + Nuevo usuario
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <p className="text-zinc-400">Cargando usuarios...</p>
      ) : users.length === 0 ? (
        <p className="text-zinc-400">No hay usuarios.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900 text-zinc-400 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Usuario</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Creado</th>
                <th className="px-4 py-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user.id} className={i % 2 === 0 ? "bg-zinc-950" : "bg-zinc-900"}>
                  <td className="px-4 py-3 text-zinc-500">{user.id}</td>
                  <td className="px-4 py-3 font-semibold">{user.username}</td>
                  <td className="px-4 py-3 text-zinc-400">{user.email}</td>
                  <td className="px-4 py-3 text-zinc-400">{formatDate(user.created_At)}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => openEdit(user)} className="bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1 rounded-lg text-xs transition">
                      Editar
                    </button>
                    <button onClick={() => setConfirmDelete(user.id)} className="bg-red-900 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs transition">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-2xl p-8 w-full max-w-lg border border-zinc-700 flex flex-col gap-4">
            <h2 className="text-xl font-bold">{editingId ? "Editar usuario" : "Nuevo usuario admin"}</h2>
            <input
              className="bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none"
              placeholder="Nombre de usuario"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
            />
            <input
              className="bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            />
            <input
              className="bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none"
              placeholder="Contraseña"
              type="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            />
            <div className="flex gap-3 mt-2">
              <button onClick={handleSubmit} className="flex-1 bg-white text-black font-bold py-2 rounded-lg  hover:text-[oklch(50.5%_0.213_27.518)] transition">
                {editingId ? "Guardar cambios" : "Crear usuario"}
              </button>
              <button onClick={() => { setModal(false); setEditingId(null); setForm({ username: "", email: "", password: "" }); }} className="flex-1 bg-zinc-800 text-white py-2 rounded-lg  hover:text-[oklch(50.5%_0.213_27.518)] transition">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-2xl p-8 w-full max-w-sm border border-zinc-700 flex flex-col gap-4 text-center">
            <h2 className="text-xl font-bold">¿Eliminar usuario?</h2>
            <p className="text-zinc-400">Esta acción no se puede deshacer.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(confirmDelete)} className="flex-1 bg-red-700 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition">
                Eliminar
              </button>
              <button onClick={() => setConfirmDelete(null)} className="flex-1 bg-zinc-800 text-white py-2 rounded-lg hover:bg-zinc-700 transition">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}