/* ATREZZO — Pinned sequential story: Plumbing → HVAC → Electrical → Gas. */
(() => {
  const story = document.querySelector('#services .chapter-scroll');
  if (!story) return;
  const stage = story.querySelector('.chapter-stage');
  const scenes = [...story.querySelectorAll('.scene')];
  if (!stage || scenes.length < 2) return;

  const motionOff = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 760px)');
  let pinned = false, ticking = false;
  const clamp = (v, min=0, max=1) => Math.max(min, Math.min(max,v));
  const ease = (t) => t*t*(3-2*t);

  // One stage stays in place; each incoming scene slides over the previous
  // after a meaningful hold, then stays visible before the next chapter.
  function frame() {
    ticking = false;
    if (!pinned) return;
    const rect = story.getBoundingClientRect();
    const pinTop = document.querySelector('.site-head')?.getBoundingClientRect().height || 83;
    const travel = Math.max(1, rect.height - stage.getBoundingClientRect().height);
    const progress = clamp((pinTop - rect.top) / travel);
    const total = scenes.length;
    // Each scene arrives gradually over a longer scroll distance. The gaps
    // between entrances let visitors actually look at each photograph.
    const transitionDuration = .16;
    const entranceStarts = Array.from({length: total}, (_, i) =>
      i === 0 ? 0 : .17 + (i - 1) * .25
    );
    let foreground = 0;

    scenes.forEach((scene, i) => {
      const start = entranceStarts[i];
      const entrance = i === 0 ? 1 : ease(clamp((progress - start) / transitionDuration));
      const translate = i === 0 ? 0 : (1 - entrance) * 100;
      scene.style.setProperty('--scene-enter', translate.toFixed(3) + '%');
      scene.style.setProperty('--scene-order', String(i + 1));

      const nextStart = entranceStarts[i + 1];
      const outgoing = i < total - 1
        ? ease(clamp((progress - nextStart) / transitionDuration))
        : 0;

      // A measured 6.8% push-in, controlled by scroll throughout the scene's
      // visible lifespan—not just at the instant the next chapter arrives.
      const zoomEnd = i < total - 1 ? nextStart + transitionDuration : 1;
      const zoomStart = i === 0 ? 0 : start;
      const zoomProgress = ease(clamp(
        (progress - zoomStart) / Math.max(.001, zoomEnd - zoomStart)
      ));
      const zoom = 1.025 + .068 * zoomProgress;
      scene.style.setProperty('--scene-scale', zoom.toFixed(4));
      scene.style.setProperty('--copy-opacity', String(clamp(1 - outgoing * .4).toFixed(3)));
      scene.style.setProperty('--copy-y', (outgoing * -12).toFixed(1) + 'px');

      if (i > 0 && entrance >= .5) foreground = i;
    });

    scenes.forEach((scene,i)=>{
      const active = foreground === i;
      scene.classList.toggle('is-active', active);
      scene.inert = !active;
      scene.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
  }
  function requestFrame() {
    if (pinned && !ticking) { ticking=true; requestAnimationFrame(frame); }
  }
  function mode() {
    const enable = !motionOff.matches && !mobile.matches;
    if (pinned === enable) { requestFrame(); return; }
    pinned = enable;
    story.classList.toggle('is-pinned', enable);
    if (!enable) {
      scenes.forEach(scene => {
        scene.classList.remove('is-active');
        scene.inert=false;
        scene.removeAttribute('aria-hidden');
        for(const key of ['--scene-enter','--scene-order','--scene-scale','--copy-opacity','--copy-y']){
          scene.style.removeProperty(key);
        }
      });
    } else {
      scenes.forEach((scene,i)=> {
        scene.style.setProperty('--scene-enter', i === 0 ? '0%' : '100%');
        scene.style.setProperty('--scene-order', String(i+1));
      });
      requestFrame();
    }
  }
  addEventListener('scroll', requestFrame, {passive:true});
  addEventListener('resize', requestFrame, {passive:true});
  motionOff.addEventListener('change', mode);
  mobile.addEventListener('change', mode);
  mode();

  // Retain editorial scroll reveals outside the pinned chapter.
  const reveal = document.querySelectorAll('.reveal');
  if(motionOff.matches || !('IntersectionObserver' in window)){
    reveal.forEach(el=>el.classList.add('in'));
  } else {
    const io = new IntersectionObserver(entries => entries.forEach(item=>{
      if(item.isIntersecting){item.target.classList.add('in');io.unobserve(item.target);}
    }), {threshold:.12});
    reveal.forEach(el=>io.observe(el));
  }
})();
