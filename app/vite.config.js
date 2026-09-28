import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '~bootstrap': 'bootstrap' } },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          'import',
          'global-builtin',
          'color-functions',
          'legacy-js-api',
          'if-function',
        ],
        quietDeps: true,
      },
    },
  },
  base: process.env.SITE_BASE || '/',
  build: { target: 'es2022' },
});
