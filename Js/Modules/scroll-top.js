export default function initScrollTop() {
  const btn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
