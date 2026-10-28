import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const browser = await chromium.launch({ headless:true,args:['--no-sandbox'] });
const widths=[375,768,1024,1440];
const base='http://127.0.0.1:8765/cr-plumbing/hvac/heating/new-installation/';
mkdirSync('qa-scroll-results',{recursive:true});
let failures=0;
for(const width of widths){
 const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'no-preference'});
 const errors=[];
 page.on('pageerror',e=>errors.push('JS '+e.message));
 page.on('response',r=>{if(r.url().includes('127.0.0.1')&&r.status()>=400)errors.push('HTTP '+r.status()+' '+r.url())});
 const response=await page.goto(base,{waitUntil:'networkidle',timeout:30000});
 await page.evaluate(()=>document.fonts.ready);
 const initial=await page.evaluate(()=>{
  const stages=[...document.querySelectorAll('[data-cr-cinematic-stage]')];
  return {h1:document.querySelectorAll('h1').length,faq:document.querySelectorAll('.cr-qa').length,
   stageCount:stages.length,labels:stages.map(x=>x.querySelector('h2')?.textContent?.trim()),
   next:stages.at(-1)?.nextElementSibling?.className,
   scrollWidth:document.documentElement.scrollWidth,clientWidth:innerWidth,
   scrollHeight:document.documentElement.scrollHeight};
 });
 const captures=[];
 let firstStage=page.locator('[data-cr-cinematic-stage="overview"]');
 let secondStage=page.locator('[data-cr-cinematic-stage="process"]');
 const stages=[firstStage,secondStage];
 let samples=[];
 for(let i=0;i<stages.length;i++){
   const stage=stages[i];
   const metrics=await stage.evaluate(el=>({
    start:el.getBoundingClientRect().top+scrollY,
    height:el.getBoundingClientRect().height,
    sceneHeight:el.querySelector('section').getBoundingClientRect().height,
    scenePosition:getComputedStyle(el.querySelector('section')).position,
    sceneTop:getComputedStyle(el.querySelector('section')).top
   }));
   const travel=Math.max(0,metrics.height-metrics.sceneHeight);
   const positions=[0.20,0.77].map(t=>Math.max(0,metrics.start-83+travel*t));
   let sample=[];
   for(let j=0;j<positions.length;j++){
     await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),positions[j]);
     await page.waitForTimeout(300);
     const state=await stage.evaluate(el=>{
       const sec=el.querySelector('section');
       return {scrollY:Math.round(scrollY),top:Math.round(sec.getBoundingClientRect().top),
        zoom:Number(sec.style.getPropertyValue('--cr-cinematic-zoom'))||1,
        position:getComputedStyle(sec).position,
        bg:getComputedStyle(sec,'::before').backgroundImage,
        overflow:document.documentElement.scrollWidth-innerWidth};
     });
     sample.push(state);
     if((width===1440||width===375)&&j===1){
       const imagePath='qa-scroll-results/'+(i?'how-it-works':'service-overview')+'-'+width+'.jpg';
       await page.screenshot({path:imagePath,type:'jpeg',quality:55});
       captures.push(imagePath);
       if(width===1440){
         const img=await page.screenshot({type:'jpeg',quality:38});
         const b64=img.toString('base64');
         console.log('IMAGE_BEGIN '+(i?'process':'overview'));
         for(let at=0;at<b64.length;at+=8000)console.log(b64.slice(at,at+8000));
         console.log('IMAGE_END '+(i?'process':'overview'));
       }
     }
   }
   samples.push({metrics,at20:sample[0],at77:sample[1]});
 }
 await page.locator('.cr-questions').scrollIntoViewIfNeeded();
 await page.waitForTimeout(120);
 const faqVisible=await page.locator('.cr-questions').isVisible();
 const faqAt=await page.locator('.cr-questions').evaluate(el=>el.getBoundingClientRect().top);
 if(width>=821) {
   const chain=await page.locator('[data-cr-cinematic-stage="overview"] section').evaluate(el=>{
     const list=[];for(let n=el;n&&list.length<9;n=n.parentElement){
       const s=getComputedStyle(n);list.push({tag:n.tagName,cls:String(n.className).slice(0,85),overflowX:s.overflowX,overflowY:s.overflowY,position:s.position,transform:s.transform,contain:s.contain,top:s.top});
     }return list;
   });
   console.log('ANCESTORS '+width+' '+JSON.stringify(chain));
 }
 const stickyExpected=width>=821;
 const valid=initial.h1===1 && initial.faq===8 && initial.stageCount===2 && initial.next.includes('cr-questions') &&
    initial.scrollWidth<=width+2 && response.status()===200 && !errors.length && faqVisible &&
    samples.every(v=>v.at20.overflow<=2 && v.at77.overflow<=2) &&
    (stickyExpected?samples.every(v=>v.at20.position==='sticky' && v.at77.zoom>v.at20.zoom+.005 && Math.abs(v.at20.top-v.at77.top)<4):samples.every(v=>v.at20.position!=='sticky' && v.at20.zoom===1 && v.at77.zoom===1));
 if(!valid)failures++;
 console.log('RESULT '+JSON.stringify({width,http:response.status(),valid,initial,samples,faqVisible,faqAt,errors,captures}));
 if(width===1440){
   await page.emulateMedia({reducedMotion:'reduce'});
   await page.reload({waitUntil:'networkidle'});
   const reduced=await page.locator('[data-cr-cinematic-stage="overview"] section').evaluate(el=>({position:getComputedStyle(el).position,zoom:el.style.getPropertyValue('--cr-cinematic-zoom')}));
   console.log('REDUCED '+JSON.stringify(reduced));
   if(reduced.position==='sticky'||reduced.zoom)failures++;
 }
 await page.close();
}
await browser.close();
console.log('FAILURES '+failures);
if(failures)process.exitCode=1;
