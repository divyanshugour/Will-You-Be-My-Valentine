document.addEventListener('DOMContentLoaded', ()=>{
  const heartsLayer = document.getElementById('hearts');
  spawnHearts(18);
  setInterval(()=>spawnHearts(4), 900);
  initButtons();

  function spawnHearts(n){
    for(let i=0;i<n;i++){
      const s = document.createElement('span');
      s.className = 'heart';
      s.textContent = Math.random() > .5 ? '💖' : '❤️';
      const size = 18 + Math.floor(Math.random()*36);
      s.style.fontSize = size + 'px';
      s.style.left = (Math.random()*100) + 'vw';
      const dur = 6 + Math.random()*8;
      s.style.animationDuration = dur + 's, ' + (2 + Math.random()*4) + 's';
      s.style.opacity = (0.6 + Math.random()*0.5).toFixed(2);
      heartsLayer.appendChild(s);
      setTimeout(()=> s.remove(), (dur+1)*1000);
    }
  }

  function initButtons(){
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');

    function moveNo(immediate){
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      const padding = 24;
      let x, y;
      const yesRect = yesBtn.getBoundingClientRect();
      for(let tries=0; tries<20; tries++){
        x = padding + Math.random()*(vw - padding*2);
        y = padding + Math.random()*(vh - padding*2);
        if(!(x > yesRect.left-80 && x < yesRect.right+80 && y > yesRect.top-80 && y < yesRect.bottom+80)) break;
      }
      noBtn.style.transition = immediate ? 'none' : 'left 0.28s ease, top 0.28s ease, transform 0.2s';
      noBtn.style.left = x + 'px';
      noBtn.style.top = y + 'px';
      noBtn.style.transform = 'translate(-50%,-50%) scale(1.04)';
      setTimeout(()=> noBtn.style.transform = 'translate(-50%,-50%) scale(1)', 220);
    }

    ['mouseenter','mousedown','touchstart','focus'].forEach(ev => {
      noBtn.addEventListener(ev, (e)=>{ e.preventDefault(); moveNo(); });
    });
    noBtn.addEventListener('click', (e)=>{ e.preventDefault(); moveNo(); });

    yesBtn.addEventListener('click', ()=>{
      for(let i=0;i<30;i++) spawnHearts(4);
      yesBtn.textContent = 'Yay! 💞';
      yesBtn.disabled = true;
    });
  }
});
