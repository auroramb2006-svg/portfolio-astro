// Visor de imágenes: ventana que se abre al pulsar una imagen.
// Usa los atributos data-grupo, data-img, data-alt y data-titulo de los botones de index.astro.

const visor = document.getElementById('visor');
const visorImg = document.getElementById('visor-img');
const visorTexto = document.getElementById('visor-texto');
let imagenes = []; // las imágenes del grupo abierto (dibujos, certificados o logros)
let actual = 0;    // cuál se está viendo

function mostrar() {
  const b = imagenes[actual];
  visorImg.src = b.dataset.img;
  visorImg.alt = b.dataset.alt;
  visorTexto.textContent = `${b.dataset.titulo} (${actual + 1} de ${imagenes.length})`;
}
function mover(paso) {
  actual = (actual + paso + imagenes.length) % imagenes.length;
  mostrar();
}

document.addEventListener('click', (e) => {
  const boton = e.target.closest('[data-grupo]');
  if (boton) {
    // Busca todas las imágenes del mismo grupo y abre la que se ha pulsado
    imagenes = [...document.querySelectorAll(`[data-grupo="${boton.dataset.grupo}"]`)];
    actual = imagenes.indexOf(boton);
    mostrar();
    visor.showModal();
  } else if (e.target === visor) {
    visor.close(); // clic fuera de la imagen
  }
});

document.getElementById('cerrar').addEventListener('click', () => visor.close());
document.getElementById('anterior').addEventListener('click', () => mover(-1));
document.getElementById('siguiente').addEventListener('click', () => mover(1));
visor.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') mover(-1);
  if (e.key === 'ArrowRight') mover(1);
});
