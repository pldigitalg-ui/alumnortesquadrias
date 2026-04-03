export default function initMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('navMenu');
  const backdrop = document.getElementById('menuBackdrop');

  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove('active');
    backdrop.classList.remove('active');
    toggle.setAttribute('aria-expanded', false);
  };

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    backdrop.classList.toggle('active');
  });

  backdrop.addEventListener('click', closeMenu);

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}
