import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Solo activa Tailwind. No hace falta tocarlo.
export default defineConfig({
  vite: { plugins: [tailwindcss()] },
});
