import { useState, useEffect } from "react";

const imageFiles = [
  { name: "foto1.png", type: "image" },
  { name: "foto2.png", type: "image" },
  { name: "foto3.png", type: "image" },
  { name: "foto4.png", type: "image" },
  { name: "foto5.jpeg", type: "image" },
  { name: "foto5.png", type: "image" },
  { name: "foto6.png", type: "image" },
  { name: "foto7.png", type: "image" },
  { name: "foto8.jpeg", type: "image" },
  { name: "foto9.jpeg", type: "image" },
  { name: "foto10.jpeg", type: "image" },
  { name: "foto11.jpeg", type: "image" },
  { name: "foto12.jpeg", type: "image" },
  { name: "foto13.jpeg", type: "image" },
  { name: "foto14.jpeg", type: "image" },
  { name: "foto15.jpeg", type: "image" },
  { name: "foto16.jpeg", type: "image" },
  { name: "foto17.jpeg", type: "image" },
  { name: "foto18.jpeg", type: "image" },
  { name: "foto19.jpeg", type: "image" },
  { name: "foto20.jpeg", type: "image" },
  { name: "foto21.jpeg", type: "image" },
  { name: "foto22.jpeg", type: "image" },
  { name: "foto23.jpeg", type: "image" },
  { name: "foto25.jpeg", type: "image" },
  { name: "foto28.jpeg", type: "image" },
  { name: "foto29.jpeg", type: "image" },
  { name: "foto30.jpeg", type: "image" },
  { name: "foto31.jpeg", type: "image" },
  { name: "foto32.jpeg", type: "image" },
  { name: "foto33.jpeg", type: "image" },
  { name: "foto34.jpeg", type: "image" },
  { name: "foto35.jpeg", type: "image" },
  { name: "foto36.jpeg", type: "image" },
  { name: "foto37.jpeg", type: "image" },
  { name: "foto38.jpeg", type: "image" },
  { name: "foto39.jpeg", type: "image" },
  { name: "foto40.jpeg", type: "image" },
  { name: "foto41.jpeg", type: "image" },
  { name: "foto42.jpeg", type: "image" },
  { name: "foto43.jpeg", type: "image" },
  { name: "foto44.jpeg", type: "image" },
  { name: "foto45.jpeg", type: "image" },
  { name: "foto46.jpeg", type: "image" },
  { name: "foto47.jpeg", type: "image" },
  { name: "foto48.jpeg", type: "image" },
  { name: "foto49.jpeg", type: "image" },
  { name: "foto50.jpeg", type: "image" },
  { name: "foto51.jpeg", type: "image" },
  { name: "foto52.jpeg", type: "image" },
];

const images = imageFiles.map((item) => ({
  src: `/gallery/${item.name}`,
  alt: "Heatrow Club",
  type: item.type,
}));

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState("all");

  const filteredImages = filter === "all" 
    ? images 
    : images.filter(img => img.type === filter);

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
    setLoaded(true);

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
            <img
              src={img.src}
              alt={img.alt}
              className="w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:grayscale"
              loading="lazy"
            />
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
            No hay {filter === "video" ? "videos" : "imágenes"} disponibles aún
          </p>
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && (
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
            title="Descargar imagen"
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

          {/* Imagen */}
          <img
            src={filteredImages[lightbox].src}
            alt={filteredImages[lightbox].alt}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

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