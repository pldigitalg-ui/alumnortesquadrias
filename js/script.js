(function () {
  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => [...p.querySelectorAll(s)];

  /* HERO */
  const heroSlides = $$('.heroSlide');
  const heroDots = $$('.heroDot');
  const heroPrev = $('.heroArrow.prev, .heroArrow.left, .heroArrow[data-dir="prev"]');
  const heroNext = $('.heroArrow.next, .heroArrow.right, .heroArrow[data-dir="next"]');

  let heroIndex = heroSlides.findIndex(slide => slide.classList.contains('active'));
  if (heroIndex < 0) heroIndex = 0;
  let heroTimer = null;

  function showHero(index) {
    if (!heroSlides.length) return;
    heroIndex = (index + heroSlides.length) % heroSlides.length;

    heroSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === heroIndex);
    });

    heroDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === heroIndex);
    });
  }

  function resetHero() {
    clearInterval(heroTimer);
    heroTimer = setInterval(() => showHero(heroIndex + 1), 5000);
  }

  if (heroSlides.length) {
    showHero(heroIndex);
    resetHero();

    heroPrev?.addEventListener('click', () => {
      showHero(heroIndex - 1);
      resetHero();
    });

    heroNext?.addEventListener('click', () => {
      showHero(heroIndex + 1);
      resetHero();
    });

    heroDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showHero(i);
        resetHero();
      });
    });
  }

  /* PROJETOS */
  const projectTrack = $('.projectTrack');
  const projectSlides = $$('.projectSlide', projectTrack || document);
  const projectPrev = $('.projectArrow.left');
  const projectNext = $('.projectArrow.right');
  const projectDots = $$('.projectIndicator');

  let projectIndex = 0;
  let projectTimer = null;

  function showProject(index) {
    if (!projectTrack || !projectSlides.length) return;
    projectIndex = (index + projectSlides.length) % projectSlides.length;
    projectTrack.style.transform = `translateX(-${projectIndex * 100}%)`;

    projectDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === projectIndex);
    });
  }

  function resetProject() {
    clearInterval(projectTimer);
    projectTimer = setInterval(() => showProject(projectIndex + 1), 4800);
  }

  if (projectTrack && projectSlides.length) {
    showProject(0);
    resetProject();

    projectPrev?.addEventListener('click', () => {
      showProject(projectIndex - 1);
      resetProject();
    });

    projectNext?.addEventListener('click', () => {
      showProject(projectIndex + 1);
      resetProject();
    });

    projectDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showProject(i);
        resetProject();
      });
    });
  }

  /* LIGHTBOX */
  let overlay = $('.imagePreviewOverlay');
  let previewImg = $('#imagePreviewImg');
  let closeBtn = $('.imagePreviewClose');

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'imagePreviewOverlay';
    overlay.innerHTML = `
      <button class="imagePreviewClose" aria-label="Fechar">×</button>
      <div class="imagePreviewBox">
        <img id="imagePreviewImg" alt="Imagem ampliada">
      </div>
    `;
    document.body.appendChild(overlay);
    previewImg = $('#imagePreviewImg', overlay);
    closeBtn = $('.imagePreviewClose', overlay);
  }

  function openPreview(src, alt = 'Imagem ampliada') {
    if (!src) return;
    previewImg.src = src;
    previewImg.alt = alt;
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closePreview() {
    overlay.classList.remove('show');
    document.body.style.overflow = '';
    setTimeout(() => {
      previewImg.src = '';
    }, 150);
  }

  $$('.aboutImage img, .serviceBigCard img, .projectCard img, .partnerCard img, .heroSlide img')
    .forEach((img) => {
      img.addEventListener('click', () => {
        openPreview(img.currentSrc || img.src, img.alt || 'Imagem ampliada');
      });
    });

  closeBtn?.addEventListener('click', closePreview);
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) closePreview();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePreview();
  });
})();
