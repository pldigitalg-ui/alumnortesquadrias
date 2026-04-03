document.querySelectorAll('.lightbox').forEach(img=>{
  img.onclick = ()=>{
    let overlay = document.createElement('div');
    overlay.innerHTML = `<img src="${img.src}">`;
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    overlay.onclick = ()=>overlay.remove();
  }
});
