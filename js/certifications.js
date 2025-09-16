// Certifications page script (extracted to avoid any inline rendering glitches)
// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Starfield + orbits (same as index)
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [], linkIdx = [], w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 1.5), mouse = {x:0,y:0};
function resize(){ w = canvas.clientWidth = window.innerWidth; h = canvas.clientHeight = window.innerHeight; canvas.width = Math.floor(w*dpr); canvas.height = Math.floor(h*dpr); ctx.setTransform(dpr,0,0,dpr,0,0); init(); }
function R(a,b){ return Math.random()*(b-a)+a }
function init(){ const count = Math.floor((w*h)/1800); stars = new Array(count).fill(0).map(()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()<0.6?R(0.3,0.9):R(0.9,1.5),a:R(0.35,1),tw:R(0.002,0.02),vx:R(-0.02,0.02),vy:R(-0.02,0.02)})); const maxLinks = w<640?60:(w<1024?90:120); linkIdx = Array.from({length:Math.min(maxLinks,stars.length)},(_,i)=>i); }
function draw(){ ctx.clearRect(0,0,w,h); const g=ctx.createRadialGradient(w/2,h/2,0,w/2,h/2,Math.max(w,h)/1.2); g.addColorStop(0,'rgba(5,8,7,0)'); g.addColorStop(1,'rgba(3,6,5,0.45)'); ctx.fillStyle=g; ctx.fillRect(0,0,w,h); for(const s of stars){ s.a+=s.tw; const al=0.5+0.5*Math.sin(s.a); s.x+=s.vx; s.y+=s.vy; if(s.x<0)s.x=w; if(s.x>w)s.x=0; if(s.y<0)s.y=h; if(s.y>h)s.y=0; const dx=(mouse.x-w/2)*0.0008, dy=(mouse.y-h/2)*0.0008; ctx.beginPath(); ctx.arc(s.x+dx*s.r*120,s.y+dy*s.r*120,s.r,0,Math.PI*2); ctx.fillStyle=`rgba(180,255,210,${0.7*al})`; ctx.fill(); if(al>0.98 && s.r>0.8){ ctx.fillStyle='rgba(120,255,180,0.85)'; ctx.fillRect(s.x-0.5,s.y-0.5,1,1);} } const maxDist=120; for(let i=0;i<linkIdx.length;i++){ const s1=stars[linkIdx[i]]; if(!s1)continue; for(let j=i+1;j<linkIdx.length;j++){ const s2=stars[linkIdx[j]]; if(!s2)continue; const dx=s1.x-s2.x, dy=s1.y-s2.y, dist=Math.hypot(dx,dy); if(dist<maxDist){ const a=1-dist/maxDist; ctx.strokeStyle=`rgba(120,255,180,${0.06*a})`; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(s1.x,s1.y); ctx.lineTo(s2.x,s2.y); ctx.stroke(); } } } }
function loop(){ draw(); requestAnimationFrame(loop); }
window.addEventListener('resize',resize); window.addEventListener('mousemove',e=>{mouse.x=e.clientX; mouse.y=e.clientY}); resize(); loop();
function spin(){ anime({targets:'.orbit-1',rotate:'1turn',duration:60000,easing:'linear',loop:true}); anime({targets:'.orbit-2',rotate:'1turn',duration:90000,easing:'linear',loop:true,direction:'reverse'}); anime({targets:'.orbit-3',rotate:'1turn',duration:130000,easing:'linear',loop:true}); }
window.addEventListener('DOMContentLoaded',spin);

// Lightbox
const grid = document.getElementById('certGrid');
const overlay = document.getElementById('overlay');
const frame = document.getElementById('viewer');
const titleEl = document.getElementById('modalTitle');

grid.addEventListener('click', (e)=>{
  const card = e.target.closest('.card'); if(!card) return;
  const src = card.dataset.src; titleEl.textContent = card.dataset.title || 'Document';
  frame.src = src; // native rendering for PDFs and images
  overlay.style.display = 'flex';
});

document.getElementById('closeBtn').addEventListener('click', ()=>{ overlay.style.display='none'; frame.src=''; });
overlay.addEventListener('click', (e)=>{ if(e.target===overlay){ overlay.style.display='none'; frame.src=''; }});

// PDF thumbnails
function whenReady(cb){ if(window.pdfjsLib){ cb(); } else setTimeout(()=>whenReady(cb), 40); }
function thumbFallback(c,url){ const cctx=c.getContext('2d'); cctx.fillStyle='#0c1411'; cctx.fillRect(0,0,c.width,c.height); cctx.fillStyle='#9edfb9'; cctx.font='14px system-ui'; cctx.fillText('Open PDF',10,24); }
async function renderThumb(c,url){ try{ const pdf=await window.pdfjsLib.getDocument(url).promise; const page=await pdf.getPage(1); const viewport=page.getViewport({scale:1}); const scale=Math.min(c.width/viewport.width,c.height/viewport.height); const vp=page.getViewport({scale}); c.width=vp.width; c.height=vp.height; await page.render({canvasContext:c.getContext('2d'),viewport:vp}).promise; }catch(e){ thumbFallback(c,url); } }
whenReady(()=>{ document.querySelectorAll('.pdf-thumb').forEach(c=>{ const u=c.getAttribute('data-pdf'); if(!u) return; let done=false; const t=setTimeout(()=>{ if(!done) thumbFallback(c,u); },2500); renderThumb(c,u).finally(()=>{ done=true; clearTimeout(t); }); }); });
