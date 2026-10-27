/* ATREZZO — shared navigation renderer. Source: nav-data.js (verified original routes).
   Enhances every site page, preserving the existing markup as fallback without JavaScript. */
(()=>{
  'use strict';
  const data=window.CR_NAV_DATA;
  const head=document.querySelector('.site-head');
  const nav=head?.querySelector('nav.nav');
  const mobile=document.querySelector('#mobile-nav');
  const toggle=document.querySelector('#nav-toggle');
  if(!data||!head||!nav||!mobile||!toggle)return;
  const html=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const pagePath=location.pathname.replace(/\/+$/,'/')||'/';
  const anchor=(l,cls='')=>'<a'+(cls?' class="'+cls+'"':'')+' href="'+html(l.url)+'"'+(pagePath===l.url?' aria-current="page"':'')+'>'+html(l.label)+'</a>';
  const plus='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
  const down='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  const catalog={url:data.links.catalog,label:'All Services'};
  function panel(category,key,isCompany=false){
    const secs=isCompany?data.company:category.sections;
    const root=isCompany?{url:'/cr-plumbing/about-us/',label:'Explore Company'}:category.root;
    const shown=secs.map(s=>{
      const items=isCompany?s.items:(key==='electrical'?s.items.slice(0,3):s.items);
      const overview=!isCompany&&s.overview?s.overview:null;
      const title=overview?anchor({url:overview.url,label:s.title}):html(s.title);
      const more=key==='electrical'&&s.items.length>3&&overview?anchor({url:overview.url,label:'View all in this group'},'cr-panel-extra'):'';
      return '<section class="cr-panel-col"><h3>'+title+'</h3>'+items.map(x=>anchor(x)).join('')+more+'</section>';
    }).join('');
    const count=isCompany?3:Math.min(5,secs.length);
    const link=isCompany?root:catalog;
    const small=isCompany?'Company':'Services / '+category.name;
    const label=isCompany?'Company':category.name+' Services';
    return '<div class="cr-nav-panel cr-panel-'+key+'" id="cr-nav-panel-'+key+'" hidden role="region" aria-label="'+html(label)+'"><div class="cr-panel-inner"><div class="cr-panel-top"><div><span class="cr-panel-kicker">'+html(small)+'</span><h2 class="cr-panel-title">'+html(label)+'</h2></div><div class="cr-panel-actions">'+anchor(link,'cr-panel-all')+'<button class="cr-panel-close" type="button" aria-label="Close navigation menu">×</button></div></div><div class="cr-panel-columns" style="--cr-panel-cols:'+count+'">'+shown+'</div><div class="cr-panel-foot"><p>Explore the relevant service pages for more details.</p>'+anchor(isCompany?{url:'/cr-plumbing/contact-us/',label:'Contact CR'}:root)+'</div></div></div>';
  }
  const menuButton=(label,key,category,isCompany=false)=>'<div class="cr-nav-entry"><button class="cr-nav-trigger" type="button" aria-expanded="false" aria-controls="cr-nav-panel-'+key+'">'+html(label)+' '+down+'</button>'+panel(category,key,isCompany)+'</div>';
  nav.innerHTML=anchor({url:data.links.home,label:'Home'})+
    data.categories.map(c=>menuButton(c.name,c.name.toLowerCase(),c)).join('')+
    anchor({url:data.links.serviceAreas,label:'Service Areas'})+
    menuButton('Company','company',null,true)+
    anchor({url:data.links.contact,label:'Contact'});
  let expanded=null;
  function closePanel(returnFocus=false){
    if(!expanded)return;
    const b=expanded.querySelector('.cr-nav-trigger');
    expanded.querySelector('.cr-nav-panel').hidden=true;
    b.setAttribute('aria-expanded','false');
    expanded=null;
    if(returnFocus)b.focus();
  }
  nav.querySelectorAll('.cr-nav-entry').forEach(entry=>{
    const btn=entry.querySelector('.cr-nav-trigger');
    const pane=entry.querySelector('.cr-nav-panel');
    btn.addEventListener('click',()=>{
      const open=expanded===entry;
      closePanel();
      if(!open){pane.hidden=false;btn.setAttribute('aria-expanded','true');expanded=entry}
    });
    pane.querySelector('.cr-panel-close').addEventListener('click',()=>closePanel(true));
    pane.addEventListener('click',e=>{if(e.target.closest('a'))closePanel()});
  });
  document.addEventListener('pointerdown',e=>{if(expanded&&!expanded.contains(e.target))closePanel()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&expanded){e.preventDefault();closePanel(true)}});
  window.addEventListener('resize',()=>{if(expanded&&innerWidth<=1380)closePanel()},{passive:true});
  /* Mobile is a natural vertical accordion, never a horizontal scroller. */
  function mobileSub(s,isCompany=false){
    const title=s.title;
    const overview=!isCompany&&s.overview?anchor(s.overview):'';
    return '<details class="cr-mobile-sub"><summary>'+html(title)+' '+plus+'</summary><div class="cr-mobile-links">'+overview+s.items.map(x=>anchor(x)).join('')+'</div></details>';
  }
  const mobileCategory=c=>'<details class="cr-mobile-accordion"><summary>'+html(c.name)+' '+plus+'</summary><div class="cr-mobile-content">'+anchor({url:c.root.url,label:'All '+c.name+' Services'})+c.sections.map(s=>mobileSub(s)).join('')+'</div></details>';
  mobile.innerHTML='<div class="cr-mobile-nav">'+anchor({url:data.links.home,label:'Home'})+
    data.categories.map(mobileCategory).join('')+
    anchor(catalog,'cr-mobile-catalog')+
    anchor({url:data.links.serviceAreas,label:'Service Areas'})+
    '<details class="cr-mobile-accordion"><summary>Company '+plus+'</summary><div class="cr-mobile-content">'+data.company.map(s=>mobileSub(s,true)).join('')+'</div></details>'+
    anchor({url:data.links.contact,label:'Contact'})+
    anchor({url:'tel:+19403705663',label:'Call 940.370.5663'},'cr-mobile-call')+
    '</div>';
  mobile.addEventListener('click',e=>{
    if(!e.target.closest('a'))return;
    mobile.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','Open navigation');
  });
  mobile.addEventListener('toggle',e=>{
    const detail=e.target;
    if(!(detail instanceof HTMLDetailsElement)||!detail.open)return;
    const scope=detail.parentElement;
    if(!scope)return;
    for(const sibling of scope.children){
      if(sibling!==detail && sibling.tagName==='DETAILS' && sibling.open)sibling.open=false;
    }
  },true);
  head.classList.add('cr-nav-ready');
})();
