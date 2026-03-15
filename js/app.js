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
    { img: "img/projeto-1.jpg", title: "Porta em alumínio sob medida", desc: "Solução elegante e resistente para entrada principal com acabamento premium." },
    { img: "img/projeto-2.jpg", title: "Janela em alumínio moderna", desc: "Projeto pensado para ventilação, iluminação e valorização estética do ambiente." },
    { img: "img/projeto-3.jpg", title: "Portão com acabamento refinado", desc: "Execução com presença visual forte, resistência e adaptação ao imóvel do cliente." },
    { img: "img/projeto-4.jpg", title: "Fachada pele de vidro", desc: "Aplicação com leitura arquitetônica sofisticada e forte impacto visual." },
    { img: "img/projeto-5.jpg", title: "Vidro temperado em área interna", desc: "Projeto com visual limpo, segurança e acabamento de alto padrão." },
    { img: "img/projeto-6.jpg", title: "Fechamento em alumínio e vidro", desc: "Solução moderna para ambientes residenciais e comerciais com ótima apresentação." },
    { img: "img/projeto-7.jpg", title: "Esquadria personalizada", desc: "Projeto desenvolvido conforme medidas, necessidade e estilo do cliente." },
    { img: "img/projeto-8.jpg", title: "Projeto completo em alumínio", desc: "Entrega pensada para unir técnica, sofisticação e durabilidade em cada detalhe." }
  ];

  const WHATSAPP = "553899658215";
  const COMPANY_NAME = "Alumnorte";
  const HERO_INTERVAL = 6500;

  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

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

  let heroIndex = 0;
  let heroTimer = null;

  function renderHero() {
    if (!heroTrack || !heroDots || !HERO_SLIDES.length) return;

    heroTrack.innerHTML = HERO_SLIDES.map((slide, i) => `
      <div class="heroSlide ${i === 0 ? "active" : ""}" data-index="${i}" aria-hidden="${i === 0 ? "false" : "true"}">
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
  }

  function nextHero() {
    heroIndex = (heroIndex + 1) % HERO_SLIDES.length;
    updateHero();
  }

  function prevHero() {
    heroIndex = (heroIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
    updateHero();
  }

  function startHeroTimer() {
    if (!heroTrack || HERO_SLIDES.length <= 1) return;
    clearInterval(heroTimer);
    heroTimer = setInterval(nextHero, HERO_INTERVAL);
  }

  function stopHeroTimer() {
    clearInterval(heroTimer);
    heroTimer = null;
  }

  function restartHeroTimer() {
    stopHeroTimer();
    startHeroTimer();
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
    heroSlider.addEventListener("mouseenter", stopHeroTimer);
    heroSlider.addEventListener("mouseleave", startHeroTimer);
    heroSlider.addEventListener("touchstart", stopHeroTimer, { passive: true });
    heroSlider.addEventListener("touchend", restartHeroTimer, { passive: true });
  }

  renderHero();
  startHeroTimer();

  // PROJECTS
  const projectTrack = $("#projectTrack");
  const projectIndicators = $("#projectIndicators");
  const projectPrev = $("#projectPrev");
  const projectNext = $("#projectNext");
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

  // IMAGE PREVIEW
  const previewOverlay = $("#imagePreviewOverlay");
  const previewImg = $("#imagePreviewImg");
  const previewClose = $("#imagePreviewClose");
  const previewSelectors = ".aboutImage, .serviceBigCard, .projectCard, .partnerCard";

  let hoverTimer = null;
  let currentPreviewSource = "";
  let currentPreviewTarget = null;

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

  function openPreview(target) {
    if (!previewOverlay || !previewImg || !target) return;

    const src = getPreviewSrc(target);
    if (!src) return;

    if (currentPreviewSource === src && previewOverlay.classList.contains("show")) return;

    currentPreviewSource = src;
    currentPreviewTarget = target;
    previewImg.src = src;
    previewOverlay.classList.add("show");
    previewOverlay.setAttribute("aria-hidden", "false");
    lockBody();
  }

  function closePreview() {
    if (!previewOverlay || !previewImg) return;

    previewOverlay.classList.remove("show");
    previewOverlay.setAttribute("aria-hidden", "true");
    previewImg.src = "";
    currentPreviewSource = "";
    currentPreviewTarget = null;
    clearTimeout(hoverTimer);
    unlockBody();
  }

  function scheduleOpen(target, delay = 120) {
    clearTimeout(hoverTimer);
    hoverTimer = setTimeout(() => {
      openPreview(target);
    }, delay);
  }

  // DESKTOP: abre ao passar o mouse
  document.addEventListener("mouseover", (e) => {
    const target = e.target.closest(previewSelectors);
    if (!target) return;
    if (isInteractiveChild(e.target)) return;
    if (previewOverlay?.classList.contains("show")) return;

    scheduleOpen(target, 120);
  });

  // se sair antes do tempo, cancela
  document.addEventListener("mouseout", (e) => {
    const target = e.target.closest(previewSelectors);
    if (!target) return;

    const related = e.relatedTarget;
    if (related && target.contains(related)) return;

    clearTimeout(hoverTimer);
  });

  // CELULAR + fallback geral: toca/clica para abrir
  document.addEventListener("click", (e) => {
    if (previewOverlay?.classList.contains("show")) return;

    const target = e.target.closest(previewSelectors);
    if (!target) return;
    if (isInteractiveChild(e.target)) return;

    e.preventDefault();
    openPreview(target);
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
      if (e.target === previewOverlay) closePreview();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      closePreview();
    }
  });

  window.addEventListener("load", () => {
    document.body.classList.add("site-loaded");
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopHeroTimer();
    else startHeroTimer();
  });
})();
