export function initCounter() {
  const counters = document.querySelectorAll(".stats__number");

  if (!counters.length) return;

  const animateCounter = (element) => {
    const target = Number(element.dataset.target || 0);
    const duration = 1600;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(target * easedProgress);

      element.textContent = currentValue.toString();

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toString();
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        animateCounter(entry.target);
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.5
    }
  );

  counters.forEach((counter) => observer.observe(counter));
}
