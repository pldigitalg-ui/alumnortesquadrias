export function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const backdrop = document.getElementById("lightboxBackdrop");
  const closeBtn = document.getElementById("lightboxClose");
  const triggers = document.querySelectorAll(".lightbox-trigger");

  if (!lightbox || !lightboxImage || !lightboxCaption || !triggers.length) return;

  function closeLightbox() {
    lightbox.classList.remove("active");
    lightboxImage.src = "";
    document.body.style.overflow = "";
  }

  triggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      const image = trigger.getAttribute("data-image");
      const title = trigger.getAttribute("data-title") || "";
      lightboxImage.src = image;
      lightboxCaption.textContent = title;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  backdrop?.addEventListener("click", closeLightbox);
  closeBtn?.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}
