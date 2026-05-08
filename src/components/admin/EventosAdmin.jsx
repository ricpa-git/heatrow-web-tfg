import { useEffect, useState } from "react";

const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:5257/api";

const emptyForm = {
  title: "", description: "", date: "", location: "",
  image: "", dice_link: "", timeSlot: "", isActive: true, dj_ids: []
};

const inputCls = "w-full bg-zinc-900 border border-zinc-800 text-white px-3 py-2 text-sm outline-none focus:border-zinc-600 transition";
const btnPrimary = "bg-white text-black font-semibold px-4 py-2 text-sm hover:bg-zinc-100 transition";
const btnSecondary = "border border-zinc-700 text-zinc-300 px-4 py-2 text-sm hover:border-zinc-500 hover:text-white transition";
const btnDanger = "bg-red-600 text-white font-semibold px-4 py-2 text-sm hover:bg-red-500 transition";

export default function EventosAdmin() {
  const [events, setEvents] = useState([]);
  const [djs, setDjs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => { loadEvents(); loadDjs(); }, []);

  async function loadEvents() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/events/admin/all`, { credentials: "include" });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        setError(`Error ${res.status}: ${text.slice(0, 120) || res.statusText}`);
        return;
      }
      setEvents(await res.json());
    } catch (e) {
      setError(`Error de conexión: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function loadDjs() {
    try {
      const res = await fetch(`${API_URL}/djs`, { credentials: "include" });
      setDjs(await res.json());
    } catch {}
  }

  function openNew() { setEditingId(null); setForm(emptyForm); setError(null); setModal(true); }

  function openEdit(event) {
    setEditingId(event.id);
    setForm({
      title: event.title || "",
      description: event.description || "",
      date: event.date?.slice(0, 10) || "",
      location: event.location || "",
      image: event.image || "",
      dice_link: event.dice_Link || "",
      timeSlot: event.timeSlot || "",
      isActive: event.isActive ?? true,
      dj_ids: event.djs?.map(d => parseInt(d.id)) || []
    });
    setError(null);
    setModal(true);
  }

  async function handleSubmit() {
    if (!form.title.trim()) { setError("El título es obligatorio"); return; }
    if (!form.date) { setError("La fecha es obligatoria"); return; }
    setError(null);
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}/events/${editingId}` : `${API_URL}/events`;
    const body = {
      title: form.title,
      description: form.description,
      date: form.date,
      location: form.location,
      image: form.image,
      dice_Link: form.dice_link,
      timeSlot: form.timeSlot,
      isActive: form.isActive,
      dj_ids: form.dj_ids
    };
    try {
      const res = await fetch(url, { method, credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!res.ok) { setError(`Error: ${await res.text()}`); return; }
      setModal(false);
      loadEvents();
    } catch {
      setError("Error de conexión con el servidor");
    }
  }

  async function handleToggle(id) {
    try {
      await fetch(`${API_URL}/events/${id}/toggle`, { method: "PATCH", credentials: "include" });
      loadEvents();
    } catch {
      setError("Error al cambiar el estado del evento");
    }
  }

  async function handleDelete(id) {
    try {
      await fetch(`${API_URL}/events/${id}`, { method: "DELETE", credentials: "include" });
      setConfirmDelete(null);
      loadEvents();
    } catch {
      setError("Error al eliminar el evento");
    }
  }

  function toggleDj(id) {
    const intId = parseInt(id);
    setForm(f => ({
      ...f,
      dj_ids: f.dj_ids.includes(intId) ? f.dj_ids.filter(d => d !== intId) : [...f.dj_ids, intId]
    }));
  }

  const formatDate = (d) => new Date(d).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Eventos</h1>
        <button onClick={openNew} className={btnPrimary}>+ Nuevo evento</button>
      </div>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      {loading ? (
        <p className="text-zinc-600 text-sm">Cargando...</p>
      ) : events.length === 0 ? (
        <p className="text-zinc-600 text-sm">No hay eventos. Crea el primero.</p>
      ) : (
        <div className="border border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="px-4 py-2.5 text-left text-xs text-zinc-500 uppercase tracking-wider font-medium">ID</th>
                <th className="px-4 py-2.5 text-left text-xs text-zinc-500 uppercase tracking-wider font-medium">Título</th>
                <th className="px-4 py-2.5 text-left text-xs text-zinc-500 uppercase tracking-wider font-medium">Fecha</th>
                <th className="px-4 py-2.5 text-left text-xs text-zinc-500 uppercase tracking-wider font-medium">Horario</th>
                <th className="px-4 py-2.5 text-left text-xs text-zinc-500 uppercase tracking-wider font-medium">DJs</th>
                <th className="px-4 py-2.5 text-left text-xs text-zinc-500 uppercase tracking-wider font-medium">Estado</th>
                <th className="px-4 py-2.5 text-left text-xs text-zinc-500 uppercase tracking-wider font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className={`border-b border-zinc-800 transition ${event.isActive ? "hover:bg-zinc-900" : "opacity-50 hover:bg-zinc-900"}`}>
                  <td className="px-4 py-3 text-zinc-600 tabular-nums">{event.id}</td>
                  <td className="px-4 py-3 font-medium">{event.title}</td>
                  <td className="px-4 py-3 text-zinc-400">{formatDate(event.date)}</td>
                  <td className="px-4 py-3 text-zinc-400">{event.timeSlot || "—"}</td>
                  <td className="px-4 py-3 text-zinc-400">{event.djs?.map(d => d.name).join(" · ") || "—"}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleToggle(event.id)}
                      className={`text-xs font-semibold px-2 py-0.5 border transition ${
                        event.isActive
                          ? "border-green-700 text-green-500 hover:bg-green-700 hover:text-white"
                          : "border-zinc-700 text-zinc-500 hover:border-zinc-500 hover:text-white"
                      }`}
                      title={event.isActive ? "Desactivar" : "Activar"}
                    >
                      {event.isActive ? "Activo" : "Inactivo"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <button onClick={() => openEdit(event)} className="text-xs text-zinc-400 hover:text-white transition">Editar</button>
                      <button onClick={() => setConfirmDelete(event.id)} className="text-xs text-red-500 hover:text-red-400 transition">Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 overflow-y-auto py-8">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-lg mx-4">
            <div className="px-6 py-4 border-b border-zinc-800">
              <h2 className="text-base font-semibold">{editingId ? "Editar evento" : "Nuevo evento"}</h2>
            </div>
            <div className="px-6 py-5 flex flex-col gap-3">
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <input className={inputCls} placeholder="Título" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              <textarea className={inputCls} placeholder="Descripción" rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ resize: "none" }} />
              <div className="flex gap-3">
                <input type="date" className={inputCls} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
                <input className={inputCls} placeholder="Horario (ej: 00:00 - 06:00)" value={form.timeSlot} onChange={e => setForm(f => ({ ...f, timeSlot: e.target.value }))} />
              </div>
              <input className={inputCls} placeholder="Ubicación" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
              <input className={inputCls} placeholder="URL imagen / video" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} />
              <input className={inputCls} placeholder="Link de las entradas" value={form.dice_link} onChange={e => setForm(f => ({ ...f, dice_link: e.target.value }))} />

              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div
                  onClick={() => setForm(f => ({ ...f, isActive: !f.isActive }))}
                  className={`relative w-10 h-5 rounded-full transition-colors ${form.isActive ? "bg-green-600" : "bg-zinc-700"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${form.isActive ? "translate-x-5" : "translate-x-0"}`} />
                </div>
                <span className="text-sm text-zinc-400">{form.isActive ? "Evento activo (visible en el front)" : "Evento inactivo (oculto en el front)"}</span>
              </label>

              {djs.length > 0 && (
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">DJs asignados</p>
                  <div className="flex flex-wrap gap-2">
                    {djs.map(dj => (
                      <button
                        key={dj.id}
                        type="button"
                        onClick={() => toggleDj(dj.id)}
                        className={`px-3 py-1 text-xs border transition ${
                          form.dj_ids.includes(dj.id)
                            ? "bg-white text-black border-white"
                            : "bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-500 hover:text-white"
                        }`}
                      >
                        {dj.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-zinc-800 flex gap-2 justify-end">
              <button onClick={() => setModal(false)} className={btnSecondary}>Cancelar</button>
              <button onClick={handleSubmit} className={btnPrimary}>{editingId ? "Guardar" : "Crear evento"}</button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-sm">
            <div className="px-6 py-4 border-b border-zinc-800">
              <h2 className="text-base font-semibold">Eliminar evento</h2>
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
