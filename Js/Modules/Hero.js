export function initHero() {
  const slides = document.querySelectorAll(".hero__slide");
  const dots = document.querySelectorAll(".hero__dot");

  if (!slides.length || !dots.length) return;

  let currentIndex = 0;
  let intervalId = null;
  const autoplayDelay = 5000;

  const goToSlide = (index) => {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === index);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === index);
    });

    currentIndex = index;
  };

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex);
  };

  const startAutoplay = () => {
    stopAutoplay();
    intervalId = window.setInterval(nextSlide, autoplayDelay);
  };

  const stopAutoplay = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index);
      startAutoplay();
    });
  });

  const hero = document.querySelector(".hero");

  if (hero) {
    hero.addEventListener("mouseenter", stopAutoplay);
    hero.addEventListener("mouseleave", startAutoplay);
    hero.addEventListener("touchstart", stopAutoplay, { passive: true });
    hero.addEventListener("touchend", startAutoplay, { passive: true });
  }

  goToSlide(0);
  startAutoplay();
}
