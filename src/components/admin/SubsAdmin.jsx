import { useEffect, useState } from "react";

const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:5257/api";

export default function SubsAdmin() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [campaign, setCampaign] = useState({ subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [campaignResult, setCampaignResult] = useState(null);

  async function handleCampaign() {
    if (!campaign.subject.trim() || !campaign.message.trim()) {
      setError("El asunto y el mensaje son obligatorios");
      return;
    }

    setSending(true);
    setCampaignResult(null);
    setError(null);

    try {
      // Obtener emails activos
      const res = await fetch(`${API_URL}/subscribers/emails`, {
        credentials: "include",
      });
      const emails = await res.json();

      if (emails.length === 0) {
        setCampaignResult("No hay suscriptores activos");
        return;
      }

      // Enviar a cada suscriptor
      let enviados = 0;
      for (const email of emails) {
        const ejs = window.emailjs;
        await ejs.send("service_zwo9za8", "template_cxd0vtq", {
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

  useEffect(() => {
    // Cargar EmailJS si no está ya cargado
    if (!window.emailjs) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
      script.onload = () => {
        window.emailjs.init("YInKJUQPM6IOOpXF9");
      };
      document.head.appendChild(script);
    }

    loadSubs();
  }, []);

  async function loadSubs() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/subscribers`, {
        credentials: "include",
      });
      const data = await res.json();
      setSubs(data);
    } catch {
      setError("Error al cargar suscriptores");
    } finally {
      setLoading(false);
    }
  }

  async function handleToggle(id) {
    try {
      await fetch(`${API_URL}/subscribers/${id}/toggle`, {
        method: "PUT",
        credentials: "include",
      });
      loadSubs();
    } catch {
      setError("Error al cambiar el estado");
    }
  }

  async function handleDelete(id) {
    try {
      await fetch(`${API_URL}/subscribers/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      setConfirmDelete(null);
      loadSubs();
    } catch {
      setError("Error al eliminar el suscriptor");
    }
  }

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestión de suscriptores</h1>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <p className="text-zinc-400">Cargando suscriptores...</p>
      ) : subs.length === 0 ? (
        <p className="text-zinc-400">No hay suscriptores.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900 text-zinc-400 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Suscrito el</th>
                <th className="px-4 py-3 text-left">Activo</th>
                <th className="px-4 py-3 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((sub, i) => (
                <tr
                  key={sub.id}
                  className={i % 2 === 0 ? "bg-zinc-950" : "bg-zinc-900"}
                >
                  <td className="px-4 py-3 text-zinc-500">{sub.id}</td>
                  <td className="px-4 py-3 font-semibold">{sub.email}</td>
                  <td className="px-4 py-3 text-zinc-400">
                    {formatDate(sub.subscribedAt)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${sub.active ? "bg-green-900 text-green-300" : "bg-zinc-700 text-zinc-400"}`}
                    >
                      {sub.active ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => handleToggle(sub.id)}
                      className="bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1 rounded-lg text-xs transition"
                    >
                      {sub.active ? "Desactivar" : "Activar"}
                    </button>
                    <button
                      onClick={() => setConfirmDelete(sub.id)}
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

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-2xl p-8 w-full max-w-sm border border-zinc-700 flex flex-col gap-4 text-center">
            <h2 className="text-xl font-bold">¿Eliminar suscriptor?</h2>
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

      {/* Sección campaña */}
      <div className="mt-10 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Enviar campaña</h2>
        <p className="text-zinc-400 text-sm mb-4">
          Se enviará a todos los suscriptores activos.
        </p>

        {campaignResult && (
          <p className="text-green-400 mb-4">{campaignResult}</p>
        )}

        <div className="flex flex-col gap-4 max-w-lg">
          <input
            className="bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none"
            placeholder="Asunto"
            value={campaign.subject}
            onChange={(e) =>
              setCampaign((c) => ({ ...c, subject: e.target.value }))
            }
          />
          <textarea
            className="bg-zinc-800 text-white px-4 py-2 rounded-lg outline-none resize-none"
            placeholder="Mensaje"
            rows={5}
            value={campaign.message}
            onChange={(e) =>
              setCampaign((c) => ({ ...c, message: e.target.value }))
            }
          />
          <button
            onClick={handleCampaign}
            disabled={sending}
            className="bg-white text-black font-bold px-5 py-2 rounded-lg  hover:text-[oklch(50.5%_0.213_27.518)] transition disabled:opacity-50 w-fit"
          >
            {sending ? "Enviando..." : "Enviar campaña"}
          </button>
        </div>
      </div>
    </div>
  );
}
