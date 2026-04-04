document.addEventListener('DOMContentLoaded', () => {
  const uiState = createUiStateController();

  initMenu(uiState);
  initHeroSlider();
  initReveal();
  initCounter();
  initLightbox(uiState);
  initContactModal(uiState);
  initScrollTop();
  initHorizontalAutoSliders();
  initActiveNavOnScroll();
});

/* =========================
   CONTROLE DE ESTADO GLOBAL DO BODY
========================= */
function createUiStateController() {
  const state = {
    menu: false,
    modal: false,
    lightbox: false
  };

  function sync() {
    document.body.classList.toggle('menu-open', state.menu);
    document.body.classList.toggle('modal-open', state.modal);
    document.body.classList.toggle('lightbox-open', state.lightbox);
  }

  return {
    setMenu(value) {
      state.menu = Boolean(value);
      sync();
    },
    setModal(value) {
      state.modal = Boolean(value);
      sync();
    },
    setLightbox(value) {
      state.lightbox = Boolean(value);
      sync();
    }
  };
}

/* =========================
   MENU MOBILE
========================= */
function initMenu(uiState) {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const menuBackdrop = document.getElementById('menuBackdrop');
  const navLinks = document.querySelectorAll('.nav-link');
  const contactButtons = document.querySelectorAll('[data-open-contact]');

  if (!menuToggle || !navMenu || !menuBackdrop) return;

  function openMenu() {
    navMenu.classList.add('active');
    menuBackdrop.classList.add('active');
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuBackdrop.setAttribute('aria-hidden', 'false');
    uiState.setMenu(true);
  }

  function closeMenu() {
    navMenu.classList.remove('active');
    menuBackdrop.classList.remove('active');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuBackdrop.setAttribute('aria-hidden', 'true');
    uiState.setMenu(false);
  }

  function toggleMenu() {
    if (navMenu.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  menuToggle.addEventListener('click', toggleMenu);
  menuBackdrop.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  contactButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (window.innerWidth <= 991 && navMenu.classList.contains('active')) {
        closeMenu();
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 991 && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });
}

/* =========================
   HERO SLIDER AUTOMÁTICO + DOTS
========================= */
function initHeroSlider() {
  const slider = document.getElementById('heroSlider');
  const dotsContainer = document.getElementById('heroDots');

  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll('.hero__slide'));
  const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.hero__dot')) : [];

  if (!slides.length) return;

  let currentIndex = 0;
  let autoPlayId = null;
  const intervalTime = 5000;

  function syncDots(index) {
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === index);
      dot.setAttribute('aria-current', dotIndex === index ? 'true' : 'false');
    });
  }

  function showSlide(index) {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('active', slideIndex === index);
    });

    syncDots(index);
    currentIndex = index;
  }

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  }

  function startAutoPlay() {
    stopAutoPlay();
    if (slides.length <= 1) return;
    autoPlayId = window.setInterval(nextSlide, intervalTime);
  }

  function stopAutoPlay() {
    if (autoPlayId) {
      window.clearInterval(autoPlayId);
      autoPlayId = null;
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
  slider.addEventListener('touchstart', stopAutoPlay, { passive: true });
  slider.addEventListener('touchend', startAutoPlay, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  });

  showSlide(currentIndex);
  startAutoPlay();
}

/* =========================
   REVEAL ON SCROLL
========================= */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  items.forEach((item) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(24px)';
    item.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  });

  const observer = new IntersectionObserver(
    (entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.classList.add('is-visible');
        instance.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  items.forEach(item => observer.observe(item));
}

/* =========================
   COUNTER
========================= */
function initCounter() {
  const counters = document.querySelectorAll('.stats__number');
  if (!counters.length) return;

  function animateCounter(element) {
    const target = Number(element.dataset.target || 0);
    const duration = 1600;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      element.textContent = String(value);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = String(target);
      }
    }

    requestAnimationFrame(updateCounter);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.target.dataset.counted === 'true') return;
        entry.target.dataset.counted = 'true';
        animateCounter(entry.target);
      });
    },
    { threshold: 0.45 }
  );

  counters.forEach(counter => observer.observe(counter));
}

/* =========================
   LIGHTBOX
========================= */
function initLightbox(uiState) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDescription = document.getElementById('lightboxDescription');
  const lightboxClose = document.getElementById('lightboxClose');

  if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxDescription) return;

  const triggers = document.querySelectorAll('[data-lightbox-image]');
  const closeTriggers = lightbox.querySelectorAll('[data-lightbox-close]');

  function openLightbox({ image, title, description, alt }) {
    lightboxImage.src = image;
    lightboxImage.alt = alt || title || 'Imagem ampliada';
    lightboxTitle.textContent = title || 'Projeto';
    lightboxDescription.textContent = description || '';

    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    uiState.setLightbox(true);
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    uiState.setLightbox(false);

    window.setTimeout(() => {
      lightboxImage.src = '';
      lightboxImage.alt = '';
    }, 220);
  }

  triggers.forEach((trigger) => {
    trigger.style.cursor = 'pointer';

    trigger.addEventListener('click', () => {
      const image = trigger.dataset.lightboxImage;
      const title = trigger.dataset.lightboxTitle || 'Projeto';
      const description = trigger.dataset.lightboxDescription || '';
      const alt = trigger.querySelector('img')?.alt || title;

      if (!image) return;
      openLightbox({ image, title, description, alt });
    });
  });

  closeTriggers.forEach((closeTrigger) => {
    closeTrigger.addEventListener('click', closeLightbox);
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* =========================
   MODAL DE CONTATO + WHATSAPP
========================= */
function initContactModal(uiState) {
  const modal = document.getElementById('contactModal');
  const form = document.getElementById('contactForm');
  const serviceField = document.getElementById('servico');

  if (!modal || !form) return;

  const openButtons = document.querySelectorAll('[data-open-contact]');
  const closeButtons = modal.querySelectorAll('[data-modal-close]');
  const modalClose = document.getElementById('contactModalClose');

  function openModal(service = '') {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    uiState.setModal(true);

    if (service && serviceField) {
      serviceField.value = service;
    }
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    uiState.setModal(false);
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

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = getFieldValue(form, '#nome');
    const telefone = getFieldValue(form, '#telefone');
    const email = getFieldValue(form, '#email');
    const servico = getFieldValue(form, '#servico');
    const cidade = getFieldValue(form, '#cidade');
    const bairro = getFieldValue(form, '#bairro');
    const endereco = getFieldValue(form, '#endereco');
    const mensagem = getFieldValue(form, '#mensagem');

    if (!nome || !telefone || !servico) {
      alert('Preencha pelo menos nome, telefone e serviço.');
      return;
    }

    const textoWhatsapp = [
      'Olá! Vim pelo site da ALUMNORT e gostaria de solicitar um orçamento.',
      '',
      '*DADOS DO CLIENTE*',
      `*Nome:* ${nome}`,
      `*Telefone:* ${telefone}`,
      `*E-mail:* ${email || 'Não informado'}`,
      `*Serviço:* ${servico}`,
      `*Cidade:* ${cidade || 'Não informado'}`,
      `*Bairro/Região:* ${bairro || 'Não informado'}`,
      `*Endereço:* ${endereco || 'Não informado'}`,
      '',
      '*Mensagem:*',
      mensagem || 'Não informado'
    ].join('\n');

    const whatsappNumber = '553899658215';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(textoWhatsapp)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    form.reset();
    closeModal();
  });

  function getFieldValue(formElement, selector) {
    const field = formElement.querySelector(selector);
    return field ? field.value.trim() : '';
  }
}

/* =========================
   BOTÃO VOLTAR AO TOPO
========================= */
function initScrollTop() {
  const button = document.getElementById('scrollTopBtn');
  if (!button) return;

  function toggleButton() {
    if (window.scrollY > 320) {
      button.classList.add('is-visible');
    } else {
      button.classList.remove('is-visible');
    }
  }

  window.addEventListener('scroll', toggleButton, { passive: true });
  toggleButton();

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* =========================
   SLIDERS HORIZONTAIS
   PARCEIROS / DEPOIMENTOS
========================= */
function initHorizontalAutoSliders() {
  const trackSelectors = [
    '#partnersSlider .partners-slider__track',
    '#testimonialsSlider .testimonials-slider__track'
  ];

  trackSelectors.forEach((selector) => {
    const track = document.querySelector(selector);
    if (!track || !track.children.length) return;

    let autoScrollId = null;
    let isPaused = false;

    function getScrollStep() {
      const firstCard = track.children[0];
      if (!firstCard) return 320;

      const trackStyles = window.getComputedStyle(track);
      const gap = parseInt(trackStyles.gap || trackStyles.columnGap || '22', 10);

      return firstCard.getBoundingClientRect().width + gap;
    }

    function scrollNext() {
      const maxScrollLeft = track.scrollWidth - track.clientWidth;
      const nextPosition = track.scrollLeft + getScrollStep();

      if (nextPosition >= maxScrollLeft - 10) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollTo({ left: nextPosition, behavior: 'smooth' });
      }
    }

    function startAutoScroll() {
      stopAutoScroll();
      autoScrollId = window.setInterval(() => {
        if (isPaused) return;
        scrollNext();
      }, 3500);
    }

    function stopAutoScroll() {
      if (autoScrollId) {
        window.clearInterval(autoScrollId);
        autoScrollId = null;
      }
    }

    track.addEventListener('mouseenter', () => {
      isPaused = true;
    });

    track.addEventListener('mouseleave', () => {
      isPaused = false;
    });

    track.addEventListener('touchstart', () => {
      isPaused = true;
    }, { passive: true });

    track.addEventListener('touchend', () => {
      isPaused = false;
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoScroll();
      } else {
        startAutoScroll();
      }
    });

    window.addEventListener('resize', () => {
      startAutoScroll();
    });

    startAutoScroll();
  });
}

/* =========================
   MENU ATIVO CONFORME SCROLL
========================= */
function initActiveNavOnScroll() {
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const navbar = document.getElementById('navbar');

  if (!sections.length || !navLinks.length) return;

  function getOffset() {
    const navbarHeight = navbar ? navbar.offsetHeight : 84;
    return navbarHeight + 100;
  }

  function updateActiveLink() {
    const offset = getOffset();
    const scrollPosition = window.scrollY + offset;
    let currentId = sections[0]?.id || '';

    sections.forEach((section) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (scrollPosition >= top && scrollPosition < bottom) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href') || '';
      link.classList.toggle('active', href === `#${currentId}`);
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  window.addEventListener('resize', updateActiveLink);
  updateActiveLink();
}
