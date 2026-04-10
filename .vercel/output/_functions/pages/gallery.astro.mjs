/* empty css                               */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BfkuFWeA.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_CJcTtUAj.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
export { renderers } from '../renderers.mjs';

const imageFiles = [
  "foto1.png",
  "foto2.png",
  "foto3.png",
  "foto4.png",
  "foto5.jpeg",
  "foto5.png",
  "foto6.png",
  "foto7.png",
  "foto8.jpeg",
  "foto9.jpeg",
  "foto10.jpeg",
  "foto11.jpeg",
  "foto12.jpeg",
  "foto13.jpeg",
  "foto14.jpeg",
  "foto15.jpeg",
  "foto16.jpeg",
  "foto17.jpeg",
  "foto18.jpeg",
  "foto19.jpeg",
  "foto20.jpeg",
  "foto21.jpeg",
  "foto22.jpeg",
  "foto23.jpeg",
  "foto25.jpeg",
  "foto28.jpeg",
  "foto29.jpeg",
  "foto30.jpeg",
  "foto31.jpeg",
  "foto32.jpeg",
  "foto33.jpeg",
  "foto34.jpeg",
  "foto35.jpeg",
  "foto36.jpeg",
  "foto37.jpeg",
  "foto38.jpeg",
  "foto39.jpeg",
  "foto40.jpeg",
  "foto41.jpeg",
  "foto42.jpeg",
  "foto43.jpeg",
  "foto44.jpeg",
  "foto45.jpeg",
  "foto46.jpeg",
  "foto47.jpeg",
  "foto48.jpeg",
  "foto49.jpeg",
  "foto50.jpeg",
  "foto51.jpeg",
  "foto52.jpeg"
];
const images = imageFiles.map((fileName) => ({
  src: `/gallery/${fileName}`,
  alt: "Heatrow Club"
}));
function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const handleDownload = (imageSrc) => {
    const extension = imageSrc.split(".").pop() || "jpg";
    const link = document.createElement("a");
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
      if (e.key === "ArrowRight") setLightbox((i) => i < images.length - 1 ? i + 1 : 0);
      if (e.key === "ArrowLeft") setLightbox((i) => i > 0 ? i - 1 : images.length - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsx("div", { className: "columns-2 md:columns-3 gap-2 md:gap-3 [column-fill:_balance]", children: images.map((img, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: `mb-2 md:mb-3 break-inside-avoid overflow-hidden cursor-pointer group relative border border-[oklch(50.5%_0.213_27.518)] transition-all duration-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`,
        style: { transitionDelay: `${index * 35}ms` },
        onClick: () => setLightbox(index),
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: img.src,
              alt: img.alt,
              className: "w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:grayscale",
              loading: "lazy"
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute inset-0 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100",
              style: { backgroundColor: "oklch(50.5% 0.213 27.518 / 0.35)" },
              children: /* @__PURE__ */ jsx("span", { className: "text-white text-3xl font-bold" })
            }
          )
        ]
      },
      index
    )) }),
    lightbox !== null && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "fixed inset-0 bg-black/95 z-50 flex items-center justify-center",
        onClick: () => setLightbox(null),
        children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "absolute top-6 right-6 text-white text-3xl hover:text-[oklch(50.5%_0.213_27.518)] transition z-50",
              onClick: () => setLightbox(null),
              children: "✕"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "absolute top-6 right-20 text-white hover:text-[oklch(50.5%_0.213_27.518)] transition z-50 flex items-center justify-center h-9",
              onClick: (e) => {
                e.stopPropagation();
                handleDownload(images[lightbox].src);
              },
              title: "Descargar imagen",
              children: /* @__PURE__ */ jsx("svg", { className: "w-8 h-8", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" }) })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "absolute left-4 md:left-8 text-white text-4xl hover:text-[oklch(50.5%_0.213_27.518)] transition z-50",
              onClick: (e) => {
                e.stopPropagation();
                setLightbox((i) => i > 0 ? i - 1 : images.length - 1);
              },
              children: "‹"
            }
          ),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: images[lightbox].src,
              alt: images[lightbox].alt,
              className: "max-h-[90vh] max-w-[90vw] object-contain",
              onClick: (e) => e.stopPropagation()
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "absolute right-4 md:right-8 text-white text-4xl hover:text-[oklch(50.5%_0.213_27.518)] transition z-50",
              onClick: (e) => {
                e.stopPropagation();
                setLightbox((i) => i < images.length - 1 ? i + 1 : 0);
              },
              children: "›"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "absolute bottom-6 text-zinc-400 text-sm", children: [
            lightbox + 1,
            " / ",
            images.length
          ] })
        ]
      }
    )
  ] });
}

const $$Gallery = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "HEATROW CLUB | Gallery" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="bg-black pt-48 pb-20 px-4 md:px-8"> <div class="max-w-6xl mx-auto"> <h1 class="text-4xl md:text-6xl font-black text-center text-[oklch(50.5%_0.213_27.518)] mb-4">
SEE WHAT'S INSIDE
</h1> <p class="text-white text-center font-semibold uppercase tracking-widest text-sm mb-10">
TODAS NUESTRAS FOTOS Y VIDEOS
</p> ${renderComponent($$result2, "GalleryGrid", Gallery, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/components/ui/Gallery.jsx", "client:component-export": "default" })} </div> </main> ` })}`;
}, "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/pages/gallery.astro", void 0);

const $$file = "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/pages/gallery.astro";
const $$url = "/gallery";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Gallery,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
