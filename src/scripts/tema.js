// Botón de tema claro / oscuro.

const raiz = document.documentElement;
const botonTema = document.getElementById('boton-tema');

// ¿Está la web oscura ahora mismo? (por tu elección o por el sistema)
function esOscuro() {
  if (raiz.dataset.theme) return raiz.dataset.theme === 'dark';
  return matchMedia('(prefers-color-scheme: dark)').matches;
}
function pintarBoton() {
  botonTema.textContent = esOscuro() ? 'Modo claro' : 'Modo oscuro';
}

botonTema.addEventListener('click', () => {
  raiz.dataset.theme = esOscuro() ? 'light' : 'dark';
  localStorage.setItem('tema', raiz.dataset.theme); // se recuerda la próxima vez
  pintarBoton();
});
pintarBoton();
