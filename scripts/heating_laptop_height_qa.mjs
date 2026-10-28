import { chromium } from 'playwright';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const base=process.env.BASE_URL||'http://127.0.0.1:8765/cr-plumbing/hvac/heating/new-installation/';
const cases=[[1440,900],[1440,768],[1440,700],[1024,768],[1024,700],[768,900],[375,812]];
let failures=0;
for(const [width,height] of cases){
 const page=await browser.newPage({viewport:{width,height},reducedMotion:'no-preference'});
 const errors=[];
 page.on('pageerror',x=>errors.push(x.message));
 page.on('response',r=>{if(r.status()>=400&&r.url().includes('/cr-plumbing/'))errors.push(r.status()+' '+r.url())});
 const response=await page.goto(base,{waitUntil:'networkidle',timeout:30000});
 await page.evaluate(()=>document.fonts.ready);
 const stages=page.locator('[data-cr-cinematic-stage]');
 const state=await page.evaluate(()=>({faq:document.querySelectorAll('.cr-qa').length,h1:document.querySelectorAll('h1').length,enabled:document.body.classList.contains('cr-cinema-ready'),stages:document.querySelectorAll('[data-cr-cinematic-stage]').length,overflow:document.documentElement.scrollWidth-innerWidth,cssLoaded:[...document.styleSheets].some(x=>x.href?.includes('heating-cinematic-scroll.css')),scriptLoaded:!![...document.scripts].find(x=>x.src?.includes('heating-cinematic-scroll.js'))}));
 let photos=[];
 for(let i=0;i<2;i++){
  const stage=stages.nth(i), scene=stage.locator('section');
  const range=await stage.evaluate(el=>({start:el.getBoundingClientRect().top+scrollY,height:el.offsetHeight,sceneHeight:el.querySelector('section').offsetHeight}));
  let samples=[];
  const travel=Math.max(1,range.height-range.sceneHeight);
  for(const fraction of [.25,.75]){
   const position=range.start-83+travel*fraction;
   await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),position);
   await page.waitForTimeout(170);
   const data=await scene.evaluate(el=>{const rect=el.getBoundingClientRect(), last=el.querySelector('.cr-process-item:last-child')||el.querySelector('p');const l=last?.getBoundingClientRect();return {phase:el.dataset.crCinemaPhase||null,position:getComputedStyle(el).position,top:Math.round(rect.top),zoom:parseFloat(el.style.getPropertyValue('--cr-cinematic-zoom'))||1,contentBottom:l?Math.round(l.bottom):null,viewHeight:innerHeight,scrollWidth:document.documentElement.scrollWidth-innerWidth,sceneHeight:rect.height}});
   samples.push(data);
  }
  photos.push(samples);
 }
 await page.locator('.cr-questions').scrollIntoViewIfNeeded();
 const canContinue=await page.locator('.cr-questions').isVisible();
 const shouldPin=width>=821 && height>=680;
 const pass=response.status()===200 && state.faq===8&&state.h1===1&&state.stages===2&&state.cssLoaded&&state.scriptLoaded&&state.overflow<=2&&errors.length===0&&canContinue && (shouldPin?photos.every(v=>v.every(s=>s.position==='fixed'&&s.phase==='pinned'&&Math.abs(s.top-83)<4&&s.scrollWidth<=2&&s.contentBottom<=height+3)&&v[1].zoom>v[0].zoom+.015):photos.every(v=>v.every(s=>s.position!=='fixed')));
 if(!pass)failures++;
 console.log('QA '+JSON.stringify({width,height,pass,shouldPin,response:response.status(),state,photos,errors,canContinue}));
 if(width===1440&&height===768){
  await page.locator('[data-cr-cinematic-stage="process"]').scrollIntoViewIfNeeded();
  await page.screenshot({path:'laptop-1440x768.jpg',type:'jpeg',quality:66});
 }
 if(width===1440&&height===900){
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.reload({waitUntil:'networkidle'});
  let motion=await page.evaluate(()=>({enabled:document.body.classList.contains('cr-cinema-ready'),position:getComputedStyle(document.querySelector('[data-cr-cinematic-stage] section')).position}));
  if(motion.enabled||motion.position==='fixed')failures++;
  console.log('REDUCED '+JSON.stringify(motion));
 }
 await page.close();
}
await browser.close();
console.log('QA_FAILURES '+failures);
if(failures)process.exitCode=1;