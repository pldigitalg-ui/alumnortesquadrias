export default function initScrollTop() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  if (!scrollTopBtn) return;

  const toggleButton = () => {
    if (window.scrollY > 350) {
      scrollTopBtn.classList.add('is-visible');
    } else {
      scrollTopBtn.classList.remove('is-visible');
    }
  };

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  toggleButton();
  window.addEventListener('scroll', toggleButton);
}
