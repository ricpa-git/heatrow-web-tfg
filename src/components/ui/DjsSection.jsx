import { useEffect, useState } from "react";

const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:5257/api";

export default function DjsSection() {
  const [djs, setDjs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/djs`)
      .then(res => res.json())
      .then(data => setDjs(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading || djs.length === 0) return null;

  return (
    <section class="py-20 px-4 bg-black scroll-mt-28">
      <div className="max-w-6xl mx-auto">
        {/* <h2 className="text-4xl md:text-6xl font-black mb-4 text-center text-[oklch(50.5%_0.213_27.518)]">MEET OUR DJS</h2>
        <div className="w-32 h-1 bg-[oklch(50.5%_0.213_27.518)] mx-auto mb-16"></div> */}

        <div className="flex flex-wrap justify-center gap-8">
          {djs.map(dj => (
            <div key={dj.id} className="flex flex-col items-center group">
              <div className="w-40 h-40 overflow-hidden border border-zinc-800 group-hover:border-[oklch(50.5%_0.213_27.518)] transition-colors duration-300">
                {dj.image ? (
                  <img
                    src={dj.image}
                    alt={dj.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                    <span className="text-zinc-600 text-4xl font-black">{dj.name.charAt(0)}</span>
                  </div>
                )}
              </div>
              <p className="mt-3 text-white font-black uppercase tracking-widest text-sm">{dj.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}