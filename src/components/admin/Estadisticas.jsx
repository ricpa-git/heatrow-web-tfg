import { useEffect, useState } from "react";

const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:5257/api";

export default function Estadisticas() {
  const [stats, setStats] = useState({ eventos: 0, djs: 0, suscriptores: 0, multimedia: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [eventsRes, djsRes, subsRes, multimediaRes] = await Promise.all([
          fetch(`${API_URL}/events`, { credentials: "include" }),
          fetch(`${API_URL}/djs`, { credentials: "include" }),
          fetch(`${API_URL}/subscribers`, { credentials: "include" }),
          fetch(`${API_URL}/gallery`, { credentials: "include" })
        ]);
        const [events, djs, subs, multimedia] = await Promise.all([
          eventsRes.ok ? eventsRes.json() : [],
          djsRes.ok ? djsRes.json() : [],
          subsRes.ok ? subsRes.json() : [],
          multimediaRes.ok ? multimediaRes.json() : []
        ]);
        setStats({ 
          eventos: Array.isArray(events) ? events.length : 0, 
          djs: Array.isArray(djs) ? djs.length : 0, 
          suscriptores: Array.isArray(subs) ? subs.length : 0, 
          multimedia: Array.isArray(multimedia) ? multimedia.length : 0 
        });
      } catch (error) {
        console.error("Error loading stats:", error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const cards = [
    { label: "Eventos", value: stats.eventos, href: "/admin/eventos" },
    { label: "DJs", value: stats.djs, href: "/admin/djs" },
    { label: "Suscriptores", value: stats.suscriptores, href: "/admin/subscriptores" },
    { label: "Elementos Multimedia", value: stats.multimedia, href: "/admin/galeria" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800 mb-10">
      {cards.map((card) => (
        <a
          key={card.label}
          href={card.href}
          className="bg-zinc-950 p-6 hover:bg-zinc-900 transition group"
        >
          <div className="text-4xl font-bold mb-1 tabular-nums">
            {loading ? <span className="text-zinc-700">—</span> : card.value}
          </div>
          <div className="text-xs text-zinc-500 uppercase tracking-widest group-hover:text-zinc-300 transition">
            {card.label}
          </div>
        </a>
      ))}
    </div>
  );
}
