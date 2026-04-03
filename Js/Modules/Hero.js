export function initHero() {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");

  if (!slides.length || !dots.length) return;

  let current = 0;
  let intervalId = null;

  function showSlide(index) {
    slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    current = index;
  }

  function nextSlide() {
    const next = (current + 1) % slides.length;
    showSlide(next);
  }

  function start() {
    intervalId = setInterval(nextSlide, 5000);
  }

  function reset() {
    clearInterval(intervalId);
    start();
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      reset();
    });
  });

  start();
}
