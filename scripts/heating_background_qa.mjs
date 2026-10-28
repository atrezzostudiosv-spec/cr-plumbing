import {chromium} from 'playwright';
import {mkdirSync} from 'node:fs';

const base='http://127.0.0.1:8765/cr-plumbing/hvac/heating/new-installation/';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
let fails=0;
mkdirSync('qa-heating-output',{recursive:true});
for(const width of [375,768,1024,1440]){
 const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
 const errors=[];
 page.on('pageerror',e=>errors.push('js:'+e.message));
 page.on('response',r=>{if(r.status()>=400&&r.url().includes('/cr-plumbing/'))errors.push('http '+r.status()+' '+r.url());});
 const response=await page.goto(base,{waitUntil:'networkidle',timeout:30000});
 await page.evaluate(()=>document.fonts.ready);
 const section=page.locator('section.cr-docu-media.cr-heating-full-background');
 await section.scrollIntoViewIfNeeded();
 await page.waitForTimeout(300);
 const result=await page.evaluate(()=>{
  const sec=document.querySelector('section.cr-docu-media.cr-heating-full-background');
  const pseudo=getComputedStyle(sec,'::before');
  const img=pseudo.backgroundImage;
  const bounds=sec.getBoundingClientRect();
  const next=sec.nextElementSibling;
  return {h1:document.querySelectorAll('h1').length,faq:document.querySelectorAll('.cr-qa').length,
   sectionPresent:!!sec, background:img,height:Math.round(bounds.height),
   width:Math.round(bounds.width),title:sec.querySelector('h2')?.textContent?.trim(),
   text:sec.querySelector('p')?.textContent?.trim().slice(0,90),
   childImages:sec.querySelectorAll('img').length,
   nextSection:next?.className,
   scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth};
 });
 const relative='/cr-plumbing/assets/images/hvac-heating-installation-furnace-background.webp';
 let bgStatus=0;try{const r=await page.request.get('http://127.0.0.1:8765'+relative);bgStatus=r.status();}catch(e){errors.push('image request: '+e.message)}
 if(width===375){
  const nav=page.locator('#nav-toggle');
  if(await nav.isVisible()) {await nav.click();const expanded=await nav.getAttribute('aria-expanded');if(expanded!=='true')errors.push('nav did not open'); await nav.click();}
 }
 const test={width,http:response.status(),bgStatus,...result,errors};
 if(test.http!==200||test.bgStatus!==200||test.h1!==1||test.faq!==8||
 test.scrollWidth>test.clientWidth+2||test.childImages!==0||
 !test.background.includes('hvac-heating-installation-furnace-background.webp')||
 !test.nextSection?.includes('cr-process')||errors.length)fails++;
 console.log('TEST '+JSON.stringify(test));
 const target='qa-heating-output/fullbleed-'+width+'.jpg';
 await section.screenshot({path:target,type:'jpeg',quality:65});
 if(width===375||width===1440){
  const data=await section.screenshot({type:'jpeg',quality:45});
  console.log('IMAGE_BEGIN '+width);
  const b64=data.toString('base64');
  for(let i=0;i<b64.length;i+=8000)console.log(b64.slice(i,i+8000));
  console.log('IMAGE_END '+width);
 }
 await page.close();
}
await browser.close();
console.log('QA_FAILURES '+fails);
if(fails)process.exitCode=1;
