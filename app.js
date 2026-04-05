document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

  /* =========================
     ELEMENTOS GERAIS
  ========================= */
  const menuToggle = $('#menuToggle');
  const navMenu = $('#navMenu');
  const menuBackdrop = $('#menuBackdrop');
  const navLinks = $$('.nav-link');

  const btnTopo = $('#btnTopo');

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

  /* =========================
     MENU MOBILE
  ========================= */
  function isMobileMenu() {
    return window.innerWidth <= 991;
  }

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

  /* =========================
     LINK ATIVO NO MENU
     - NÃO inicia com ativo
     - Só ativa no clique
  ========================= */
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

  /* =========================
     BOTÃO TOPO
  ========================= */
  function toggleScrollTopButton() {
    if (!btnTopo) return;

    if (window.scrollY > 240) {
      btnTopo.classList.add('show');
    } else {
      btnTopo.classList.remove('show');
    }
  }

  btnTopo?.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  /* =========================
     MODAL DE CONTATO / ORÇAMENTO
  ========================= */
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

  /* =========================
     LIGHTBOX DE PROJETOS
  ========================= */
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

  /* =========================
     SLIDER GENÉRICO
  ========================= */
  function setupSlider(sliderId, trackSelector, options = {}) {
    const slider = document.getElementById(sliderId);
    if (!slider) return null;

    const track = slider.querySelector(trackSelector);
    if (!track) return null;

    const prevButton = document.querySelector(`[data-slider-prev="${sliderId}"]`);
    const nextButton = document.querySelector(`[data-slider-next="${sliderId}"]`);
    const dotsContainer = document.querySelector(`[data-slider-dots="${sliderId}"]`);

    const config = {
      autoplay: options.autoplay ?? true,
      speed: options.speed ?? 3500,
      pauseOnHover: options.pauseOnHover ?? true
    };

    let intervalId = null;
    let isHovered = false;

    function getTotalPages() {
      if (!track || track.children.length === 0) return 0;
      return Math.max(1, Math.ceil(track.scrollWidth / track.clientWidth));
    }

    function getCurrentPage() {
      if (!track) return 0;

      const current = Math.round(track.scrollLeft / track.clientWidth);
      const maxPage = Math.max(0, getTotalPages() - 1);

      return Math.max(0, Math.min(current, maxPage));
    }

    function scrollToPage(pageIndex, smooth = true) {
      const maxPage = Math.max(0, getTotalPages() - 1);
      const safePage = Math.max(0, Math.min(pageIndex, maxPage));

      track.scrollTo({
        left: safePage * track.clientWidth,
        behavior: smooth ? 'smooth' : 'auto'
      });

      updateDots();
    }

    function nextSlide() {
      const current = getCurrentPage();
      const maxPage = Math.max(0, getTotalPages() - 1);
      const next = current >= maxPage ? 0 : current + 1;
      scrollToPage(next);
    }

    function prevSlide() {
      const current = getCurrentPage();
      const maxPage = Math.max(0, getTotalPages() - 1);
      const prev = current <= 0 ? maxPage : current - 1;
      scrollToPage(prev);
    }

    function buildDots() {
      if (!dotsContainer) return;

      dotsContainer.innerHTML = '';
      const totalPages = getTotalPages();

      if (totalPages <= 1) return;

      for (let i = 0; i < totalPages; i += 1) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);

        dot.addEventListener('click', () => {
          scrollToPage(i);
          restartAutoplay();
        });

        dotsContainer.appendChild(dot);
      }

      updateDots();
    }

    function updateDots() {
      if (!dotsContainer) return;

      const dots = Array.from(dotsContainer.querySelectorAll('button'));
      const current = getCurrentPage();

      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === current);
      });
    }

    function stopAutoplay() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }

    function startAutoplay() {
      if (!config.autoplay) return;

      stopAutoplay();

      intervalId = setInterval(() => {
        if (!isHovered && !document.hidden) {
          nextSlide();
        }
      }, config.speed);
    }

    function restartAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    prevButton?.addEventListener('click', () => {
      prevSlide();
      restartAutoplay();
    });

    nextButton?.addEventListener('click', () => {
      nextSlide();
      restartAutoplay();
    });

    track.addEventListener(
      'scroll',
      () => {
        updateDots();
      },
      { passive: true }
    );

    if (config.pauseOnHover) {
      slider.addEventListener('mouseenter', () => {
        isHovered = true;
      });

      slider.addEventListener('mouseleave', () => {
        isHovered = false;
      });

      slider.addEventListener(
        'touchstart',
        () => {
          isHovered = true;
        },
        { passive: true }
      );

      slider.addEventListener(
        'touchend',
        () => {
          isHovered = false;
        },
        { passive: true }
      );
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });

    buildDots();
    updateDots();
    startAutoplay();

    return {
      nextSlide,
      prevSlide,
      rebuild() {
        buildDots();
        updateDots();
      }
    };
  }

  const partnersSlider = setupSlider('partnersSlider', '.partners-slider__track', {
    autoplay: true,
    speed: 2800,
    pauseOnHover: true
  });

  const testimonialsSlider = setupSlider('testimonialsSlider', '.testimonials-slider__track', {
    autoplay: true,
    speed: 3600,
    pauseOnHover: true
  });

  /* =========================
     TECLA ESC
  ========================= */
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      closeContactModal();
      closeLightbox();
    }
  });

  /* =========================
     RESIZE E SCROLL
  ========================= */
  let ticking = false;

  function handleScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        toggleScrollTopButton();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  window.addEventListener('resize', () => {
    if (!isMobileMenu()) {
      closeMenu();
    }

    toggleScrollTopButton();
    partnersSlider?.rebuild();
    testimonialsSlider?.rebuild();
  });

  /* =========================
     ESTADO INICIAL
  ========================= */
  clearActiveLinks();
  closeMenu();
  closeContactModal();
  closeLightbox();
  toggleScrollTopButton();
});
