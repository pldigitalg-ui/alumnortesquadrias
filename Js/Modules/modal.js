import initContactModal from './modules/modal.js';

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initMobileMenu();
  initNavActiveOnClick();
  initScrollTop();
  initHeaderScrollState();
  initHeroSlider();
  initRevealOnScroll();
  initCounters();
  initLightbox();
  initTestimonialsSlider();
  initPartnersSlider();
  initContactModal();
});

function initSmoothScroll() {
  document.documentElement.style.scrollBehavior = 'smooth';
}

function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const backdrop = document.getElementById('menuBackdrop');
  const body = document.body;

  if (!toggle || !navMenu || !backdrop) return;

  const navLinks = navMenu.querySelectorAll('.nav-link');

  function openMenu() {
    navMenu.classList.add('is-open');
    toggle.classList.add('is-active');
    backdrop.classList.add('is-visible');
    toggle.setAttribute('aria-expanded', 'true');
    body.classList.add('menu-open');
  }

  function closeMenu() {
    navMenu.classList.remove('is-open');
    toggle.classList.remove('is-active');
    backdrop.classList.remove('is-visible');
    toggle.setAttribute('aria-expanded', 'false');
    body.classList.remove('menu-open');
  }

  function toggleMenu() {
    if (navMenu.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  toggle.addEventListener('click', toggleMenu);
  backdrop.addEventListener('click', closeMenu);

  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 991) {
      closeMenu();
    }
  });
}

function initNavActiveOnClick() {
  const links = document.querySelectorAll('.nav-menu .nav-link');
  if (!links.length) return;

  links.forEach((link) => {
    link.classList.remove('active');

    link.addEventListener('click', function () {
      links.forEach((item) => item.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

function initScrollTop() {
  const button = document.getElementById('scrollTopBtn');
  if (!button) return;

  function toggleButton() {
    const visible = window.scrollY > 400;
    button.classList.toggle('is-visible', visible);
    button.setAttribute('aria-hidden', visible ? 'false' : 'true');
  }

  toggleButton();
  window.addEventListener('scroll', toggleButton, { passive: true });

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

function initHeaderScrollState() {
  const header = document.querySelector('.site-header');
  const navbar = document.getElementById('navbar');
  if (!header && !navbar) return;

  function onScroll() {
    const scrolled = window.scrollY > 24;
    header?.classList.toggle('is-scrolled', scrolled);
    navbar?.classList.toggle('is-scrolled', scrolled);
  }

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initHeroSlider() {
  const slider = document.getElementById('heroSlider');
  const slides = slider ? slider.querySelectorAll('.hero__slide') : [];
  const dotsWrap = document.getElementById('heroDots');
  const dots = dotsWrap ? dotsWrap.querySelectorAll('.hero__dot') : [];

  if (!slides.length) return;

  let current = 0;
  let intervalId = null;
  const delay = 5000;

  slides.forEach((slide) => {
    const bg = slide.dataset.bg;
    if (bg) {
      slide.style.backgroundImage = `url("${bg}")`;
    }
  });

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
      dot.setAttribute('aria-current', i === index ? 'true' : 'false');
    });

    current = index;
  }

  function nextSlide() {
    const next = (current + 1) % slides.length;
    showSlide(next);
  }

  function startAutoPlay() {
    stopAutoPlay();
    intervalId = window.setInterval(nextSlide, delay);
  }

  function stopAutoPlay() {
    if (intervalId) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      startAutoPlay();
    });
  });

  slider.addEventListener('mouseenter', stopAutoPlay);
  slider.addEventListener('mouseleave', startAutoPlay);

  showSlide(0);
  startAutoPlay();
}

function initRevealOnScroll() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  elements.forEach((element) => observer.observe(element));
}

function initCounters() {
  const counters = document.querySelectorAll('.stats__number');
  if (!counters.length) return;

  if (!('IntersectionObserver' in window)) {
    counters.forEach((counter) => {
      counter.textContent = counter.dataset.target || '0';
    });
    return;
  }

  const animateCounter = (element) => {
    const target = Number(element.dataset.target || 0);
    const duration = 1400;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);

      element.textContent = String(value);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = String(target);
      }
    }

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.4
    }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const image = document.getElementById('lightboxImage');
  const title = document.getElementById('lightboxTitle');
  const description = document.getElementById('lightboxDescription');
  const closeButton = document.getElementById('lightboxClose');
  const overlay = lightbox?.querySelector('[data-lightbox-close]');

  if (!lightbox || !image || !title || !description) return;

  const triggers = document.querySelectorAll('[data-lightbox-image]');
  let lastFocusedElement = null;

  function openLightbox({ src, heading, text, alt }) {
    lastFocusedElement = document.activeElement;

    image.src = src;
    image.alt = alt || heading || 'Imagem ampliada';
    title.textContent = heading || 'Projeto';
    description.textContent = text || 'Descrição do projeto.';

    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');

    image.src = '';
    image.alt = '';

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  triggers.forEach((trigger) => {
    trigger.setAttribute('tabindex', '0');
    trigger.setAttribute('role', 'button');
    trigger.setAttribute('aria-label', 'Abrir imagem ampliada');

    const openFromTrigger = () => {
      const src = trigger.dataset.lightboxImage || '';
      const heading = trigger.dataset.lightboxTitle || 'Projeto';
      const text = trigger.dataset.lightboxDescription || 'Descrição do projeto.';
      const altImage = trigger.querySelector('img')?.alt || heading;

      if (!src) return;

      openLightbox({
        src,
        heading,
        text,
        alt: altImage
      });
    };

    trigger.addEventListener('click', openFromTrigger);

    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openFromTrigger();
      }
    });
  });

  closeButton?.addEventListener('click', closeLightbox);
  overlay?.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
}

function initTestimonialsSlider() {
  const slider = document.getElementById('testimonialsSlider');
  const track = slider?.querySelector('.testimonials-slider__track');
  const cards = track ? Array.from(track.children) : [];

  if (!slider || !track || cards.length <= 1) return;

  let currentIndex = 0;
  let intervalId = null;
  const delay = 4500;
  const isDesktop = () => window.innerWidth >= 992;

  function getStep() {
    if (window.innerWidth >= 1200) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  function updateSlider() {
    const visibleCards = getStep();
    const maxIndex = Math.max(cards.length - visibleCards, 0);

    if (currentIndex > maxIndex) currentIndex = 0;

    const firstCard = cards[0];
    const gap = parseFloat(window.getComputedStyle(track).gap || '24');
    const cardWidth = firstCard.getBoundingClientRect().width + gap;
    const offset = currentIndex * cardWidth;

    track.style.transform = `translate3d(${-offset}px, 0, 0)`;
  }

  function next() {
    const visibleCards = getStep();
    const maxIndex = Math.max(cards.length - visibleCards, 0);

    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    updateSlider();
  }

  function start() {
    stop();
    intervalId = window.setInterval(next, delay);
  }

  function stop() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  slider.addEventListener('mouseenter', () => {
    if (isDesktop()) stop();
  });

  slider.addEventListener('mouseleave', () => {
    if (isDesktop()) start();
  });

  window.addEventListener('resize', updateSlider);

  updateSlider();
  start();
}

function initPartnersSlider() {
  const slider = document.getElementById('partnersSlider');
  const track = slider?.querySelector('.partners-slider__track');

  if (!slider || !track) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    track.style.animation = 'none';
  }
}
