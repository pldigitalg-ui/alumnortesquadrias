export function initContactModal() {
  const modal = document.getElementById("contactModal");
  const form = document.getElementById("contactForm");
  const modalClose = document.getElementById("contactModalClose");
  const openButtons = document.querySelectorAll("[data-open-contact]");
  const closeButtons = document.querySelectorAll("[data-modal-close]");
  const serviceSelect = document.getElementById("servico");

  if (!modal || !form || !openButtons.length) return;

  const whatsappNumber = "553899658215";
  const defaultMessage = "Olá! Vim pelo site da Alumnort e gostaria de solicitar um orçamento.";

  const openModal = (service = "") => {
    modal.classList.add("is-active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (service && serviceSelect) {
      serviceSelect.value = service;
    }
  };

  const closeModal = () => {
    modal.classList.remove("is-active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const service = button.dataset.service || "";
      openModal(service);
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-active")) {
      closeModal();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome")?.value.trim() || "";
    const telefone = document.getElementById("telefone")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const servico = document.getElementById("servico")?.value.trim() || "";
    const mensagem = document.getElementById("mensagem")?.value.trim() || "";

    const texto = [
      defaultMessage,
      "",
      "*Dados do contato:*",
      `Nome: ${nome}`,
      `Telefone: ${telefone}`,
      `E-mail: ${email || "Não informado"}`,
      `Tipo de serviço: ${servico || "Não informado"}`,
      `Mensagem: ${mensagem || "Não informada"}`
    ].join("\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    closeModal();
    form.reset();
  });
}
