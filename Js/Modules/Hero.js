export default function initHero() {
  const slides = document.querySelectorAll('.hero__slide');
  const dots = document.querySelectorAll('.hero__dot');

  if (!slides.length || !dots.length) return;

  let currentIndex = 0;
  let autoPlay;

  const setActiveSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    currentIndex = index;
  };

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    setActiveSlide(nextIndex);
  };

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlay = setInterval(nextSlide, 5000);
  };

  const stopAutoPlay = () => {
    if (autoPlay) clearInterval(autoPlay);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      setActiveSlide(index);
      startAutoPlay();
    });
  });

  setActiveSlide(0);
  startAutoPlay();

  window.addEventListener('blur', stopAutoPlay);
  window.addEventListener('focus', startAutoPlay);
}
