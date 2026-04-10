import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_hXaSiSG0.mjs';
import { manifest } from './manifest_CjKZI1aB.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/djs.astro.mjs');
const _page2 = () => import('./pages/admin/eventos.astro.mjs');
const _page3 = () => import('./pages/admin/login.astro.mjs');
const _page4 = () => import('./pages/admin/subscriptores.astro.mjs');
const _page5 = () => import('./pages/admin/usuarios.astro.mjs');
const _page6 = () => import('./pages/admin.astro.mjs');
const _page7 = () => import('./pages/contact.astro.mjs');
const _page8 = () => import('./pages/cookies.astro.mjs');
const _page9 = () => import('./pages/gallery.astro.mjs');
const _page10 = () => import('./pages/privacidad.astro.mjs');
const _page11 = () => import('./pages/radio.astro.mjs');
const _page12 = () => import('./pages/tickets.astro.mjs');
const _page13 = () => import('./pages/tickets-stripe.astro.mjs');
const _page14 = () => import('./pages/unsubscribe.astro.mjs');
const _page15 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/djs.astro", _page1],
    ["src/pages/admin/eventos.astro", _page2],
    ["src/pages/admin/login.astro", _page3],
    ["src/pages/admin/subscriptores.astro", _page4],
    ["src/pages/admin/usuarios.astro", _page5],
    ["src/pages/admin/index.astro", _page6],
    ["src/pages/contact.astro", _page7],
    ["src/pages/cookies.astro", _page8],
    ["src/pages/gallery.astro", _page9],
    ["src/pages/privacidad.astro", _page10],
    ["src/pages/radio.astro", _page11],
    ["src/pages/tickets.astro", _page12],
    ["src/pages/tickets-stripe.astro", _page13],
    ["src/pages/unsubscribe.astro", _page14],
    ["src/pages/index.astro", _page15]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "5ca36e5d-3adc-4ff7-bf24-c33853421abb",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
