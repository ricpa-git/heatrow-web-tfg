import { useState, useEffect } from "react";

const images = [
  { src: "/gallery/foto1.png", alt: "Heatrow Club" },
  { src: "/gallery/foto2.png", alt: "Heatrow Club" },
  { src: "/gallery/foto3.png", alt: "Heatrow Club" },
  { src: "/gallery/foto4.png", alt: "Heatrow Club" },
  { src: "/gallery/foto5.png", alt: "Heatrow Club" },
  { src: "/gallery/foto6.png", alt: "Heatrow Club" },
  { src: "/gallery/foto7.png", alt: "Heatrow Club" },
  // { src: "/gallery/foto8.png", alt: "Heatrow Club" },
  // Añade más fotos aquí con el mismo formato
];
export default function Gallery() {
  const [lightbox, setLightbox] = useState(null); // índice de la foto abierta
  const [loaded, setLoaded] = useState(false);

  const handleDownload = (imageSrc) => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `heatrow-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    setLoaded(true);

    // Cerrar lightbox con ESC
    const handleKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox(i => i < images.length - 1 ? i + 1 : 0);
      if (e.key === "ArrowLeft") setLightbox(i => i > 0 ? i - 1 : images.length - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Dividir imágenes en 3 columnas para efecto masonry
const third = Math.ceil(images.length / 3);
const col1 = images.slice(0, third);
const col2 = images.slice(third, third * 2);
const col3 = images.slice(third * 2);

const getIndex = (colIndex, itemIndex) => {
  if (colIndex === 0) return itemIndex;
  if (colIndex === 1) return third + itemIndex;
  return third * 2 + itemIndex;
};

  return (
    <div className="w-full">
      {/* Grid masonry */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
        {[col1, col2, col3].map((col, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-2 md:gap-3">
            {col.map((img, itemIndex) => {
              const globalIndex = getIndex(colIndex, itemIndex);
              return (
<div
  key={globalIndex}
  className={`overflow-hidden cursor-pointer group relative border border-[oklch(50.5%_0.213_27.518)] transition-all duration-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
  style={{ transitionDelay: `${globalIndex * 50}ms` }}
  onClick={() => setLightbox(globalIndex)}
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
  style={{ backgroundColor: 'oklch(50.5% 0.213 27.518 / 0.35)' }}
>
  <span className="text-white text-3xl font-bold"></span>
</div>
</div>
              );
            })}
          </div>
        ))}
      </div>

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
            onClick={(e) => { e.stopPropagation(); handleDownload(images[lightbox].src); }}
            title="Descargar imagen"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>

          {/* Botón anterior */}
          <button
            className="absolute left-4 md:left-8 text-white text-4xl hover:text-[oklch(50.5%_0.213_27.518)] transition z-50"
            onClick={(e) => { e.stopPropagation(); setLightbox(i => i > 0 ? i - 1 : images.length - 1); }}
          >
            ‹
          </button>

          {/* Imagen */}
          <img
            src={images[lightbox].src}
            alt={images[lightbox].alt}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Botón siguiente */}
          <button
            className="absolute right-4 md:right-8 text-white text-4xl hover:text-[oklch(50.5%_0.213_27.518)] transition z-50"
            onClick={(e) => { e.stopPropagation(); setLightbox(i => i < images.length - 1 ? i + 1 : 0); }}
          >
            ›
          </button>

          {/* Contador */}
          <div className="absolute bottom-6 text-zinc-400 text-sm">
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}