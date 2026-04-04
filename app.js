document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

  const menuToggle = $('#menuToggle');
  const navMenu = $('#navMenu');
  const menuBackdrop = $('#menuBackdrop');
  const navLinks = $$('.nav-link');
  const sections = $$('section[id]');

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

  function openMenu() {
    if (!navMenu) return;
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
    if (!navMenu) return;
    navMenu.classList.contains('active') ? closeMenu() : openMenu();
  }

  menuToggle?.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();
  });

  menuBackdrop?.addEventListener('click', closeMenu);
  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  function setActiveLink() {
    const scrollY = window.scrollY + 180;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const currentLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (!currentLink) return;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove('active'));
        currentLink.classList.add('active');
      }
    });
  }

  function toggleScrollTopButton() {
    if (!btnTopo) return;

    if (window.scrollY > 240) {
      btnTopo.classList.add('show');
    } else {
      btnTopo.classList.remove('show');
    }
  }

  btnTopo?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

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
    const clickedOverlay =
      event.target === contactModal ||
      event.target.classList.contains('contact-modal__overlay') ||
      event.target.hasAttribute('data-close-contact');

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

  function openLightbox(image, title, description) {
    if (!lightbox || !lightboxImage) return;

    lightboxImage.src = image || '';
    lightboxImage.alt = title || 'Projeto ALUMNORT';

    if (lightboxTitle) lightboxTitle.textContent = title || 'Projeto';
    if (lightboxDescription) {
      lightboxDescription.textContent = description || 'Projeto executado pela ALUMNORT.';
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

      if (image) openLightbox(image, title, description);
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
    if (
      event.target === lightbox ||
      event.target.classList.contains('lightbox__backdrop') ||
      event.target.hasAttribute('data-lightbox-close')
    ) {
      closeLightbox();
    }
  });

  function autoScrollTrack(track, speed = 0.35) {
    if (!track) return;

    let paused = false;
    let rafId = null;

    function maxScroll() {
      return Math.max(0, track.scrollWidth - track.clientWidth);
    }

    function step() {
      if (!paused) {
        const limit = maxScroll();

        if (limit > 0) {
          if (track.scrollLeft >= limit) {
            track.scrollLeft = 0;
          } else {
            track.scrollLeft += speed;
          }
        }
      }

      rafId = requestAnimationFrame(step);
    }

    ['mouseenter', 'touchstart'].forEach((evt) => {
      track.addEventListener(evt, () => { paused = true; }, { passive: true });
    });

    ['mouseleave', 'touchend'].forEach((evt) => {
      track.addEventListener(evt, () => { paused = false; }, { passive: true });
    });

    rafId = requestAnimationFrame(step);

    window.addEventListener('beforeunload', () => {
      if (rafId) cancelAnimationFrame(rafId);
    });
  }

  autoScrollTrack(document.querySelector('#partnersSlider .partners-slider__track') || document.querySelector('.partners-slider__track'), 0.45);
  autoScrollTrack(document.querySelector('#testimonialsSlider .testimonials-slider__track') || document.querySelector('.testimonials-slider__track'), 0.32);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      closeContactModal();
      closeLightbox();
    }
  });

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        setActiveLink();
        toggleScrollTopButton();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    setActiveLink();
    toggleScrollTopButton();
  });

  setActiveLink();
  toggleScrollTopButton();
});
