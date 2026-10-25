const R = document.documentElement;
const cortina = document.getElementById('cortina');
const sinAnim = matchMedia('(prefers-reduced-motion: reduce)').matches;
let ocupado = false;

// 1) baja la cortina  2) cambia el contenido mientras tapa  3) la sube
function conCortina(cambio) {
  if (sinAnim) { cambio(); return; }
  if (ocupado) return;
  ocupado = true;
  cortina.classList.add('baja');
  setTimeout(() => {
    cambio();
    scrollTo(0, 0);
    cortina.classList.remove('baja');
    setTimeout(() => (ocupado = false), 650);
  }, 650); // = la duración del transition del CSS
}

// PÁGINAS: solo una sección .pg se ve; las demás llevan "hidden"
const pags = [...document.querySelectorAll('.pg')];
function mostrar(id) {
  if (!pags.some((s) => s.id === id)) id = 'inicio';
  pags.forEach((s) => (s.hidden = s.id !== id));
  document.querySelectorAll('nav a').forEach((a) => {
    if (a.hash === '#' + id) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const destino = document.getElementById(a.hash.slice(1));
  if (!destino || !destino.classList.contains('pg')) return;
  e.preventDefault();
  if (!destino.hidden) return;
  conCortina(() => { history.pushState(null, '', a.hash); mostrar(destino.id); });
});
addEventListener('popstate', () => conCortina(() => mostrar(location.hash.slice(1))));
mostrar(location.hash.slice(1));

// IDIOMA
const botonesLang = document.querySelectorAll('[data-lang-btn]');
function setLang(l) {
  R.dataset.lang = l; R.lang = l;
  botonesLang.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.langBtn === l)));
  document.dispatchEvent(new Event('idioma')); // avisa a tema.js
}
let guardado = null;
try { guardado = localStorage.getItem('idioma'); } catch (e) {}
setLang(guardado || 'es');
botonesLang.forEach((b) => b.addEventListener('click', () => {
  const l = b.dataset.langBtn;
  if (l === R.dataset.lang) return;
  conCortina(() => setLang(l));
  try { localStorage.setItem('idioma', l); } catch (e) {}
}));

document.getElementById('imprimir').addEventListener('click', () => print());