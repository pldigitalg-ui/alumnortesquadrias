let slides = document.querySelectorAll('.hero img');
let index = 0;

setInterval(()=>{
  slides[index].style.display="none";
  index = (index+1)%slides.length;
  slides[index].style.display="block";
},4000);
