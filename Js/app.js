document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initMobileMenu();
  initNavActiveOnScroll();
  initScrollTop();
  initHeaderScrollState();
  initRevealOnScroll();
  initLightbox();
  initTestimonialsSlider();
  initPartnersSlider();
  initContactModal();
});

/* =========================
   SCROLL SUAVE
========================= */
function initSmoothScroll() {
  document.documentElement.style.scrollBehavior = 'smooth';
}

/* =========================
   MENU MOBILE
========================= */
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const backdrop = document.getElementById('menuBackdrop');
  const body = document.body;

  if (!toggle || !navMenu || !backdrop) return;

  const navLinks = navMenu.querySelectorAll('.nav-link');

  function openMenu() {
    navMenu.classList.add('active');
    toggle.classList.add('is-active');
    backdrop.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    body.classList.add('menu-open');
  }

  function closeMenu() {
    navMenu.classList.remove('active');
    toggle.classList.remove('is-active');
    backdrop.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    body.classList.remove('menu-open');
  }

  function toggleMenu() {
    if (navMenu.classList.contains('active')) {
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
    if (event.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 991) {
      closeMenu();
    }
  });
}

/* =========================
   MENU ATIVO PELO SCROLL
========================= */
function initNavActiveOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-menu .nav-link');

  if (!sections.length || !links.length) return;

  function setActiveLink() {
    let currentId = 'home';

    sections.forEach((section) => {
      const top = section.offsetTop - 180;
      const height = section.offsetHeight;

      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    links.forEach((link) => {
      const href = link.getAttribute('href') || '';
      link.classList.toggle('active', href === `#${currentId}`);
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();
}

/* =========================
   BOTÃO SUBIR AO TOPO
========================= */
function initScrollTop() {
  const button = document.getElementById('btnTopo');
  if (!button) return;

  function toggleButton() {
    const visible = window.scrollY > 320;
    button.classList.toggle('show', visible);
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

/* =========================
   ESTADO DO HEADER NO SCROLL
========================= */
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

/* =========================
   REVEAL ON SCROLL
========================= */
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

/* =========================
   LIGHTBOX
========================= */
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

    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');

    setTimeout(() => {
      image.src = '';
      image.alt = '';
    }, 180);

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
    if (event.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* =========================
   SLIDER DE DEPOIMENTOS
========================= */
function initTestimonialsSlider() {
  const slider = document.getElementById('testimonialsSlider');
  const track = slider?.querySelector('.testimonials-slider__track');
  const cards = track ? Array.from(track.children) : [];

  if (!slider || !track || cards.length <= 1) return;

  let intervalId = null;
  const delay = 4200;

  function getStepWidth() {
    const firstCard = cards[0];
    if (!firstCard) return 320;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.gap || styles.columnGap || '22');
    return firstCard.getBoundingClientRect().width + gap;
  }

  function next() {
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    const nextScroll = track.scrollLeft + getStepWidth();

    if (nextScroll >= maxScrollLeft - 8) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollTo({ left: nextScroll, behavior: 'smooth' });
    }
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

  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
  slider.addEventListener('touchstart', stop, { passive: true });
  slider.addEventListener('touchend', start, { passive: true });

  start();
}

/* =========================
   SLIDER DE PARCEIROS
========================= */
function initPartnersSlider() {
  const slider = document.getElementById('partnersSlider');
  const track = slider?.querySelector('.partners-slider__track');
  const cards = track ? Array.from(track.children) : [];

  if (!slider || !track || cards.length <= 1) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  let intervalId = null;
  const delay = 3600;

  function getStepWidth() {
    const firstCard = cards[0];
    if (!firstCard) return 300;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.gap || styles.columnGap || '22');
    return firstCard.getBoundingClientRect().width + gap;
  }

  function next() {
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    const nextScroll = track.scrollLeft + getStepWidth();

    if (nextScroll >= maxScrollLeft - 8) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollTo({ left: nextScroll, behavior: 'smooth' });
    }
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

  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
  slider.addEventListener('touchstart', stop, { passive: true });
  slider.addEventListener('touchend', start, { passive: true });

  start();
}

/* =========================
   MODAL DE CONTATO
========================= */
function initContactModal() {
  const modal = document.getElementById('contactModal');
  const form = document.getElementById('contactForm');
  const serviceField = document.getElementById('servico');

  if (!modal || !form) return;

  const openButtons = document.querySelectorAll('[data-open-contact]');
  const closeButtons = modal.querySelectorAll('[data-close-contact]');
  let lastFocusedElement = null;

  function openModal(service = '') {
    lastFocusedElement = document.activeElement;
    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    if (service && serviceField) {
      serviceField.value = service;
    }
  }

  function closeModal() {
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  openButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const service = button.dataset.service || '';
      openModal(service);
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = form.querySelector('#nome')?.value.trim() || '';
    const whatsapp = form.querySelector('#whatsapp')?.value.trim() || '';
    const servico = form.querySelector('#servico')?.value.trim() || '';
    const cidade = form.querySelector('#cidade')?.value.trim() || '';
    const endereco = form.querySelector('#endereco')?.value.trim() || '';
    const detalhes = form.querySelector('#detalhes')?.value.trim() || '';

    if (!nome || !whatsapp || !servico || !cidade || !endereco) {
      alert('Preencha nome, WhatsApp, serviço, cidade/região e endereço.');
      return;
    }

    const mensagem = `Olá, vim pelo site da ALUMNORT e gostaria de solicitar um orçamento.

*DADOS DO CLIENTE*
*Nome:* ${nome}
*WhatsApp:* ${whatsapp}
*Serviço:* ${servico}
*Cidade / Região:* ${cidade}
*Endereço:* ${endereco}

*Detalhes do pedido:*
${detalhes || 'Não informado'}`;

    const whatsappUrl = `https://wa.me/553899658215?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    form.reset();
    closeModal();
  });
}
