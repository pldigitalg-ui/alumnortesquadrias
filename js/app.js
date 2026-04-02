(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const HERO_SLIDES = [
    {
      img: "img/hero-1.jpg",
      title: "Esquadrias de alumínio com sofisticação, resistência e acabamento impecável",
      desc: "A Alumnorte entrega soluções sob medida em Janaúba MG para residências, comércios e projetos com visual moderno."
    },
    {
      img: "img/hero-2.jpg",
      title: "Portas, janelas e portões em alumínio com padrão premium",
      desc: "Projetos desenvolvidos para unir elegância, funcionalidade, durabilidade e excelente apresentação final."
    },
    {
      img: "img/hero-3.jpg",
      title: "Fachada pele de vidro com presença arquitetônica forte",
      desc: "Aplicações que valorizam o imóvel com design sofisticado, linhas modernas e acabamento profissional."
    },
    {
      img: "img/hero-4.jpg",
      title: "Vidraçaria e vidro temperado para ambientes modernos",
      desc: "Soluções que unem segurança, estética e adaptação precisa ao espaço do cliente."
    },
    {
      img: "img/hero-5.jpg",
      title: "Projetos sob medida para transformar seu ambiente",
      desc: "Cada entrega da Alumnorte busca unir técnica, confiança, resistência e leitura visual de alto padrão."
    }
  ];

  const PROJECTS = [
    {
      img: "img/projetos/porta-vidro-aluminio-sala-moderna.jpg",
      title: "Porta de vidro em alumínio para área interna",
      desc: "Projeto moderno com esquadrias de alumínio preto e portas de vidro deslizantes, proporcionando iluminação natural e integração entre ambientes."
    },
    {
      img: "img/projetos/corredor-esquadrias-aluminio-preto.jpg",
      title: "Corredor com janelas em alumínio preto",
      desc: "Instalação de janelas em alumínio com acabamento premium, garantindo ventilação, iluminação e estética contemporânea."
    },
    {
      img: "img/projetos/portao-aluminio-preto-area-externa.jpg",
      title: "Portão em alumínio preto com design moderno",
      desc: "Portão resistente em alumínio com pintura eletrostática, ideal para áreas externas com durabilidade e sofisticação."
    },
    {
      img: "img/projetos/porta-madeira-pivotante-esquadria-vidro.jpg",
      title: "Porta pivotante com esquadria e vidro lateral",
      desc: "Entrada principal com porta pivotante em acabamento amadeirado e painel fixo em vidro, trazendo elegância e imponência ao projeto."
    },
    {
      img: "img/projetos/portao-garagem-aluminio-branco.jpg",
      title: "Portão de garagem em alumínio branco",
      desc: "Portão de grande porte em alumínio branco, com design clean e alta resistência para uso residencial."
    },
    {
      img: "img/projetos/escada-guarda-corpo-vidro-aluminio.jpg",
      title: "Guarda-corpo em vidro com estrutura em alumínio",
      desc: "Escada interna com guarda-corpo em vidro e estrutura metálica, combinando segurança com visual moderno."
    }
  ];

  const WHATSAPP = "553899658215";
  const COMPANY_NAME = "Alumnorte";
  const HERO_INTERVAL = 6500;

  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  const isMobile = () => window.matchMedia("(max-width: 900px)").matches;

  // HEADER
  const topbar = $("#topbar");
  function updateHeader() {
    if (!topbar) return;
    topbar.classList.toggle("scrolled", window.scrollY > 80);
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // MOBILE MENU
  const menuToggle = $("#menuToggle");
  const mobileMenu = $("#mobileMenu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = mobileMenu.classList.toggle("show");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    $$("a", mobileMenu).forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        mobileMenu.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // HERO
  const heroSlider = $("#heroSlider");
  const heroTrack = $("#heroTrack");
  const heroDots = $("#heroDots");
  const heroTitle = $("#heroTitle");
  const heroDesc = $("#heroDesc");
  const heroPrev = $("#heroPrev");
  const heroNext = $("#heroNext");
  const heroControls = $(".heroControls");

  let heroIndex = 0;
  let heroTimer = null;
  let heroTouchStartX = 0;
  let heroTouchEndX = 0;
  let heroIsPaused = false;

  function preloadImage(src) {
    if (!src) return;
    const img = new Image();
    img.src = src;
  }

  function preloadNearbyHeroImages() {
    if (!HERO_SLIDES.length) return;
    const nextIndex = (heroIndex + 1) % HERO_SLIDES.length;
    const prevIndex = (heroIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;

    preloadImage(HERO_SLIDES[nextIndex]?.img);
    preloadImage(HERO_SLIDES[prevIndex]?.img);
  }

  function renderHero() {
    if (!heroTrack || !heroDots || !HERO_SLIDES.length) return;

    heroIndex = 0;

    heroTrack.innerHTML = HERO_SLIDES.map((slide, i) => `
      <div
        class="heroSlide ${i === 0 ? "active" : ""}"
        data-index="${i}"
        aria-hidden="${i === 0 ? "false" : "true"}"
      >
        <img
          src="${slide.img}"
          alt="${slide.title}"
          ${i === 0 ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"'}
        >
      </div>
    `).join("");

    heroDots.innerHTML = HERO_SLIDES.map((_, i) => `
      <button
        class="heroDot ${i === 0 ? "active" : ""}"
        data-index="${i}"
        type="button"
        aria-label="Ir para slide ${i + 1}"
        aria-pressed="${i === 0 ? "true" : "false"}"
      ></button>
    `).join("");

    $$(".heroDot", heroDots).forEach((dot) => {
      dot.addEventListener("click", () => {
        heroIndex = Number(dot.dataset.index);
        updateHero();
        restartHeroTimer();
      });
    });

    updateHero();
    preloadNearbyHeroImages();
  }

  function updateHero() {
    if (!heroTrack || !heroDots || !HERO_SLIDES.length) return;

    const slides = $$(".heroSlide", heroTrack);
    const dots = $$(".heroDot", heroDots);
    const current = HERO_SLIDES[heroIndex];

    slides.forEach((slide, i) => {
      const isActive = i === heroIndex;
      slide.classList.toggle("active", isActive);
      slide.setAttribute("aria-hidden", isActive ? "false" : "true");
    });

    dots.forEach((dot, i) => {
      const isActive = i === heroIndex;
      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    if (heroTitle && current) heroTitle.textContent = current.title;
    if (heroDesc && current) heroDesc.textContent = current.desc;

    preloadNearbyHeroImages();
  }

  function nextHero() {
    if (!HERO_SLIDES.length) return;
    heroIndex = (heroIndex + 1) % HERO_SLIDES.length;
    updateHero();
  }

  function prevHero() {
    if (!HERO_SLIDES.length) return;
    heroIndex = (heroIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
    updateHero();
  }

  function startHeroTimer() {
    if (!heroTrack || HERO_SLIDES.length <= 1 || heroIsPaused) return;
    clearInterval(heroTimer);
    heroTimer = setInterval(() => {
      nextHero();
    }, HERO_INTERVAL);
  }

  function stopHeroTimer() {
    clearInterval(heroTimer);
    heroTimer = null;
  }

  function restartHeroTimer() {
    stopHeroTimer();
    startHeroTimer();
  }

  function pauseHero() {
    heroIsPaused = true;
    stopHeroTimer();
  }

  function resumeHero() {
    heroIsPaused = false;
    restartHeroTimer();
  }

  if (heroPrev) {
    heroPrev.addEventListener("click", () => {
      prevHero();
      restartHeroTimer();
    });
  }

  if (heroNext) {
    heroNext.addEventListener("click", () => {
      nextHero();
      restartHeroTimer();
    });
  }

  if (heroSlider) {
    heroSlider.addEventListener("mouseenter", () => {
      pauseHero();
    });

    heroSlider.addEventListener("mouseleave", () => {
      resumeHero();
    });

    heroSlider.addEventListener("touchstart", (e) => {
      pauseHero();
      heroTouchStartX = e.changedTouches[0].clientX;
      heroTouchEndX = heroTouchStartX;
    }, { passive: true });

    heroSlider.addEventListener("touchmove", (e) => {
      heroTouchEndX = e.changedTouches[0].clientX;
    }, { passive: true });

    heroSlider.addEventListener("touchend", () => {
      const diff = heroTouchStartX - heroTouchEndX;
      const minSwipe = 40;

      if (Math.abs(diff) > minSwipe) {
        if (diff > 0) nextHero();
        else prevHero();
      }

      resumeHero();
    }, { passive: true });
  }

  renderHero();
  updateHero();
  startHeroTimer();

  // PROJECTS
  const projectTrack = $("#projectTrack");
  const projectIndicators = $("#projectIndicators");
  const projectPrev = $("#projectPrev");
  const projectNext = $("#projectNext");
  const projectSlider = $("#projectSlider");

  let projectIndex = 0;
  const projectPages = [];

  for (let i = 0; i < PROJECTS.length; i += 2) {
    projectPages.push(PROJECTS.slice(i, i + 2));
  }

  function renderProjects() {
    if (!projectTrack || !projectIndicators || !projectPages.length) return;

    projectTrack.innerHTML = projectPages.map((page) => `
      <div class="projectSlide">
        ${page.map((item) => `
          <article class="projectCard">
            <img src="${item.img}" alt="${item.title}" loading="lazy" decoding="async">
            <div class="projectCardContent">
              <h3>${item.title}</h3>
              <p>${item.desc}</p>
            </div>
          </article>
        `).join("")}
      </div>
    `).join("");

    projectIndicators.innerHTML = projectPages.map((_, i) => `
      <button
        class="projectIndicator ${i === 0 ? "active" : ""}"
        data-index="${i}"
        type="button"
        aria-label="Ir para página ${i + 1}"
        aria-pressed="${i === 0 ? "true" : "false"}"
      ></button>
    `).join("");

    $$(".projectIndicator", projectIndicators).forEach((dot) => {
      dot.addEventListener("click", () => {
        projectIndex = Number(dot.dataset.index);
        updateProjects();
      });
    });

    updateProjects();
  }

  function updateProjects() {
    if (!projectTrack || !projectIndicators || !projectPages.length) return;

    projectTrack.style.transform = `translateX(-${projectIndex * 100}%)`;

    $$(".projectIndicator", projectIndicators).forEach((dot, i) => {
      const isActive = i === projectIndex;
      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  if (projectPrev) {
    projectPrev.addEventListener("click", () => {
      if (!projectPages.length) return;
      projectIndex = (projectIndex - 1 + projectPages.length) % projectPages.length;
      updateProjects();
    });
  }

  if (projectNext) {
    projectNext.addEventListener("click", () => {
      if (!projectPages.length) return;
      projectIndex = (projectIndex + 1) % projectPages.length;
      updateProjects();
    });
  }

  renderProjects();

  // ACTIVE MENU
  const menuLinks = $$(".navMenu a, .mobileMenu a");
  const sections = ["inicio", "quem-somos", "servicos", "projetos", "parceiros", "depoimentos", "contato"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function updateActiveMenu() {
    let currentId = "inicio";
    const scrollY = window.scrollY + 160;

    sections.forEach((sec) => {
      if (scrollY >= sec.offsetTop) currentId = sec.id;
    });

    menuLinks.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === `#${currentId}`);
    });
  }

  window.addEventListener("scroll", updateActiveMenu, { passive: true });
  updateActiveMenu();

  // BACK TO TOP
  const backToTop = $("#backToTop");

  function updateBackToTop() {
    if (!backToTop) return;
    backToTop.classList.toggle("show", window.scrollY > 500);
  }

  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // FLOAT WHATS
  const floatWhats = $("#floatWhats");
  if (floatWhats) {
    const msg = `Olá! Vim pelo site da ${COMPANY_NAME} e quero solicitar um orçamento.`;
    floatWhats.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  }

  // FORM HELPERS
  function buildWhatsappText(data) {
    return `Olá! Vim pelo site da ${COMPANY_NAME}.

Nome: ${data.name || "-"}
E-mail: ${data.email || "-"}
WhatsApp: ${data.phone || "-"}
Cidade/Bairro: ${data.place || "-"}
Serviço: ${data.service || "-"}
Mensagem: ${data.message || "-"}`;
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

  function sendWhatsapp(data) {
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(buildWhatsappText(data))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  // MODAL
  const budgetModal = $("#budgetModal");
  const openBudgetModal = $("#openBudgetModal");
  const openBudgetModalTop = $("#openBudgetModalTop");
  const openBudgetModalHero = $("#openBudgetModalHero");
  const openBudgetModalInline = $("#openBudgetModalInline");
  const closeBudgetModal = $("#closeBudgetModal");
  const modalWhatsapp = $("#modalWhatsapp");

  function lockBody() {
    document.body.style.overflow = "hidden";
  }

  function unlockBody() {
    const previewOverlay = $("#imagePreviewOverlay");
    const modalOpen = budgetModal?.classList.contains("show");
    const previewOpen = previewOverlay?.classList.contains("show");
    if (!modalOpen && !previewOpen) {
      document.body.style.overflow = "";
    }
  }

  function openModal() {
    if (!budgetModal) return;
    budgetModal.classList.add("show");
    lockBody();
  }

  function closeModal() {
    if (!budgetModal) return;
    budgetModal.classList.remove("show");
    unlockBody();
  }

  [openBudgetModal, openBudgetModalTop, openBudgetModalHero, openBudgetModalInline]
    .filter(Boolean)
    .forEach((btn) => btn.addEventListener("click", openModal));

  if (closeBudgetModal) closeBudgetModal.addEventListener("click", closeModal);

  if (budgetModal) {
    budgetModal.addEventListener("click", (e) => {
      if (e.target === budgetModal) closeModal();
    });
  }

  if (modalWhatsapp) {
    modalWhatsapp.addEventListener("click", () => {
      sendWhatsapp(getModalFormData());
    });
  }

  // SMALL IMAGE PREVIEW
  const previewOverlay = $("#imagePreviewOverlay");
  const previewImg = $("#imagePreviewImg");
  const previewClose = $("#imagePreviewClose");
  const previewBox = $(".imagePreviewBox", previewOverlay);
  const previewSelectors = ".aboutImage, .serviceBigCard, .projectCard, .partnerCard";

  let hoverTimer = null;
  let activeHoverTarget = null;
  let pointerX = 0;
  let pointerY = 0;

  function extractUrl(backgroundImage) {
    if (!backgroundImage || backgroundImage === "none") return "";
    const match = backgroundImage.match(/url\(["']?(.*?)["']?\)/);
    return match ? match[1] : "";
  }

  function getPreviewSrc(target) {
    if (!target) return "";

    const innerImg = target.querySelector("img");
    if (innerImg) {
      const src = innerImg.getAttribute("src") || innerImg.src || "";
      if (src) return src;
    }

    const bg = getComputedStyle(target).backgroundImage;
    const bgUrl = extractUrl(bg);
    if (bgUrl) return bgUrl;

    return "";
  }

  function isInteractiveChild(el) {
    return !!el.closest(
      "a, button, input, textarea, select, label, .heroArrow, .projectArrow, .heroDot, .projectIndicator, .menuToggle, .closeModalBtn, .imagePreviewClose"
    );
  }

  function setDesktopPreviewPosition(x, y) {
    if (!previewBox || isMobile()) return;

    const boxW = 320;
    const boxH = 320;
    const gap = 18;

    let left = x + gap;
    let top = y - (boxH / 2);

    if (left + boxW > window.innerWidth - 16) {
      left = x - boxW - gap;
    }

    if (left < 16) left = 16;
    if (top < 16) top = 16;
    if (top + boxH > window.innerHeight - 16) {
      top = window.innerHeight - boxH - 16;
    }

    previewBox.style.left = `${left}px`;
    previewBox.style.top = `${top}px`;
  }

  function openHoverPreview(target) {
    if (!previewOverlay || !previewImg || !previewBox || !target) return;
    if (isMobile()) return;

    const src = getPreviewSrc(target);
    if (!src) return;

    activeHoverTarget = target;
    previewImg.src = src;

    previewOverlay.classList.add("show");
    previewOverlay.setAttribute("aria-hidden", "false");

    previewOverlay.style.pointerEvents = "none";
    previewOverlay.style.background = "transparent";
    previewOverlay.style.backdropFilter = "none";
    previewOverlay.style.webkitBackdropFilter = "none";

    previewBox.style.position = "fixed";
    previewBox.style.width = "320px";
    previewBox.style.height = "320px";
    previewBox.style.maxWidth = "320px";
    previewBox.style.maxHeight = "320px";
    previewBox.style.padding = "0";
    previewBox.style.borderRadius = "22px";
    previewBox.style.overflow = "hidden";
    previewBox.style.background = "#ffffff";
    previewBox.style.boxShadow = "0 22px 50px rgba(0,0,0,.22)";
    previewBox.style.zIndex = "9999";

    previewImg.style.width = "100%";
    previewImg.style.height = "100%";
    previewImg.style.maxWidth = "100%";
    previewImg.style.maxHeight = "100%";
    previewImg.style.objectFit = "cover";
    previewImg.style.borderRadius = "22px";
    previewImg.style.background = "#fff";

    if (previewClose) previewClose.style.display = "none";

    setDesktopPreviewPosition(pointerX || window.innerWidth * 0.62, pointerY || window.innerHeight * 0.5);
  }

  function openTapPreview(target) {
    if (!previewOverlay || !previewImg || !previewBox || !target) return;

    const src = getPreviewSrc(target);
    if (!src) return;

    previewImg.src = src;
    previewOverlay.classList.add("show");
    previewOverlay.setAttribute("aria-hidden", "false");

    previewOverlay.style.pointerEvents = "auto";
    previewOverlay.style.background = "rgba(5,12,20,.28)";
    previewOverlay.style.backdropFilter = "blur(2px)";
    previewOverlay.style.webkitBackdropFilter = "blur(2px)";

    previewBox.style.position = "fixed";
    previewBox.style.left = "50%";
    previewBox.style.top = "50%";
    previewBox.style.transform = "translate(-50%, -50%)";
    previewBox.style.width = "min(86vw, 380px)";
    previewBox.style.height = "min(86vw, 380px)";
    previewBox.style.maxWidth = "380px";
    previewBox.style.maxHeight = "380px";
    previewBox.style.padding = "0";
    previewBox.style.borderRadius = "22px";
    previewBox.style.overflow = "hidden";
    previewBox.style.background = "#fff";
    previewBox.style.boxShadow = "0 22px 50px rgba(0,0,0,.22)";
    previewBox.style.zIndex = "9999";

    previewImg.style.width = "100%";
    previewImg.style.height = "100%";
    previewImg.style.maxWidth = "100%";
    previewImg.style.maxHeight = "100%";
    previewImg.style.objectFit = "cover";
    previewImg.style.borderRadius = "22px";
    previewImg.style.background = "#fff";

    if (previewClose) previewClose.style.display = "grid";
  }

  function closePreview() {
    if (!previewOverlay || !previewImg || !previewBox) return;

    previewOverlay.classList.remove("show");
    previewOverlay.setAttribute("aria-hidden", "true");

    previewImg.src = "";
    activeHoverTarget = null;
    clearTimeout(hoverTimer);

    previewOverlay.removeAttribute("style");
    previewBox.removeAttribute("style");
    previewImg.removeAttribute("style");
    if (previewClose) previewClose.removeAttribute("style");

    unlockBody();
  }

  function scheduleHoverPreview(target, delay = 120) {
    clearTimeout(hoverTimer);
    hoverTimer = setTimeout(() => {
      openHoverPreview(target);
    }, delay);
  }

  document.addEventListener("mousemove", (e) => {
    pointerX = e.clientX;
    pointerY = e.clientY;

    if (previewOverlay?.classList.contains("show") && activeHoverTarget && !isMobile()) {
      setDesktopPreviewPosition(pointerX, pointerY);
    }
  }, { passive: true });

  document.addEventListener("mouseover", (e) => {
    if (isMobile()) return;

    const target = e.target.closest(previewSelectors);
    if (!target) return;
    if (isInteractiveChild(e.target)) return;

    scheduleHoverPreview(target, 120);
  });

  document.addEventListener("mouseout", (e) => {
    if (isMobile()) return;

    const target = e.target.closest(previewSelectors);
    if (!target) return;

    const related = e.relatedTarget;
    if (related && target.contains(related)) return;

    clearTimeout(hoverTimer);

    if (activeHoverTarget === target) {
      closePreview();
    }
  });

  document.addEventListener("click", (e) => {
    const target = e.target.closest(previewSelectors);
    if (!target) return;
    if (isInteractiveChild(e.target)) return;

    if (!isMobile()) return;

    e.preventDefault();
    e.stopPropagation();
    openTapPreview(target);
  });

  if (previewClose) {
    previewClose.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      closePreview();
    });
  }

  if (previewOverlay) {
    previewOverlay.addEventListener("click", (e) => {
      if (isMobile() && e.target === previewOverlay) {
        closePreview();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      closePreview();
    }
  });

  function normalizeSliderControls() {
    if (heroControls) {
      heroControls.style.left = "24px";
      heroControls.style.right = "auto";
      heroControls.style.bottom = isMobile() ? "18px" : "28px";
      heroControls.style.zIndex = "20";
    }

    if (heroPrev) {
      heroPrev.style.position = "relative";
      heroPrev.style.zIndex = "21";
    }

    if (heroNext) {
      heroNext.style.position = "relative";
      heroNext.style.zIndex = "21";
    }

    if (projectSlider) {
      projectSlider.style.position = "relative";
      projectSlider.style.paddingLeft = isMobile() ? "0px" : "54px";
      projectSlider.style.paddingRight = isMobile() ? "0px" : "54px";
    }

    if (projectPrev) {
      projectPrev.style.position = "absolute";
      projectPrev.style.left = isMobile() ? "-9999px" : "8px";
      projectPrev.style.top = "50%";
      projectPrev.style.transform = "translateY(-50%)";
      projectPrev.style.zIndex = "30";
    }

    if (projectNext) {
      projectNext.style.position = "absolute";
      projectNext.style.right = isMobile() ? "-9999px" : "8px";
      projectNext.style.top = "50%";
      projectNext.style.transform = "translateY(-50%)";
      projectNext.style.zIndex = "30";
    }
  }

  normalizeSliderControls();
  window.addEventListener("resize", normalizeSliderControls);

  window.addEventListener("load", () => {
    document.body.classList.add("site-loaded");
    normalizeSliderControls();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopHeroTimer();
    } else if (!heroIsPaused) {
      startHeroTimer();
    }
  });
})();
