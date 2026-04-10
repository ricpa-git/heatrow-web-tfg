/* empty css                               */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../chunks/astro/server_BfkuFWeA.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_CJcTtUAj.mjs';
export { renderers } from '../renderers.mjs';

const $$Radio = createComponent(($$result, $$props, $$slots) => {
  const playlists = [
    {
      id: "5eJiyavYY1wixGm6BrLJY9",
      title: "HEATROW VOL. 1",
      description: "Los mejores temas de la primera edici\xF3n"
    },
    {
      id: "24zPfnS4XwzzdXzWV7mYEY",
      title: "HEATROW VOL. 2",
      description: "El sonido de la segunda noche"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "HEATROW CLUB | Radio" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="bg-black min-h-screen pt-48 pb-20 px-4 md:px-8"> <div class="max-w-5xl mx-auto"> <!-- Header --> <div class="text-center mb-16"> <p class="text-[oklch(50.5%_0.213_27.518)] text-xs font-bold uppercase tracking-[0.4em] mb-4">● ON AIR</p> <h1 class="text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-4">HEATROW <span class="text-[oklch(50.5%_0.213_27.518)]">RADIO</span></h1> <div class="w-32 h-px bg-[oklch(50.5%_0.213_27.518)] mx-auto mb-4"></div> <p class="text-zinc-500 uppercase tracking-widest text-xs">THE MUSIC THEY DON'T PLAY</p> </div> <!-- Playlists --> <div class="flex flex-col gap-12"> ${playlists.map((playlist, i) => renderTemplate`<div class="group"> <!-- Label --> <div class="flex items-center gap-4 mb-4"> <span class="text-[oklch(50.5%_0.213_27.518)] text-xs font-black uppercase tracking-widest">
0${i + 1} </span> <div class="flex-1 h-px bg-zinc-800 group-hover:bg-[oklch(50.5%_0.213_27.518)] transition-colors duration-500"></div> <div> <p class="text-white font-black uppercase tracking-widest text-sm">${playlist.title}</p> <p class="text-zinc-500 text-xs uppercase tracking-widest">${playlist.description}</p> </div> </div>  <div class="group-hover:opacity-70 transition-opacity duration-500"> <iframe${addAttribute(`https://open.spotify.com/embed/playlist/${playlist.id}?theme=0`, "src")} width="100%" height="352" frameborder="0" style="display: block; border-radius: 12px;" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> </div> </div>`)} </div> <!-- Footer --> <div class="mt-16 text-center"> <p class="text-zinc-600 text-xs uppercase tracking-widest mb-4">Síguenos en Spotify</p> <a href="https://open.spotify.com/user/31r7gwoloprdbv6rykstaqbmsbse" target="_blank" rel="noopener noreferrer" class="inline-block border border-[oklch(50.5%_0.213_27.518)] text-[oklch(50.5%_0.213_27.518)] hover:bg-[oklch(50.5%_0.213_27.518)] hover:text-white text-xs font-bold uppercase tracking-widest px-6 py-3 transition-colors w-fit">
HEATROW EN SPOTIFY →
</a> </div> </div> </main> ` })}`;
}, "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/pages/radio.astro", void 0);

const $$file = "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/pages/radio.astro";
const $$url = "/radio";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Radio,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
