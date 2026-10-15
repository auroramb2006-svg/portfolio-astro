import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Solo activa Tailwind. No hace falta tocarlo.
export default defineConfig({
  vite: { plugins: [tailwindcss()] },
  // Pon aquí la URL de tu GitHub Pages
 
  site: 'https://auroramb2006-svg.github.io',
  base: '/portfolio-astro/',

});