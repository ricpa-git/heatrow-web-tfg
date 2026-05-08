import { useEffect, useState } from "react";

const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:5257/api";

const inputCls = "w-full bg-zinc-900 border border-zinc-800 text-white px-3 py-2 text-sm outline-none focus:border-zinc-600 transition";
const btnPrimary = "bg-white text-black font-semibold px-4 py-2 text-sm hover:bg-zinc-100 transition disabled:opacity-40";
const btnSecondary = "border border-zinc-700 text-zinc-300 px-4 py-2 text-sm hover:border-zinc-500 hover:text-white transition";
const btnDanger = "bg-red-600 text-white font-semibold px-4 py-2 text-sm hover:bg-red-500 transition";

export default function SubsAdmin() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [campaign, setCampaign] = useState({ subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [campaignResult, setCampaignResult] = useState(null);

  useEffect(() => {
    if (!window.emailjs) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
      script.onload = () => { window.emailjs.init("YInKJUQPM6IOOpXF9"); };
      document.head.appendChild(script);
    }
    loadSubs();
  }, []);

  async function loadSubs() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/subscribers`, { credentials: "include" });
      setSubs(await res.json());
    } catch {
      setError("Error al cargar suscriptores");
    } finally {
      setLoading(false);
    }
  }

  async function handleToggle(id) {
    try {
      await fetch(`${API_URL}/subscribers/${id}/toggle`, { method: "PUT", credentials: "include" });
      loadSubs();
    } catch {
      setError("Error al cambiar el estado");
    }
  }

  async function handleDelete(id) {
    try {
      await fetch(`${API_URL}/subscribers/${id}`, { method: "DELETE", credentials: "include" });
      setConfirmDelete(null);
      loadSubs();
    } catch {
      setError("Error al eliminar el suscriptor");
    }
  }

  async function handleCampaign() {
    if (!campaign.subject.trim() || !campaign.message.trim()) {
      setError("El asunto y el mensaje son obligatorios");
      return;
    }
    setSending(true);
    setCampaignResult(null);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/subscribers/emails`, { credentials: "include" });
      const emails = await res.json();
      if (emails.length === 0) { setCampaignResult("No hay suscriptores activos"); return; }
      let enviados = 0;
      for (const email of emails) {
        await window.emailjs.send("service_zwo9za8", "template_cxd0vtq", {
          to_email: email,
          subject: campaign.subject,
          message: campaign.message,
          unsubscribe_url: `${window.location.origin}/unsubscribe?email=${encodeURIComponent(email)}`,
        });
        enviados++;
      }
      setCampaignResult(`Campaña enviada a ${enviados} suscriptores`);
      setCampaign({ subject: "", message: "" });
    } catch {
      setError("Error al enviar la campaña");
    } finally {
      setSending(false);
    }
  }

  const formatDate = (d) => new Date(d).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Suscriptores</h1>
      </div>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      {loading ? (
        <p className="text-zinc-600 text-sm">Cargando...</p>
      ) : subs.length === 0 ? (
        <p className="text-zinc-600 text-sm">No hay suscriptores.</p>
      ) : (
        <div className="border border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="px-4 py-2.5 text-left text-xs text-zinc-500 uppercase tracking-wider font-medium">ID</th>
                <th className="px-4 py-2.5 text-left text-xs text-zinc-500 uppercase tracking-wider font-medium">Email</th>
                <th className="px-4 py-2.5 text-left text-xs text-zinc-500 uppercase tracking-wider font-medium">Suscrito el</th>
                <th className="px-4 py-2.5 text-left text-xs text-zinc-500 uppercase tracking-wider font-medium">Estado</th>
                <th className="px-4 py-2.5 text-left text-xs text-zinc-500 uppercase tracking-wider font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((sub) => (
                <tr key={sub.id} className="border-b border-zinc-800 hover:bg-zinc-900 transition">
                  <td className="px-4 py-3 text-zinc-600 tabular-nums">{sub.id}</td>
                  <td className="px-4 py-3 font-medium">{sub.email}</td>
                  <td className="px-4 py-3 text-zinc-400">{formatDate(sub.subscribedAt)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium ${sub.active ? "text-green-400" : "text-zinc-600"}`}>
                      {sub.active ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <button onClick={() => handleToggle(sub.id)} className="text-xs text-zinc-400 hover:text-white transition">
                        {sub.active ? "Desactivar" : "Activar"}
                      </button>
                      <button onClick={() => setConfirmDelete(sub.id)} className="text-xs text-red-500 hover:text-red-400 transition">
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-sm">
            <div className="px-6 py-4 border-b border-zinc-800">
              <h2 className="text-base font-semibold">Eliminar suscriptor</h2>
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

      <div className="mt-10 border border-zinc-800">
        <div className="px-6 py-4 border-b border-zinc-800">
          <h2 className="text-base font-semibold">Enviar campaña</h2>
          <p className="text-zinc-500 text-xs mt-0.5">Se enviará a todos los suscriptores activos</p>
        </div>
        <div className="px-6 py-5 flex flex-col gap-3 max-w-lg">
          {campaignResult && <p className="text-green-400 text-sm">{campaignResult}</p>}
          <input
            className={inputCls}
            placeholder="Asunto"
            value={campaign.subject}
            onChange={(e) => setCampaign((c) => ({ ...c, subject: e.target.value }))}
          />
          <textarea
            className={inputCls}
            placeholder="Mensaje"
            rows={5}
            value={campaign.message}
            onChange={(e) => setCampaign((c) => ({ ...c, message: e.target.value }))}
            style={{ resize: "none" }}
          />
          <div>
            <button onClick={handleCampaign} disabled={sending} className={btnPrimary}>
              {sending ? "Enviando..." : "Enviar campaña"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
