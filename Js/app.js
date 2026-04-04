document.addEventListener('DOMContentLoaded', () => {
  // 1. MENU - sem active fixo + mobile
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const menuBackdrop = document.getElementById('menuBackdrop');

  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuBackdrop.style.display = isOpen ? 'block' : 'none';
  };
  menuToggle.addEventListener('click', toggleMenu);
  menuBackdrop.addEventListener('click', toggleMenu);

  // Fecha menu ao clicar em link (mobile)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 1025) toggleMenu();
    });
  });

  // 2. MENU ACTIVE (apenas ao clicar)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function () {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // 3. BOTÃO VOLTAR AO TOPO
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    scrollTopBtn.style.opacity = window.scrollY > 400 ? '1' : '0';
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 4. LIGHTBOX UNIVERSAL
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDescription = document.getElementById('lightboxDescription');
  const closeLightbox = () => {
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true');
  };
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox__backdrop').addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  document.querySelectorAll('[data-lightbox-image]').forEach(el => {
    el.addEventListener('click', () => {
      lightboxImage.src = el.getAttribute('data-lightbox-image');
      lightboxTitle.textContent = el.getAttribute('data-lightbox-title');
      lightboxDescription.textContent = el.getAttribute('data-lightbox-description');
      lightbox.style.display = 'flex';
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });

  // 5. MODAL ORÇAMENTO
  const contactModal = document.getElementById('contactModal');
  const contactForm = document.getElementById('contactForm');
  const openModal = (service = '') => {
    if (service) document.getElementById('servico').value = service;
    contactModal.style.display = 'flex';
    contactModal.setAttribute('aria-hidden', 'false');
  };
  const closeModal = () => {
    contactModal.style.display = 'none';
    contactModal.setAttribute('aria-hidden', 'true');
    contactForm.reset();
  };

  document.querySelectorAll('[data-open-contact]').forEach(btn => {
    btn.addEventListener('click', () => {
      const service = btn.dataset.service || '';
      openModal(service);
    });
  });
  document.getElementById('contactModalClose').addEventListener('click', closeModal);
  contactModal.querySelector('.contact-modal__overlay').addEventListener('click', closeModal);

  // Form → WhatsApp
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(contactForm);
    let msg = `Olá! Vim pelo site da ALUMNORT e gostaria de solicitar um orçamento.\n\n`;
    msg += `Nome: ${fd.get('nome')}\n`;
    msg += `Telefone: ${fd.get('telefone')}\n`;
    if (fd.get('email')) msg += `E-mail: ${fd.get('email')}\n`;
    msg += `Serviço: ${fd.get('servico')}\n`;
    if (fd.get('cidade')) msg += `Cidade: ${fd.get('cidade')}\n`;
    if (fd.get('bairro')) msg += `Bairro: ${fd.get('bairro')}\n`;
    if (fd.get('endereco')) msg += `Endereço: ${fd.get('endereco')}\n`;
    msg += `Mensagem: ${fd.get('mensagem')}\n\nObrigado!`;

    window.open(`https://wa.me/553899658215?text=${encodeURIComponent(msg)}`, '_blank');
    closeModal();
  });

  // 6. HERO SLIDER
  let slideIndex = 0;
  const slides = document.querySelectorAll('.hero__slide');
  const dots = document.querySelectorAll('.hero__dot');
  const showSlide = (i) => {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[i].classList.add('active');
    dots[i].classList.add('active');
    slideIndex = i;
  };
  dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
  setInterval(() => {
    showSlide((slideIndex + 1) % slides.length);
  }, 5000);

  // 7. STATS COUNTER
  const animateStats = () => {
    document.querySelectorAll('.stats__number').forEach(num => {
      const target = +num.getAttribute('data-target');
      let count = 0;
      const inc = Math.max(target / 60, 1);
      const timer = setInterval(() => {
        count += inc;
        if (count >= target) { count = target; clearInterval(timer); }
        num.textContent = Math.floor(count);
      }, 25);
    });
  };
  new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { animateStats(); }
  }, { threshold: 0.6 }).observe(document.querySelector('.stats'));

  // 8. REVEAL (performance leve)
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 }).observe(document.querySelectorAll('.reveal')[0]);

  console.log('%c✅ ALUMNORT site refatorado - Performance, Acessibilidade e SEO otimizados!', 'color:#102844;font-weight:bold');
});
