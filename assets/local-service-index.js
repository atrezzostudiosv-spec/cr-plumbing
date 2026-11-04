/* ATREZZO | CARDS 01 | progressive enhancement, no dependencies */
(() => {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const indexes = document.querySelectorAll('[data-atc-index]');
  indexes.forEach((root) => {
    const links = [...root.querySelectorAll('[data-atc-preview]')];
    const panels = [...root.querySelectorAll('[data-atc-panel]')];
    const count = root.querySelector('[data-atc-count]');
    if (!links.length || links.length !== panels.length) return;
    const setActive = (index) => {
      links.forEach((link, i) => link.classList.toggle('is-current', i === index));
      panels.forEach((panel, i) => panel.classList.toggle('is-active', i === index));
      if (count) count.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(links.length).padStart(2, '0');
    };
    setActive(0);
    links.forEach((link, index) => {
      link.addEventListener('pointerenter', (event) => { if (event.pointerType !== 'touch') setActive(index); });
      link.addEventListener('focus', () => setActive(index));
    });
  });

  // The default state is fully visible. Animation is opt-in and never required to read.
  const reveals = [...document.querySelectorAll('.atc-reveal')];
  if (!reduce.matches && 'IntersectionObserver' in window && reveals.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -35px 0px', threshold: 0.06 });
    reveals.forEach((el) => observer.observe(el));
    document.documentElement.classList.add('atc-motion-enabled');
  }
})();
