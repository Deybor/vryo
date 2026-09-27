import { defineConfig } from 'vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  base: '/vryo/',
  resolve: { tsconfigPaths: true },
  plugins: [tailwindcss(), tanstackStart({ spa: { enabled: true, prerender: { outputPath: '/index' } } }), react()],
});
