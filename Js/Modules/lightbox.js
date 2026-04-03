export default function initLightbox() {
  const cards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImage');
  const title = document.getElementById('lightboxTitle');
  const desc = document.getElementById('lightboxDescription');

  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      img.src = card.dataset.lightboxImage;
      title.textContent = card.dataset.lightboxTitle;
      desc.textContent = card.dataset.lightboxDescription;

      modal.classList.add('active');
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target.dataset.lightboxClose !== undefined || e.target.id === 'lightbox') {
      modal.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.classList.remove('active');
  });
}
