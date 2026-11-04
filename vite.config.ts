import {resolve} from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

// One HTML file per page, so every section has its own real URL
// (/services/, /gallery/ …) and the site runs on any static host.
const pages = ['index', 'services/index', 'gallery/index', 'team/index', 'contact/index'];

export default defineConfig({
  // GitHub Pages serves the site from /<repo>/; the deploy workflow sets BASE_PATH.
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    rollupOptions: {
      input: Object.fromEntries(pages.map((p) => [p.replace('/index', '') , resolve(__dirname, `${p}.html`)])),
    },
  },
});
