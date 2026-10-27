/* ATREZZO — content-preserving, progressive internal-page enhancements.
  All 66 service pages get their own real-source photo pairing, chapter navigation,
  quiet motion and consistent Lucide-style SVG icons. HOME IS NOT TOUCHED. */
(() => {
  const body = document.body;
  if (!body || !body.classList.contains('cr-detail')) return;
  const BASE = '/cr-plumbing';
  const motionOff = matchMedia('(prefers-reduced-motion: reduce)');
  const svg = (type) => {
    const paths = {
      'arrow-up-right':'<path d="M7 17 17 7M7 7h10v10"/>',
      'chevron-down':'<path d="m6 9 6 6 6-6"/>',
      'plus':'<path d="M12 5v14M5 12h14"/>',
      'menu':'<path d="M4 6h16M4 12h16M4 18h16"/>',
      'close':'<path d="M18 6 6 18M6 6l12 12"/>',
      'book':'<path d="M4 19.5V4.3A2.3 2.3 0 0 1 6.3 2H20v20H6.3A2.3 2.3 0 0 1 4 19.7Z"/><path d="M4 18a2 2 0 0 1 2-2h14"/>',
      'droplets':'<path d="M12 22a7 7 0 0 0 7-7c0-4-7-13-7-13S5 11 5 15a7 7 0 0 0 7 7Z"/>',
      'wind':'<path d="M3 8h12a4 4 0 1 0-4-4M2 12h17a3 3 0 1 1-3 3M3 16h7a3 3 0 1 1-3 3"/>',
      'zap':'<path d="m13 2-3 8H5l10 12-1-8h5l-6-12Z"/>',
      'flame':'<path d="M12 22a7 7 0 0 0 7-7c0-3.8-2.2-6.2-4-8-1 4-3 2-2-5-5.7 5.5-8 9.2-8 13a7 7 0 0 0 7 7Z"/>'
    };
    return `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="cr-x-icon" viewBox="0 0 24 24">${paths[type]||paths['arrow-up-right']}</svg>`;
  };
  const addIcons = root => {
    root.querySelectorAll('a,button').forEach(el => {
      if (el.closest('svg') || el.dataset.crSvgDone) return;
      if (el.querySelector('.cr-x-icon')) return;
      for (const child of [...el.childNodes]) {
        if (child.nodeType === Node.TEXT_NODE && /↗\s*$/.test(child.textContent)) {
          child.textContent = child.textContent.replace(/\s*↗\s*$/, ' ');
          el.insertAdjacentHTML('beforeend',svg('arrow-up-right'));
          el.dataset.crSvgDone='1'; return;
        }
      }
      const marker=[...el.querySelectorAll('span')].find(x => x.textContent.trim() === '↗' && x.children.length===0);
      if(marker){marker.innerHTML=svg('arrow-up-right');el.dataset.crSvgDone='1'}
    });
    root.querySelectorAll('details.cr-qa summary').forEach(el => {
      if(!el.querySelector('.cr-x-icon'))el.insertAdjacentHTML('beforeend',svg('plus'));
    });
    root.querySelectorAll('details.cr-job .cr-job-plus').forEach(el=>{el.innerHTML=svg('plus')});
  };
  // Career descriptions arrive in the source archive as single uninterrupted strings.
  // Restore heading/paragraph hierarchy while preserving their textContent byte for byte.
  const jobHeadings = [
    'MINIMUM QUALIFICATIONS (KNOWLEDGE, SKILLS, AND ABILITIES)',
    'PHYSICAL DEMANDS AND WORK ENVIRONMENT',
    'JOB DUTIES AND RESPONSIBILITIES',
    'WHAT SEPARATES OUR TOP ELECTRICIANS',
    'WHAT YOU\u2019LL BE DOING', 'WHAT YOU’LL BE DOING',
    'WHAT WE\u2019RE LOOKING FOR', 'WHAT WE’RE LOOKING FOR',
    'PERFORMANCE EXPECTATIONS','WHO THIS IS NOT FOR',
    'POSITION SUMMARY','MINIMUM QUALIFICATIONS',
    'READ THIS FIRST','GROWTH PATH',
    'WHAT YOU WILL DO','REQUIREMENTS','RESPONSIBILITIES',
    'COMPENSATION','BENEFITS','QUALIFICATIONS',
    'WORK ENVIRONMENT'
  ];
  const safeReg = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Prefix word boundaries prevent matching common running text.
  const jobRx = new RegExp('(?:'+jobHeadings.map(safeReg).join('|')+')','g');
  document.querySelectorAll('.cr-job-body').forEach(container => {
    if(container.dataset.crFormatted)return;
    const original=container.textContent;
    const matches=[...original.matchAll(jobRx)];
    if(matches.length<2)return;
    const wrap=document.createDocumentFragment();
    let from=0;
    const appendText=raw=>{
      if(!raw)return;
      const items=raw.split(/(?=•)/);
      for(const item of items){
        if(!item)continue;
        const p=document.createElement('p');
        p.className=item.startsWith('•')?'cr-job-point':'cr-job-copy';
        p.textContent=item;wrap.appendChild(p);
      }
    };
    for(const m of matches){
      appendText(original.slice(from,m.index));
      const h=document.createElement('h4');h.className='cr-job-subhead';h.textContent=m[0];
      wrap.appendChild(h);from=m.index+m[0].length;
    }
    appendText(original.slice(from));
    // Literal text equality is a safety check, not an approximation.
    if(wrap.textContent===original){container.replaceChildren(wrap);container.dataset.crFormatted='1'}
  });
  // No information is removed from the source; only decorative arrow glyphs are
  // replaced with consistent scalable icon drawings.
  addIcons(document);
  const main = document.querySelector('main.cr-page');
  if(!main) return;
  // Remove migration-only labels from the public presentation, without touching source content.
  for(const node of main.querySelectorAll('.cr-process .cr-hero-kicker, .cr-docu-media .cr-hero-kicker')){
    const label=node.textContent.trim();
    if(/^from (the )?original service page$/i.test(label) || /^from the service page$/i.test(label)){
      node.textContent=node.closest('.cr-process')?'Service process':'Service overview';
    }
  }
  if(!main.id) main.id='main-content';
  const skip=document.createElement('a');skip.className='cr-skip-link';skip.href='#main-content';skip.textContent='Skip to content';body.insertBefore(skip,body.firstChild);

  const hero=main.querySelector('.cr-page-hero');
  const sections=[...main.querySelectorAll('.cr-detail-band')];
  if(!hero||!sections.length)return; // Corporate and utility pages keep their own structures.

  const categoryForIcon=hero.classList.contains('cr-page-hero--plumbing')?'droplets':hero.classList.contains('cr-page-hero--hvac')?'wind':hero.classList.contains('cr-page-hero--electrical')?'zap':'flame';
  hero.querySelector('.cr-hero-kicker')?.insertAdjacentHTML('afterbegin',svg(categoryForIcon)+' ');
  // Group dense content by its structure. The text nodes, order, headings and
  // paragraphs remain identical; we never truncate or collapse informational copy.
  sections.forEach((section,i)=>{
    section.id='cr-chapter-'+(i+1);
    const title=section.querySelector('.cr-chapter-heading h2')?.textContent||'';
    const rows=section.querySelectorAll('.cr-list-row');
    const hasLongCopy=[...rows].some(x=>x.textContent.length>320);
    const words=section.textContent.trim().split(/\s+/).length;
    const steps=/\b(how|steps|process|install|testing|method|sequence)\b/i.test(title)&&rows.length>=3;
    let type=i===0?'opening':steps?'steps':(i%3===1?'analysis':'chapter');
    section.classList.add('cr-chapter--'+type,'cr-chapter--'+(i%2===0?'even':'odd'));
    if(hasLongCopy || (words>380&&rows.length<5))section.querySelector('.cr-list-rows')?.classList.add('cr-rows--narrative');
    section.querySelectorAll('.cr-list-row p').forEach(p=>{if(!p.getAttribute('lang'))p.setAttribute('lang','en')});
  });

  // Source-backed chapter navigation. Phase 3 pilot gets a native details menu
  // at tablet/mobile breakpoints; unapproved service pages keep the old fallback.
  const index=document.createElement('nav');
  index.className='cr-reading-index';
  index.setAttribute('aria-label','On this service page');
  const pilotGuide=body.classList.contains('cr-template-v1');
  // Short labels avoid oversized multi-row navigation without changing page headings.
  const guideLabels={
    '/plumbing-services/water-heaters/':['Overview','Water Heater Services','Repair & Maintenance'],
    '/hvac/dryer-vent-duct/':['Overview','Dryer Vent Services','Care & Warning Signs'],
    '/electrical-services/':['Overview','Electrical Services','Inspections & Troubleshooting'],
    '/gas-services/':['Overview','Installation & Repair','Gas Work & Safety']
  };
  const selectedLabels=pilotGuide?guideLabels[decodeURI(location.pathname).replace(BASE,'')]:null;
  const links=sections.map((s,i)=>({
    id:s.id,
    title:selectedLabels?.[i]||s.querySelector('h2')?.textContent.trim().replace(/\s+/g,' ')||'Details',
    num:String(i+1).padStart(2,'0')
  }));
  if(main.querySelector('.cr-process')){
    const el=main.querySelector('.cr-process');
    el.id='cr-service-process';
    links.push({id:el.id,title:'Process',num:String(links.length+1).padStart(2,'0')});
  }
  if(main.querySelector('.cr-questions')){
    main.querySelector('.cr-questions').id='cr-service-faq';
    links.push({id:'cr-service-faq',title:'Questions',num:String(links.length+1).padStart(2,'0')});
  }
  const guideItems=links.map(x=>`<a href="#${escAttr(x.id)}"><span>${x.num}</span>${escAttr(x.title)}</a>`).join('');
  const mobileGuide=pilotGuide?
    `<details class="cr-reading-mobile"><summary><span class="cr-reading-mobile-label">Explore This Page</span><span class="cr-reading-current" aria-live="polite">Jump to a section</span><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></summary><div class="cr-reading-mobile-links">${guideItems}</div></details>`:''; 
  index.innerHTML=`<div class="cr-reading-track"><span class="cr-reading-label">Service guide</span><div class="cr-reading-links">${guideItems}</div>${mobileGuide}</div>`;
  hero.insertAdjacentElement('afterend',index);
  const navlinks=[...index.querySelectorAll('a')];
  const details=index.querySelector('.cr-reading-mobile');
  const currentText=details?.querySelector('.cr-reading-current');
  if(details){
    details.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
      if(currentText)currentText.textContent=link.textContent.trim().replace(/^\d+\s*/, '');
      details.open=false;
    }));
    details.addEventListener('keydown',event=>{
      if(event.key==='Escape'){
        details.open=false;
        details.querySelector('summary')?.focus();
      }
    });
    document.addEventListener('pointerdown',event=>{
      if(details.open&&!details.contains(event.target))details.open=false;
    },{passive:true});
  }
  if('IntersectionObserver' in window){
    const activeObserver=new IntersectionObserver(entries=>{
      const target=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(!target)return;
      navlinks.forEach(link=>{
        if(link.hash==='#'+target.target.id)link.setAttribute('aria-current','location');
        else link.removeAttribute('aria-current');
      });
      const selected=links.find(x=>x.id===target.target.id);
      if(currentText&&selected)currentText.textContent=selected.title;
    },{rootMargin:'-25% 0px -60% 0px',threshold:0});
    [...sections,main.querySelector('#cr-service-process'),main.querySelector('#cr-service-faq')].filter(Boolean).forEach(el=>activeObserver.observe(el));
  }

  // Use only photographs preserved from the original CR source archive.
  const slug=decodeURI(location.pathname).replace(BASE,'');
  fetch(BASE+'/assets/service-design-manifest.json',{cache:'force-cache'})
    .then(r=>{if(!r.ok)throw new Error('Photo manifest unavailable');return r.json()})
    .then(manifest=>{
      const assets=manifest.services[slug];
      const group=slug.startsWith('/plumbing-services')?'plumbing':slug.startsWith('/hvac')?'hvac':slug.startsWith('/electrical-services')?'electrical':'gas';
      const catPhoto=manifest.categories[group];
      // The four approved photographic pilot heroes must never be replaced
      // by older, generic category art from the legacy source manifest.
      if(catPhoto&&!body.classList.contains('cr-template-v1')){
        hero.style.setProperty('--page-art',`url("${catPhoto}")`);
      }
      if(!assets||!assets.length)return;
      const section=document.createElement('section');
      const num=sections.length;
      let mode=assets.length===1?'single':(num%2===0?'focus':'pair');
      section.className='cr-service-media cr-service-media--'+mode+(group==='gas'||group==='electrical'?' cr-service-media--warm':'')+' cr-x-reveal';
      section.setAttribute('aria-label','Service photographs from the company website');
      section.innerHTML=`<div class="cr-media-layout"><div class="cr-media-intro"><span class="cr-media-index">SERVICE PHOTOGRAPHY / ${group.toUpperCase()}</span><h2>A CLOSER<br>LOOK.</h2><p>Photographs from CR Plumbing's original service page. They illustrate the service described above.</p></div>${assets.map((x,i)=>`<figure class="cr-media-figure"><div class="cr-media-frame"><img loading="lazy" decoding="async" width="${x.width}" height="${x.height}" alt="${escAttr(x.alt)}" src="${x.url}"></div><figcaption>Service image / ${String(i+1).padStart(2,'0')}</figcaption></figure>`).join('')}</div>`;
      // Water Heaters pilot: replace the low-resolution archive gallery with
      // an explicitly illustrative full-bleed inspection scene. Source-derived
      // service text, FAQs, process and other pages are preserved unchanged.
      if(slug==='/plumbing-services/water-heaters/'){
        section.className='cr-service-media cr-water-heaters-inspection cr-x-reveal';
        section.setAttribute('aria-label','Illustrative water heater inspection scene, not an actual CR Plumbing project');
        section.innerHTML='<div class="cr-media-layout"><div class="cr-media-intro"><span class="cr-media-index">INSPECTION / WATER HEATERS</span><h2>A CLOSER<br>LOOK.</h2><p>A closer look at the equipment and fittings involved in residential water heater inspection. Illustrative imagery for this website proposal.</p></div></div>';
      }
      // Dryer Vent pilot: exterior vent scene supplied for this concept design.
      // Do not label generated proposal imagery as actual CR Plumbing work.
      if(slug==='/hvac/dryer-vent-duct/'){
        section.className='cr-service-media cr-dryer-vent-exterior cr-x-reveal';
        section.setAttribute('aria-label','Illustrative exterior dryer vent inspection scene, not an actual CR Plumbing job');
        section.innerHTML='<div class="cr-media-layout"><div class="cr-media-intro"><span class="cr-media-index">EXTERIOR VENT / DRYER DUCT</span><h2>A CLOSER<br>LOOK.</h2><p>Checking the exterior vent outlet for lint buildup or restrictions. Illustrative imagery for this website proposal, not a documented CR Plumbing project.</p></div></div>';
      }
      // Electrical Services concept: the user-approved illustration replaces
      // the two low-resolution archive images in this single editorial chapter.
      // It does not depict a verified CR Plumbing employee or completed job.
      if(slug==='/electrical-services/'){
        section.className='cr-service-media cr-electrical-diagnostics cr-x-reveal';
        section.setAttribute('aria-label','Illustrative electrical panel inspection photograph for the website proposal');
        section.innerHTML='<div class="cr-media-layout"><div class="cr-media-intro"><span class="cr-media-index">ELECTRICAL / SERVICE DETAIL</span><h2>A CLOSER<br>LOOK.</h2><p>An illustrative look at the electrical panel area and service equipment. This photograph is concept imagery, not a documented CR Plumbing project.</p></div></div>';
      }
      // Gas Services proposal: use image 10 as one full-bleed editorial scene.
      // Not evidence of a CR Plumbing employee, completed job or actual gas leak.
      if(slug==='/gas-services/'){
        section.className='cr-service-media cr-gas-connections-inspection cr-x-reveal';
        section.setAttribute('aria-label','Illustrative inspection of residential gas-line connections for this website proposal');
        section.innerHTML='<div class="cr-media-layout"><div class="cr-media-intro"><span class="cr-media-index">GAS LINES / CONNECTIONS</span><h2>A CLOSER<br>LOOK.</h2><p>An illustrative view of gas piping connections and inspection equipment. Concept imagery for this website proposal, not a documented CR Plumbing project.</p></div></div>';
      }
      const insertAfter=sections.length>=3?sections[1]:sections[0];
      insertAfter.insertAdjacentElement('afterend',section);
      if(motionOff.matches || !('IntersectionObserver' in window)){section.classList.add('is-visible')}
      else{let io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.15});io.observe(section)}
    }).catch(()=>{/* HTML content remains fully accessible without enhancements */});

  function escAttr(s){return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
  // Scroll-controlled 4% push-in on category-specific background; no pin/lock.
  let scheduled=false;
  function updateHero(){scheduled=false;if(motionOff.matches||innerWidth<=760){hero.style.removeProperty('--cr-photo-zoom');return}
    const t=Math.max(0,Math.min(1,-hero.getBoundingClientRect().top/Math.max(1,hero.offsetHeight)));hero.style.setProperty('--cr-photo-zoom',(1.02+t*.045).toFixed(4));}
  addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateHero)}},{passive:true});
  motionOff.addEventListener('change',updateHero);updateHero();
})();