(()=>{const menuSvg=open=>open?'<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>':'<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';const t=document.getElementById("nav-toggle"),m=document.getElementById("mobile-nav");if(t&&m){t.innerHTML=menuSvg(false);t.addEventListener("click",()=>{const open=m.classList.toggle("open");t.setAttribute("aria-expanded",String(open));t.setAttribute("aria-label",open?"Close navigation":"Open navigation");t.innerHTML=menuSvg(open)});m.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{m.classList.remove("open");t.setAttribute("aria-expanded","false");t.innerHTML=menuSvg(false)}))}let year=document.getElementById("year");if(year)year.textContent=new Date().getFullYear();document.querySelectorAll(".service-form").forEach(form=>{form.addEventListener("submit",async e=>{e.preventDefault();const data=[...new FormData(form)].filter(([k,v])=>String(v).trim()).map(([k,v])=>k.replace(/-/g," ")+": "+v).join("\n");const box=form.querySelector(".form-feedback");if(!box)return;try{if(!navigator.clipboard?.writeText)throw Error("Clipboard not supported");await navigator.clipboard.writeText("CR Plumbing, Air & Electric — Service request\n"+data);box.textContent="Request details copied. Call (940) 370-5663 to provide them to the CR team. Nothing was submitted online.";}catch(err){box.textContent="Copy these details before calling the CR team: "+data+" — Telephone (940) 370-5663. Nothing was sent online.";}box.classList.add("show");box.focus();})});const bookingPath="/cr-plumbing/book-online/";document.querySelectorAll(".head-cta").forEach(a=>{a.href=bookingPath;a.textContent="Book Online ↗"});for(const parent of document.querySelectorAll(".company-dropdown,.footer-main>div:last-child,.mobile-nav .mobile-group:last-of-type .mega-items")){if(!parent.querySelector('a[href="'+bookingPath+'"]')){let link=document.createElement("a");link.href=bookingPath;link.textContent="Book Online";parent.appendChild(link)}};const electricLinks=[["Surge Protection Systems","/cr-plumbing/electrical-services/installations-upgrade/surge-protection-systems/"],["Generac Generator Installation","/cr-plumbing/electrical-services/backup-emergency-powers/generac-generator-installation/"],["Portable Generator Setup","/cr-plumbing/electrical-services/backup-emergency-powers/portable-generator-setup/"],["Power Outage Response","/cr-plumbing/electrical-services/backup-emergency-powers/power-outage-response/"],["EV Home Charging Stations","/cr-plumbing/electrical-services/smart-efficient-electrical-solution/ev-home-charging-stations/"],["Generators","/cr-plumbing/electrical-services/generators/"]];for(const el of document.querySelectorAll(".mega-columns .mega-group:nth-child(3) .mega-items, .mobile-nav>.mobile-group:nth-of-type(3) .mega-items")){for(const [name,path] of electricLinks){if(!el.querySelector('a[href="'+path+'"]')){let a=document.createElement("a");a.href=path;a.textContent=name;el.appendChild(a)}}}const b=document.querySelector(".mobile-nav");if(b&&!b.querySelector('a[href="'+bookingPath+'"]')){let a=document.createElement("a");a.href=bookingPath;a.textContent="Book Online";b.appendChild(a)};})();

/* Shared modal loader: once, on all Home and internal pages */
if (!document.querySelector('script[data-cr-request-modal]')) {
  const requestModule = document.createElement('script');
  requestModule.src = '/cr-plumbing/assets/request-modal.js';
  requestModule.dataset.crRequestModal = 'true';
  document.body.appendChild(requestModule);
}

/* Atrezzo internal-page experience, never load on approved Home. */
if(document.body?.classList.contains('cr-detail')){
  if(!document.querySelector('link[href*="interior-experience.css"]')){const layer=document.createElement('link');layer.rel='stylesheet';layer.href='/cr-plumbing/assets/interior-experience.css?v=20261026-03';document.head.appendChild(layer)}
  if(!document.querySelector('script[src*="interior-experience.js"]')){const module=document.createElement('script');module.src='/cr-plumbing/assets/interior-experience.js?v=20261027-p3-qa02';module.defer=true;document.body.appendChild(module)}
}

/* Shared How It Works photograph for source-backed service pages.
   Preflight the uploaded image before applying the new layout; a missing asset
   can never leave a broken photo background. Company pages and Home are untouched. */
if(document.body?.classList.contains('cr-detail') &&
   !document.body.classList.contains('cr-company') &&
   document.querySelector('.cr-page .cr-process') &&
   !document.querySelector('link[data-cr-shared-process-photo]')){
  const processPhoto=new Image();
  processPhoto.decoding='async';
  processPhoto.onload=()=>{
    if(document.querySelector('link[data-cr-shared-process-photo]'))return;
    const layer=document.createElement('link');
    layer.rel='stylesheet';
    layer.href='/cr-plumbing/assets/shared-process-photo.css?v=20261027-01';
    layer.dataset.crSharedProcessPhoto='true';
    document.head.appendChild(layer);
  };
  processPhoto.src='/cr-plumbing/assets/images/cr-shared-how-it-works.webp';
}

/* Shared Let's Talk full-bleed photography for service pages.
   Protect non-service pages, image loading failures and original source copy. */
if(document.body?.classList.contains('cr-detail') &&
   !document.body.classList.contains('cr-company') &&
   document.querySelector('.cr-page .cr-end') &&
   !document.querySelector('link[data-cr-shared-cta-photo]')){
  const ctaPhoto=new Image();
  ctaPhoto.decoding='async';
  ctaPhoto.onload=()=>{
    if(document.querySelector('link[data-cr-shared-cta-photo]'))return;
    const layer=document.createElement('link');
    layer.rel='stylesheet';
    layer.href='/cr-plumbing/assets/shared-cta-photo.css?v=20261027-01';
    layer.dataset.crSharedCtaPhoto='true';
    document.head.appendChild(layer);
  };
  ctaPhoto.src='/cr-plumbing/assets/images/cr-shared-lets-talk.webp';
}

/* Atrezzo shared navigation upgrade.
   Existing static navigation stays as a functional fallback if an asset fails. */
if(document.querySelector('.site-head')&&!document.querySelector('script[data-cr-nav-data]')){
  const navCss=document.createElement('link');
  navCss.rel='stylesheet';
  navCss.href='/cr-plumbing/assets/nav-system.css?v=20261027-02';
  document.head.appendChild(navCss);
  const data=document.createElement('script');
  data.src='/cr-plumbing/assets/nav-data.js?v=20261027-02';
  data.dataset.crNavData='true';
  data.onload=()=>{
    if(!window.CR_NAV_DATA)return;
    const ui=document.createElement('script');
    ui.src='/cr-plumbing/assets/nav-system.js?v=20261027-02';
    ui.dataset.crNavSystem='true';
    document.body.appendChild(ui);
  };
  document.body.appendChild(data);
}
