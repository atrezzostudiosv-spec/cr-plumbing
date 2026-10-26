/* Cinematic but restrained photograph push-in; no scroll interception. */
(()=> {
 const section=document.getElementById('reviews');
 if(!section||!section.classList.contains('cr-reputation-photo'))return;
 const motion=matchMedia('(prefers-reduced-motion:reduce)');
 let ticking=false;
 function paint() {
   ticking=false;
   if(motion.matches) {section.style.removeProperty('--rep-zoom');return}
   const rect=section.getBoundingClientRect(),height=innerHeight||800;
   if(rect.bottom<0||rect.top>height)return;
   const progress=Math.max(0,Math.min(1,(height-rect.top)/(height+rect.height)));
   section.style.setProperty('--rep-zoom',(1.035+progress*.065).toFixed(4));
 }
 const onScroll=()=>{if(!ticking){ticking=true;requestAnimationFrame(paint)}};
 addEventListener('scroll',onScroll,{passive:true});
 addEventListener('resize',onScroll,{passive:true});
 motion.addEventListener('change',onScroll);
 paint();
})();
