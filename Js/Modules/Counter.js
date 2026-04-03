document.querySelectorAll('[data-counter]').forEach(el=>{
  let target = +el.dataset.counter;
  let count = 0;

  let interval = setInterval(()=>{
    count += 5;
    el.innerText = count;

    if(count >= target){
      el.innerText = target;
      clearInterval(interval);
    }
  },20);
});
