// Minimal JS to enable CRT theme and small toasts
(function(){
  const body = document.body;
  function enable(){ body.classList.add('theme-crt'); }
  function toast(msg){
    const t = document.createElement('div');
    t.textContent = msg;
    Object.assign(t.style, {
      position:'fixed', right:'14px', top:'14px', padding:'8px 12px', border:'1px solid rgba(100,255,143,0.25)',
      background:'rgba(10,20,16,0.7)', color:'#c8ffe1', borderRadius:'8px', zIndex:9999,
      boxShadow:'0 0 14px rgba(100,255,143,0.18)', fontFamily:'JetBrains Mono, monospace', fontSize:'12px'
    });
    document.body.appendChild(t);
    setTimeout(()=> t.remove(), 1400);
  }
  // Enable by default
  if (!body.classList.contains('theme-crt')) enable();

  // Anchor arrival cue
  if (location.hash) {
    setTimeout(()=> toast('BOOT … OK'), 400);
  }

  // Export minimal API if needed elsewhere
  window.CRTTheme = { enable, toast };
})();
