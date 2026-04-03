const btn = document.getElementById('top');

window.addEventListener('scroll', ()=>{
  btn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

btn.onclick = ()=> window.scrollTo({top:0, behavior:'smooth'});
