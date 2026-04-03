document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initHeroSlider();
  initReveal();
  initCounter();
  initLightbox();
  initContactModal();
  initScrollTop();
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
    navMenu.classList.add('is-open');
    menuBackdrop.classList.add('is-active');
    menuToggle.classList.add('is-active');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    navMenu.classList.remove('is-open');
    menuBackdrop.classList.remove('is-active');
    menuToggle.classList.remove('is-active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  menuToggle.addEventListener('click', () => {
    if (navMenu.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menuBackdrop.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 991) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
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

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  showSlide(current);

  if (slides.length > 1) {
    setInterval(() => {
      current = (current + 1) % slides.length;
      showSlide(current);
    }, 5000);
  }
}

/* =========================
   REVEAL ON SCROLL
========================= */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  items.forEach(item => observer.observe(item));
}

/* =========================
   COUNTER
========================= */
function initCounter() {
  const counters = document.querySelectorAll('.stats__number');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = Number(el.dataset.target || 0);
    const duration = 1600;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          animateCounter(entry.target);
        }
      });
    },
    { threshold: 0.5 }
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
    lightbox.classList.add('is-active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
  }

  function closeLightbox() {
    lightbox.classList.remove('is-active');
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
      const title = trigger.dataset.lightboxTitle;
      const description = trigger.dataset.lightboxDescription;
      const alt =
        trigger.querySelector('img')?.alt ||
        trigger.dataset.lightboxTitle ||
        'Imagem ampliada';

      if (!image) return;

      openLightbox({ image, title, description, alt });
    });
  });

  closeTriggers.forEach(btn => {
    btn.addEventListener('click', closeLightbox);
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-active')) {
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

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
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
    const mensagem = form.querySelector('#mensagem')?.value.trim() || '';

    const texto =
`Olá, vim pelo site da ALUMNORT e gostaria de solicitar um orçamento.

*RELATÓRIO DO CLIENTE*
*Nome:* ${nome}
*Telefone:* ${telefone}
*E-mail:* ${email || 'Não informado'}
*Serviço:* ${servico || 'Não informado'}
*Cidade:* ${cidade || 'Não informado'}
*Bairro/Região:* ${bairro || 'Não informado'}

*Detalhes do pedido:*
${mensagem || 'Não informado'}`;

    const url = `https://wa.me/553899658215?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');

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

  window.addEventListener('scroll', toggleButton);
  toggleButton();

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
