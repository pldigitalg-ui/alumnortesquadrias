export function initMenu() {
  const siteHeader = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      siteHeader?.classList.add("scrolled");
    } else {
      siteHeader?.classList.remove("scrolled");
    }
  });

  menuToggle?.addEventListener("click", () => {
    mobileMenu?.classList.toggle("active");
  });

  document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu?.classList.remove("active");
    });
  });
}
