// Visor de imágenes (sin cambios respecto a tu versión).
const visor = document.getElementById('visor');
const visorImg = document.getElementById('visor-img');
const visorTexto = document.getElementById('visor-texto');
let imagenes = [];
let actual = 0;

function mostrar() {
  const b = imagenes[actual];
  visorImg.src = b.dataset.img;
  visorImg.alt = b.dataset.alt;
  visorTexto.textContent = `${b.dataset.titulo} (${actual + 1} / ${imagenes.length})`;
}
function mover(paso) {
  actual = (actual + paso + imagenes.length) % imagenes.length;
  mostrar();
}

document.addEventListener('click', (e) => {
  const boton = e.target.closest('[data-grupo]');
  if (boton) {
    imagenes = [...document.querySelectorAll(`[data-grupo="${boton.dataset.grupo}"]`)];
    actual = imagenes.indexOf(boton);
    mostrar();
    visor.showModal();
  } else if (e.target === visor) {
    visor.close();
  }
});

document.getElementById('cerrar').addEventListener('click', () => visor.close());
document.getElementById('anterior').addEventListener('click', () => mover(-1));
document.getElementById('siguiente').addEventListener('click', () => mover(1));
visor.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') mover(-1);
  if (e.key === 'ArrowRight') mover(1);
});
