/* empty css                               */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../chunks/astro/server_BfkuFWeA.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$FunctionalityPopup } from '../chunks/Layout_CJcTtUAj.mjs';
export { renderers } from '../renderers.mjs';

const $$Tickets = createComponent(($$result, $$props, $$slots) => {
  const fourvenuesUrl = "https://web.fourvenues.com/es/bao-bao/events/heatrow-ii-273-baobao-27-03-2026-WTXA";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "HEATROW CLUB | Tickets" }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<main class="bg-black pb-24 pt-20"> <!-- Hero section: poster left, info right — full viewport height --> <div class="flex flex-col md:flex-row min-h-screen pt-40"> <!-- Poster: fills left half with left margin matching footer --> <div class="w-full md:w-1/2 flex items-stretch px-6 py-4 md:pl-8 md:px-0 md:py-0"> <video autoplay muted loop playsinline class="w-full aspect-[3/4] object-cover border border-red-600"> <source src="/videoye.mp4" type="video/mp4">
Tu navegador no soporta el elemento video
</video> </div> <!-- Event info: right half, top-aligned with image --> <div class="w-full md:w-1/2 flex flex-col justify-start px-10 md:px-16 pt-0 pb-12 gap-6"> <h1 class="text-3xl md:text-4xl font-black text-[oklch(50.5%_0.213_27.518)] uppercase tracking-wide leading-tight">
&ldquo;KANYE WEST AFTER CONCERT&rdquo;
</h1> <!-- Date/time grid --> <div class="flex text-white text-sm border-t border-zinc-700"> <div class="flex-1 border-r border-zinc-700 py-3 pr-6">
TEATRO MAGNO, MADRID
</div> <div class="flex-1 border-r border-zinc-700 py-3 px-6">30/07</div> <div class="flex-1 py-3 pl-6">00:00 a 7:30</div> </div> <!-- Buy and share buttons --> <div class="flex flex-wrap items-center gap-3 sm:gap-4"> <a${addAttribute(fourvenuesUrl, "href")} target="_blank" rel="noopener noreferrer" class="inline-block border border-[oklch(50.5%_0.213_27.518)] text-[oklch(50.5%_0.213_27.518)] hover:bg-[oklch(50.5%_0.213_27.518)] hover:text-white text-xs font-bold uppercase tracking-widest px-6 py-3 transition-colors w-fit">
COMPRAR ENTRADA
</a> <button id="share-ticket-btn" type="button"${addAttribute(fourvenuesUrl, "data-share-url")} class="inline-flex items-center justify-center w-11 h-11 border border-[oklch(50.5%_0.213_27.518)] text-[oklch(50.5%_0.213_27.518)] hover:bg-[oklch(50.5%_0.213_27.518)] hover:text-white transition-colors" aria-label="Compartir entrada" title="Compartir entrada"> <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"> <path d="M14 3h7v7" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M10 14L21 3" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" stroke-linecap="round" stroke-linejoin="round"></path> </svg> </button> </div> <!-- Description --> <!-- <p class="text-zinc-400 text-md leading-relaxed max-w-md">
          DESPUÉS DEL ÉXITO DE LA PRIMERA EDICIÓN SIN DEJAROS MÁS A LA ESPERA,
          EN HEAT ROW ESTE MARZO HACEMOS UN THROWBACK A LO MEJOR DEL 2016. LIL
          UZI, RAE SREMMURD, GUCCI MANE, A$AP FERG, FUTURE, YOUNG THUG... TODO
          JUNTO A LOS MAYORES HITS DEL MOMENTO.
        </p> --> </div> </div> <br> <br> <!-- YouTube section — appears on scroll --> <!-- <div class="px-8 md:px-16 pb-8">
      <div class="relative w-full max-w-4xl aspect-video mx-auto">
        <iframe
          class="absolute inset-0 w-full h-full"
          src="https://www.youtube.com/embed/jScuJSL-lKQ"
          title="2016 XXL Freshman Cypher"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div> --> </main> ${renderComponent($$result2, "FunctionalityPopup", $$FunctionalityPopup, { "triggers": ["a[href*='fourvenues']", "#share-ticket-btn"] })} ` })}`;
}, "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/pages/tickets.astro", void 0);

const $$file = "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/pages/tickets.astro";
const $$url = "/tickets";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Tickets,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
