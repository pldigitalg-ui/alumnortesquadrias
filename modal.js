document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const modal = document.getElementById('contactModal');
  const form = document.getElementById('contactForm');
  const serviceField = document.getElementById('servico');

  const openButtons = document.querySelectorAll('[data-open-contact]');
  const closeButtons = document.querySelectorAll('[data-close-contact]');

  function openModal(service = '') {
    if (!modal) return;

    modal.classList.add('active');
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    body.classList.add('modal-open');

    if (serviceField) {
      serviceField.value = service;
    }
  }

  function closeModal() {
    if (!modal) return;

    modal.classList.remove('active');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    body.classList.remove('modal-open');
  }

  openButtons.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const service = this.dataset.service || '';
      openModal(service);
    });
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      closeModal();
    });
  });

  modal?.addEventListener('click', function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  form?.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome')?.value || '';
    const whatsapp = document.getElementById('whatsapp')?.value || '';
    const servico = document.getElementById('servico')?.value || '';
    const cidade = document.getElementById('cidade')?.value || '';
    const endereco = document.getElementById('endereco')?.value || '';
    const detalhes = document.getElementById('detalhes')?.value || '';

    const mensagem = encodeURIComponent(
      `Olá! Vim pelo site da ALUMNORT.\n\n` +
      `Nome: ${nome}\n` +
      `WhatsApp: ${whatsapp}\n` +
      `Serviço: ${servico}\n` +
      `Cidade: ${cidade}\n` +
      `Endereço: ${endereco}\n` +
      `Detalhes: ${detalhes}`
    );

    window.open(`https://wa.me/553899658215?text=${mensagem}`, '_blank');
    closeModal();
    form.reset();
  });
});
