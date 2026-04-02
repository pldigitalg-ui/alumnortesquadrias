(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const CONFIG = {
    whatsapp: "553899658215",
    companyName: "Alumnorte",
    heroInterval: 6000,
    projectInterval: 5200,
    headerScrolledAt: 70,
    backToTopAt: 420
  };

  const HERO_SLIDES = [
    {
      img: "img/hero-1.jpg",
      title: "Alumínio e vidro com presença arquitetônica, acabamento preciso e padrão institucional.",
      desc: "Desenvolvemos portas, janelas, portões, fachadas e projetos sob medida para residências e empresas que buscam elegância visual, durabilidade e execução profissional."
    },
    {
      img: "img/hero-2.jpg",
      title: "Esquadrias sob medida para valorizar o seu projeto com mais sofisticação.",
      desc: "Soluções em alumínio e vidro com leitura técnica, linhas modernas e excelente apresentação final para ambientes residenciais e comerciais."
    },
    {
      img: "img/hero-3.jpg",
      title: "Fachadas, portas e estruturas com identidade visual forte.",
      desc: "Projetos desenvolvidos para unir funcionalidade, presença arquitetônica e acabamento premium em cada detalhe."
    },
    {
      img: "img/hero-4.jpg",
      title: "Vidraçaria moderna para ambientes que exigem elegância e desempenho.",
      desc: "Aplicações que combinam segurança, estética, luminosidade e adaptação precisa ao espaço."
    },
    {
      img: "img/hero-5.jpg",
      title: "Projetos que transformam ambientes com acabamento profissional.",
      desc: "Cada entrega da Alumnorte busca unir confiança, durabilidade e uma percepção visual mais nobre."
    }
  ];

  const PROJECTS = [
    {
      img: "img/projetos/corredor-esquadrias-alumínio-preto.jpg",
      title: "Corredor com esquadrias em alumínio preto",
      desc: "Linhas modernas, acabamento limpo e excelente aproveitamento estético do ambiente."
    },
    {
      img: "img/projetos/escada-guarda-corpo-vidro-alumínio.jpg",
      title: "Escada com guarda-corpo em vidro e alumínio",
      desc: "Segurança, transparência e composição arquitetônica elegante para ambientes valorizados."
    },
    {
      img: "img/projetos/porta-madeira-pivotante-esquadria-vidro.jpg",
      title: "Porta pivotante com esquadria e vidro",
      desc: "Entrada marcante com alto padrão visual e presença contemporânea."
    },
    {
      img: "img/projetos/porta-vidro-alumínio-sala-moderna.jpg",
      title: "Porta de vidro e alumínio para sala moderna",
      desc: "Mais luminosidade, leveza visual e integração refinada entre ambientes."
    },
    {
      img: "img/projetos/portao-alumínio-preto-area-externa.jpg",
      title: "Portão em alumínio preto para área externa",
      desc: "Estética imponente, durabilidade e composição elegante para acessos residenciais e comerciais."
    },
    {
      img: "img/projetos/portao-garagem-alumínio-branco.jpg",
      title: "Portão de garagem em alumínio branco",
      desc: "Visual limpo, acabamento refinado e solução sob medida para valorizar a fachada."
    }
  ];

  const state = {
    heroIndex: 0,
    heroTimer: null,
    projectIndex: 0,
    projectTimer: null,
    touchStartX: 0,
    touchEndX: 0
  };

  const refs = {
    body: document.body,
    year: $("#year"),
    topbar: $("#topbar"),
    menuToggle: $("#menuToggle"),
    mobileMenu: $("#mobileMenu"),
    navLinks: $$(".navMenu a, .mobileMenu a"),
    heroSlider: $("#heroSlider"),
    heroTrack: $("#heroTrack"),
    heroDots: $("#heroDots"),
    heroTitle: $("#heroTitle"),
    heroDesc: $("#heroDesc"),
    projectSlider: $("#projectSlider"),
    projectTrack: $("#projectTrack"),
    projectIndicators: $("#projectIndicators"),
    backToTop: $("#backToTop"),
    floatWhats: $("#floatWhats"),

    budgetModal: $("#budgetModal"),
    openBudgetButtons: [
      $("#openBudgetModalTop"),
      $("#openBudgetModalHero"),
      $("#openBudgetModal"),
      $("#openBudgetModalInline")
    ].filter(Boolean),
    closeBudgetModal: $("#closeBudgetModal"),
    modalWhatsapp: $("#modalWhatsapp"),

    imagePreviewOverlay: $("#imagePreviewOverlay"),
    imagePreviewImg: $("#imagePreviewImg"),
    imagePreviewClose: $("#imagePreviewClose")
  };

  const sections = [
    "inicio",
    "quem-somos",
    "servicos",
    "projetos",
    "parceiros",
    "curiosidades",
    "depoimentos",
    "contato"
  ]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function setYear() {
    if (refs.year) refs.year.textContent = String(new Date().getFullYear());
  }

  function preloadImage(src) {
    if (!src) return;
    const img = new Image();
    img.src = src;
  }

  function lockBody() {
    refs.body.style.overflow = "hidden";
  }

  function unlockBody() {
    const modalOpen = refs.budgetModal?.classList.contains("show");
    const previewOpen = refs.imagePreviewOverlay?.classList.contains("show");
    if (!modalOpen && !previewOpen) {
      refs.body.style.overflow = "";
    }
  }

  function updateHeader() {
    if (!refs.topbar) return;
    refs.topbar.classList.toggle("scrolled", window.scrollY > CONFIG.headerScrolledAt);
  }

  function updateBackToTop() {
    if (!refs.backToTop) return;
    refs.backToTop.classList.toggle("show", window.scrollY > CONFIG.backToTopAt);
  }

  function updateActiveMenu() {
    if (!refs.navLinks.length || !sections.length) return;

    let currentId = sections[0]?.id || "inicio";
    const currentY = window.scrollY + 180;

    sections.forEach((section) => {
      if (currentY >= section.offsetTop) {
        currentId = section.id;
      }
    });

    refs.navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === `#${currentId}`);
    });
  }

  function setupMobileMenu() {
    if (!refs.menuToggle || !refs.mobileMenu) return;

    refs.menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const opened = refs.mobileMenu.classList.toggle("show");
      refs.menuToggle.setAttribute("aria-expanded", opened ? "true" : "false");
    });

    $$("a", refs.mobileMenu).forEach((link) => {
      link.addEventListener("click", () => {
        refs.mobileMenu.classList.remove("show");
        refs.menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (event) => {
      if (
        !refs.mobileMenu.contains(event.target) &&
        !refs.menuToggle.contains(event.target)
      ) {
        refs.mobileMenu.classList.remove("show");
        refs.menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function renderHero() {
    if (!refs.heroTrack || !refs.heroDots || !HERO_SLIDES.length) return;

    refs.heroTrack.innerHTML = HERO_SLIDES.map((slide, index) => `
      <div class="heroSlide ${index === 0 ? "active" : ""}" aria-hidden="${index === 0 ? "false" : "true"}">
        <img
          src="${slide.img}"
          alt="${slide.title}"
          ${index === 0 ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"'}
        />
      </div>
    `).join("");

    refs.heroDots.innerHTML = HERO_SLIDES.map((_, index) => `
      <button
        class="heroDot ${index === 0 ? "active" : ""}"
        data-index="${index}"
        type="button"
        aria-label="Ir para slide ${index + 1}"
        aria-pressed="${index === 0 ? "true" : "false"}"
      ></button>
    `).join("");

    refs.heroDots.addEventListener("click", (event) => {
      const dot = event.target.closest(".heroDot");
      if (!dot) return;
      state.heroIndex = Number(dot.dataset.index);
      updateHero();
      restartHeroTimer();
    });

    preloadImage(HERO_SLIDES[1]?.img);
    updateHero();
  }

  function updateHero() {
    const slides = $$(".heroSlide", refs.heroTrack);
    const dots = $$(".heroDot", refs.heroDots);
    const current = HERO_SLIDES[state.heroIndex];

    slides.forEach((slide, index) => {
      const active = index === state.heroIndex;
      slide.classList.toggle("active", active);
      slide.setAttribute("aria-hidden", active ? "false" : "true");
    });

    dots.forEach((dot, index) => {
      const active = index === state.heroIndex;
      dot.classList.toggle("active", active);
      dot.setAttribute("aria-pressed", active ? "true" : "false");
    });

    if (refs.heroTitle && current?.title) refs.heroTitle.textContent = current.title;
    if (refs.heroDesc && current?.desc) refs.heroDesc.textContent = current.desc;

    preloadImage(HERO_SLIDES[(state.heroIndex + 1) % HERO_SLIDES.length]?.img);
  }

  function nextHero() {
    state.heroIndex = (state.heroIndex + 1) % HERO_SLIDES.length;
    updateHero();
  }

  function prevHero() {
    state.heroIndex = (state.heroIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
    updateHero();
  }

  function startHeroTimer() {
    stopHeroTimer();
    if (HERO_SLIDES.length <= 1) return;
    state.heroTimer = window.setInterval(nextHero, CONFIG.heroInterval);
  }

  function stopHeroTimer() {
    if (state.heroTimer) {
      clearInterval(state.heroTimer);
      state.heroTimer = null;
    }
  }

  function restartHeroTimer() {
    stopHeroTimer();
    startHeroTimer();
  }

  function setupHeroTouch() {
    if (!refs.heroSlider) return;

    refs.heroSlider.addEventListener("mouseenter", stopHeroTimer);
    refs.heroSlider.addEventListener("mouseleave", startHeroTimer);

    refs.heroSlider.addEventListener("touchstart", (event) => {
      state.touchStartX = event.changedTouches[0].clientX;
      state.touchEndX = state.touchStartX;
      stopHeroTimer();
    }, { passive: true });

    refs.heroSlider.addEventListener("touchmove", (event) => {
      state.touchEndX = event.changedTouches[0].clientX;
    }, { passive: true });

    refs.heroSlider.addEventListener("touchend", () => {
      const diff = state.touchStartX - state.touchEndX;

      if (Math.abs(diff) > 45) {
        if (diff > 0) {
          nextHero();
        } else {
          prevHero();
        }
      }

      startHeroTimer();
    }, { passive: true });
  }

  function getProjectsPerPage() {
    if (window.innerWidth <= 700) return 1;
    if (window.innerWidth <= 1180) return 2;
    return 3;
  }

  function chunkProjects(items, size) {
    const pages = [];
    for (let i = 0; i < items.length; i += size) {
      pages.push(items.slice(i, i + size));
    }
    return pages;
  }

  function renderProjects() {
    if (!refs.projectTrack || !refs.projectIndicators || !PROJECTS.length) return;

    const perPage = getProjectsPerPage();
    const pages = chunkProjects(PROJECTS, perPage);

    refs.projectTrack.innerHTML = pages.map((page) => `
      <div class="projectSlide" style="min-width:100%;display:grid;grid-template-columns:repeat(${page.length},1fr);gap:24px;">
        ${page.map((item) => `
          <article class="projectCard">
            <div class="projectMedia">
              <img
                class="previewable"
                src="${item.img}"
                alt="${item.title}"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="projectBody">
              <div class="projectMiniTag">Projeto Alumnorte</div>
              <h3>${item.title}</h3>
              <p>${item.desc}</p>
            </div>
          </article>
        `).join("")}
      </div>
    `).join("");

    refs.projectIndicators.innerHTML = pages.map((_, index) => `
      <button
        class="${index === 0 ? "active" : ""}"
        data-index="${index}"
        type="button"
        aria-label="Ir para grupo ${index + 1}"
        aria-pressed="${index === 0 ? "true" : "false"}"
      ></button>
    `).join("");

    refs.projectIndicators.onclick = (event) => {
      const indicator = event.target.closest("button");
      if (!indicator) return;
      state.projectIndex = Number(indicator.dataset.index);
      updateProjects();
      restartProjectTimer();
    };

    state.projectIndex = Math.min(state.projectIndex, pages.length - 1);
    updateProjects();
  }

  function updateProjects() {
    if (!refs.projectTrack || !refs.projectIndicators) return;

    const slides = $$(".projectSlide", refs.projectTrack);
    const indicators = $$("button", refs.projectIndicators);

    if (!slides.length) return;

    refs.projectTrack.style.transform = `translateX(-${state.projectIndex * 100}%)`;

    indicators.forEach((indicator, index) => {
      const active = index === state.projectIndex;
      indicator.classList.toggle("active", active);
      indicator.setAttribute("aria-pressed", active ? "true" : "false");
    });

    const nextSlide = slides[(state.projectIndex + 1) % slides.length];
    if (nextSlide) {
      const img = $("img", nextSlide);
      if (img?.src) preloadImage(img.src);
    }
  }

  function nextProject() {
    const total = $$(".projectSlide", refs.projectTrack).length;
    if (!total) return;
    state.projectIndex = (state.projectIndex + 1) % total;
    updateProjects();
  }

  function prevProject() {
    const total = $$(".projectSlide", refs.projectTrack).length;
    if (!total) return;
    state.projectIndex = (state.projectIndex - 1 + total) % total;
    updateProjects();
  }

  function startProjectTimer() {
    stopProjectTimer();
    if ($$(".projectSlide", refs.projectTrack).length <= 1) return;
    state.projectTimer = window.setInterval(nextProject, CONFIG.projectInterval);
  }

  function stopProjectTimer() {
    if (state.projectTimer) {
      clearInterval(state.projectTimer);
      state.projectTimer = null;
    }
  }

  function restartProjectTimer() {
    stopProjectTimer();
    startProjectTimer();
  }

  function setupProjectPause() {
    if (!refs.projectSlider) return;

    refs.projectSlider.addEventListener("mouseenter", stopProjectTimer);
    refs.projectSlider.addEventListener("mouseleave", startProjectTimer);

    let startX = 0;
    let endX = 0;

    refs.projectSlider.addEventListener("touchstart", (event) => {
      startX = event.changedTouches[0].clientX;
      endX = startX;
      stopProjectTimer();
    }, { passive: true });

    refs.projectSlider.addEventListener("touchmove", (event) => {
      endX = event.changedTouches[0].clientX;
    }, { passive: true });

    refs.projectSlider.addEventListener("touchend", () => {
      const diff = startX - endX;
      if (Math.abs(diff) > 45) {
        if (diff > 0) {
          nextProject();
        } else {
          prevProject();
        }
      }
      startProjectTimer();
    }, { passive: true });
  }

  function buildWhatsappText(data) {
    return `Olá! Vim pelo site da ${CONFIG.companyName}.

Nome: ${data.name || "-"}
E-mail: ${data.email || "-"}
WhatsApp: ${data.phone || "-"}
Cidade/Bairro: ${data.place || "-"}
Serviço: ${data.service || "-"}
Mensagem: ${data.message || "-"}`;
  }

  function sendWhatsapp(data) {
    const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(buildWhatsappText(data))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function getModalFormData() {
    return {
      name: $("#mName")?.value.trim() || "",
      email: $("#mEmail")?.value.trim() || "",
      phone: $("#mPhone")?.value.trim() || "",
      place: $("#mPlace")?.value.trim() || "",
      service: $("#mService")?.value.trim() || "",
      message: $("#mMessage")?.value.trim() || ""
    };
  }

  function setupWhatsappButtons() {
    if (refs.floatWhats) {
      const msg = `Olá! Vim pelo site da ${CONFIG.companyName} e quero solicitar um orçamento.`;
      refs.floatWhats.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
    }

    if (refs.modalWhatsapp) {
      refs.modalWhatsapp.addEventListener("click", () => {
        sendWhatsapp(getModalFormData());
      });
    }
  }

  function openModal() {
    if (!refs.budgetModal) return;
    refs.budgetModal.classList.add("show");
    lockBody();
  }

  function closeModal() {
    if (!refs.budgetModal) return;
    refs.budgetModal.classList.remove("show");
    unlockBody();
  }

  function setupModal() {
    refs.openBudgetButtons.forEach((button) => {
      button.addEventListener("click", openModal);
    });

    refs.closeBudgetModal?.addEventListener("click", closeModal);

    refs.budgetModal?.addEventListener("click", (event) => {
      if (event.target === refs.budgetModal) closeModal();
    });
  }

  function openImagePreview(src, alt = "Visualização ampliada") {
    if (!refs.imagePreviewOverlay || !refs.imagePreviewImg) return;
    refs.imagePreviewImg.src = src;
    refs.imagePreviewImg.alt = alt;
    refs.imagePreviewOverlay.classList.add("show");
    refs.imagePreviewOverlay.setAttribute("aria-hidden", "false");
    lockBody();
  }

  function closeImagePreview() {
    if (!refs.imagePreviewOverlay || !refs.imagePreviewImg) return;
    refs.imagePreviewOverlay.classList.remove("show");
    refs.imagePreviewOverlay.setAttribute("aria-hidden", "true");

    setTimeout(() => {
      refs.imagePreviewImg.src = "";
    }, 160);

    unlockBody();
  }

  function setupLightbox() {
    document.addEventListener("click", (event) => {
      const image = event.target.closest(".previewable");
      if (!image) return;
      openImagePreview(image.currentSrc || image.src, image.alt || "Visualização ampliada");
    });

    refs.imagePreviewClose?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeImagePreview();
    });

    refs.imagePreviewOverlay?.addEventListener("click", (event) => {
      if (event.target === refs.imagePreviewOverlay) {
        closeImagePreview();
      }
    });

    refs.imagePreviewImg?.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }

  function setupKeyboard() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeModal();
        closeImagePreview();
      }
    });
  }

  function setupScrollEvents() {
    const onScroll = () => {
      updateHeader();
      updateBackToTop();
      updateActiveMenu();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function setupBackToTop() {
    refs.backToTop?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function setupVisibilityChange() {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopHeroTimer();
        stopProjectTimer();
      } else {
        startHeroTimer();
        startProjectTimer();
      }
    });
  }

  function setupResizeRebuild() {
    let resizeTimeout = null;

    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        renderProjects();
        updateProjects();
      }, 160);
    });
  }

  function init() {
    setYear();
    setupMobileMenu();
    renderHero();
    renderProjects();
    setupHeroTouch();
    setupProjectPause();
    setupWhatsappButtons();
    setupModal();
    setupLightbox();
    setupKeyboard();
    setupScrollEvents();
    setupBackToTop();
    setupVisibilityChange();
    setupResizeRebuild();
    startHeroTimer();
    startProjectTimer();
  }

  init();
})();
