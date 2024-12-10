import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    https: {
      key: fs.readFileSync('../certificates/server.key'),
      cert: fs.readFileSync('../certificates/server.crt'),
      passphrase: 'admin123' // La contraseña del archivo SSL
    }
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});