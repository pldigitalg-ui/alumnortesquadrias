export function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxDescription = document.getElementById("lightboxDescription");
  const lightboxClose = document.getElementById("lightboxClose");
  const projectCards = document.querySelectorAll(".project-card");
  const closeTriggers = document.querySelectorAll("[data-lightbox-close]");

  if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxDescription || !projectCards.length) return;

  const openLightbox = (image, title, description) => {
    lightboxImage.src = image;
    lightboxImage.alt = title;
    lightboxTitle.textContent = title;
    lightboxDescription.textContent = description;
    lightbox.classList.add("is-active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");

    setTimeout(() => {
      lightboxImage.src = "";
      lightboxImage.alt = "";
      lightboxTitle.textContent = "";
      lightboxDescription.textContent = "";
    }, 250);
  };

  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      const image = card.dataset.lightboxImage || "";
      const title = card.dataset.lightboxTitle || "";
      const description = card.dataset.lightboxDescription || "";
      openLightbox(image, title, description);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  closeTriggers.forEach((trigger) => {
    trigger.addEventListener("click", closeLightbox);
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-active")) {
      closeLightbox();
    }
  });
}
