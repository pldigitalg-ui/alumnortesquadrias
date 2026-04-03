export function initScrollTop() {
  const button = document.getElementById("scrollTopBtn");

  if (!button) return;

  const toggleVisibility = () => {
    if (window.scrollY > 420) {
      button.classList.add("is-visible");
    } else {
      button.classList.remove("is-visible");
    }
  };

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  toggleVisibility();
  window.addEventListener("scroll", toggleVisibility, { passive: true });
}
