import { useEffect, useRef, useState } from "react";

const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:5257/api";

const inputCls = "w-full bg-zinc-900 border border-zinc-800 text-white px-3 py-2 text-sm outline-none focus:border-zinc-600 transition";
const btnPrimary = "bg-white text-black font-semibold px-4 py-2 text-sm hover:bg-zinc-100 transition disabled:opacity-50 disabled:cursor-not-allowed";
const btnSecondary = "border border-zinc-700 text-zinc-300 px-4 py-2 text-sm hover:border-zinc-500 hover:text-white transition";

const PHOTO_EXT = ["jpg", "jpeg", "png", "webp"];
const VIDEO_EXT = ["mp4", "webm"];
const MAX_PHOTO_MB = 10;
const MAX_VIDEO_MB = 100;

export default function GalleryAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  const [type, setType] = useState("photo");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/gallery`, { credentials: "include" });
      if (!res.ok) {
        setError(`Error ${res.status}: ${res.statusText}`);
        return;
      }
      setItems(await res.json());
    } catch (e) {
      setError(`Error de conexión: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  function validateFile(f, currentType) {
    if (!f) return "Selecciona un archivo";
    const ext = (f.name.split(".").pop() || "").toLowerCase();
    const allowed = currentType === "photo" ? PHOTO_EXT : VIDEO_EXT;
    if (!allowed.includes(ext)) {
      return `Extensión no permitida. Usa: ${allowed.join(", ")}`;
    }
    const maxMb = currentType === "photo" ? MAX_PHOTO_MB : MAX_VIDEO_MB;
    if (f.size > maxMb * 1024 * 1024) {
      return `Archivo demasiado grande. Máximo ${maxMb}MB`;
    }
    return null;
  }

  function handleFileSelect(f) {
    setError(null);
    if (!f) { setFile(null); return; }
    const err = validateFile(f, type);
    if (err) { setError(err); setFile(null); return; }
    setFile(f);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    handleFileSelect(f);
  }

  async function handleUpload() {
    if (!file) { setError("Selecciona un archivo"); return; }
    const err = validateFile(file, type);
    if (err) { setError(err); return; }

    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("type", type);
      fd.append("title", title);
      fd.append("file", file);
      const res = await fetch(`${API_URL}/gallery/upload`, {
        method: "POST",
        credentials: "include",
        body: fd
      });
      if (!res.ok) {
        const text = await res.text();
        setError(`Error: ${text.slice(0, 200)}`);
        return;
      }
      setFile(null);
      setTitle("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      await load();
    } catch (e) {
      setError(`Error de conexión: ${e.message}`);
    } finally {
      setUploading(false);
    }
  }

  async function handleToggle(id) {
    try {
      await fetch(`${API_URL}/gallery/${id}/toggle`, { method: "PATCH", credentials: "include" });
      load();
    } catch {
      setError("Error al cambiar el estado");
    }
  }

  async function handleDelete(id) {
    try {
      await fetch(`${API_URL}/gallery/${id}`, { method: "DELETE", credentials: "include" });
      setConfirmDelete(null);
      load();
    } catch {
      setError("Error al eliminar");
    }
  }

  const filtered = filter === "all" ? items : items.filter(i => i.type === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Galería</h1>
      </div>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      {/* Formulario de subida */}
      <div className="border border-zinc-800 p-5 mb-8 bg-zinc-950">
        <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">Subir nuevo archivo</h2>

        <div className="flex gap-3 mb-3">
          <select className={inputCls + " max-w-[160px]"} value={type} onChange={e => { setType(e.target.value); setFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}>
            <option value="photo">Foto</option>
            <option value="video">Video</option>
          </select>
          <input className={inputCls} placeholder="Título (opcional)" value={title} onChange={e => setTitle(e.target.value)} />
        </div>

        <div
          onDragOver={e => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed cursor-pointer text-center py-10 px-4 transition ${
            dragActive ? "border-white bg-zinc-900" : "border-zinc-700 hover:border-zinc-500"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept={type === "photo" ? PHOTO_EXT.map(e => "." + e).join(",") : VIDEO_EXT.map(e => "." + e).join(",")}
            onChange={e => handleFileSelect(e.target.files?.[0])}
          />
          {file ? (
            <div>
              <p className="text-white text-sm font-medium">{file.name}</p>
              <p className="text-zinc-500 text-xs mt-1">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
          ) : (
            <div>
              <p className="text-zinc-300 text-sm">Arrastra un archivo aquí o haz clic para seleccionar</p>
              <p className="text-zinc-500 text-xs mt-2">
                {type === "photo"
                  ? `Formatos: ${PHOTO_EXT.join(", ")} · Máx ${MAX_PHOTO_MB}MB`
                  : `Formatos: ${VIDEO_EXT.join(", ")} · Máx ${MAX_VIDEO_MB}MB`}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-4 gap-2">
          {file && (
            <button onClick={() => { setFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} className={btnSecondary}>
              Quitar
            </button>
          )}
          <button onClick={handleUpload} disabled={!file || uploading} className={btnPrimary}>
            {uploading ? "Subiendo..." : "Subir"}
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-4">
        {[
          { v: "all", l: "Todos" },
          { v: "photo", l: "Fotos" },
          { v: "video", l: "Videos" }
        ].map(b => (
          <button
            key={b.v}
            onClick={() => setFilter(b.v)}
            className={`px-3 py-1 text-xs border transition ${
              filter === b.v
                ? "bg-white text-black border-white"
                : "bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-500 hover:text-white"
            }`}
          >
            {b.l}
          </button>
        ))}
      </div>

      {/* Listado */}
      {loading ? (
        <p className="text-zinc-600 text-sm">Cargando...</p>
      ) : filtered.length === 0 ? (
        <p className="text-zinc-600 text-sm">No hay items.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(item => (
            <div key={item.id} className={`border border-zinc-800 bg-zinc-950 transition ${item.isActive ? "" : "opacity-50"}`}>
              <div className="relative aspect-square bg-black flex items-center justify-center overflow-hidden">
                {item.type === "photo" ? (
                  <img src={item.filePath} alt={item.title || ""} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="flex flex-col items-center justify-center text-zinc-400">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span className="text-xs uppercase tracking-wider mt-2">Video</span>
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-sm text-white truncate" title={item.title}>{item.title || "—"}</p>
                <p className="text-xs text-zinc-500 mt-1 uppercase">{item.type}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleToggle(item.id)}
                    className={`text-xs font-semibold px-2 py-0.5 border transition flex-1 ${
                      item.isActive
                        ? "border-green-700 text-green-500 hover:bg-green-700 hover:text-white"
                        : "border-zinc-700 text-zinc-500 hover:border-zinc-500 hover:text-white"
                    }`}
                  >
                    {item.isActive ? "Activo" : "Inactivo"}
                  </button>
                  <button
                    onClick={() => setConfirmDelete(item.id)}
                    className="text-xs text-red-500 hover:text-red-400 transition"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-sm">
            <div className="px-6 py-4 border-b border-zinc-800">
              <h2 className="text-base font-semibold">Eliminar item</h2>
            </div>
            <div className="px-6 py-5">
              <p className="text-zinc-400 text-sm">Se eliminará el archivo y el registro. Esta acción no se puede deshacer.</p>
            </div>
            <div className="px-6 py-4 border-t border-zinc-800 flex gap-2 justify-end">
              <button onClick={() => setConfirmDelete(null)} className={btnSecondary}>Cancelar</button>
              <button onClick={() => handleDelete(confirmDelete)} className="bg-red-600 text-white font-semibold px-4 py-2 text-sm hover:bg-red-500 transition">Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
