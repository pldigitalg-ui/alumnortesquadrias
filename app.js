document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

  const menuToggle = $('#menuToggle');
  const navMenu = $('#navMenu');
  const menuBackdrop = $('#menuBackdrop');
  const navLinks = $$('.nav-link');
  const btnTopo = $('#btnTopo');
  const whatsappFloat = $('#btnWhatsapp, .whatsapp-float, .btn-whatsapp, .floating-whatsapp');

  const contactModal = $('#contactModal');
  const contactForm = $('#contactForm');
  const openContactButtons = $$('[data-open-contact]');
  const closeContactButtons = $$('[data-close-contact]');
  const serviceField = $('#servico');

  const lightbox = $('#lightbox');
  const lightboxImage = $('#lightboxImage');
  const lightboxTitle = $('#lightboxTitle');
  const lightboxDescription = $('#lightboxDescription');
  const lightboxClose = $('#lightboxClose');
  const lightboxBackdrop = $('[data-lightbox-close]');
  const projectCards = $$('.project-card');

  /* =========================================================
     HELPERS
  ========================================================= */
  function isMobileMenu() {
    return window.innerWidth <= 991;
  }

  function isReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function debounce(fn, delay = 120) {
    let timer = null;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  /* =========================================================
     MENU MOBILE
  ========================================================= */
  function openMenu() {
    if (!navMenu || !isMobileMenu()) return;

    navMenu.classList.add('active');
    menuBackdrop?.classList.add('active');
    body.classList.add('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    if (!navMenu) return;

    navMenu.classList.remove('active');
    menuBackdrop?.classList.remove('active');
    body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    if (!navMenu || !isMobileMenu()) return;

    if (navMenu.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  menuToggle?.addEventListener('click', (event) => {
    event.preventDefault();
    toggleMenu();
  });

  menuBackdrop?.addEventListener('click', closeMenu);

  function clearActiveLinks() {
    navLinks.forEach((link) => link.classList.remove('active'));
  }

  navLinks.forEach((link) => {
    link.classList.remove('active');

    link.addEventListener('click', () => {
      clearActiveLinks();
      link.classList.add('active');

      if (isMobileMenu()) {
        closeMenu();
      }
    });
  });

  /* =========================================================
     BOTÃO VOLTAR AO TOPO
  ========================================================= */
  function toggleScrollTopButton() {
    if (!btnTopo) return;

    if (window.scrollY > 240) {
      btnTopo.classList.add('show');
    } else {
      btnTopo.classList.remove('show');
    }
  }

  function positionScrollTopButton() {
    if (!btnTopo) return;

    const mobile = window.innerWidth <= 767;
    const gap = mobile ? 16 : 20;
    const baseRight = mobile ? 18 : 24;
    const baseBottom = mobile ? 18 : 24;

    let extraBottom = 0;

    if (whatsappFloat) {
      const whatsappRect = whatsappFloat.getBoundingClientRect();
      const buttonRect = btnTopo.getBoundingClientRect();

      const whatsappVisible =
        whatsappRect.width > 0 &&
        whatsappRect.height > 0 &&
        window.getComputedStyle(whatsappFloat).display !== 'none' &&
        window.getComputedStyle(whatsappFloat).visibility !== 'hidden';

      if (whatsappVisible) {
        extraBottom = whatsappRect.height + gap;
      }

      if (buttonRect.width > 0) {
        btnTopo.style.right = `${baseRight}px`;
        btnTopo.style.bottom = `${baseBottom + extraBottom}px`;
      }
    } else {
      btnTopo.style.right = `${baseRight}px`;
      btnTopo.style.bottom = `${baseBottom}px`;
    }
  }

  btnTopo?.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: isReducedMotion() ? 'auto' : 'smooth'
    });
  });

  /* =========================================================
     MODAL DE CONTATO
  ========================================================= */
  function openContactModal(service = '') {
    if (!contactModal) return;

    contactModal.classList.add('active');
    contactModal.setAttribute('aria-hidden', 'false');
    body.classList.add('modal-open');

    if (serviceField && service) {
      serviceField.value = service;
    }

    const firstInput = contactModal.querySelector('input, select, textarea');
    setTimeout(() => firstInput?.focus(), 120);
  }

  function closeContactModal() {
    if (!contactModal) return;

    contactModal.classList.remove('active');
    contactModal.setAttribute('aria-hidden', 'true');
    body.classList.remove('modal-open');
  }

  openContactButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const selectedService = button.getAttribute('data-service') || '';
      closeMenu();
      openContactModal(selectedService);
    });
  });

  closeContactButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      closeContactModal();
    });
  });

  contactModal?.addEventListener('click', (event) => {
    const target = event.target;

    const clickedOverlay =
      target === contactModal ||
      target.classList.contains('contact-modal__overlay') ||
      target.hasAttribute('data-close-contact');

    if (clickedOverlay) {
      closeContactModal();
    }
  });

  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = $('#nome')?.value.trim() || '';
    const whatsapp = $('#whatsapp')?.value.trim() || '';
    const servico = $('#servico')?.value.trim() || '';
    const cidade = $('#cidade')?.value.trim() || '';
    const endereco = $('#endereco')?.value.trim() || '';
    const detalhes = $('#detalhes')?.value.trim() || '';

    if (!nome || !whatsapp || !servico || !cidade || !endereco) {
      alert('Preencha nome, WhatsApp, serviço, cidade/região e endereço.');
      return;
    }

    const mensagem = encodeURIComponent(
      `Olá! Vim pelo site da ALUMNORT.\n\n` +
      `Pedido de orçamento:\n\n` +
      `Nome: ${nome}\n` +
      `WhatsApp: ${whatsapp}\n` +
      `Serviço: ${servico}\n` +
      `Cidade / Região: ${cidade}\n` +
      `Endereço: ${endereco}\n` +
      `Detalhes: ${detalhes || 'Não informado'}`
    );

    const numero = '553899658215';
    const url = `https://wa.me/${numero}?text=${mensagem}`;

    window.open(url, '_blank', 'noopener,noreferrer');

    closeContactModal();
    contactForm.reset();
  });

  /* =========================================================
     LIGHTBOX PROJETOS
  ========================================================= */
  function openLightbox(image, title, description) {
    if (!lightbox || !lightboxImage) return;

    lightboxImage.src = image || '';
    lightboxImage.alt = title || 'Projeto ALUMNORT';

    if (lightboxTitle) {
      lightboxTitle.textContent = title || 'Projeto';
    }

    if (lightboxDescription) {
      lightboxDescription.textContent =
        description || 'Projeto executado pela ALUMNORT.';
    }

    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    body.classList.add('lightbox-open');
  }

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    body.classList.remove('lightbox-open');

    if (lightboxImage) {
      setTimeout(() => {
        lightboxImage.src = '';
        lightboxImage.alt = '';
      }, 180);
    }
  }

  projectCards.forEach((card) => {
    if (!card.hasAttribute('tabindex')) {
      card.setAttribute('tabindex', '0');
    }

    const triggerOpen = () => {
      const image =
        card.getAttribute('data-lightbox-image') ||
        $('img', card)?.getAttribute('src') ||
        '';

      const title =
        card.getAttribute('data-lightbox-title') ||
        $('h3', card)?.textContent?.trim() ||
        'Projeto ALUMNORT';

      const description =
        card.getAttribute('data-lightbox-description') ||
        $('p', card)?.textContent?.trim() ||
        'Projeto executado pela ALUMNORT.';

      if (image) {
        openLightbox(image, title, description);
      }
    };

    card.addEventListener('click', triggerOpen);

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        triggerOpen();
      }
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxBackdrop?.addEventListener('click', closeLightbox);

  lightbox?.addEventListener('click', (event) => {
    const target = event.target;

    if (
      target === lightbox ||
      target.classList.contains('lightbox__backdrop') ||
      target.hasAttribute('data-lightbox-close')
    ) {
      closeLightbox();
    }
  });

  /* =========================================================
     HERO SLIDER
     Estrutura esperada:
     #heroSlider
       .hero-slide
       .hero-slide
       ...
     Opcional:
       [data-hero-prev]
       [data-hero-next]
       [data-hero-dots]
  ========================================================= */
  function setupHeroSlider() {
    const heroSlider = $('#heroSlider');
    if (!heroSlider) return null;

    const slides = $$('.hero-slide', heroSlider);
    if (!slides.length) return null;

    const prevButton = $('[data-hero-prev]', heroSlider) || $('[data-hero-prev]');
    const nextButton = $('[data-hero-next]', heroSlider) || $('[data-hero-next]');
    const dotsContainer = $('[data-hero-dots]', heroSlider) || $('[data-hero-dots]');

    let current = 0;
    let intervalId = null;
    let paused = false;
    const autoplayDelay = 4500;

    function renderDots() {
      if (!dotsContainer) return;

      dotsContainer.innerHTML = '';

      slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Ir para banner ${index + 1}`);
        dot.classList.toggle('active', index === current);

        dot.addEventListener('click', () => {
          goTo(index);
          restart();
        });

        dotsContainer.appendChild(dot);
      });
    }

    function updateSlides() {
      slides.forEach((slide, index) => {
        const active = index === current;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', active ? 'false' : 'true');
      });

      if (dotsContainer) {
        $$('button', dotsContainer).forEach((dot, index) => {
          dot.classList.toggle('active', index === current);
        });
      }
    }

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      updateSlides();
    }

    function next() {
      goTo(current + 1);
    }

    function prev() {
      goTo(current - 1);
    }

    function stop() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }

    function start() {
      if (slides.length <= 1 || isReducedMotion()) return;

      stop();
      intervalId = setInterval(() => {
        if (!paused && !document.hidden) {
          next();
        }
      }, autoplayDelay);
    }

    function restart() {
      stop();
      start();
    }

    prevButton?.addEventListener('click', () => {
      prev();
      restart();
    });

    nextButton?.addEventListener('click', () => {
      next();
      restart();
    });

    heroSlider.addEventListener('mouseenter', () => {
      paused = true;
    });

    heroSlider.addEventListener('mouseleave', () => {
      paused = false;
    });

    heroSlider.addEventListener('touchstart', () => {
      paused = true;
    }, { passive: true });

    heroSlider.addEventListener('touchend', () => {
      paused = false;
    }, { passive: true });

    renderDots();
    updateSlides();
    start();

    return {
      refresh() {
        updateSlides();
        renderDots();
      }
    };
  }

  /* =========================================================
     CARROSSEL HORIZONTAL AUTOMÁTICO
     Funciona para:
     - parceiros: esquerda -> direita visualmente andando automático
     - depoimentos: direita -> esquerda
     Sem botões obrigatórios
  ========================================================= */
  function setupAutoCarousel({
    rootSelector,
    trackSelector,
    itemSelector,
    autoplay = true,
    speed = 3200,
    direction = 'next',
    pauseOnHover = true,
    clickableCards = false
  }) {
    const root = $(rootSelector);
    if (!root) return null;

    const track = $(trackSelector, root);
    if (!track) return null;

    let items = $$(itemSelector, track);
    if (!items.length) return null;

    let intervalId = null;
    let paused = false;

    function getStep() {
      const first = items[0];
      if (!first) return root.clientWidth;

      const styles = window.getComputedStyle(track);
      const gap =
        parseFloat(styles.columnGap || styles.gap || '0') || 0;

      return first.getBoundingClientRect().width + gap;
    }

    function maxScroll() {
      return Math.max(0, track.scrollWidth - track.clientWidth);
    }

    function scrollToPosition(left) {
      track.scrollTo({
        left,
        behavior: isReducedMotion() ? 'auto' : 'smooth'
      });
    }

    function next() {
      const step = getStep();
      const current = Math.round(track.scrollLeft);
      const target = current + step;
      const limit = maxScroll();

      if (target >= limit - 5) {
        scrollToPosition(0);
      } else {
        scrollToPosition(target);
      }
    }

    function prev() {
      const step = getStep();
      const current = Math.round(track.scrollLeft);
      const limit = maxScroll();
      const target = current - step;

      if (target <= 5) {
        scrollToPosition(limit);
      } else {
        scrollToPosition(target);
      }
    }

    function move() {
      if (direction === 'prev') {
        prev();
      } else {
        next();
      }
    }

    function stop() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }

    function start() {
      if (!autoplay || items.length <= 1 || isReducedMotion()) return;

      stop();
      intervalId = setInterval(() => {
        if (!paused && !document.hidden) {
          move();
        }
      }, speed);
    }

    function restart() {
      stop();
      start();
    }

    if (pauseOnHover) {
      root.addEventListener('mouseenter', () => {
        paused = true;
      });

      root.addEventListener('mouseleave', () => {
        paused = false;
      });

      root.addEventListener('touchstart', () => {
        paused = true;
      }, { passive: true });

      root.addEventListener('touchend', () => {
        paused = false;
      }, { passive: true });
    }

    if (clickableCards) {
      items.forEach((card) => {
        card.addEventListener('click', () => {
          const link = card.closest('a') || $('a', card);
          if (link?.href) {
            window.open(link.href, '_blank', 'noopener,noreferrer');
          }
        });
      });
    }

    const onResize = debounce(() => {
      items = $$(itemSelector, track);
      restart();
    }, 150);

    window.addEventListener('resize', onResize);

    start();

    return {
      refresh() {
        items = $$(itemSelector, track);
        restart();
      }
    };
  }

  /* =========================================================
     SLIDERS
  ========================================================= */
  const heroSlider = setupHeroSlider();

  const partnersSlider = setupAutoCarousel({
    rootSelector: '#partnersSlider',
    trackSelector: '.partners-slider__track',
    itemSelector: '.partner-card',
    autoplay: true,
    speed: 2600,
    direction: 'next',
    pauseOnHover: true,
    clickableCards: true
  });

  const testimonialsSlider = setupAutoCarousel({
    rootSelector: '#testimonialsSlider',
    trackSelector: '.testimonials-slider__track',
    itemSelector: '.testimonial-card, .testimonial-item, .depoimento-card',
    autoplay: true,
    speed: 3800,
    direction: 'prev',
    pauseOnHover: true,
    clickableCards: false
  });

  /* =========================================================
     TECLADO / ESC
  ========================================================= */
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      closeContactModal();
      closeLightbox();
    }
  });

  /* =========================================================
     SCROLL / RESIZE
  ========================================================= */
  let ticking = false;

  function handleScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        toggleScrollTopButton();
        positionScrollTopButton();
        ticking = false;
      });
      ticking = true;
    }
  }

  const handleResize = debounce(() => {
    if (!isMobileMenu()) {
      closeMenu();
    }

    toggleScrollTopButton();
    positionScrollTopButton();

    heroSlider?.refresh?.();
    partnersSlider?.refresh?.();
    testimonialsSlider?.refresh?.();
  }, 120);

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleResize);

  document.addEventListener('visibilitychange', () => {
    positionScrollTopButton();
  });

  /* =========================================================
     INICIALIZAÇÃO
  ========================================================= */
  clearActiveLinks();
  closeMenu();
  closeContactModal();
  closeLightbox();
  toggleScrollTopButton();
  positionScrollTopButton();
});
