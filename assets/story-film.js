/* ATREZZO / CR — respectful film teaser + on-demand full story. */
(() => {
 const feature=document.querySelector('.cr-story-feature');
 if(!feature)return;
 const stage=feature.querySelector('.cr-story-frame'),video=feature.querySelector('.cr-story-preview');
 const openLink=feature.querySelector('.cr-story-play'),motion=feature.querySelector('.cr-story-motion');
 const modal=document.getElementById('cr-film-modal'),player=document.getElementById('cr-film-player');
 const close=modal?.querySelector('.cr-film-close');
 if(!stage||!video||!openLink||!modal||!player||!close)return;
 const desktop=matchMedia('(min-width:761px)'),reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const saver=!!(navigator.connection&&navigator.connection.saveData);
 let visible=false,userPaused=false,opener=null,priorOverflow='';
 const shouldPlay=()=>desktop.matches&&!reduced.matches&&!saver&&visible&&!document.hidden&&!userPaused&&modal.hidden;
 function sync(){
   motion.hidden=!desktop.matches||reduced.matches||saver;
   if(shouldPlay()){
     const promise=video.play();
     if(promise?.catch)promise.catch(()=>{motion.hidden=true;stage.classList.remove('is-playing')});
   }else video.pause();
   motion.setAttribute('aria-pressed',String(userPaused));
   motion.setAttribute('aria-label',userPaused?'Play video preview':'Pause video preview');
   motion.innerHTML=userPaused?'PLAY <span aria-hidden="true">▶</span>':'PAUSE <span aria-hidden="true">Ⅱ</span>';
 }
 video.addEventListener('playing',()=>stage.classList.add('is-playing'));
 video.addEventListener('error',()=>{stage.classList.remove('is-playing');motion.hidden=true});
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{visible=entries.some(e=>e.isIntersecting);sync()}, {threshold:.28});
  observer.observe(stage);
 }else{visible=true;sync()}
 desktop.addEventListener('change',sync);
 reduced.addEventListener('change',sync);
 document.addEventListener('visibilitychange',sync);
 motion.addEventListener('click',()=>{userPaused=!userPaused;sync()});
 function openFilm(event){
   if(event&&(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||event.button!==0))return;
   if(event)event.preventDefault();
   opener=openLink;
   priorOverflow=document.body.style.overflow;
   modal.hidden=false;document.body.style.overflow='hidden';
   const iframe=document.createElement('iframe');
   iframe.title='The CR Plumbing Story — family-owned business film';
   iframe.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';
   iframe.allowFullscreen=true;
   iframe.referrerPolicy='strict-origin-when-cross-origin';
   iframe.src='https://www.youtube-nocookie.com/embed/X-jxiA0HPFE?autoplay=1&rel=0';
   player.replaceChildren(iframe);
   close.focus();
   sync();
 }
 function closeFilm(){
   if(modal.hidden)return;
   modal.hidden=true;
   player.replaceChildren(); // stop YouTube playback immediately
   document.body.style.overflow=priorOverflow;
   sync();
   if(opener&&opener.isConnected)opener.focus();
 }
 openLink.addEventListener('click',openFilm);
 close.addEventListener('click',closeFilm);
 modal.addEventListener('click',e=>{if(e.target===modal)closeFilm()});
 document.addEventListener('keydown',e=>{
   if(modal.hidden)return;
   if(e.key==='Escape'){e.preventDefault();closeFilm();return}
   if(e.key!=='Tab')return;
   const focusable=[...modal.querySelectorAll('button:not([disabled]),a[href],iframe')].filter(n=>n.getClientRects().length);
   const first=focusable[0],last=focusable[focusable.length-1];
   if(!first)return;
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
   if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
 });
})();
