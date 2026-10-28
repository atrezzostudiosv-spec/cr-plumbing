/* Heating Installation: passive native-scroll overlay; no scroll interception. */
(() => {
  if (!document.body.classList.contains('cr-heating-installation')) return;
  const stages=[...document.querySelectorAll('[data-cr-cinematic-stage]')];
  if(stages.length!==2)return;
  const scenes=stages.map(stage=>({stage,section:stage.querySelector('section')}));
  if(scenes.some(x=>!x.section))return;
  const media=matchMedia('(min-width:821px) and (min-height:680px) and (prefers-reduced-motion:no-preference)');
  let ready=false,scrollQueued=false,measureQueued=false,zoomDist=0,revealDist=0;
  const clamp=x=>Math.max(0,Math.min(1,x));
  const ease=x=>x*x*(3-2*x);
  const head=()=>parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--head'))||83;
  function clear(){
    document.body.classList.remove('cr-cinema-ready');
    for(const {stage,section} of scenes){
      stage.style.removeProperty('--cr-cinema-stage-height');
      stage.style.removeProperty('--cr-cinema-overlap');
      section.removeAttribute('data-cr-cinema-phase');
      section.style.removeProperty('--cr-cinematic-zoom');
      section.style.removeProperty('--cr-cinema-enter-y');
    }
  }
  function measure(){
    measureQueued=false;
    if(!media.matches){ready=false;clear();return}
    document.body.classList.add('cr-cinema-ready');
    ready=true;
    zoomDist=Math.max(280,Math.min(450,innerHeight*.4));
    revealDist=Math.max(320,Math.min(530,innerHeight*.55));
    const firstHeight=scenes[0].section.offsetHeight;
    const secondHeight=scenes[1].section.offsetHeight;
    scenes[0].stage.style.setProperty('--cr-cinema-stage-height',(firstHeight+zoomDist+revealDist)+'px');
    scenes[1].stage.style.setProperty('--cr-cinema-stage-height',(secondHeight+revealDist+zoomDist)+'px');
    scenes[1].stage.style.setProperty('--cr-cinema-overlap',(-firstHeight-revealDist)+'px');
    update();
  }
  function update(){
    if(!ready)return;
    const first=scenes[0],second=scenes[1];
    const atFirst=first.stage.getBoundingClientRect().top+scrollY-head();
    const atSecond=second.stage.getBoundingClientRect().top+scrollY-head();
    const firstZoom=ease(clamp((scrollY-atFirst)/zoomDist));
    const firstRelease=atSecond+revealDist;
    const firstPhase=scrollY<atFirst?'before':scrollY>=firstRelease?'after':'pinned';
    if(first.section.dataset.crCinemaPhase!==firstPhase)first.section.dataset.crCinemaPhase=firstPhase;
    first.section.style.setProperty('--cr-cinematic-zoom',(1.012+.061*firstZoom).toFixed(4));
    let phase,travel=0,secondZoom=0;
    if(scrollY<atSecond){phase='before'}
    else if(scrollY<atSecond+revealDist){
      phase='entering';
      travel=ease(clamp((scrollY-atSecond)/revealDist));
    } else if(scrollY<atSecond+revealDist+zoomDist){
      phase='pinned';travel=1;
      secondZoom=ease(clamp((scrollY-atSecond-revealDist)/zoomDist));
    } else {
      phase='after';travel=1;secondZoom=1;
    }
    if(second.section.dataset.crCinemaPhase!==phase)second.section.dataset.crCinemaPhase=phase;
    second.section.style.setProperty('--cr-cinema-enter-y',((1-travel)*100).toFixed(3)+'%');
    second.section.style.setProperty('--cr-cinematic-zoom',(1.012+.061*secondZoom).toFixed(4));
  }
  function onScroll(){
    if(scrollQueued)return;
    scrollQueued=true;
    requestAnimationFrame(()=>{scrollQueued=false;update()});
  }
  function scheduleMeasure(){
    if(measureQueued)return;
    measureQueued=true;
    requestAnimationFrame(measure);
  }
  addEventListener('scroll',onScroll,{passive:true});
  addEventListener('resize',scheduleMeasure,{passive:true});
  addEventListener('load',scheduleMeasure,{once:true});
  media.addEventListener?.('change',scheduleMeasure);
  if('ResizeObserver' in window){
    let last=[0,0];
    const observer=new ResizeObserver(()=>{
      const sizes=scenes.map(x=>x.section.offsetHeight);
      if(sizes.some((size,i)=>Math.abs(size-last[i])>2)){last=sizes;scheduleMeasure()}
    });
    scenes.forEach(x=>observer.observe(x.section));
  }
  if(document.fonts?.ready)document.fonts.ready.then(scheduleMeasure);
  scheduleMeasure();
})();
