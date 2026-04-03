export default function initMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const menuBackdrop = document.getElementById('menuBackdrop');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');

  if (!menuToggle || !navMenu || !menuBackdrop) return;

  const openMenu = () => {
    navMenu.classList.add('is-open');
    menuBackdrop.classList.add('is-active');
    menuToggle.classList.add('is-active');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  };

  const closeMenu = () => {
    navMenu.classList.remove('is-open');
    menuBackdrop.classList.remove('is-active');
    menuToggle.classList.remove('is-active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menuBackdrop.addEventListener('click', closeMenu);

  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  const handleNavbarScroll = () => {
    if (!navbar) return;

    if (window.scrollY > 20) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  };

  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll);
}
