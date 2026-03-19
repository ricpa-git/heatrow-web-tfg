import { useEffect, useState } from "react";

const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:5257/api";

const emptyForm = { name: "", bio: "", image: "" };

export default function DjsAdmin() {
  const [djs, setDjs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => { loadDjs(); }, []);

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
    if (!form.name.trim()) { setError("El nombre es obligatorio"); return; }
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestión de DJs</h1>
        <button onClick={openNew} className="bg-white text-black font-bold px-5 py-2 rounded-lg  hover:text-[oklch(50.5%_0.213_27.518)] transition">
          + Nuevo DJ
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <p className="text-zinc-400">Cargando DJs...</p>
      ) : djs.length === 0 ? (
        <p className="text-zinc-400">No hay DJs. Crea el primero.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900 text-zinc-400 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Nombre</th>
                <th className="px-4 py-3 text-left">Bio</th>
                <th className="px-4 py-3 text-left">Imagen</th>
                <th className="px-4 py-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {djs.map((dj, i) => (
                <tr key={dj.id} className={i % 2 === 0 ? "bg-zinc-950" : "bg-zinc-900"}>
                  <td className="px-4 py-3 text-zinc-500">{dj.id}</td>
                  <td className="px-4 py-3 font-semibold">{dj.name}</td>
                  <td className="px-4 py-3 text-zinc-400 max-w-xs truncate">{dj.bio || "—"}</td>
                  <td className="px-4 py-3 text-zinc-400 max-w-xs truncate">{dj.image || "—"}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => openEdit(dj)} className="bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1 rounded-lg text-xs transition">
                      Editar
                    </button>
                    <button onClick={() => setConfirmDelete(dj.id)} className="bg-red-900 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs transition">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal crear/editar */}
      {modal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-2xl p-8 w-full max-w-lg border border-zinc-700 flex flex-col gap-4">
            <h2 className="text-xl font-bold">{editingId ? "Editar DJ" : "Nuevo DJ"}</h2>
            <input
              className="bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none"
              placeholder="Nombre"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
            <textarea
              className="bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none resize-none"
              placeholder="Bio"
              rows={3}
              value={form.bio}
              onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
            />
            <input
              className="bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none"
              placeholder="URL imagen"
              value={form.image}
              onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
            />
            <div className="flex gap-3 mt-2">
              <button onClick={handleSubmit} className="flex-1 bg-white text-black font-bold py-2 rounded-lg  hover:text-[oklch(50.5%_0.213_27.518)] transition">
                {editingId ? "Guardar cambios" : "Crear DJ"}
              </button>
              <button onClick={() => setModal(false)} className="flex-1 bg-zinc-800 text-white py-2 rounded-lg  hover:text-[oklch(50.5%_0.213_27.518)] transition">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal confirmar eliminar */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-2xl p-8 w-full max-w-sm border border-zinc-700 flex flex-col gap-4 text-center">
            <h2 className="text-xl font-bold">¿Eliminar DJ?</h2>
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