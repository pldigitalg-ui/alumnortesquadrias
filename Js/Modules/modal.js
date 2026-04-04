export default function initContactModal() {
  const modal = document.getElementById('contactModal');
  if (!modal) return;

  const body = document.body;
  const openButtons = document.querySelectorAll('[data-open-contact]');
  const closeButtons = modal.querySelectorAll('[data-modal-close], #contactModalClose');
  const overlay = modal.querySelector('.contact-modal__overlay');
  const form = document.getElementById('contactForm');
  const serviceField = document.getElementById('servico');
  const firstField = document.getElementById('nome');

  const WHATSAPP_NUMBER = '5538999658215';

  let lastFocusedElement = null;

  function lockBody() {
    body.classList.add('modal-open');
  }

  function unlockBody() {
    body.classList.remove('modal-open');
  }

  function openModal(service = '') {
    lastFocusedElement = document.activeElement;

    if (service && serviceField) {
      serviceField.value = service;
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    lockBody();

    window.requestAnimationFrame(() => {
      if (firstField) firstField.focus();
    });
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    unlockBody();

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  openButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const service = button.dataset.service || '';
      openModal(service);
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  if (overlay) {
    overlay.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  function onlyDigits(value) {
    return value.replace(/\D/g, '');
  }

  function formatPhone(value) {
    const digits = onlyDigits(value).slice(0, 11);

    if (digits.length <= 10) {
      return digits.replace(/^(\d{0,2})(\d{0,4})(\d{0,4}).*/, (_, a, b, c) => {
        let result = '';
        if (a) result += `(${a}`;
        if (a.length === 2) result += ') ';
        if (b) result += b;
        if (c) result += `-${c}`;
        return result;
      });
    }

    return digits.replace(/^(\d{0,2})(\d{0,5})(\d{0,4}).*/, (_, a, b, c) => {
      let result = '';
      if (a) result += `(${a}`;
      if (a.length === 2) result += ') ';
      if (b) result += b;
      if (c) result += `-${c}`;
      return result;
    });
  }

  const phoneField = document.getElementById('telefone');
  if (phoneField) {
    phoneField.addEventListener('input', (event) => {
      event.target.value = formatPhone(event.target.value);
    });
  }

  function getFieldValue(id) {
    const field = document.getElementById(id);
    return field ? field.value.trim() : '';
  }

  function validateForm() {
    const nome = getFieldValue('nome');
    const telefone = onlyDigits(getFieldValue('telefone'));
    const servico = getFieldValue('servico');

    if (!nome) {
      alert('Preencha o nome.');
      document.getElementById('nome')?.focus();
      return false;
    }

    if (telefone.length < 10) {
      alert('Preencha um telefone válido.');
      document.getElementById('telefone')?.focus();
      return false;
    }

    if (!servico) {
      alert('Selecione o serviço.');
      document.getElementById('servico')?.focus();
      return false;
    }

    return true;
  }

  function buildMessage() {
    const nome = getFieldValue('nome');
    const telefone = getFieldValue('telefone');
    const email = getFieldValue('email');
    const servico = getFieldValue('servico');
    const cidade = getFieldValue('cidade');
    const bairro = getFieldValue('bairro');
    const endereco = getFieldValue('endereco');
    const mensagem = getFieldValue('mensagem');

    const lines = [
      'Olá! Vim pelo site da ALUMNORT e gostaria de solicitar um orçamento.',
      '',
      '*DADOS DO CLIENTE*',
      `*Nome:* ${nome || '-'}`,
      `*Telefone:* ${telefone || '-'}`,
      `*E-mail:* ${email || '-'}`,
      '',
      '*DETALHES DO SERVIÇO*',
      `*Serviço:* ${servico || '-'}`,
      `*Cidade:* ${cidade || '-'}`,
      `*Bairro / Região:* ${bairro || '-'}`,
      `*Endereço:* ${endereco || '-'}`,
      '',
      '*Mensagem:*',
      mensagem || '-'
    ];

    return lines.join('\n');
  }

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!validateForm()) return;

      const message = buildMessage();
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

      window.open(url, '_blank', 'noopener,noreferrer');
      closeModal();
    });
  }

  return {
    openModal,
    closeModal
  };
}
