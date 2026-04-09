import { useEffect, useState } from "react";

const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:5257/api";

export default function Estadisticas() {
  const [stats, setStats] = useState({ eventos: 0, djs: 0, suscriptores: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [eventsRes, djsRes, subsRes] = await Promise.all([
          fetch(`${API_URL}/events`, { credentials: "include" }),
          fetch(`${API_URL}/djs`, { credentials: "include" }),
          fetch(`${API_URL}/subscribers`, { credentials: "include" })
        ]);

        const [events, djs, subs] = await Promise.all([
          eventsRes.json(),
          djsRes.json(),
          subsRes.json()
        ]);

        setStats({
          eventos: events.length,
          djs: djs.length,
          suscriptores: subs.length
        });
      } catch {
        // si falla alguno, deja el 0
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

const cards = [
  { label: "Eventos registrados", value: stats.eventos, href: "/admin/eventos" },
  { label: "DJs registrados", value: stats.djs, href: "/admin/djs" },
  { label: "Suscriptores", value: stats.suscriptores, href: "/admin/subscriptores" },
];

return (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
    {cards.map((card) => (
      <a
        key={card.label}
        href={card.href}
        className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 hover:border-[oklch(50.5%_0.213_27.518)] hover:bg-zinc-800 transition-all duration-200 group"
      >
        <div className="text-2xl font-bold mb-2 group-hover:text-[oklch(50.5%_0.213_27.518)] transition-colors">
          {loading ? <span className="text-zinc-600">—</span> : card.value}
        </div>
        <div className="text-zinc-400 group-hover:text-zinc-200 transition-colors">{card.label}</div>
      </a>
    ))}
  </div>
);
}