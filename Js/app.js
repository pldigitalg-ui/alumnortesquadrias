document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initMenu();
  initHeroSlider();
  initReveal();
  initCounters();
  initLightbox();
  initContactModal();
  initScrollTop();
  initTestimonialsSlider();
  initActiveNavLinks();
});

function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  const navbar = document.querySelector(".navbar");

  if (!header && !navbar) return;

  const onScroll = () => {
    const scrolled = window.scrollY > 20;
    header?.classList.toggle("is-scrolled", scrolled);
    navbar?.classList.toggle("is-scrolled", scrolled);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-menu");
  const backdrop = document.querySelector(".menu-backdrop");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!toggle || !menu) return;

  const openMenu = () => {
    toggle.classList.add("is-active");
    menu.classList.add("is-open");
    backdrop?.classList.add("is-visible");
    document.body.classList.add("menu-open");
    toggle.setAttribute("aria-expanded", "true");
  };

  const closeMenu = () => {
    toggle.classList.remove("is-active");
    menu.classList.remove("is-open");
    backdrop?.classList.remove("is-visible");
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  const toggleMenu = () => {
    if (menu.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  toggle.addEventListener("click", toggleMenu);
  backdrop?.addEventListener("click", closeMenu);

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 991) closeMenu();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 991) closeMenu();
  });
}

function initHeroSlider() {
  const hero = document.querySelector(".hero");
  const slides = document.querySelectorAll(".hero__slide");
  const dotsContainer = document.querySelector(".hero__dots");

  if (!hero || !slides.length) return;

  let current = 0;
  let intervalId = null;

  if (dotsContainer && !dotsContainer.children.length) {
    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = "hero__dot";
      dot.type = "button";
      dot.setAttribute("aria-label", `Ir para slide ${index + 1}`);
      dot.addEventListener("click", () => {
        goTo(index);
        restart();
      });
      dotsContainer.appendChild(dot);
    });
  }

  const dots = dotsContainer ? dotsContainer.querySelectorAll(".hero__dot") : [];

  const update = () => {
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === current);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === current);
    });
  };

  const goTo = (index) => {
    current = (index + slides.length) % slides.length;
    update();
  };

  const next = () => {
    goTo(current + 1);
  };

  const start = () => {
    intervalId = window.setInterval(next, 5000);
  };

  const stop = () => {
    if (intervalId) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
  };

  const restart = () => {
    stop();
    start();
  };

  update();
  start();

  hero.addEventListener("mouseenter", stop);
  hero.addEventListener("mouseleave", start);
  hero.addEventListener("touchstart", stop, { passive: true });
  hero.addEventListener("touchend", restart, { passive: true });
}

function initReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  elements.forEach((element) => observer.observe(element));
}

function initCounters() {
  const counters = document.querySelectorAll("[data-counter], .stats__number");
  if (!counters.length) return;

  const animateCounter = (element) => {
    if (element.dataset.counted === "true") return;
    element.dataset.counted = "true";

    const target = Number(
      element.dataset.counter ||
      element.dataset.target ||
      element.textContent.replace(/[^\d]/g, "")
    );

    if (!target || Number.isNaN(target)) return;

    const duration = 1800;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      element.textContent = current.toLocaleString("pt-BR");

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = target.toLocaleString("pt-BR");
      }
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function initLightbox() {
  const lightbox = document.querySelector(".lightbox");
  if (!lightbox) return;

  const lightboxImage = lightbox.querySelector(".lightbox__media img");
  const lightboxTitle = lightbox.querySelector(".lightbox__content h3");
  const lightboxText = lightbox.querySelector(".lightbox__content p");
  const closeButtons = lightbox.querySelectorAll("[data-lightbox-close]");
  const backdrop = lightbox.querySelector(".lightbox__backdrop");

  const triggers = document.querySelectorAll(
    "[data-lightbox], .project-card, .hero-avatar-card, .partner-card[data-image]"
  );

  const openLightbox = ({ image, title, text }) => {
    if (lightboxImage && image) lightboxImage.src = image;
    if (lightboxTitle) lightboxTitle.textContent = title || "Projeto";
    if (lightboxText) lightboxText.textContent = text || "";
    lightbox.classList.add("is-open");
    document.body.classList.add("lightbox-open");
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("lightbox-open");
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const img =
        trigger.dataset.image ||
        trigger.getAttribute("href") ||
        trigger.querySelector("img")?.getAttribute("src") ||
        "";

      const title =
        trigger.dataset.title ||
        trigger.querySelector("h3")?.textContent?.trim() ||
        trigger.getAttribute("aria-label") ||
        "Projeto";

      const text =
        trigger.dataset.description ||
        trigger.querySelector("p")?.textContent?.trim() ||
        "";

      if (!img) return;
      openLightbox({ image: img, title, text });
    });
  });

  closeButtons.forEach((button) => button.addEventListener("click", closeLightbox));
  backdrop?.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
}

function initContactModal() {
  const modal = document.querySelector(".contact-modal");
  if (!modal) return;

  const form = modal.querySelector(".contact-form");
  const backdrop = modal.querySelector(".contact-modal__overlay");
  const closeButtons = modal.querySelectorAll("[data-close-contact]");
  const openButtons = document.querySelectorAll("[data-open-contact]");
  const modalTitle = modal.querySelector(".contact-modal__header h2");
  const modalText = modal.querySelector(".contact-modal__header p");

  const defaultTitle = modalTitle?.textContent || "Pedir orçamento";
  const defaultText =
    modalText?.textContent ||
    "Preencha os campos abaixo para enviar sua solicitação pelo WhatsApp.";

  const openModal = (button = null) => {
    const customTitle = button?.dataset.modalTitle;
    const customText = button?.dataset.modalText;
    const selectedService = button?.dataset.service;

    if (modalTitle) modalTitle.textContent = customTitle || defaultTitle;
    if (modalText) modalText.textContent = customText || defaultText;

    const serviceField =
      form?.querySelector('[name="servico"]') ||
      form?.querySelector("#servico");

    if (serviceField && selectedService) {
      serviceField.value = selectedService;
    }

    modal.classList.add("is-open");
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      openModal(button);
    });
  });

  closeButtons.forEach((button) => button.addEventListener("click", closeModal));
  backdrop?.addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const nome = (data.get("nome") || "").toString().trim();
    const whatsapp = (data.get("whatsapp") || "").toString().trim();
    const servico = (data.get("servico") || "").toString().trim();
    const cidade = (data.get("cidade") || data.get("regiao") || "").toString().trim();
    const detalhes = (data.get("detalhes") || "").toString().trim();

    if (!nome || !whatsapp || !servico) {
      alert("Preencha pelo menos nome, WhatsApp e serviço.");
      return;
    }

    const phoneTarget =
      form.dataset.whatsapp ||
      document.querySelector(".whatsapp-float")?.dataset.phone ||
      "5538999999999";

    const normalizedPhone = phoneTarget.replace(/\D/g, "");

    const messageLines = [
      "Olá! Vim pelo site da Alumnorte e quero pedir um orçamento.",
      "",
      `*Nome:* ${nome}`,
      `*WhatsApp:* ${whatsapp}`,
      `*Serviço:* ${servico}`,
      `*Cidade/Região:* ${cidade || "Não informado"}`,
      `*Detalhes:* ${detalhes || "Não informado"}`,
    ];

    const message = encodeURIComponent(messageLines.join("\n"));
    const url = `https://wa.me/${normalizedPhone}?text=${message}`;

    window.open(url, "_blank");
    closeModal();
    form.reset();
  });
}

function initScrollTop() {
  const button = document.querySelector(".scroll-top");
  if (!button) return;

  const toggleVisibility = () => {
    button.classList.toggle("is-visible", window.scrollY > 400);
  };

  toggleVisibility();
  window.addEventListener("scroll", toggleVisibility, { passive: true });

  button.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initTestimonialsSlider() {
  const slider = document.querySelector(".testimonials-slider");
  const track = document.querySelector(".testimonials-slider__track");
  const cards = document.querySelectorAll(".testimonial-card");

  if (!slider || !track || cards.length <= 1) return;

  let index = 0;
  let intervalId = null;

  const getCardsPerView = () => {
    if (window.innerWidth <= 991) return 1;
    if (window.innerWidth <= 1200) return 2;
    return 3;
  };

  const update = () => {
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(cards.length - cardsPerView, 0);
    if (index > maxIndex) index = 0;

    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 22;
    const offset = index * (cardWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;
  };

  const next = () => {
    const cardsPerView = getCardsPerView();
    const maxIndex = Math.max(cards.length - cardsPerView, 0);
    index = index >= maxIndex ? 0 : index + 1;
    update();
  };

  const start = () => {
    intervalId = window.setInterval(next, 4200);
  };

  const stop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  update();
  start();

  slider.addEventListener("mouseenter", stop);
  slider.addEventListener("mouseleave", start);
  window.addEventListener("resize", update);
}

function initActiveNavLinks() {
  const links = [...document.querySelectorAll('.nav-link[href^="#"]')];
  if (!links.length) return;

  const sections = links
    .map((link) => {
      const id = link.getAttribute("href");
      const section = document.querySelector(id);
      if (!section) return null;
      return { link, section };
    })
    .filter(Boolean);

  if (!sections.length) return;

  const setActive = () => {
    const scrollPosition = window.scrollY + 140;
    let currentId = "";

    sections.forEach(({ section }) => {
      if (scrollPosition >= section.offsetTop) {
        currentId = `#${section.id}`;
      }
    });

    links.forEach((link) => {
      const isActive = link.getAttribute("href") === currentId;
      link.classList.toggle("active", isActive);
    });
  };

  setActive();
  window.addEventListener("scroll", setActive, { passive: true });
}
