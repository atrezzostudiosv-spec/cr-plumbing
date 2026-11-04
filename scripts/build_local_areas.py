#!/usr/bin/env python3
"""Extend the Argyle layout with each locality's archived content and FAQs."""
from pathlib import Path
from html import escape
from urllib.parse import urlsplit
import json, re, subprocess, sys
from bs4 import BeautifulSoup

ROOT=Path(__file__).resolve().parents[1]
BASE='/cr-plumbing/'
subprocess.run([sys.executable,str(ROOT/'scripts/build_argyle.py'),'--skip-seo'],check=True)
records=json.loads((ROOT/'assets/local-areas-content.json').read_text())
template=(ROOT/'service-areas/argyle-tx/index.html').read_text()
known={r['city']:r['slug'] for r in records}
for record in records:
    city,slug=record['city'],record['slug']
    if slug=='argyle-tx':continue
    s=BeautifulSoup(template,'html.parser')
    s.title.string=f'{city} Plumbing, Electrical & HVAC | CR Plumbing, Air & Electric'
    s.select_one('meta[name="description"]')['content']=f'Explore CR Plumbing, Air & Electric services in {city}, Texas: plumbing, heating, cooling, electrical and gas. Local service information, FAQs and contact.'
    s.body['data-city']=city;s.body['data-request-service']='Home services in '+city
    for node in list(s.main.find_all(string=True)):
        if 'Argyle' in str(node):node.replace_with(str(node).replace('Argyle',city))
        elif 'ARGYLE' in str(node):node.replace_with(str(node).replace('ARGYLE',city.upper()))
    for el in s.main.select('[id]'):el['id']=el['id'].replace('argyle-',slug+'-')
    for el in s.main.select('[aria-labelledby]'):el['aria-labelledby']=el['aria-labelledby'].replace('argyle-',slug+'-')
    for el in s.main.select('a[href^="#argyle-"]'):el['href']=el['href'].replace('#argyle-','#'+slug+'-')
    if any(len(word)>7 for word in city.split()) or len(city)>11:s.h1['class']=['city-long']
    hero_intro=s.select_one('.local-hero p')
    sentences=re.split(r'(?<=[.!?])\s+',record['intro'])
    hero_intro.string=next((x for x in sentences if 70<len(x)<290),f'Explore plumbing, heating, cooling and electrical service information for {city}, Texas. Contact the team about your property and appointment availability.')
    intro=s.select_one('.local-intro>div:last-child');paragraphs=intro.select('p')
    paragraphs[1].string=record['intro']
    if record['article_html']:
        rich=s.new_tag('section',attrs={'class':'local-section local-source-content'})
        shell=s.new_tag('div',attrs={'class':'local-shell local-rich'})
        shell.append(BeautifulSoup(record['article_html'],'html.parser'));rich.append(shell)
        s.select_one('.local-process').insert_before(rich)
    question_section=s.select_one('.local-questions')
    if not record['faqs']:question_section.decompose()
    else:
        answers=question_section.select_one('.local-faq-layout>div:last-child');answers.clear()
        for item in record['faqs']:
            detail=s.new_tag('details',attrs={'class':'cr-qa'});summary=s.new_tag('summary');summary.string=item['question'];p=s.new_tag('p');p.string=item['answer'];detail.extend([summary,p]);answers.append(detail)
    location=s.select_one('.local-location')
    location.clear()
    location.append(BeautifulSoup(f'<div><span class="local-kicker">Your community</span><h2>SERVICE FOR<br>{escape(city.upper())}.</h2><p>Contact the CR team about your location and the service you need.</p></div><div><p class="local-lead">Explore the service guides, ask about availability or discover more communities across Dallas–Fort Worth.</p><a class="local-text-link" href="{BASE}service-areas/">Explore all service areas <span aria-hidden="true">↗</span></a></div>','html.parser'))
    for caption in s.select('.atc-index-stage-caption>span:first-child'):caption.string='Services for '+city
    dst=ROOT/'service-areas'/slug/'index.html';dst.parent.mkdir(exist_ok=True);dst.write_text('\n'.join(line.rstrip() for line in str(s).splitlines())+'\n')

argyle=BeautifulSoup((ROOT/'service-areas/argyle-tx/index.html').read_text(),'html.parser')
for link in argyle.select('.local-nearby a'):
    city=link.get_text(' ',strip=True)
    if city in known:link['href']=BASE+'service-areas/'+known[city]+'/'
(ROOT/'service-areas/argyle-tx/index.html').write_text(str(argyle))

# Every source-backed city opens its own page. Three unsourced listings lead to
# a prefilled availability enquiry rather than a fabricated local landing page.
path=ROOT/'service-areas/index.html';s=BeautifulSoup(path.read_text(),'html.parser')
for el in s.select('.cr-city-grid>*'):
    city=el.get_text(' ',strip=True).replace(' ↗','').replace(' · Ask about service','')
    el.name='a'
    if city in known:
        el['href']=BASE+'service-areas/'+known[city]+'/';el.string=city+' ↗'
    else:
        el['href']=BASE+'contact-us/?city='+city;el.string=city+' · Ask about service'
for p in s.select('.cr-area-intro p'):
    p.string='Choose your community to explore local services and answers. For Bedford, McKinney and Sanger, contact the team to confirm availability.'
path.write_text(str(s))
print('Built',len(records),'source-backed local pages;',sum(len(r['faqs']) for r in records),'source FAQs')
subprocess.run([sys.executable,str(ROOT/'scripts/build_seo.py')],check=True)
