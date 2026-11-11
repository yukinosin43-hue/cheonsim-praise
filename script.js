const topbar = document.querySelector('.topbar');
const btn = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  topbar.classList.toggle('scrolled', window.scrollY > 40);
});
btn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
}));

// Close the mobile menu with Escape or a click outside it.
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    btn.focus();
  }
});
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !btn.contains(e.target)) {
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }
});
