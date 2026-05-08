import { useEffect, useState } from "react";

const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:5257/api";

const emptyForm = { name: "", bio: "", image: "" };

const inputCls = "w-full bg-zinc-900 border border-zinc-800 text-white px-3 py-2 text-sm outline-none focus:border-zinc-600 transition";
const btnPrimary = "bg-white text-black font-semibold px-4 py-2 text-sm hover:bg-zinc-100 transition";
const btnSecondary = "border border-zinc-700 text-zinc-300 px-4 py-2 text-sm hover:border-zinc-500 hover:text-white transition";
const btnDanger = "bg-red-600 text-white font-semibold px-4 py-2 text-sm hover:bg-red-500 transition";

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
      setDjs(await res.json());
    } catch {
      setError("Error al cargar DJs");
    } finally {
      setLoading(false);
    }
  }

  function openNew() { setEditingId(null); setForm(emptyForm); setModal(true); }
  function openEdit(dj) { setEditingId(dj.id); setForm({ name: dj.name, bio: dj.bio || "", image: dj.image || "" }); setModal(true); }

  async function handleSubmit() {
    if (!form.name.trim()) { setError("El nombre es obligatorio"); return; }
    setError(null);
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}/djs/${editingId}` : `${API_URL}/djs`;
    try {
      const res = await fetch(url, { method, credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) { setError(`Error: ${await res.text()}`); return; }
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
        <h1 className="text-2xl font-bold">DJs</h1>
        <button onClick={openNew} className={btnPrimary}>+ Nuevo DJ</button>
      </div>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      {loading ? (
        <p className="text-zinc-600 text-sm">Cargando...</p>
      ) : djs.length === 0 ? (
        <p className="text-zinc-600 text-sm">No hay DJs. Crea el primero.</p>
      ) : (
        <div className="border border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="px-4 py-2.5 text-left text-xs text-zinc-500 uppercase tracking-wider font-medium">ID</th>
                <th className="px-4 py-2.5 text-left text-xs text-zinc-500 uppercase tracking-wider font-medium">Nombre</th>
                <th className="px-4 py-2.5 text-left text-xs text-zinc-500 uppercase tracking-wider font-medium">Bio</th>
                <th className="px-4 py-2.5 text-left text-xs text-zinc-500 uppercase tracking-wider font-medium">Imagen</th>
                <th className="px-4 py-2.5 text-left text-xs text-zinc-500 uppercase tracking-wider font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {djs.map((dj) => (
                <tr key={dj.id} className="border-b border-zinc-800 hover:bg-zinc-900 transition">
                  <td className="px-4 py-3 text-zinc-600 tabular-nums">{dj.id}</td>
                  <td className="px-4 py-3 font-medium">{dj.name}</td>
                  <td className="px-4 py-3 text-zinc-400 max-w-xs truncate">{dj.bio || "—"}</td>
                  <td className="px-4 py-3 text-zinc-400 max-w-xs truncate">{dj.image || "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <button onClick={() => openEdit(dj)} className="text-xs text-zinc-400 hover:text-white transition">Editar</button>
                      <button onClick={() => setConfirmDelete(dj.id)} className="text-xs text-red-500 hover:text-red-400 transition">Eliminar</button>
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
              <h2 className="text-base font-semibold">{editingId ? "Editar DJ" : "Nuevo DJ"}</h2>
            </div>
            <div className="px-6 py-5 flex flex-col gap-3">
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <input className={inputCls} placeholder="Nombre" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              <textarea className={inputCls} placeholder="Bio" rows={3} value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} style={{ resize: "none" }} />
              <input className={inputCls} placeholder="URL imagen" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} />
            </div>
            <div className="px-6 py-4 border-t border-zinc-800 flex gap-2 justify-end">
              <button onClick={() => setModal(false)} className={btnSecondary}>Cancelar</button>
              <button onClick={handleSubmit} className={btnPrimary}>{editingId ? "Guardar" : "Crear DJ"}</button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-sm">
            <div className="px-6 py-4 border-b border-zinc-800">
              <h2 className="text-base font-semibold">Eliminar DJ</h2>
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
