const toggle = document.querySelector('.c-nav__toggle');
const items = document.querySelector('.c-nav__items');

function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open));
  items.classList.toggle('is-open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

toggle.addEventListener('click', () => {
  setMenu(toggle.getAttribute('aria-expanded') !== 'true');
});

items.querySelectorAll('.c-nav__link').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setMenu(false);
});