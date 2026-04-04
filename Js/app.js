document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initHeroSlider();
  initReveal();
  initCounter();
  initLightbox();
  initContactModal();
  initScrollTop();
  initHorizontalAutoSliders();
  initActiveNavOnScroll();
});

/* =========================
   MENU MOBILE
========================= */
function initMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const menuBackdrop = document.getElementById('menuBackdrop');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuToggle || !navMenu || !menuBackdrop) return;

  function openMenu() {
    navMenu.classList.add('active');
    menuBackdrop.classList.add('active');
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    navMenu.classList.remove('active');
    menuBackdrop.classList.remove('active');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  menuToggle.addEventListener('click', () => {
    navMenu.classList.contains('active') ? closeMenu() : openMenu();
  });

  menuBackdrop.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 991) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });
}

/* =========================
   HERO SLIDER AUTOMÁTICO
========================= */
function initHeroSlider() {
  const slider = document.getElementById('heroSlider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.hero__slide');
  if (!slides.length) return;

  let current = 0;
  let intervalId = null;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  function startAuto() {
    if (slides.length <= 1) return;
    stopAuto();
    intervalId = setInterval(nextSlide, 5000);
  }

  function stopAuto() {
    if (intervalId) clearInterval(intervalId);
  }

  showSlide(current);
  startAuto();

  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);
}

/* =========================
   REVEAL ON SCROLL
========================= */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(24px)';
    item.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
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

  function animateCounter(el) {
    const target = Number(el.dataset.target || 0);
    const duration = 1600;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          animateCounter(entry.target);
        }
      });
    },
    { threshold: 0.45 }
  );

  counters.forEach(counter => observer.observe(counter));
}

/* =========================
   LIGHTBOX
========================= */
function initLightbox() {
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
    document.body.classList.add('lightbox-open');
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');

    setTimeout(() => {
      lightboxImage.src = '';
      lightboxImage.alt = '';
    }, 200);
  }

  triggers.forEach(trigger => {
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

  closeTriggers.forEach(btn => btn.addEventListener('click', closeLightbox));

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* =========================
   MODAL DE CONTATO + WHATSAPP
========================= */
function initContactModal() {
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
    document.body.classList.add('modal-open');

    if (service && serviceField) {
      serviceField.value = service;
    }
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  openButtons.forEach(button => {
    button.addEventListener('click', () => {
      const service = button.dataset.service || '';
      openModal(service);
    });
  });

  closeButtons.forEach(button => {
    button.addEventListener('click', closeModal);
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = form.querySelector('#nome')?.value.trim() || '';
    const telefone = form.querySelector('#telefone')?.value.trim() || '';
    const email = form.querySelector('#email')?.value.trim() || '';
    const servico = form.querySelector('#servico')?.value.trim() || '';
    const cidade = form.querySelector('#cidade')?.value.trim() || '';
    const bairro = form.querySelector('#bairro')?.value.trim() || '';
    const endereco = form.querySelector('#endereco')?.value.trim() || '';
    const mensagem = form.querySelector('#mensagem')?.value.trim() || '';

    if (!nome || !telefone || !servico) {
      alert('Preencha pelo menos nome, telefone e tipo de serviço.');
      return;
    }

    const texto = `Olá, vim pelo site da ALUMNORT e gostaria de solicitar um orçamento.

*RELATÓRIO DO CLIENTE*
*Nome:* ${nome}
*Telefone:* ${telefone}
*E-mail:* ${email || 'Não informado'}
*Serviço:* ${servico}
*Cidade:* ${cidade || 'Não informado'}
*Bairro/Região:* ${bairro || 'Não informado'}
*Endereço:* ${endereco || 'Não informado'}

*Detalhes do pedido:*
${mensagem || 'Não informado'}`;

    const url = `https://wa.me/553899658215?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    form.reset();
    closeModal();
  });
}

/* =========================
   BOTÃO VOLTAR AO TOPO
========================= */
function initScrollTop() {
  const button = document.getElementById('scrollTopBtn');
  if (!button) return;

  function toggleButton() {
    if (window.scrollY > 300) {
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
  const sliderSelectors = [
    '#partnersSlider .partners-slider__track',
    '#testimonialsSlider .testimonials-slider__track'
  ];

  sliderSelectors.forEach(selector => {
    const track = document.querySelector(selector);
    if (!track) return;

    let autoScroll;
    let isPaused = false;

    function getCardWidth() {
      const firstCard = track.children[0];
      if (!firstCard) return 320;
      const styles = window.getComputedStyle(track);
      const gap = parseInt(styles.columnGap || styles.gap || 22, 10);
      return firstCard.offsetWidth + gap;
    }

    function startAutoScroll() {
      stopAutoScroll();

      autoScroll = setInterval(() => {
        if (isPaused) return;

        const maxScrollLeft = track.scrollWidth - track.clientWidth;
        const next = track.scrollLeft + getCardWidth();

        if (next >= maxScrollLeft - 10) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollTo({ left: next, behavior: 'smooth' });
        }
      }, 3500);
    }

    function stopAutoScroll() {
      if (autoScroll) clearInterval(autoScroll);
    }

    track.addEventListener('mouseenter', () => { isPaused = true; });
    track.addEventListener('mouseleave', () => { isPaused = false; });
    track.addEventListener('touchstart', () => { isPaused = true; }, { passive: true });
    track.addEventListener('touchend', () => { isPaused = false; }, { passive: true });

    startAutoScroll();
  });
}

/* =========================
   MENU ATIVO CONFORME SCROLL
========================= */
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  function setActiveLink() {
    let currentId = '';

    sections.forEach(section => {
      const top = section.offsetTop - 180;
      const height = section.offsetHeight;

      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      link.classList.toggle('active', href === `#${currentId}`);
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();
}
