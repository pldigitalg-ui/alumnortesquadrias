export default function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDescription = document.getElementById('lightboxDescription');
  const lightboxClose = document.getElementById('lightboxClose');
  const clickableCards = document.querySelectorAll(
    '[data-lightbox-image]'
  );

  if (
    !lightbox ||
    !lightboxImage ||
    !lightboxTitle ||
    !lightboxDescription ||
    !lightboxClose ||
    !clickableCards.length
  ) {
    return;
  }

  const closeElements = lightbox.querySelectorAll('[data-lightbox-close]');

  const openLightbox = ({ image, title, description, alt }) => {
    lightboxImage.src = image;
    lightboxImage.alt = alt || title || 'Imagem ampliada';
    lightboxTitle.textContent = title || 'Projeto';
    lightboxDescription.textContent = description || '';
    lightbox.classList.add('is-active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-active');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    lightboxImage.alt = '';
    document.body.classList.remove('modal-open');
  };

  clickableCards.forEach((card) => {
    card.addEventListener('click', () => {
      const image = card.dataset.lightboxImage;
      const title = card.dataset.lightboxTitle;
      const description = card.dataset.lightboxDescription;
      const img = card.querySelector('img');
      const alt = img ? img.alt : title;

      openLightbox({ image, title, description, alt });
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);

  closeElements.forEach((element) => {
    element.addEventListener('click', closeLightbox);
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('is-active')) {
      closeLightbox();
    }
  });
}
