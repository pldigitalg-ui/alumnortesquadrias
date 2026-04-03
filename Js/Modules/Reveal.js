const reveals = document.querySelectorAll('.section');

window.addEventListener('scroll', ()=>{
  reveals.forEach(el=>{
    if(el.getBoundingClientRect().top < window.innerHeight){
      el.classList.add('show');
    }
  });
});
