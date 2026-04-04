document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => Array.from(p.querySelectorAll(s));

  /* =========================================================
     ELEMENTOS
  ========================================================= */
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
  const projectCards = $$('.project-card');

  /* =========================================================
     MENU MOBILE
  ========================================================= */
  function openMenu() {
    navMenu?.classList.add('active');
    menuBackdrop?.classList.add('active');
    body.classList.add('menu-open');
  }

  function closeMenu() {
    navMenu?.classList.remove('active');
    menuBackdrop?.classList.remove('active');
    body.classList.remove('menu-open');
  }

  menuToggle?.addEventListener('click', () => {
    navMenu.classList.contains('active') ? closeMenu() : openMenu();
  });

  menuBackdrop?.addEventListener('click', closeMenu);
  navLinks.forEach(link => link.addEventListener('click', closeMenu));

  /* =========================================================
     LINK ATIVO
  ========================================================= */
  function setActiveLink() {
    const scrollY = window.scrollY + 150;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);

      if (!link) return;

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }

  /* =========================================================
     BOTÃO TOPO
  ========================================================= */
  function toggleScrollTop() {
    if (!btnTopo) return;

    if (window.scrollY > 300) {
      btnTopo.classList.add('show');
    } else {
      btnTopo.classList.remove('show');
    }
  }

  btnTopo?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* =========================================================
     MODAL
  ========================================================= */
  function openModal(service = '') {
    contactModal?.classList.add('active');
    body.classList.add('modal-open');

    if (serviceField && service) {
      serviceField.value = service;
    }
  }

  function closeModal() {
    contactModal?.classList.remove('active');
    body.classList.remove('modal-open');
  }

  openContactButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      closeMenu();
      openModal(btn.dataset.service || '');
    });
  });

  closeContactButtons.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  contactModal?.addEventListener('click', e => {
    if (
      e.target === contactModal ||
      e.target.classList.contains('contact-modal__overlay')
    ) {
      closeModal();
    }
  });

  /* =========================================================
     WHATSAPP
  ========================================================= */
  contactForm?.addEventListener('submit', e => {
    e.preventDefault();

    const nome = $('#nome')?.value.trim();
    const whatsapp = $('#whatsapp')?.value.trim();
    const servico = $('#servico')?.value.trim();
    const cidade = $('#cidade')?.value.trim();
    const endereco = $('#endereco')?.value.trim();
    const detalhes = $('#detalhes')?.value.trim();

    if (!nome || !whatsapp || !servico || !cidade || !endereco) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const msg = encodeURIComponent(
      `Olá, vim pelo site.\n\nNome: ${nome}\nWhatsApp: ${whatsapp}\nServiço: ${servico}\nCidade: ${cidade}\nEndereço: ${endereco}\nDetalhes: ${detalhes || '-'}`
    );

    window.open(`https://wa.me/553899658215?text=${msg}`, '_blank');
    closeModal();
    contactForm.reset();
  });

  /* =========================================================
     LIGHTBOX
  ========================================================= */
  function openLightbox(img, title, desc) {
    lightboxImage.src = img;
    lightboxTitle.textContent = title;
    lightboxDescription.textContent = desc;

    lightbox.classList.add('active');
    body.classList.add('lightbox-open');
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    body.classList.remove('lightbox-open');
  }

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img')?.src;
      const title = card.querySelector('h3')?.textContent || '';
      const desc = card.querySelector('p')?.textContent || '';

      openLightbox(img, title, desc);
    });
  });

  $('[data-lightbox-close]')?.addEventListener('click', closeLightbox);

  lightbox?.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  /* =========================================================
     SLIDER PARCEIROS
  ========================================================= */
  function autoScroll(track, speed = 0.4) {
    let paused = false;

    track.addEventListener('mouseenter', () => paused = true);
    track.addEventListener('mouseleave', () => paused = false);

    function loop() {
      if (!paused) {
        track.scrollLeft += speed;
        if (track.scrollLeft >= track.scrollWidth - track.clientWidth) {
          track.scrollLeft = 0;
        }
      }
      requestAnimationFrame(loop);
    }

    loop();
  }

  const partnersTrack = document.querySelector('.partners-slider__track');
  if (partnersTrack) autoScroll(partnersTrack);

  const testimonialsTrack = document.querySelector('.testimonials-slider__track');
  if (testimonialsTrack) autoScroll(testimonialsTrack, 0.3);

  /* =========================================================
     ESC
  ========================================================= */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeMenu();
      closeModal();
      closeLightbox();
    }
  });

  /* =========================================================
     SCROLL
  ========================================================= */
  window.addEventListener('scroll', () => {
    setActiveLink();
    toggleScrollTop();
  });

  setActiveLink();
  toggleScrollTop();

  console.log('SITE FINAL OK');
});
