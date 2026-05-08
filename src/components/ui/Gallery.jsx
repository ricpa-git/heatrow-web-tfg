import { useState, useEffect } from "react";

const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:5257/api";

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [lightbox, setLightbox] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch(`${API_URL}/gallery`)
      .then(r => r.ok ? r.json() : [])
      .then(data => {
        const active = (data || [])
          .filter(i => i.isActive)
          .map(i => ({
            src: i.filePath,
            alt: i.title || "Heatrow Club",
            type: i.type === "photo" ? "image" : "video",
          }));
        setItems(active);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const filteredImages = filter === "all"
    ? items
    : items.filter(img => img.type === filter);

  const handleDownload = (imageSrc) => {
    const extension = imageSrc.split(".").pop() || "jpg";
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `heatrow-${Date.now()}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox(i => i < filteredImages.length - 1 ? i + 1 : 0);
      if (e.key === "ArrowLeft") setLightbox(i => i > 0 ? i - 1 : filteredImages.length - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [filteredImages.length]);

  return (
    <div className="w-full">
      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        {[
          { value: "all", label: "TODOS" },
          { value: "image", label: "FOTOS" },
          { value: "video", label: "VIDEOS" },
        ].map(btn => (
          <button
            key={btn.value}
            onClick={() => {
              setFilter(btn.value);
              setLightbox(null);
            }}
            className={`px-6 py-2 uppercase font-bold tracking-widest text-sm transition-all ${
              filter === btn.value
                ? "bg-[oklch(50.5%_0.213_27.518)] text-white border border-[oklch(50.5%_0.213_27.518)]"
                : "border border-[oklch(50.5%_0.213_27.518)] text-[oklch(50.5%_0.213_27.518)] hover:bg-[oklch(50.5%_0.213_27.518)] hover:text-white"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Grid masonry */}
      {filteredImages.length > 0 ? (
        <div className="columns-2 md:columns-3 gap-2 md:gap-3 [column-fill:_balance]">
          {filteredImages.map((img, index) => (
          <div
            key={index}
            className={`mb-2 md:mb-3 break-inside-avoid overflow-hidden cursor-pointer group relative border border-[oklch(50.5%_0.213_27.518)] transition-all duration-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: `${index * 35}ms` }}
            onClick={() => setLightbox(index)}
          >
            {img.type === "video" ? (
              <div className="relative w-full">
                <video
                  src={img.src}
                  className="w-full object-cover transition-all duration-500 group-hover:scale-105"
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-black/50 rounded-full p-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <img
                src={img.src}
                alt={img.alt}
                className="w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:grayscale"
                loading="lazy"
              />
            )}
            {/* Overlay rojo en hover */}
            <div
              className="absolute inset-0 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
              style={{ backgroundColor: "oklch(50.5% 0.213 27.518 / 0.35)" }}
            >
              <span className="text-white text-3xl font-bold"></span>
            </div>
          </div>
        ))}
      </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-zinc-400 text-lg uppercase tracking-widest">
            {loaded ? `No hay ${filter === "video" ? "videos" : "imágenes"} disponibles aún` : "Cargando..."}
          </p>
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && filteredImages[lightbox] && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          {/* Botón cerrar */}
          <button
            className="absolute top-6 right-6 text-white text-3xl hover:text-[oklch(50.5%_0.213_27.518)] transition z-50"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>

          {/* Botón descargar */}
          <button
            className="absolute top-6 right-20 text-white hover:text-[oklch(50.5%_0.213_27.518)] transition z-50 flex items-center justify-center h-9"
            onClick={(e) => { e.stopPropagation(); handleDownload(filteredImages[lightbox].src); }}
            title="Descargar"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>

          {/* Botón anterior */}
          <button
            className="absolute left-4 md:left-8 text-white text-4xl hover:text-[oklch(50.5%_0.213_27.518)] transition z-50"
            onClick={(e) => { e.stopPropagation(); setLightbox(i => i > 0 ? i - 1 : filteredImages.length - 1); }}
          >
            ‹
          </button>

          {/* Media */}
          {filteredImages[lightbox].type === "video" ? (
            <video
              src={filteredImages[lightbox].src}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              controls
              autoPlay
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img
              src={filteredImages[lightbox].src}
              alt={filteredImages[lightbox].alt}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          )}

          {/* Botón siguiente */}
          <button
            className="absolute right-4 md:right-8 text-white text-4xl hover:text-[oklch(50.5%_0.213_27.518)] transition z-50"
            onClick={(e) => { e.stopPropagation(); setLightbox(i => i < filteredImages.length - 1 ? i + 1 : 0); }}
          >
            ›
          </button>

          {/* Contador */}
          <div className="absolute bottom-6 text-zinc-400 text-sm">
            {lightbox + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
