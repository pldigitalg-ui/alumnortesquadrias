export default function initContactModal() {
  const modal = document.getElementById('contactModal');
  const form = document.getElementById('contactForm');
  const serviceField = document.getElementById('servico');
  const openButtons = document.querySelectorAll('[data-open-contact]');
  const closeButtons = document.querySelectorAll('[data-modal-close]');
  const closeIcon = document.getElementById('contactModalClose');

  if (!modal || !form || !openButtons.length) return;

  const whatsappNumber = '553899658215';

  const openModal = (service = '') => {
    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    if (service && serviceField) {
      serviceField.value = service;
    }
  };

  const closeModal = () => {
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  openButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const service = button.dataset.service || '';
      openModal(service);
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  if (closeIcon) {
    closeIcon.addEventListener('click', closeModal);
  }

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome')?.value.trim() || '';
    const telefone = document.getElementById('telefone')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const servico = document.getElementById('servico')?.value.trim() || '';
    const cidade = document.getElementById('cidade')?.value.trim() || '';
    const bairro = document.getElementById('bairro')?.value.trim() || '';
    const mensagem = document.getElementById('mensagem')?.value.trim() || '';

    const texto = [
      'Olá! Vim pelo site da ALUMNORT e gostaria de solicitar um orçamento.',
      '',
      `Nome: ${nome}`,
      `Telefone: ${telefone}`,
      `E-mail: ${email || 'Não informado'}`,
      `Serviço: ${servico || 'Não informado'}`,
      `Cidade: ${cidade || 'Não informada'}`,
      `Bairro/Região: ${bairro || 'Não informado'}`,
      `Mensagem: ${mensagem || 'Não informada'}`
    ].join('\n');

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');

    closeModal();
    form.reset();
  });
}
