/* CR Heating Installation: subtle scroll-linked photo movement only. */
(() => {
  const sections = [...document.querySelectorAll('.cr-heating-installation .cr-photo-chapter, .cr-heating-installation .cr-photo-process')];
  if (!sections.length) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 820px)');
  let queued = false;
  function render() {
    queued = false;
    const off = reduced.matches || mobile.matches;
    for (const section of sections) {
      if (off) { section.style.removeProperty('--heating-zoom'); continue; }
      const r = section.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) continue;
      const progress = Math.max(0, Math.min(1, (innerHeight-r.top)/(innerHeight+r.height)));
      section.style.setProperty('--heating-zoom', (1.025 + progress * .068).toFixed(4));
    }
  }
  function schedule() { if (!queued) { queued = true; requestAnimationFrame(render); } }
  addEventListener('scroll', schedule, { passive:true });
  addEventListener('resize', schedule, { passive:true });
  reduced.addEventListener?.('change', schedule);
  mobile.addEventListener?.('change', schedule);
  schedule();
})();
