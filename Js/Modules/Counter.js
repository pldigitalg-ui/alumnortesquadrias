export default function initCounter() {
  const counters = document.querySelectorAll('.stats__number');

  const run = (el) => {
    const target = +el.dataset.target;
    let count = 0;
    const speed = target / 100;

    const update = () => {
      count += speed;
      if (count < target) {
        el.innerText = Math.floor(count);
        requestAnimationFrame(update);
      } else {
        el.innerText = target;
      }
    };

    update();
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        run(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}
