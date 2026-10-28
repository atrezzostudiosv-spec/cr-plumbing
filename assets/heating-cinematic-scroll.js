/* Atrezzo / CR Plumbing: passive scroll-driven cinematic scenes.
   The browser retains normal scrolling, links and keyboard behavior. */
(() => {
  if (!document.body.classList.contains('cr-heating-installation')) return;
  const scenes=[...document.querySelectorAll('[data-cr-cinematic-stage]')].map(stage=>({stage,section:stage.querySelector('section')}));
  if(scenes.length!==2||scenes.some(x=>!x.section))return;
  const media=matchMedia('(min-width:821px) and (min-height:680px) and (prefers-reduced-motion:no-preference)');
  let queued=false;
  function render(){
    queued=false;
    const enabled=media.matches;
    document.body.classList.toggle('cr-cinema-ready',enabled);
    for(const {stage,section} of scenes){
      if(!enabled){
        section.removeAttribute('data-cr-cinema-phase');
        section.style.removeProperty('--cr-cinematic-zoom');
        continue;
      }
      const head=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--head'))||83;
      const top=stage.getBoundingClientRect().top+scrollY-head;
      const travel=Math.max(1,stage.offsetHeight-section.offsetHeight);
      const progress=Math.max(0,Math.min(1,(scrollY-top)/travel));
      const phase=scrollY<top?'before':scrollY>=top+travel?'after':'pinned';
      if(section.dataset.crCinemaPhase!==phase)section.dataset.crCinemaPhase=phase;
      const eased=progress*progress*(3-2*progress);
      section.style.setProperty('--cr-cinematic-zoom',(1.012+eased*.061).toFixed(4));
    }
  }
  function schedule(){if(!queued){queued=true;requestAnimationFrame(render);}}
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule,{passive:true});
  media.addEventListener?.('change',schedule);
  schedule();
})();
