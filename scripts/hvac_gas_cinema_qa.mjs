import {chromium} from 'playwright';
import {mkdirSync} from 'node:fs';
const base='http://127.0.0.1:8765/cr-plumbing/';
const routes=[
 'hvac/','hvac/cooling/','hvac/cooling/maintenance-repair/','hvac/cooling/mini-splits/',
 'hvac/dryer-vent-duct/maintenance-repair/','hvac/dryer-vent-duct/new-installation/',
 'hvac/heating/','hvac/heating/maintenance-repair/','hvac/indoor-air-quality/',
 'gas-services/','gas-services/appliances/','gas-services/gas-fireplace-repair/','gas-services/line-installs/'
];
const viewports=[[375,812],[768,900],[1024,700],[1440,900],[1440,768]];
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
mkdirSync('qa-hvac-gas',{recursive:true});
let fails=0,checked=0;
for(const route of routes){
  for(const [width,height] of viewports){
    const page=await browser.newPage({viewport:{width,height},reducedMotion:'no-preference'});
    const errors=[];
    page.on('pageerror',x=>errors.push('JS '+x.message));
    page.on('response',r=>{if(r.status()>=400 && r.url().includes('127.0.0.1'))errors.push('Local HTTP '+r.status()+' '+r.url())});
    const resp=await page.goto(base+route,{waitUntil:'domcontentloaded',timeout:30000});
    await page.evaluate(()=>document.fonts.ready);
    await page.waitForTimeout(200);
    const points=await page.evaluate(()=>{
      const a=[...document.querySelectorAll('[data-cr-cinematic-stage]')],head=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--head'))||83;
      const first=a[0],second=a[1];
      return {head,first:first.getBoundingClientRect().top+scrollY-head,
        second:second.getBoundingClientRect().top+scrollY-head,
        firstHeight:first.offsetHeight,secondHeight:second.offsetHeight,
        firstSceneHeight:first.querySelector('section').offsetHeight,
        secondSceneHeight:second.querySelector('section').offsetHeight,
        h1:document.querySelectorAll('h1').length,faq:document.querySelectorAll('.cr-qa').length,
        enabled:document.body.classList.contains('cr-cinema-ready'),
        overflow:document.documentElement.scrollWidth-innerWidth,
        bg:getComputedStyle(first.querySelector('section'),'::before').backgroundImage,
        sections:[...document.querySelectorAll('main section')].map(x=>x.className).slice(-9)};
    });
    const active=width>=821&&height>=680;let sample=[];
    async function seek(y){
      await page.evaluate(t=>scrollTo({top:t,behavior:'instant'}),y);
      await page.waitForTimeout(100);
      return page.evaluate(()=>{
        const a=[...document.querySelectorAll('[data-cr-cinematic-stage] section')];
        const snap=el=>{
          const sect=el.getBoundingClientRect();
          const p=[...el.querySelectorAll('h2,p,h3')].filter(x=>getComputedStyle(x).display!=='none');
          const bottom=Math.max(...p.map(x=>x.getBoundingClientRect().bottom));
          return {phase:el.dataset.crCinemaPhase||'',position:getComputedStyle(el).position,
            top:Math.round(sect.top),height:Math.round(sect.height),
            textBottom:Math.round(bottom),zoom:Number(el.style.getPropertyValue('--cr-cinematic-zoom'))||1};
        };
        return {first:snap(a[0]),second:snap(a[1]),overflow:document.documentElement.scrollWidth-innerWidth};
      });
    }
    let good=resp.status()===200 && points.h1===1 && points.faq>0 && points.overflow<=2 &&
       points.bg.includes('url(') && errors.length===0;
    if(active) {
      const z=points.second-points.first;
      const reveal=points.firstHeight-points.firstSceneHeight-z;
      const z2=points.secondHeight-points.secondSceneHeight-reveal;
      for(const [label,pos] of [['first',points.first+z*.7],
        ['rise',points.second+reveal*.5],['second1',points.second+reveal+z2*.2],
        ['second2',points.second+reveal+z2*.8]]) {
        const state=await seek(pos);
        sample.push({label,...state});
        if(width===1440&&height===900&&(route==='gas-services/appliances/'||route==='hvac/cooling/maintenance-repair/')&&label==='rise'){
          const dest='qa-hvac-gas/'+route.replaceAll('/','-')+'-'+width+'.jpg';
          await page.screenshot({path:dest,type:'jpeg',quality:60});
        }
      }
      const [a,b,c,d]=sample;
      good &&= z>100&&reveal>100&&z2>100;
      good &&= a.first.position==='fixed'&&b.first.position==='fixed'&&
        b.second.phase==='entering'&&b.second.position==='fixed'&&
        b.second.top>points.head+120&&
        c.second.position==='fixed'&&d.second.position==='fixed'&&
        d.second.zoom>c.second.zoom+.01;
      // All text in a pinned scene must remain visible above the bottom of viewport.
      good &&= a.first.textBottom<=height+4&&c.second.textBottom<=height+4&&
        a.first.textBottom>=points.head && c.second.textBottom>=points.head;
    } else {
      const state=await seek(points.first+70);
      sample.push({label:'static',...state});
      good&&= !points.enabled && state.first.position!=='fixed'&&state.second.position!=='fixed';
    }
    await page.locator('.cr-questions').scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
    good&&=await page.locator('.cr-questions').isVisible();
    checked++;
    if(!good)fails++;
    console.log('QA '+JSON.stringify({route,width,height,pass:good,points:{head:points.head,faq:points.faq,overflow:points.overflow,enabled:points.enabled,
      firstHeight:points.firstSceneHeight,secondHeight:points.secondSceneHeight},sample,errors}));
    if(route==='gas-services/'&&width===1440&&height===900){
      await page.emulateMedia({reducedMotion:'reduce'});
      await page.reload({waitUntil:'domcontentloaded'});
      await page.waitForTimeout(220);
      const red=await page.evaluate(()=>({enabled:document.body.classList.contains('cr-cinema-ready'),pos:getComputedStyle(document.querySelector('[data-cr-cinematic-stage] section')).position}));
      if(red.enabled||red.pos==='fixed'){fails++;console.log('REDUCED_FAIL '+JSON.stringify(red))}
    }
    await page.close();
  }
}
await browser.close();
console.log('TOTAL '+checked+' FAILURES '+fails);
if(fails)process.exitCode=1;
