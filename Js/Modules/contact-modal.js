export default function initContactModal() {
  const modal = document.getElementById('contactModal');
  const openBtns = document.querySelectorAll('[data-open-contact]');
  const closeBtns = document.querySelectorAll('[data-modal-close]');
  const form = document.getElementById('contactForm');

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.add('active');
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = form.nome.value;
    const telefone = form.telefone.value;
    const email = form.email.value;
    const servico = form.servico.value;
    const mensagem = form.mensagem.value;

    const text = `Olá! Vim pelo site da Alumnort e gostaria de um orçamento.%0A
Nome: ${nome}%0A
Telefone: ${telefone}%0A
Email: ${email}%0A
Serviço: ${servico}%0A
Mensagem: ${mensagem}`;

    window.open(`https://wa.me/553899658215?text=${text}`, '_blank');
  });
}
