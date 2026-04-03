export function initContactModal() {
  const modal = document.getElementById("contactModal");
  const backdrop = document.getElementById("contactModalBackdrop");
  const closeBtn = document.getElementById("contactModalClose");
  const buttons = document.querySelectorAll(".open-contact-modal");
  const form = document.getElementById("contactForm");

  if (!modal) return;

  function openModal(e) {
    if (e) e.preventDefault();
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  buttons.forEach(btn => btn.addEventListener("click", openModal));
  backdrop?.addEventListener("click", closeModal);
  closeBtn?.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome")?.value.trim() || "";
    const telefone = document.getElementById("telefone")?.value.trim() || "";
    const servico = document.getElementById("servico")?.value.trim() || "";
    const mensagem = document.getElementById("mensagem")?.value.trim() || "";

    const texto = `Olá, vim pelo site da Alumnorte.
Nome: ${nome}
WhatsApp: ${telefone}
Serviço: ${servico}
Detalhes: ${mensagem || "Não informado"}`;

    const url = `https://wa.me/5538996580215?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
  });
}
