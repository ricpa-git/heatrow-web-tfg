/* empty css                               */
import { e as createComponent, m as maybeRenderHead, n as renderScript, r as renderTemplate, k as renderComponent } from '../chunks/astro/server_BfkuFWeA.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_CJcTtUAj.mjs';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$DemoPopup = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="demo-popup" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4" style="display: none;" aria-modal="true" role="dialog" aria-labelledby="demo-popup-title"> <div class="w-full max-w-xl border border-[oklch(50.5%_0.213_27.518)] bg-black p-6 md:p-8 shadow-2xl"> <h2 id="demo-popup-title" class="text-[oklch(50.5%_0.213_27.518)] text-xl md:text-2xl font-black uppercase tracking-wider">
Aviso
</h2> <p class="mt-4 text-zinc-200 text-sm md:text-base leading-relaxed">
Esta web es una DEMO y todavía está en desarrollo. Puede que te encuentres con partes que todavia no funcionan. SEEEEEE YOU!
</p> <div class="mt-6 flex justify-end"> <button id="demo-popup-close" type="button" class="bg-[oklch(50.5%_0.213_27.518)] text-white px-5 py-2 font-bold text-xs uppercase tracking-widest hover:bg-[oklch(45%_0.213_27.518)] transition-colors">
Cerrar
</button> </div> </div> </div> ${renderScript($$result, "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/components/ui/DemoPopup.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/components/ui/DemoPopup.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "HEATROW CLUB | Home", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "DemoPopup", $$DemoPopup, { "data-astro-cid-j7pv25f6": true })}    ${maybeRenderHead()}<section id="evento" class="min-h-screen flex items-center justify-center relative bg-black pt-32 overflow-hidden" data-astro-cid-j7pv25f6> <!-- Video de fondo --> <video class="absolute inset-0 w-full h-full object-cover opacity-30" autoplay muted loop playsinline data-astro-cid-j7pv25f6> <source src="/video1.mp4" type="video/mp4" data-astro-cid-j7pv25f6> </video> <!-- Overlay oscuro sobre el video --> <div class="absolute inset-0 bg-black/50" data-astro-cid-j7pv25f6></div> <!-- Contenido --> <div class="relative z-10 text-center px-4 max-w-5xl mx-auto" data-astro-cid-j7pv25f6> <img src="/logo1.png" alt="Heatrow Club" class="w-72 md:w-96 mx-auto mb-8 animate-flip3d" data-astro-cid-j7pv25f6> <p class="text-xl md:text-2xl mb-8 text-gray-300" data-astro-cid-j7pv25f6>
THE MUSIC THEY DON'T PLAY
</p> <!-- CTA Button --> <a href="#entradas" class="inline-block bg-[oklch(50.5%_0.213_27.518)] hover:bg-[oklch(45%_0.213_27.518)] text-white px-12 py-4 rounded-none text-xl font-bold transition-all duration-300 shadow-xl uppercase tracking-wider" data-astro-cid-j7pv25f6>
Consigue tus entradas
</a> </div> </section>  <section id="galeria" class="py-20 px-4 bg-black border-t border-[oklch(50.5%_0.213_27.518)] scroll-mt-28" data-astro-cid-j7pv25f6> <div class="max-w-7xl mx-auto" data-astro-cid-j7pv25f6> <h2 class="text-4xl md:text-6xl font-black mb-4 text-center text-[oklch(50.5%_0.213_27.518)]" data-astro-cid-j7pv25f6>
ABOUT US
</h2> <div class="w-32 h-1 bg-[oklch(50.5%_0.213_27.518)] mx-auto mb-16" data-astro-cid-j7pv25f6></div> <!-- Imagen About Us --> <div class="overflow-hidden" data-astro-cid-j7pv25f6> <div class="aspect-video bg-zinc-900 flex items-center justify-center border border-red-600 overflow-hidden" data-astro-cid-j7pv25f6> <img src="/gallery/foto5.jpeg" class="w-full h-full object-cover" alt="Foto Heatrow" data-astro-cid-j7pv25f6> </div> </div> <!-- Botón Ver más fotos --> <div class="flex justify-center mt-10" data-astro-cid-j7pv25f6> <a href="/gallery" class="inline-block border border-[oklch(50.5%_0.213_27.518)] text-[oklch(50.5%_0.213_27.518)] hover:bg-[oklch(50.5%_0.213_27.518)] hover:text-white text-xs font-bold uppercase tracking-widest px-6 py-3 transition-colors w-fit" data-astro-cid-j7pv25f6>
VER MÁS FOTOS
</a> </div> <!-- Texto About Us --> <div class="max-w-3xl mx-auto mt-16 text-center space-y-6" data-astro-cid-j7pv25f6> <p class="text-gray-300 text-lg leading-relaxed" data-astro-cid-j7pv25f6>
Ubicada en la latente ciudad de Madrid, Heat Row es un proyecto que
          nace con la ambición de generar una comunidad de la mano del Hip-hop,
          el Trap y el Rap. Nuestro objetivo es hacer eco de este sonido y que
          las personas sientan que tienen un hogar al que ir, disfrutar y
          pertenecer. Esta idea emerge del sentimiento común de un grupo de
          amigos que motivados por una misma pasión desean compartirla y
          alimentarla con más gente en el camino, generando un ambiente positivo
          y cargado de energía.
</p> <p class="text-gray-300 text-lg leading-relaxed" data-astro-cid-j7pv25f6>
Desde un "Mosh Pit" a morir hasta vibear las melodías sintiéndote un
          "Pretty MF", nuestra propuesta es dar a escuchar más de lo que muchas
          fiestas en esta ciudad consideran que es el Hip-Hop.
</p> <p class="text-white text-lg font-semibold leading-relaxed" data-astro-cid-j7pv25f6>
Este es el punto de partida, la primera llama ya ha sido encendida,
          todo empieza ahora y tienes que ser parte de ello.
</p> </div> </div> </section>  <section id="entradas" class="py-20 px-4 bg-black border-t border-[oklch(50.5%_0.213_27.518)] scroll-mt-28" data-astro-cid-j7pv25f6> <div class="max-w-6xl mx-auto" data-astro-cid-j7pv25f6> <h2 class="text-4xl md:text-6xl font-black mb-4 text-center text-[oklch(50.5%_0.213_27.518)]" data-astro-cid-j7pv25f6>
UPCOMING EVENTS
</h2> <div class="w-32 h-1 bg-[oklch(50.5%_0.213_27.518)] mx-auto mb-16" data-astro-cid-j7pv25f6></div> <div class="md:hidden flex items-center justify-center gap-2 mb-5 text-[11px] uppercase tracking-[0.2em] text-zinc-400" data-astro-cid-j7pv25f6> <span class="swipe-hint-arrow swipe-hint-arrow-left text-[oklch(50.5%_0.213_27.518)]" data-astro-cid-j7pv25f6>&#8592;</span> <span data-astro-cid-j7pv25f6>Desliza para ver los eventos</span> <span class="swipe-hint-arrow text-[oklch(50.5%_0.213_27.518)]" data-astro-cid-j7pv25f6>&#8594;</span> </div> <div id="events-scroller" class="events-scroller flex gap-6 overflow-x-auto pb-4" data-astro-cid-j7pv25f6> <!-- CADA ARTICLE ES UN EVENTO --> <article class="event-card flex-shrink-0 w-[82vw] sm:w-[62vw] md:w-[44vw] lg:w-[26vw] xl:w-[22vw] max-w-[340px] cursor-pointer" data-event="kanye" data-active="true" data-astro-cid-j7pv25f6> <div class="flex flex-col" data-astro-cid-j7pv25f6> <div class="relative w-full aspect-[3/4] border border-red-600 overflow-hidden" data-astro-cid-j7pv25f6> <video autoplay muted loop playsinline class="absolute inset-0 w-full h-full object-cover object-center block" data-astro-cid-j7pv25f6> <source src="/videoye.mp4" type="video/mp4" data-astro-cid-j7pv25f6>
Tu navegador no soporta el elemento video
</video> </div> <div class="mt-4" data-astro-cid-j7pv25f6> <p class="text-white font-black text-xl uppercase leading-tight mb-3" data-astro-cid-j7pv25f6>
KANYE WEST AFTER CONCERT<br data-astro-cid-j7pv25f6>TEATRO MAGNO, MADRID - 30/07
</p> <a href="/tickets" class="inline-block border border-[oklch(50.5%_0.213_27.518)] text-[oklch(50.5%_0.213_27.518)] hover:bg-[oklch(50.5%_0.213_27.518)] hover:text-white text-xs font-bold uppercase tracking-widest px-6 py-3 transition-colors w-fit" data-astro-cid-j7pv25f6>
COMPRAR ENTRADA
</a> </div> </div> </article> <article class="event-card flex-shrink-0 w-[82vw] sm:w-[62vw] md:w-[44vw] lg:w-[26vw] xl:w-[22vw] max-w-[340px] cursor-pointer" data-active="false" data-astro-cid-j7pv25f6> <div class="flex flex-col" data-astro-cid-j7pv25f6> <div class="w-full aspect-[3/4] border border-red-600 bg-zinc-900/70 flex items-center justify-center" aria-label="Proximamente" data-astro-cid-j7pv25f6> <span class="text-zinc-300 text-lg md:text-xl font-black uppercase tracking-wider" data-astro-cid-j7pv25f6>
PROXIMAMENTE...
</span> </div> <div class="mt-4" data-astro-cid-j7pv25f6> <p class="text-white font-black text-xl uppercase leading-tight mb-3" data-astro-cid-j7pv25f6>
HEATROW NIGHTS VOL. II<br data-astro-cid-j7pv25f6>SALA CLAMORES, MADRID - 05/05
</p> <!-- <a
                href="/tickets"
                class="inline-block border border-[oklch(50.5%_0.213_27.518)] text-[oklch(50.5%_0.213_27.518)] hover:bg-[oklch(50.5%_0.213_27.518)] hover:text-white text-xs font-bold uppercase tracking-widest px-6 py-3 transition-colors w-fit"
              >
                COMPRAR ENTRADA
              </a> --> </div> </div> </article> <!-- <article
          class="event-card flex-shrink-0 w-[82vw] sm:w-[62vw] md:w-[44vw] lg:w-[26vw] xl:w-[22vw] max-w-[340px] cursor-pointer"
          data-active="false"
        >
          <div class="flex flex-col">
            <div
              class="w-full aspect-[3/4] border border-red-600 bg-zinc-900/70 flex items-center justify-center"
              aria-label="Proximamente"
            >
              <span class="text-zinc-300 text-lg md:text-xl font-black uppercase tracking-wider">
                PROXIMAMENTE...
              </span>
            </div>
            <div class="mt-4">
              <p
                class="text-white font-black text-xl uppercase leading-tight mb-3"
              >
                SUMMER HEAT SESSION<br />TEATRO MAGNO, MADRID - 24/08
              </p>
              <!-- <a
                href="/tickets"
                class="inline-block border border-[oklch(50.5%_0.213_27.518)] text-[oklch(50.5%_0.213_27.518)] hover:bg-[oklch(50.5%_0.213_27.518)] hover:text-white text-xs font-bold uppercase tracking-widest px-6 py-3 transition-colors w-fit"
              >
                COMPRAR ENTRADA
              </a> --> </div> </div> <!-- <DjsSection client:load /> --> </section> ${renderScript($$result2, "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/pages/index.astro?astro&type=script&index=0&lang.ts")}  <section id="contacto" class="py-20 px-8 bg-black border-t border-[oklch(50.5%_0.213_27.518)] scroll-mt-28" data-astro-cid-j7pv25f6> <div class="max-w-6xl mx-auto flex items-center justify-between" data-astro-cid-j7pv25f6> <!-- Left: info --> <div data-astro-cid-j7pv25f6> <h2 class="text-5xl md:text-7xl font-black uppercase text-[oklch(50.5%_0.213_27.518)] mb-4" data-astro-cid-j7pv25f6>
FIND US
</h2> <p class="text-white font-bold uppercase tracking-widest text-sm mb-1" data-astro-cid-j7pv25f6>
TEATRO MAGNO
</p> <p class="text-white font-bold uppercase tracking-widest text-sm mb-6" data-astro-cid-j7pv25f6>
28014 MADRID
</p> <a href="https://www.google.com/maps/place/Teatro+Magno/@40.4173074,-3.6983218,17z/data=!3m1!4b1!4m6!3m5!1s0xd42291c08455f2d:0x484149f164cdd1eb!8m2!3d40.4173074!4d-3.6983218!16s%2Fg%2F11rdbdrd5v?entry=ttu&g_ep=EgoyMDI2MDQwNS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" class="text-[oklch(50.5%_0.213_27.518)] hover:text-[oklch(57.7%_0.245_27.325)] text-sm underline underline-offset-4 transition-colors" data-astro-cid-j7pv25f6>
Ver Ubicación
</a> </div> <!-- Right: map --> <div class="w-64 h-64 md:w-80 md:h-80 overflow-hidden border border-[oklch(50.5%_0.213_27.518)]" data-astro-cid-j7pv25f6> <iframe width="100%" height="100%" frameborder="0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.61804948712!2d-3.7008967234930426!3d40.41731145560309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42291c08455f2d%3A0x484149f164cdd1eb!2sTeatro%20Magno!5e0!3m2!1ses!2ses!4v1775568497175!5m2!1ses!2ses" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" data-astro-cid-j7pv25f6>
        </iframe> </div> </div> </section> ` })}`;
}, "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/pages/index.astro", void 0);

const $$file = "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
