const body = document.body;
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const siteHeader = document.getElementById('siteHeader');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

/* MENU MOBILE */
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
  });

  document.querySelectorAll('.mobile-menu a, .mobile-menu button').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('show');
    });
  });
}

/* HEADER + LINK ATIVO */
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    siteHeader.classList.add('scrolled');
  } else {
    siteHeader.classList.remove('scrolled');
  }

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});

/* HERO SLIDER */
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');
let current = 0;
let slideInterval = null;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  current = index;
}

function nextSlide() {
  let next = current + 1;
  if (next >= slides.length) next = 0;
  showSlide(next);
}

function startSlider() {
  slideInterval = setInterval(nextSlide, 5000);
}

function stopSlider() {
  clearInterval(slideInterval);
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
    stopSlider();
    startSlider();
  });
});

if (slides.length && dots.length) {
  startSlider();
}

/* REVEAL */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => observer.observe(el));

/* LIGHTBOX */
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxBackdrop = document.getElementById('lightboxBackdrop');
const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');

function openLightbox(imageSrc, title) {
  if (!lightbox || !lightboxImage || !lightboxCaption) return;
  lightboxImage.src = imageSrc;
  lightboxCaption.textContent = title || '';
  lightbox.classList.add('show');
  body.classList.add('modal-open');
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove('show');
  lightboxImage.src = '';
  body.classList.remove('modal-open');
}

lightboxTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const imageSrc = trigger.getAttribute('data-image');
    const title = trigger.getAttribute('data-title');
    openLightbox(imageSrc, title);
  });
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

/* MODAL CONTATO */
const contactModal = document.getElementById('contactModal');
const contactModalClose = document.getElementById('contactModalClose');
const contactModalBackdrop = document.getElementById('contactModalBackdrop');
const openContactButtons = document.querySelectorAll('.open-contact-modal');
const contactForm = document.getElementById('contactForm');

function openContactModal() {
  if (!contactModal) return;
  contactModal.classList.add('show');
  body.classList.add('modal-open');
}

function closeContactModal() {
  if (!contactModal) return;
  contactModal.classList.remove('show');
  body.classList.remove('modal-open');
}

openContactButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    openContactModal();
  });
});

if (contactModalClose) contactModalClose.addEventListener('click', closeContactModal);
if (contactModalBackdrop) contactModalBackdrop.addEventListener('click', closeContactModal);

/* ESC */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeContactModal();
  }
});

/* FORM -> WHATSAPP */
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const servico = document.getElementById('servico').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    const texto =
`Olá, quero solicitar um orçamento na Alumnorte.

Nome: ${nome}
WhatsApp: ${telefone}
Serviço: ${servico}
Detalhes: ${mensagem || 'Não informado'}`;

    const url = `https://wa.me/5538999999999?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  });
}

/* CONTADORES */
const counters = document.querySelectorAll('.counter');
let countersStarted = false;

function animateCounter(counter) {
  const target = Number(counter.getAttribute('data-target'));
  let currentValue = 0;
  const increment = Math.max(1, Math.ceil(target / 60));

  const updateCounter = () => {
    currentValue += increment;

    if (currentValue >= target) {
      counter.textContent = target;
      return;
    }

    counter.textContent = currentValue;
    requestAnimationFrame(updateCounter);
  };

  updateCounter();
}

const metricsSection = document.querySelector('.metrics-band');

if (metricsSection) {
  const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        counters.forEach(counter => animateCounter(counter));
        countersStarted = true;
      }
    });
  }, { threshold: 0.35 });

  metricsObserver.observe(metricsSection);
}
