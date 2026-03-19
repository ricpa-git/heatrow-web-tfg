import { useEffect, useState } from "react";

const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:5257/api";

const emptyForm = {
  title: "", description: "", date: "", location: "", image: "", dice_link: "", dj_ids: []
};

export default function EventosAdmin() {
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
    } catch {}
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
      dj_ids: event.djs?.map(d => parseInt(d.id)) || []
    });
    setModal(true);
  }

async function handleSubmit() {
  if (!form.title.trim()) { setError("El título es obligatorio"); return; }
  if (!form.date) { setError("La fecha es obligatoria"); return; }
  console.log("dj_ids:", form.dj_ids, form.dj_ids.map(x => typeof x)); // 

  setError(null);
  const method = editingId ? "PUT" : "POST";
  const url = editingId ? `${API_URL}/events/${editingId}` : `${API_URL}/events`;

  console.log("Enviando:", JSON.stringify(form)); // aqui

  try {
    const res = await fetch(url, {
      method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (!res.ok) {
      const msg = await res.text();
      setError(`Error: ${msg}`); // muestra el error real del backend
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
  setForm(f => ({
    ...f,
    dj_ids: f.dj_ids.includes(intId) ? f.dj_ids.filter(d => d !== intId) : [...f.dj_ids, intId]
  }));
}

  const formatDate = (d) => new Date(d).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div>
      {/* Cabecera */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestión de eventos</h1>
        <button
          onClick={openNew}
          className="bg-white text-black font-bold px-5 py-2 rounded-lg  hover:text-[oklch(50.5%_0.213_27.518)] transition"
        >
          + Nuevo evento
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Tabla */}
      {loading ? (
        <p className="text-zinc-400">Cargando eventos...</p>
      ) : events.length === 0 ? (
        <p className="text-zinc-400">No hay eventos. Crea el primero.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900 text-zinc-400 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Título</th>
                <th className="px-4 py-3 text-left">Fecha</th>
                <th className="px-4 py-3 text-left">Ubicación</th>
                <th className="px-4 py-3 text-left">DJs</th>
                <th className="px-4 py-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, i) => (
                <tr key={event.id} className={i % 2 === 0 ? "bg-zinc-950" : "bg-zinc-900"}>
                  <td className="px-4 py-3 text-zinc-500">{event.id}</td>
                  <td className="px-4 py-3 font-semibold">{event.title}</td>
                  <td className="px-4 py-3 text-zinc-400">{formatDate(event.date)}</td>
                  <td className="px-4 py-3 text-zinc-400">{event.location || "—"}</td>
<td className="px-4 py-3 text-zinc-400">{event.djs?.map(d => d.name).join(" · ") || "—"}</td>                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => openEdit(event)}
                      className="bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1 rounded-lg text-xs transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => setConfirmDelete(event.id)}
                      className="bg-red-900 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs transition"
                    >
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
            <h2 className="text-xl font-bold">{editingId ? "Editar evento" : "Nuevo evento"}</h2>

            <input
              className="bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none"
              placeholder="Título"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            />
            <textarea
              className="bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none resize-none"
              placeholder="Descripción"
              rows={3}
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            />
            <input
              type="date"
              className="bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none"
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            />
            <input
              className="bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none"
              placeholder="Ubicación"
              value={form.location}
              onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
            />
            <input
              className="bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none"
              placeholder="URL imagen"
              value={form.image}
              onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
            />
            <input
              className="bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none"
              placeholder="Link de Dice"
              value={form.dice_link}
              onChange={e => setForm(f => ({ ...f, dice_link: e.target.value }))}
            />

            {/* Selección de DJs */}
            <div>
              <p className="text-zinc-400 text-sm mb-2">DJs asignados:</p>
              {djs.length > 0 ? (
                <div className="flex flex-wrap gap-2 mb-2">
                  {djs.map(dj => (
                    <button
                      key={dj.id}
                      onClick={() => toggleDj(dj.id)}
                      className={`px-3 py-1 rounded-full text-sm border transition ${
                        form.dj_ids.includes(dj.id)
                          ? "bg-white text-black border-white"
                          : "bg-zinc-800 text-zinc-300 border-zinc-700"
                      }`}
                    >
                      {dj.name}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  className="bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none mb-2"
                  placeholder="Escribe el nombre del DJ"
                  value={form.dj_manual || ""}
                  onChange={e => setForm(f => ({ ...f, dj_manual: e.target.value }))}
                />
              )}
              {form.dj_manual && (
                <div className="text-zinc-300 text-xs mt-1">Se añadirá: {form.dj_manual}</div>
              )}
            </div>

            <div className="flex gap-3 mt-2">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-white text-black font-bold py-2 rounded-lg  hover:text-[oklch(50.5%_0.213_27.518)] transition"
              >
                {editingId ? "Guardar cambios" : "Crear evento"}
              </button>
              <button
                onClick={() => setModal(false)}
                className="flex-1 bg-zinc-800 text-white py-2 rounded-lg  hover:text-[oklch(50.5%_0.213_27.518)] transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal confirmación eliminar */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-2xl p-8 w-full max-w-sm border border-zinc-700 flex flex-col gap-4 text-center">
            <h2 className="text-xl font-bold">¿Eliminar evento?</h2>
            <p className="text-zinc-400">Esta acción no se puede deshacer.</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="flex-1 bg-red-700 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition"
              >
                Eliminar
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 bg-zinc-800 text-white py-2 rounded-lg hover:bg-zinc-700 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}