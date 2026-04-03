export function initCounter() {
  const counters = document.querySelectorAll(".counter");
  const section = document.querySelector(".metrics-band");

  if (!counters.length || !section) return;

  let started = false;

  function animateCounter(counter) {
    const target = Number(counter.dataset.target || 0);
    const duration = 1600;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      counter.textContent = value;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        counters.forEach(animateCounter);
      }
    });
  }, { threshold: 0.35 });

  observer.observe(section);
}
