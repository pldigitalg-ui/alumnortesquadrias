document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  /* =========================================================
     MENU MOBILE
  ========================================================= */
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const menuBackdrop = document.getElementById('menuBackdrop');
  const navLinks = document.querySelectorAll('.nav-link');

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
    if (navMenu.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  menuToggle?.addEventListener('click', toggleMenu);
  menuBackdrop?.addEventListener('click', closeMenu);

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  /* =========================================================
     LINK ATIVO NO MENU
  ========================================================= */
  const sections = document.querySelectorAll('section[id]');

  function setActiveLink() {
    const scrollY = window.scrollY + 140;

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

  window.addEventListener('scroll', setActiveLink);
  setActiveLink();

  /* =========================================================
     BOTÃO VOLTAR AO TOPO
  ========================================================= */
  const btnTopo = document.getElementById('btnTopo');

  function toggleScrollTopButton() {
    if (!btnTopo) return;

    if (window.scrollY > 350) {
      btnTopo.classList.add('show');
    } else {
      btnTopo.classList.remove('show');
    }
  }

  window.addEventListener('scroll', toggleScrollTopButton);
  toggleScrollTopButton();

  btnTopo?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  /* =========================================================
     MODAL DE CONTATO
  ========================================================= */
  const contactModal = document.getElementById('contactModal');
  const contactForm = document.getElementById('contactForm');
  const openContactButtons = document.querySelectorAll('[data-open-contact]');
  const closeContactButtons = document.querySelectorAll('[data-close-contact]');
  const serviceField = document.getElementById('servico');

  function openContactModal(service = '') {
    if (!contactModal) return;

    contactModal.classList.add('active');
    contactModal.classList.add('is-active');
    contactModal.setAttribute('aria-hidden', 'false');
    body.classList.add('modal-open');

    if (service && serviceField) {
      serviceField.value = service;
    }

    const firstInput = contactModal.querySelector('input, select, textarea');
    setTimeout(() => {
      firstInput?.focus();
    }, 150);
  }

  function closeContactModal() {
    if (!contactModal) return;

    contactModal.classList.remove('active');
    contactModal.classList.remove('is-active');
    contactModal.setAttribute('aria-hidden', 'true');
    body.classList.remove('modal-open');
  }

  openContactButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedService = button.getAttribute('data-service') || '';
      closeMenu();
      openContactModal(selectedService);
    });
  });

  closeContactButtons.forEach((button) => {
    button.addEventListener('click', closeContactModal);
  });

  contactModal?.addEventListener('click', (event) => {
    if (event.target === contactModal) {
      closeContactModal();
    }
  });

  /* =========================================================
     ENVIO FORMULÁRIO PARA WHATSAPP
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

    const mensagem =
      `Olá! Vim pelo site da ALUMNORT.%0A%0A` +
      `*Solicitação de orçamento*%0A%0A` +
      `*Nome:* ${encodeURIComponent(nome)}%0A` +
      `*WhatsApp:* ${encodeURIComponent(whatsapp)}%0A` +
      `*Tipo de serviço:* ${encodeURIComponent(servico)}%0A` +
      `*Cidade / Região:* ${encodeURIComponent(cidade)}%0A` +
      `*Endereço:* ${encodeURIComponent(endereco)}%0A` +
      `*Detalhes:* ${encodeURIComponent(detalhes || 'Não informado')}`;

    const numero = '553899658215';
    const url = `https://wa.me/${numero}?text=${mensagem}`;

    window.open(url, '_blank', 'noopener,noreferrer');

    closeContactModal();
    contactForm.reset();
  });

  /* =========================================================
     LIGHTBOX
  ========================================================= */
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDescription = document.getElementById('lightboxDescription');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.querySelector('[data-lightbox-close]');
  const projectCards = document.querySelectorAll('.project-card');

  function openLightbox(image, title, description) {
    if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxDescription) return;

    lightboxImage.src = image;
    lightboxImage.alt = title || 'Projeto ALUMNORT';
    lightboxTitle.textContent = title || 'Projeto';
    lightboxDescription.textContent = description || 'Descrição do projeto.';

    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    body.classList.add('lightbox-open');
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImage) return;

    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    body.classList.remove('lightbox-open');

    setTimeout(() => {
      lightboxImage.src = '';
      lightboxImage.alt = '';
    }, 200);
  }

  projectCards.forEach((card) => {
    card.addEventListener('click', () => {
      const image = card.getAttribute('data-lightbox-image');
      const title = card.getAttribute('data-lightbox-title');
      const description = card.getAttribute('data-lightbox-description');

      if (!image) return;
      openLightbox(image, title, description);
    });

    card.addEventListener('keypress', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();

        const image = card.getAttribute('data-lightbox-image');
        const title = card.getAttribute('data-lightbox-title');
        const description = card.getAttribute('data-lightbox-description');

        if (!image) return;
        openLightbox(image, title, description);
      }
    });

    card.setAttribute('tabindex', '0');
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxBackdrop?.addEventListener('click', closeLightbox);

  /* =========================================================
     SLIDER HORIZONTAL AUTOMÁTICO - PARCEIROS
  ========================================================= */
  const partnersSlider = document.querySelector('#partnersSlider .partners-slider__track');

  function autoScrollSlider(track, speed = 1) {
    if (!track) return;

    let animationFrame;
    let paused = false;

    const maxScroll = () => track.scrollWidth - track.clientWidth;

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
      cancelAnimationFrame(animationFrame);
    });
  }

  autoScrollSlider(partnersSlider, 0.35);

  /* =========================================================
     SLIDER HORIZONTAL AUTOMÁTICO - DEPOIMENTOS
  ========================================================= */
  const testimonialsSlider = document.querySelector('#testimonialsSlider .testimonials-slider__track');
  autoScrollSlider(testimonialsSlider, 0.30);

  /* =========================================================
     FECHAR COM ESC
  ========================================================= */
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      closeContactModal();
      closeLightbox();
    }
  });
});
