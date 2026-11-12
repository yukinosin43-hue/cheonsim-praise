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


// v12: accessible, touch-friendly 14-photo album. Existing site behavior is unchanged.
(() => {
  const dialog = document.getElementById('event-gallery-lightbox');
  const tiles = [...document.querySelectorAll('[data-event-photo]')];
  if (!dialog || !tiles.length) return;
  const fullPhotos = [
    'assets/event-gallery/photo-12.jpg',
    'assets/event-gallery/photo-01.jpg',
    'assets/event-gallery/photo-02.jpg',
    'assets/event-gallery/photo-03.jpg',
    'assets/event-gallery/photo-04.jpg',
    'assets/event-gallery/photo-05.jpg',
    'assets/event-gallery/photo-06.jpg',
    'assets/event-gallery/photo-07.jpg',
    'assets/event-gallery/photo-08.jpg',
    'assets/event-gallery/photo-09.jpg',
    'assets/event-gallery/photo-10.jpg',
    'assets/event-gallery/photo-11.jpg',
    'assets/event-gallery/photo-13.jpg',
    'assets/event-gallery/photo-14.jpg'
  ];
  const viewer = dialog.querySelector('.event-lightbox-image');
  const counter = dialog.querySelector('.event-lightbox-count');
  const closeButton = dialog.querySelector('.event-lightbox-close');
  const previousButton = dialog.querySelector('.event-lightbox-prev');
  const nextButton = dialog.querySelector('.event-lightbox-next');
  let current = 0;
  let returnFocus = null;
  let touchStartX = null;

  function showPhoto(index) {
    current = (index + fullPhotos.length) % fullPhotos.length;
    viewer.src = fullPhotos[current];
    viewer.alt = `천심성가대 찬양예배 사진 ${current+1} / ${fullPhotos.length}`;
    counter.textContent = `${current+1} / ${fullPhotos.length}`;
    const next = new Image();
    next.src = fullPhotos[(current+1) % fullPhotos.length];
  }
  tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => {
      returnFocus = tile;
      showPhoto(index);
      if (!dialog.open) dialog.showModal();
      closeButton.focus();
    });
  });
  previousButton.addEventListener('click', () => showPhoto(current-1));
  nextButton.addEventListener('click', () => showPhoto(current+1));
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => {if (e.target === dialog) dialog.close();});
  dialog.addEventListener('close', () => { if(returnFocus) returnFocus.focus(); });
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {e.preventDefault(); showPhoto(current-1);}
    if (e.key === 'ArrowRight') {e.preventDefault(); showPhoto(current+1);}
  });
  const stage = dialog.querySelector('.event-lightbox-stage');
  stage.addEventListener('touchstart', e => {
    touchStartX = e.touches.length === 1 ? e.touches[0].clientX : null;
  }, {passive:true});
  stage.addEventListener('touchend', e => {
    if (touchStartX === null || e.changedTouches.length !== 1) return;
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 55) showPhoto(current + (delta < 0 ? 1 : -1));
    touchStartX = null;
  }, {passive:true});
})();
