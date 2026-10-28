/* CR Heating Installation: gentle scroll-linked photo zoom, no scroll interception.
   Only stage background layers animate; content, links, and FAQ remain stationary. */
(() => {
  if (!document.body.classList.contains('cr-heating-installation')) return;
  const stages = Array.from(document.querySelectorAll('[data-cr-cinematic-stage]'));
  if (stages.length !== 2 || !window.requestAnimationFrame) return;
  const supported = matchMedia('(min-width: 821px) and (min-height: 750px) and (prefers-reduced-motion: no-preference)');
  let pending = false;
  function update() {
    pending = false;
    const enabled = supported.matches;
    for (const stage of stages) {
      const scene = stage.querySelector('.cr-heating-full-background, .cr-process');
      if (!scene) continue;
      if (!enabled || getComputedStyle(scene).position !== 'sticky') {
        scene.style.removeProperty('--cr-cinematic-zoom');
        continue;
      }
      const start = stage.getBoundingClientRect().top + scrollY - (parseFloat(getComputedStyle(scene).top) || 83);
      const travel = Math.max(1, stage.getBoundingClientRect().height - scene.getBoundingClientRect().height);
      const p = Math.min(1, Math.max(0, (scrollY - start) / travel));
      const eased = p * p * (3 - 2 * p);
      scene.style.setProperty('--cr-cinematic-zoom', (1.012 + eased * .061).toFixed(4));
    }
  }
  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(update);
  }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  supported.addEventListener?.('change', schedule);
  schedule();
})();
