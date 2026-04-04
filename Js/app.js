document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  /* =========================================================
     ELEMENTOS
  ========================================================= */
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const menuBackdrop = document.getElementById('menuBackdrop');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const btnTopo = document.getElementById('btnTopo');

  const contactModal = document.getElementById('contactModal');
  const contactForm = document.getElementById('contactForm');
  const openContactButtons = document.querySelectorAll('[data-open-contact]');
  const closeContactButtons = document.querySelectorAll('[data-close-contact]');
  const serviceField = document.getElementById('servico');

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDescription = document.getElementById('lightboxDescription');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.querySelector('[data-lightbox-close]');
  const projectCards = document.querySelectorAll('.project-card');

  /* =========================================================
     MENU MOBILE
  ========================================================= */
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

  menuToggle?.addEventListener('click', toggleMenu);
  menuBackdrop?.addEventListener('click', closeMenu);

  navLinks.forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });

  /* =========================================================
     LINK ATIVO
  ========================================================= */
  function setActiveLink() {
    const scrollY = window.scrollY + 160;

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

  /* =========================================================
     BOTÃO TOPO
  ========================================================= */
  function toggleScrollTopButton() {
    if (!btnTopo) return;
    if (window.scrollY > 260) {
      btnTopo.classList.add('show');
    } else {
      btnTopo.classList.remove('show');
    }
  }

  btnTopo?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* =========================================================
     MODAL DE CONTATO
  ========================================================= */
  function openContactModal(service = '') {
    if (!contactModal) return;

    contactModal.classList.add('active');
    contactModal.classList.add('is-active');
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
    contactModal.classList.remove('is-active');
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
    if (
      event.target === contactModal ||
      event.target.classList.contains('contact-modal__overlay')
    ) {
      closeContactModal();
    }
  });

  /* =========================================================
     ENVIO PARA WHATSAPP
  ========================================================= */
  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome')?.value.trim() || '';
    const whatsapp = document.getElementById('whatsapp')?.value.trim() || '';
    const servico = document.getElementById('servico')?.value.trim() || '';
    const cidade = document.getElementById('cidade')?.value.trim() || '';
    const endereco = document.getElementById('endereco')?.value.trim() || '';
    const detalhes = document.getElementById('detalhes')?.value.trim() || '';

    if (!nome || !whatsapp || !servico || !cidade || !endereco) {
      alert('Preencha os campos obrigatórios para enviar o orçamento.');
      return;
    }

    const mensagem = encodeURIComponent(
      `Olá! Vim pelo site da ALUMNORT.\n\n` +
      `Solicitação de orçamento\n\n` +
      `Nome: ${nome}\n` +
      `WhatsApp: ${whatsapp}\n` +
      `Tipo de serviço: ${servico}\n` +
      `Cidade / Região: ${cidade}\n` +
      `Endereço: ${endereco}\n` +
      `Detalhes: ${detalhes || 'Não informado'}`
    );

    const numero = '553899658215';
    const url = `https://wa.me/${numero}?text=${mensagem}`;

    window.open(url, '_blank');
    closeContactModal();
    contactForm.reset();
  });

  /* =========================================================
     LIGHTBOX
  ========================================================= */
  function openLightbox(image, title, description) {
    if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxDescription) return;

    lightboxImage.src = image || '';
    lightboxImage.alt = title || 'Projeto ALUMNORT';
    lightboxTitle.textContent = title || 'Projeto';
    lightboxDescription.textContent = description || 'Descrição do projeto.';

    lightbox.classList.add('active');
    lightbox.classList.add('is-active');
    lightbox.setAttribute('aria-hidden', 'false');
    body.classList.add('lightbox-open');
  }

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove('active');
    lightbox.classList.remove('is-active');
    lightbox.setAttribute('aria-hidden', 'true');
    body.classList.remove('lightbox-open');

    if (lightboxImage) {
      setTimeout(() => {
        lightboxImage.src = '';
        lightboxImage.alt = '';
      }, 200);
    }
  }

  projectCards.forEach((card) => {
    card.setAttribute('tabindex', '0');

    card.addEventListener('click', () => {
      const image = card.getAttribute('data-lightbox-image');
      const title = card.getAttribute('data-lightbox-title');
      const description = card.getAttribute('data-lightbox-description');

      if (image) openLightbox(image, title, description);
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const image = card.getAttribute('data-lightbox-image');
        const title = card.getAttribute('data-lightbox-title');
        const description = card.getAttribute('data-lightbox-description');

        if (image) openLightbox(image, title, description);
      }
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxBackdrop?.addEventListener('click', closeLightbox);

  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  /* =========================================================
     AUTO SCROLL SLIDERS
  ========================================================= */
  function autoScrollSlider(track, speed = 0.35) {
    if (!track) return;

    let animationFrame = null;
    let paused = false;

    function maxScroll() {
      return track.scrollWidth - track.clientWidth;
    }

    function step() {
      if (!paused) {
        if (track.scrollLeft >= maxScroll()) {
          track.scrollLeft = 0;
        } else {
          track.scrollLeft += speed;
        }
      }
      animationFrame = requestAnimationFrame(step);
    }

    track.addEventListener('mouseenter', () => { paused = true; });
    track.addEventListener('mouseleave', () => { paused = false; });
    track.addEventListener('touchstart', () => { paused = true; }, { passive: true });
    track.addEventListener('touchend', () => { paused = false; }, { passive: true });

    animationFrame = requestAnimationFrame(step);

    window.addEventListener('beforeunload', () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    });
  }

  const partnersTrack = document.querySelector('#partnersSlider .partners-slider__track');
  const testimonialsTrack = document.querySelector('#testimonialsSlider .testimonials-slider__track');

  autoScrollSlider(partnersTrack, 0.35);
  autoScrollSlider(testimonialsTrack, 0.30);

  /* =========================================================
     ESC
  ========================================================= */
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      closeContactModal();
      closeLightbox();
    }
  });

  /* =========================================================
     SCROLL EVENTS
  ========================================================= */
  window.addEventListener('scroll', () => {
    setActiveLink();
    toggleScrollTopButton();
  });

  setActiveLink();
  toggleScrollTopButton();

  /* DEBUG OPCIONAL */
  console.log('ALUMNORT app.js carregado com sucesso');
});
