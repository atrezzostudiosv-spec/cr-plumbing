#!/usr/bin/env python3
"""Check rendered SEO contracts and local image files independently of generation."""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
from xml.etree import ElementTree as ET
import json
import struct

ROOT = Path(__file__).resolve().parents[1]
CONFIG = json.loads((ROOT/'assets/seo-config.json').read_text())
BASE = CONFIG['base_url']


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.meta = {}
        self.links = []
        self.title = ''
        self.title_count = 0
        self.in_title = False
        self.schema = ''
        self.in_schema = False
        self.redirect = False
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'title':
            self.in_title = True
            self.title_count += 1
        if tag == 'meta':
            key = attrs.get('name') or attrs.get('property')
            if key:
                self.meta.setdefault(key, []).append(attrs.get('content'))
            self.redirect |= attrs.get('http-equiv', '').lower() == 'refresh'
        if tag == 'link':
            self.links.append(attrs)
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.in_schema = True

    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False
        if tag == 'script': self.in_schema = False

    def handle_data(self, data):
        if self.in_title: self.title += data
        if self.in_schema: self.schema += data


def local_asset(url):
    assert url.startswith(BASE), f'Asset is not an absolute URL on this site: {url}'
    path = ROOT/unquote(urlsplit(url[len(BASE):]).path)
    assert path.is_file(), f'Missing asset: {path}'
    return path


titles, descriptions = Counter(), Counter()
pages = list(ROOT.rglob('index.html'))
for path in pages:
    p = Page(path.read_text())
    assert p.title_count == 1 and p.title, f'{path}: missing/duplicate title'
    for key in ['description', 'robots', 'og:title', 'og:description', 'og:type', 'og:url', 'og:site_name', 'og:locale', 'og:image', 'og:image:width', 'og:image:height', 'og:image:alt', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt']:
        assert len(p.meta.get(key, [])) == 1 and p.meta[key][0], f'{path}: missing/duplicate {key}'
    assert p.meta['og:title'][0] == p.title == p.meta['twitter:title'][0]
    assert p.meta['description'] == p.meta['og:description'] == p.meta['twitter:description']
    assert p.meta['og:image'] == p.meta['twitter:image']
    assert p.meta['twitter:card'] == ['summary_large_image']
    assert p.meta['og:image:width'] == ['1200'] and p.meta['og:image:height'] == ['630']
    canonical = [l['href'] for l in p.links if l.get('rel') == 'canonical']
    assert len(canonical) == 1 and canonical == p.meta['og:url'], f'{path}: inconsistent canonical'
    assert canonical[0].startswith(BASE) and not urlsplit(canonical[0]).query
    target = ROOT/unquote(canonical[0][len(BASE):])/'index.html'
    assert target.is_file(), f'{path}: canonical target does not exist'
    if not CONFIG['indexing_enabled'] or p.redirect:
        assert p.meta['robots'] == ['noindex,nofollow'], f'{path}: preview accidentally indexable'
    local_asset(p.meta['og:image'][0])
    for rel in ['icon', 'apple-touch-icon', 'manifest']:
        assets = [l for l in p.links if l.get('rel') == rel]
        assert assets, f'{path}: missing {rel}'
        for asset in assets: local_asset(asset['href'])
    if not p.redirect:
        titles[p.title] += 1
        descriptions[p.meta['description'][0]] += 1
        graph = json.loads(p.schema)['@graph']
        page = next(x for x in graph if x['@type'] == 'WebPage')
        assert page['url'] == canonical[0] and page['name'] == p.title
        crumbs = next(x for x in graph if x['@type'] == 'BreadcrumbList')['itemListElement']
        assert crumbs[-1]['item'] == canonical[0]
assert all(n == 1 for n in titles.values()), 'Duplicate content page titles'
assert all(n == 1 for n in descriptions.values()), 'Duplicate content page descriptions'
for file, size in [('favicon-32.png', 32), ('favicon-48.png', 48), ('apple-touch-icon.png', 180), ('icon-192.png', 192), ('icon-512.png', 512)]:
    data = (ROOT/'assets/brand'/file).read_bytes()
    assert data.startswith(b'\x89PNG\r\n\x1a\n'), f'{file}: invalid PNG signature'
    assert struct.unpack('>II', data[16:24]) == (size, size), f'{file}: wrong dimensions'
ico = (ROOT/'favicon.ico').read_bytes()
assert struct.unpack('<HHH', ico[:6]) == (0, 1, 2), 'Invalid multi-size ICO'
for i in range(2):
    w, h, _, _, _, _, size, offset = struct.unpack('<BBBBHHII', ico[6+16*i:22+16*i])
    assert (w, h) == ((32, 32) if i == 0 else (48, 48))
    assert ico[offset:offset+size].startswith(b'\x89PNG\r\n\x1a\n')
assert (ROOT/CONFIG['social_image']).read_bytes().startswith(b'\xff\xd8'), 'Social image is not JPEG'
manifest = json.loads((ROOT/'site.webmanifest').read_text())
assert manifest['scope'] == BASE == manifest['start_url']
for icon in manifest['icons']: local_asset(icon['src'])
sitemap = ET.parse(ROOT/'sitemap.xml').getroot()
locations = sitemap.findall('{*}url/{*}loc')
assert len(locations) == (len(titles) if CONFIG['indexing_enabled'] else 0), 'Sitemap contains noindex or alias URLs'
print(f'SEO QA: {len(pages)} routes, {len(titles)} unique titles/descriptions; canonical, social, schema, icons and sitemap OK')
