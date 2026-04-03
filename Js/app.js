document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initHeroSlider();
  initReveal();
  initCounter();
  initLightbox();
  initContactModal();
  initScrollTop();
  initActiveNavOnScroll();
});

/* =========================================
   MENU MOBILE
========================================= */
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
    const isOpen = navMenu.classList.contains('active');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menuBackdrop.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 991) {
      closeMenu();
    }
  });
}

/* =========================================
   HERO SLIDER AUTOMÁTICO
========================================= */
function initHeroSlider() {
  const slider = document.getElementById('heroSlider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.hero__slide');
  if (!slides.length) return;

  let current = 0;
  let interval = null;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function startSlider() {
    if (slides.length <= 1) return;

    interval = setInterval(() => {
      current = (current + 1) % slides.length;
      showSlide(current);
    }, 5000);
  }

  function stopSlider() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  showSlide(current);
  startSlider();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopSlider();
    } else {
      stopSlider();
      startSlider();
    }
  });
}

/* =========================================
   REVEAL
========================================= */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(28px)';
    item.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
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

/* =========================================
   COUNTER
========================================= */
function initCounter() {
  const counters = document.querySelectorAll('.stats__number');
  if (!counters.length) return;

  function animateCounter(el) {
    const target = parseInt(el.dataset.target || '0', 10);
    const duration = 1600;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value.toLocaleString('pt-BR');

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString('pt-BR');
      }
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          animateCounter(entry.target);
        }
      });
    },
    {
      threshold: 0.5
    }
  );

  counters.forEach(counter => observer.observe(counter));
}

/* =========================================
   LIGHTBOX
========================================= */
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
    }, 180);
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const image = trigger.dataset.lightboxImage;
      const title = trigger.dataset.lightboxTitle || '';
      const description = trigger.dataset.lightboxDescription || '';
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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* =========================================
   MODAL DE CONTATO + WHATSAPP
========================================= */
function initContactModal() {
  const modal = document.getElementById('contactModal');
  const form = document.getElementById('contactForm');
  const serviceField = document.getElementById('servico');
  const closeBtn = document.getElementById('contactModalClose');

  if (!modal || !form) return;

  const openButtons = document.querySelectorAll('[data-open-contact]');
  const closeButtons = modal.querySelectorAll('[data-modal-close]');

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

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
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
    const mensagem = form.querySelector('#mensagem')?.value.trim() || '';

    const texto = `Olá, vim pelo site da ALUMNORT e gostaria de solicitar um orçamento.

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

/* =========================================
   VOLTAR AO TOPO
========================================= */
function initScrollTop() {
  const button = document.getElementById('scrollTopBtn');
  if (!button) return;

  function toggleButton() {
    if (window.scrollY > 280) {
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

/* =========================================
   LINK ATIVO NO MENU
========================================= */
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  function updateActiveLink() {
    const scrollY = window.scrollY + 140;
    let currentId = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      link.classList.remove('active');

      if (href === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();
}
