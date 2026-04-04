document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

  /* =========================================================
     ELEMENTOS BASE
  ========================================================= */
  const menuToggle = $('#menuToggle');
  const navMenu = $('#navMenu');
  const menuBackdrop = $('#menuBackdrop');
  const navLinks = $$('.nav-link');
  const sections = $$('section[id]');

  const btnTopo = $('#btnTopo');

  const contactModal = $('#contactModal');
  const contactForm = $('#contactForm');
  const openContactButtons = $$('[data-open-contact], .btn-orcamento, .btn-orcamento-inline, .btn-hero-primary');
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
     AJUSTES FORÇADOS VISUAIS VIA JS
     - para te salvar agora se o CSS estiver te atrapalhando
  ========================================================= */
  function forceVisualFixes() {
    const hero = $('.hero');
    const heroContainer = $('.hero .container, .hero__container, .hero-content');
    const heroMedia = $('.hero__media, .hero-media, .hero__image, .hero-image');
    const heroImage = $('.hero__media img, .hero-media img, .hero__image img, .hero-image img, .hero__avatar img, .hero img');
    const heroAvatar = $('.hero__avatar, .hero-avatar');
    const heroContent = $('.hero__content, .hero-content, .hero__text');
    const navCtaWrap = $('.navbar__cta, .nav-cta, .header-cta');
    const budgetButton = $('.navbar .btn-orcamento, .navbar .btn-primary, .nav-cta .btn-orcamento, .btn-orcamento');

    if (hero) {
      hero.style.minHeight = '100vh';
      hero.style.display = 'flex';
      hero.style.alignItems = 'center';
      hero.style.width = '100%';
      hero.style.overflow = 'hidden';
    }

    if (heroContainer) {
      heroContainer.style.width = '100%';
      heroContainer.style.maxWidth = '1320px';
      heroContainer.style.margin = '0 auto';
      heroContainer.style.display = 'grid';
      heroContainer.style.gridTemplateColumns = '1.05fr 0.95fr';
      heroContainer.style.alignItems = 'center';
      heroContainer.style.gap = '32px';
    }

    if (window.innerWidth <= 980 && heroContainer) {
      heroContainer.style.gridTemplateColumns = '1fr';
    }

    if (heroContent) {
      heroContent.style.maxWidth = '680px';
    }

    if (heroMedia) {
      heroMedia.style.width = '100%';
      heroMedia.style.display = 'flex';
      heroMedia.style.alignItems = 'center';
      heroMedia.style.justifyContent = 'center';
    }

    if (heroAvatar) {
      heroAvatar.style.width = '100%';
      heroAvatar.style.maxWidth = window.innerWidth <= 980 ? '420px' : '560px';
      heroAvatar.style.margin = '0 auto';
    }

    if (heroImage) {
      heroImage.style.width = '100%';
      heroImage.style.maxWidth = '100%';
      heroImage.style.height = 'auto';
      heroImage.style.display = 'block';
      heroImage.style.objectFit = 'cover';
      heroImage.style.borderRadius = '28px';
    }

    if (navCtaWrap) {
      navCtaWrap.style.display = 'flex';
      navCtaWrap.style.justifyContent = 'center';
      navCtaWrap.style.alignItems = 'center';
    }

    if (budgetButton) {
      budgetButton.style.display = 'inline-flex';
      budgetButton.style.justifyContent = 'center';
      budgetButton.style.alignItems = 'center';
      budgetButton.style.margin = '0 auto';
      budgetButton.style.textAlign = 'center';
    }

    const partnerCards = $$('.partner-card, .partners-card, .partner-item, .partners-slider__item');
    partnerCards.forEach((card) => {
      card.style.cursor = 'pointer';
    });

    if (btnTopo) {
      btnTopo.style.position = 'fixed';
      btnTopo.style.right = '20px';
      btnTopo.style.bottom = '20px';
      btnTopo.style.zIndex = '9999';
      btnTopo.style.opacity = '0';
      btnTopo.style.visibility = 'hidden';
      btnTopo.style.pointerEvents = 'none';
      btnTopo.style.transform = 'translateY(12px)';
      btnTopo.style.transition = 'all 0.3s ease';
    }
  }

  forceVisualFixes();
  window.addEventListener('resize', forceVisualFixes);

  /* =========================================================
     MENU MOBILE
  ========================================================= */
  function openMenu() {
    if (!navMenu) return;
    navMenu.classList.add('active', 'is-active');
    menuBackdrop?.classList.add('active', 'is-active');
    body.classList.add('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    if (!navMenu) return;
    navMenu.classList.remove('active', 'is-active');
    menuBackdrop?.classList.remove('active', 'is-active');
    body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    if (!navMenu) return;
    if (navMenu.classList.contains('active') || navMenu.classList.contains('is-active')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  menuToggle?.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();
  });

  menuBackdrop?.addEventListener('click', closeMenu);

  navLinks.forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });

  /* =========================================================
     LINK ATIVO
  ========================================================= */
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

  /* =========================================================
     BOTÃO TOPO
  ========================================================= */
  function toggleScrollTopButton() {
    if (!btnTopo) return;

    if (window.scrollY > 240) {
      btnTopo.classList.add('show');
      btnTopo.style.opacity = '1';
      btnTopo.style.visibility = 'visible';
      btnTopo.style.pointerEvents = 'auto';
      btnTopo.style.transform = 'translateY(0)';
    } else {
      btnTopo.classList.remove('show');
      btnTopo.style.opacity = '0';
      btnTopo.style.visibility = 'hidden';
      btnTopo.style.pointerEvents = 'none';
      btnTopo.style.transform = 'translateY(12px)';
    }
  }

  btnTopo?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* =========================================================
     MODAL DE CONTATO
  ========================================================= */
  function openContactModal(service = '') {
    if (!contactModal) return;

    contactModal.classList.add('active', 'is-active', 'show');
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

    contactModal.classList.remove('active', 'is-active', 'show');
    contactModal.setAttribute('aria-hidden', 'true');
    body.classList.remove('modal-open');
  }

  openContactButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const selectedService =
        button.getAttribute('data-service') ||
        button.getAttribute('data-servico') ||
        button.dataset.service ||
        '';
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

  /* =========================================================
     ENVIO PARA WHATSAPP
  ========================================================= */
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
      `Solicitação de orçamento:\n\n` +
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

    if (lightboxTitle) lightboxTitle.textContent = title || 'Projeto';
    if (lightboxDescription) {
      lightboxDescription.textContent = description || 'Projeto executado pela ALUMNORT.';
    }

    lightbox.classList.add('active', 'is-active', 'show');
    lightbox.setAttribute('aria-hidden', 'false');
    body.classList.add('lightbox-open');
  }

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove('active', 'is-active', 'show');
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
        $('.project-card__title, h3, h4', card)?.textContent?.trim() ||
        'Projeto ALUMNORT';

      const description =
        card.getAttribute('data-lightbox-description') ||
        $('.project-card__text, p', card)?.textContent?.trim() ||
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
      event.target.classList.contains('lightbox__overlay') ||
      event.target.hasAttribute('data-lightbox-close')
    ) {
      closeLightbox();
    }
  });

  /* =========================================================
     HERO SLIDER
     usa:
     img/hero.png
     img/hero-2.jpg
     img/hero-3.jpg
     img/hero-4.jpg
     img/hero-5.jpg
  ========================================================= */
  function initHeroSlider() {
    const heroSection = $('.hero, .hero-slider');
    if (!heroSection) return;

    let heroBackgroundLayer = $('.hero-dynamic-bg');
    if (!heroBackgroundLayer) {
      heroBackgroundLayer = document.createElement('div');
      heroBackgroundLayer.className = 'hero-dynamic-bg';
      heroBackgroundLayer.style.position = 'absolute';
      heroBackgroundLayer.style.inset = '0';
      heroBackgroundLayer.style.backgroundSize = 'cover';
      heroBackgroundLayer.style.backgroundPosition = 'center';
      heroBackgroundLayer.style.backgroundRepeat = 'no-repeat';
      heroBackgroundLayer.style.transition = 'opacity 0.8s ease, background-image 0.8s ease';
      heroBackgroundLayer.style.zIndex = '0';
      heroBackgroundLayer.style.opacity = '1';

      heroSection.style.position = 'relative';
      heroSection.style.overflow = 'hidden';
      heroSection.prepend(heroBackgroundLayer);
    }

    let heroOverlay = $('.hero-dynamic-overlay');
    if (!heroOverlay) {
      heroOverlay = document.createElement('div');
      heroOverlay.className = 'hero-dynamic-overlay';
      heroOverlay.style.position = 'absolute';
      heroOverlay.style.inset = '0';
      heroOverlay.style.background = 'linear-gradient(90deg, rgba(4,16,34,0.84) 0%, rgba(4,16,34,0.62) 45%, rgba(4,16,34,0.38) 100%)';
      heroOverlay.style.zIndex = '1';
      heroSection.prepend(heroOverlay);
    }

    const heroInner = $('.hero .container, .hero__container, .hero-content');
    if (heroInner) {
      heroInner.style.position = 'relative';
      heroInner.style.zIndex = '2';
    }

    const images = [
      'img/hero.png',
      'img/hero-2.jpg',
      'img/hero-3.jpg',
      'img/hero-4.jpg',
      'img/hero-5.jpg'
    ];

    let current = 0;

    function renderHero() {
      heroBackgroundLayer.style.backgroundImage = `url('${images[current]}')`;
    }

    renderHero();

    setInterval(() => {
      current = (current + 1) % images.length;
      renderHero();
    }, 4500);
  }

  initHeroSlider();

  /* =========================================================
     SLIDER PARCEIROS + CLICK INSTAGRAM
  ========================================================= */
  function initPartnersSlider() {
    const track =
      document.querySelector('#partnersSlider .partners-slider__track') ||
      document.querySelector('.partners-slider__track');

    if (!track) return;

    const instagramDefault = 'https://www.instagram.com/alumnortesquadrias_de_aluminio/';

    const partnerItems = $$('.partner-card, .partners-card, .partner-item, .partners-slider__item', track);

    partnerItems.forEach((item) => {
      if (!item.hasAttribute('tabindex')) item.setAttribute('tabindex', '0');

      const clickOpen = () => {
        const href =
          item.getAttribute('data-link') ||
          item.getAttribute('data-instagram') ||
          $('a', item)?.getAttribute('href') ||
          instagramDefault;

        window.open(href, '_blank', 'noopener,noreferrer');
      };

      item.addEventListener('click', clickOpen);
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          clickOpen();
        }
      });
    });

    let paused = false;
    let raf = null;

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
            track.scrollLeft += 0.45;
          }
        }
      }
      raf = requestAnimationFrame(step);
    }

    ['mouseenter', 'touchstart'].forEach((evt) => {
      track.addEventListener(evt, () => { paused = true; }, { passive: true });
    });

    ['mouseleave', 'touchend'].forEach((evt) => {
      track.addEventListener(evt, () => { paused = false; }, { passive: true });
    });

    raf = requestAnimationFrame(step);

    window.addEventListener('beforeunload', () => {
      if (raf) cancelAnimationFrame(raf);
    });
  }

  initPartnersSlider();

  /* =========================================================
     SLIDER DEPOIMENTOS
  ========================================================= */
  function initTestimonialsSlider() {
    const track =
      document.querySelector('#testimonialsSlider .testimonials-slider__track') ||
      document.querySelector('.testimonials-slider__track');

    if (!track) return;

    let paused = false;
    let raf = null;

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
            track.scrollLeft += 0.32;
          }
        }
      }
      raf = requestAnimationFrame(step);
    }

    ['mouseenter', 'touchstart'].forEach((evt) => {
      track.addEventListener(evt, () => { paused = true; }, { passive: true });
    });

    ['mouseleave', 'touchend'].forEach((evt) => {
      track.addEventListener(evt, () => { paused = false; }, { passive: true });
    });

    raf = requestAnimationFrame(step);

    window.addEventListener('beforeunload', () => {
      if (raf) cancelAnimationFrame(raf);
    });
  }

  initTestimonialsSlider();

  /* =========================================================
     IMAGENS DOS PROJETOS
     preenche automaticamente se faltar no HTML
  ========================================================= */
  function applyProjectImagesIfMissing() {
    const projectImages = [
      'img/projetos/corredor-esquadrias-aluminio-preto.jpg',
      'img/projetos/escada-guarda-corpo-vidro-aluminio.jpg',
      'img/projetos/porta-madeira-pivotante-esquadria-vidro.jpg',
      'img/projetos/porta-vidro-aluminio-sala-moderna.jpg',
      'img/projetos/portao-aluminio-preto-area-externa.jpg',
      'img/projetos/portao-garagem-aluminio-branco.jpg'
    ];

    const cards = $$('.project-card');
    cards.forEach((card, index) => {
      const img = $('img', card);
      const fallback = projectImages[index % projectImages.length];

      if (img && !img.getAttribute('src')) {
        img.setAttribute('src', fallback);
      }

      if (!card.getAttribute('data-lightbox-image')) {
        card.setAttribute('data-lightbox-image', img?.getAttribute('src') || fallback);
      }
    });
  }

  applyProjectImagesIfMissing();

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
     SCROLL
  ========================================================= */
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
    forceVisualFixes();
  });

  setActiveLink();
  toggleScrollTopButton();
  forceVisualFixes();

  console.log('ALUMNORT app.js final carregado com sucesso');
});
