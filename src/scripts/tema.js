// Botón de tema claro / oscuro.
const raiz = document.documentElement;
const botonTema = document.getElementById('boton-tema');

// ¿Está la web oscura ahora mismo?
function esOscuro() {
  if (raiz.dataset.theme) return raiz.dataset.theme === 'dark';
  return matchMedia('(prefers-color-scheme: dark)').matches;
}

function pintarBoton() {
  const en = document.documentElement.dataset.lang === 'en';
  botonTema.textContent = esOscuro() ? (en ? 'Light mode' : 'Modo claro') : (en ? 'Dark mode' : 'Modo oscuro');
}

botonTema.addEventListener('click', () => {
  const actualOscuro = esOscuro();
  const nuevoTema = actualOscuro ? 'light' : 'dark';
  
  raiz.dataset.theme = nuevoTema;
  localStorage.setItem('tema', nuevoTema);
  
  pintarBoton();
});

pintarBoton();

document.addEventListener('idioma', pintarBoton);