import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const base='http://127.0.0.1:8765/cr-plumbing/hvac/heating/new-installation/';
const cases=[[1440,900],[1440,768],[1024,700],[768,900],[375,812]];
mkdirSync('qa-overlay-output',{recursive:true});
let failures=0;
for(const [width,height] of cases){
 const page=await browser.newPage({viewport:{width,height},reducedMotion:'no-preference'});
 const errors=[];
 page.on('pageerror',err=>errors.push(err.message));
 page.on('response',r=>{if(r.url().includes('127.0.0.1')&&r.status()>=400)errors.push(r.status()+' '+r.url())});
 const resp=await page.goto(base,{waitUntil:'networkidle',timeout:30000});
 await page.evaluate(()=>document.fonts.ready);
 await page.waitForTimeout(400);
 const points=await page.evaluate(()=>{
  const a=[...document.querySelectorAll('[data-cr-cinematic-stage]')];
  const head=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--head'))||83;
  return {head,first:a[0].getBoundingClientRect().top+scrollY-head,
   second:a[1].getBoundingClientRect().top+scrollY-head,
   firstHeight:a[0].offsetHeight,secondHeight:a[1].offsetHeight,
   firstSceneHeight:a[0].querySelector('section').offsetHeight,
   secondSceneHeight:a[1].querySelector('section').offsetHeight,
   total:document.documentElement.scrollHeight,
   h1:document.querySelectorAll('h1').length,faq:document.querySelectorAll('.cr-qa').length,
   enabled:document.body.classList.contains('cr-cinema-ready'),
   scrollWidth:document.documentElement.scrollWidth-innerWidth};
 });
 async function seek(y){
   await page.evaluate(t=>window.scrollTo({top:t,behavior:'instant'}),y);
   await page.waitForTimeout(180);
   return page.evaluate(()=>{
     const a=[...document.querySelectorAll('[data-cr-cinematic-stage] section')];
     return {at:Math.round(scrollY),
       first:{phase:a[0].dataset.crCinemaPhase||'none',top:Math.round(a[0].getBoundingClientRect().top),position:getComputedStyle(a[0]).position,zoom:+a[0].style.getPropertyValue('--cr-cinematic-zoom')||1},
       second:{phase:a[1].dataset.crCinemaPhase||'none',top:Math.round(a[1].getBoundingClientRect().top),position:getComputedStyle(a[1]).position,zoom:+a[1].style.getPropertyValue('--cr-cinematic-zoom')||1,enterY:a[1].style.getPropertyValue('--cr-cinema-enter-y'),bottom:Math.round(a[1].querySelector('.cr-process-item:last-child').getBoundingClientRect().bottom)},
       overflow:document.documentElement.scrollWidth-innerWidth};
   });
 }
 const active=width>=821&&height>=680;
 let states=[],ok=resp.status()===200&&points.h1===1&&points.faq===8&&points.scrollWidth<=2&&errors.length===0;
 if(active){
  const zoom=points.second-points.first;
  const reveal=points.firstHeight-points.firstSceneHeight-zoom;
  const zoom2=points.secondHeight-points.secondSceneHeight-reveal;
  const locations=[
   ['overview',points.first+zoom*.65],
   ['rise_start',points.second+reveal*.15],
   ['rise_middle',points.second+reveal*.5],
   ['rise_end',points.second+reveal*.85],
   ['process_zoom_1',points.second+reveal+zoom2*.2],
   ['process_zoom_2',points.second+reveal+zoom2*.8]
  ];
  for(const [name,pos] of locations){
   const state=await seek(pos);
   states.push({name,...state});
   if(width===1440&&height===900&&['overview','rise_middle','rise_end','process_zoom_2'].includes(name)){
     const data=await page.screenshot({type:'jpeg',quality:43});
     const b64=data.toString('base64');
     console.log('IMAGE_BEGIN '+name);
     for(let i=0;i<b64.length;i+=8000)console.log(b64.slice(i,i+8000));
     console.log('IMAGE_END '+name);
     await page.screenshot({path:'qa-overlay-output/'+name+'.jpg',type:'jpeg',quality:65});
   }
  }
  const [ov,r1,rm,re,p1,p2]=states;
  const passRising=r1.second.top>rm.second.top+75&&rm.second.top>re.second.top+75;
  const firstPinned=[ov,r1,rm,re].every(x=>x.first.position==='fixed'&&Math.abs(x.first.top-points.head)<=4);
  const processPinned=[r1,rm,re,p1,p2].every(x=>x.second.position==='fixed');
  const secondZoom=p2.second.zoom>p1.second.zoom+.015;
  const preservedOverview=[r1,rm,re].every(x=>x.first.zoom>1.065);
  const processReadable=[p1,p2].every(x=>x.second.bottom<=height+5);
  ok&&=passRising&&firstPinned&&processPinned&&secondZoom&&preservedOverview&&processReadable&&states.every(x=>x.overflow<=2);
  console.log('METRICS '+JSON.stringify({width,height,zoom,reveal,zoom2,passRising,firstPinned,processPinned,secondZoom,preservedOverview,processReadable}));
 } else {
   const st=await seek(points.first+50);
   states.push(st);
   ok&&=!points.enabled&&st.first.position!=='fixed'&&st.second.position!=='fixed';
 }
 await page.locator('.cr-questions').scrollIntoViewIfNeeded();
 await page.waitForTimeout(120);
 const faqVisible=await page.locator('.cr-questions').isVisible();
 ok&&=faqVisible;
 if(!ok)failures++;
 console.log('RESULT '+JSON.stringify({width,height,ok,points,states,faqVisible,errors}));
 if(width===1440&&height===900){
   await page.emulateMedia({reducedMotion:'reduce'});
   await page.reload({waitUntil:'networkidle'});
   await page.waitForTimeout(200);
   const reduced=await page.evaluate(()=>({enabled:document.body.classList.contains('cr-cinema-ready'),position:getComputedStyle(document.querySelector('[data-cr-cinematic-stage] section')).position}));
   console.log('REDUCED '+JSON.stringify(reduced));
   if(reduced.enabled||reduced.position==='fixed')failures++;
 }
 await page.close();
}
await browser.close();
console.log('FAILURES '+failures);
if(failures)process.exitCode=1;
