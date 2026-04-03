const inputs = document.querySelectorAll('#modal input, #modal textarea');

inputs.forEach(input=>{
  let saved = localStorage.getItem(input.id);
  if(saved) input.value = saved;

  input.addEventListener('input', ()=>{
    localStorage.setItem(input.id, input.value);
  });
});
