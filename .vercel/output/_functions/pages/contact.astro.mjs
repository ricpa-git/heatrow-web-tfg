/* empty css                               */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BfkuFWeA.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_DGQ-yxGH.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Contact = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "HEATROW CLUB | Contact" }, { "default": ($$result2) => renderTemplate(_a || (_a = __template(["  ", '<main class="min-h-screen bg-black pt-44 flex items-center justify-center px-4"> <div class="w-full max-w-lg"> <h1 class="text-5xl font-black text-[oklch(50.5%_0.213_27.518)] uppercase text-center mb-2">CONTACT US</h1> <p class="text-white text-center font-semibold uppercase tracking-widest text-sm mb-10">PREGUNTANOS LO QUE QUIERAS</p> <form id="contact-form" class="flex flex-col gap-6"> <!-- Email --> <div class="flex flex-col gap-1"> <label for="email" class="text-[oklch(50.5%_0.213_27.518)] text-xs font-bold uppercase tracking-widest">EMAIL</label> <input type="email" id="email" name="email" placeholder="EMAIL" required class="w-full bg-[oklch(20%_0.1_27.518)] border-none text-white placeholder-[oklch(40%_0.15_27.518)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(50.5%_0.213_27.518)]"> </div> <!-- Message --> <div class="flex flex-col gap-1"> <label for="message" class="text-[oklch(50.5%_0.213_27.518)] text-xs font-bold uppercase tracking-widest">\xBFQUE QUIERES SABER?</label> <textarea id="message" name="message" rows="8" required class="w-full bg-[oklch(20%_0.1_27.518)] border-none text-white placeholder-[oklch(40%_0.15_27.518)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(50.5%_0.213_27.518)] resize-none"></textarea> <!-- Alternativa Correo pegada --> <div class="flex justify-end mt-1"> <p class="text-xs text-white/50">Contactanos por correo si lo prefieres: <a href="mailto:heatrow@gmail.com" class="underline hover:text-white/70">heatrow@gmail.com</a></p> </div> </div> <!-- Feedback --> <p id="form-success" class="hidden text-white text-sm font-semibold uppercase tracking-widest">\u2713 MENSAJE ENVIADO CORRECTAMENTE</p> <p id="form-error" class="hidden text-white text-sm font-semibold uppercase tracking-widest">\u2717 ERROR AL ENVIAR. INT\xC9NTALO DE NUEVO.</p> <!-- Submit --> <div> <button id="submit-btn" type="submit" class="bg-[oklch(50.5%_0.213_27.518)] hover:bg-[oklch(45%_0.213_27.518)] text-white font-bold uppercase tracking-widest text-sm px-8 py-3 transition-colors disabled:opacity-50">\nENVIAR\n</button> </div> </form> <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"><\/script> <script src="/js/contact.js"><\/script> </div> </main> '])), maybeRenderHead()) })}`;
}, "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/pages/contact.astro", void 0);

const $$file = "C:/Users/Marketing/Desktop/Escritorio/tfg/heatrow-web-tfg/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
