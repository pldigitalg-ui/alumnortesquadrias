const modal = document.getElementById('modal');

document.querySelectorAll('[data-open-modal]').forEach(btn=>{
  btn.onclick = ()=> modal.style.display = 'flex';
});

modal.onclick = e=>{
  if(e.target === modal) modal.style.display='none';
};

document.getElementById('enviar').onclick = ()=>{
  let nome = document.getElementById('nome').value;

  let msg = `Olá, sou ${nome} e quero orçamento`;

  window.open(`https://wa.me/553899658215?text=${encodeURIComponent(msg)}`);
};
