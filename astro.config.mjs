// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
export default defineConfig({
  output: 'static',
  integrations: [react(), tailwind()],
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:5257',
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});