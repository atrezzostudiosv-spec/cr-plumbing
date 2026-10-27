import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';

const base = process.env.BASE_URL || 'https://atrezzostudiosv-spec.github.io/cr-plumbing/';
const paths = {
  maintenance: 'hvac/heating/maintenance-repair/',
  installation: 'hvac/heating/new-installation/',
  plumbing_pilot: 'plumbing-services/water-heaters/',
  hvac_pilot: 'hvac/dryer-vent-duct/',
  electrical_pilot: 'electrical-services/',
  gas_pilot: 'gas-services/'
};
const widths = [375,768,1024,1440];
mkdirSync('qa-output', {recursive:true});
const browser = await chromium.launch({headless:true,args:['--no-sandbox']});
let failures = 0; const results=[];
for (const [pageName, path] of Object.entries(paths)) {
  for (const width of widths) {
    const page = await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
    const networkErrors = [];
    page.on('response', response => {
      if (response.status() >= 400 && new URL(response.url()).hostname.endsWith('github.io')) networkErrors.push(response.status() + ' ' + response.url());
    });
    page.on('pageerror',err=>networkErrors.push('JS '+err.message));
    let navigation;
    try {
      navigation = await page.goto(base + path, {waitUntil:'domcontentloaded',timeout:30000});
      await page.evaluate(()=>document.fonts.ready);
      await page.waitForTimeout(750);
    } catch (err) {
      console.log('FAIL navigation',pageName,width,String(err));
      failures++; await page.close(); continue;
    }
    const data = await page.evaluate(() => {
      const sections = [...document.querySelectorAll('main section')];
      const headings = sections.map(el=>({type:el.className,heading:el.querySelector('h2')?.textContent?.trim()||null,
        top:Math.round(el.getBoundingClientRect().top+scrollY),height:Math.round(el.getBoundingClientRect().height)}));
      const viewport = innerWidth;
      const overflowing = [...document.querySelectorAll('body *')].filter(el=>{
        const r=el.getBoundingClientRect(),c=getComputedStyle(el);
        return r.width>0 && r.right>viewport+3 && c.position!=='fixed' && c.visibility!=='hidden' && c.display!=='none';
      }).slice(0,10).map(el=>({tag:el.tagName,class:el.className?.toString().slice(0,60),right:Math.round(el.getBoundingClientRect().right)}));
      const picture=document.querySelector('.cr-docu-media img');
      const hero=document.querySelector('.cr-page-hero');
      return {h1:document.querySelectorAll('h1').length,faq:document.querySelectorAll('.cr-qa').length,
        contentHeight:document.documentElement.scrollHeight,scrollWidth:document.documentElement.scrollWidth,
        viewport, overflowing, headings,
        heroBackground:hero?.style.getPropertyValue('--page-art')||'',
        docuImage:picture?{src:picture.currentSrc,naturalWidth:picture.naturalWidth,naturalHeight:picture.naturalHeight}:null,
        headingsCount:document.querySelectorAll('main h2').length,
        css:document.querySelector('link[href*="service-template-v1.css"]')?.getAttribute('href')||'none'};
    });
    const res={page:pageName,width,http:navigation?.status(),...data,networkErrors};
    results.push(res);
    console.log('RESULT '+JSON.stringify({page:pageName,width,http:res.http,h1:res.h1,faq:res.faq,overflow:res.scrollWidth-res.viewport,
      overflowing:res.overflowing,broken:networkErrors,hero:res.heroBackground,docu:res.docuImage,sections:res.headings.map(x=>x.heading||x.type)}));
    if(res.h1!==1 || res.scrollWidth>width+3 || (navigation && navigation.status()!==200) || networkErrors.some(s=>s.startsWith('JS ')))failures++;
    if (width===375) {
      const nav=page.locator('#nav-toggle');
      if(await nav.isVisible()) {
        await nav.click();
        const state=await nav.getAttribute('aria-expanded');
        console.log('NAV '+pageName+' expanded='+state);
        if(state!=='true') failures++;
        await nav.click();
      }
      const faq=page.locator('.cr-qa summary').first();
      if(await faq.count()) {
        await faq.scrollIntoViewIfNeeded();
        await faq.click();
        const opened=await faq.evaluate(el=>el.closest('details')?.open);
        console.log('FAQ '+pageName+' opened='+opened);
        if(!opened)failures++;
      }
    }
    const stem='qa-output/'+pageName+'-'+width;
    await page.screenshot({path:stem+'-full.jpg',type:'jpeg',quality:55,fullPage:true});
    if(width===375||width===1440){
      await page.screenshot({path:stem+'-hero.jpg',type:'jpeg',quality:54});
      const target=page.locator('.cr-detail-band').first();
      await target.scrollIntoViewIfNeeded();
      await page.screenshot({path:stem+'-chapter.jpg',type:'jpeg',quality:54});
      const process=page.locator('.cr-process').first();
      await process.scrollIntoViewIfNeeded();
      await page.screenshot({path:stem+'-process.jpg',type:'jpeg',quality:54});
      const media=page.locator('.cr-docu-media img').first();
      if(await media.count() && await media.isVisible()) {await media.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      console.log('MEDIA '+JSON.stringify({page:pageName,width,...(await media.evaluate(el=>({loaded:el.complete && el.naturalWidth>0,
       naturalWidth:el.naturalWidth,src:el.currentSrc})))}));}
      if(width===1440 || width===375) {
        for (const [label,selector] of (pageName.includes('pilot') ? [['hero','.cr-page-hero'],['chapter','.cr-detail-band']] : [['hero','.cr-page-hero'],['chapter','.cr-detail-band'],['process','.cr-process']])) {
          if (pageName.includes('pilot') && !((label==='hero' && width===375) || (label==='chapter' && width===1440))) continue;
          const element=page.locator(selector).first();
          await element.scrollIntoViewIfNeeded();
          const img=await page.screenshot({type:'jpeg',quality:38,scale:'css'});
          console.log('IMAGE_BEGIN '+pageName+'_'+label+'_'+width);
          const b64=img.toString('base64');
          for(let at=0;at<b64.length;at+=8000) console.log(b64.slice(at,at+8000));
          console.log('IMAGE_END '+pageName+'_'+label+'_'+width);
        }
      }
    }
    await page.close();
  }
}
writeFileSync('qa-output/results.json',JSON.stringify({timestamp:new Date().toISOString(),failures,results},null,2));
await browser.close();
console.log('TOTAL_FAILING_VIEWPORT_CHECKS '+failures);
if(failures)process.exitCode=1;
