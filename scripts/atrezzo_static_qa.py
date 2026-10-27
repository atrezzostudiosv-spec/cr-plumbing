#!/usr/bin/env python3
"""ATREZZO / CR Plumbing: safe, read-only static QA for the proposal website.

This is NOT a browser, accessibility, SEO-indexing or Core Web Vitals test.
Run from the repository root: python3 scripts/atrezzo_static_qa.py
Use --fail-critical to exit nonzero on release-blocking source errors.
"""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import argparse
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
SITE_PREFIX = "/cr-plumbing/"
LOCAL_ATTRIBUTES = ("href", "src", "poster")
IMAGE_SUFFIXES = (".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif", ".svg")

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.titles = []
        self.in_title = False
        self.h1 = 0
        self.meta = {}
        self.refresh = False
        self.refs = []
        self.ids = set()
        self.images_without_alt = 0
        self.faq = 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "title":
            self.in_title = True
        if tag == "h1":
            self.h1 += 1
        if tag == "meta":
            key = (a.get("name") or "").lower()
            if key:
                self.meta[key] = a.get("content") or ""
            if (a.get("http-equiv") or "").lower() == "refresh":
                self.refresh = True
        if a.get("id"):
            self.ids.add(a["id"])
        if tag == "img" and "alt" not in a:
            self.images_without_alt += 1
        if "cr-qa" in (a.get("class") or "").split():
            self.faq += 1
        for key in LOCAL_ATTRIBUTES:
            if a.get(key):
                self.refs.append((key, a[key]))
        if a.get("srcset"):
            for entry in a["srcset"].split(","):
                url = entry.strip().split(" ")[0]
                if url:
                    self.refs.append(("srcset", url))

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False

    def handle_data(self, value):
        if self.in_title:
            self.titles.append(value)

def destination(source, url):
    value = (url or "").strip()
    if not value or value.startswith(("#", "//", "data:", "tel:", "mailto:", "javascript:")):
        return None
    parsed = urlsplit(value)
    if parsed.scheme or parsed.netloc:
        return None
    path = unquote(parsed.path)
    if not path:
        return None
    if path.startswith(SITE_PREFIX):
        target = ROOT / path[len(SITE_PREFIX):]
    elif path == "/cr-plumbing":
        target = ROOT
    elif path.startswith("/"):
        # A different absolute prefix is external to this GitHub Pages project.
        return None
    else:
        target = source.parent / path
    if target.is_dir() or path.endswith("/"):
        target = target / "index.html"
    return target

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--fail-critical", action="store_true")
    args = ap.parse_args()
    issues = []
    warnings = []
    counts = Counter()
    duplicate_titles = Counter()
    pages = sorted(ROOT.rglob("index.html"))
    if not pages:
        print("FAIL: no HTML routes found")
        return 1
    for path in pages:
        rel = path.relative_to(ROOT).as_posix()
        parser = PageParser()
        parser.feed(path.read_text(encoding="utf-8"))
        counts["html_routes"] += 1
        counts["faq_items"] += parser.faq
        title = " ".join(parser.titles).strip()
        if title:
            duplicate_titles[title] += 1
        else:
            issues.append(f"{rel}: missing title")
        if "noindex" not in parser.meta.get("robots", "").lower():
            issues.append(f"{rel}: proposal must remain noindex")
        if parser.refresh:
            counts["redirect_aliases"] += 1
        else:
            counts["content_pages"] += 1
            if parser.h1 != 1:
                issues.append(f"{rel}: expected one H1; got {parser.h1}")
            if not parser.meta.get("description"):
                issues.append(f"{rel}: missing meta description")
        if parser.images_without_alt:
            issues.append(f"{rel}: {parser.images_without_alt} <img> without alt attribute")
        contents = path.read_text(encoding="utf-8")
        if 'cr-template-v1' in contents and '<body' in contents:
            counts["template_mentions"] += 1
        for kind, url in parser.refs:
            if "crplumbingdfw.com/wp-content/uploads" in url:
                counts["remote_original_asset_refs"] += 1
            target = destination(path, url)
            if target and not target.exists():
                issues.append(f"{rel}: broken local {kind} => {url}")
    for path in ROOT.rglob("*.css"):
        css = path.read_text(encoding="utf-8")
        for url in re.findall(r"url\(\s*['\"]?([^)'\"\s]+)", css):
            target = destination(path, url)
            if target and not target.exists():
                issues.append(f"{path.relative_to(ROOT)}: broken CSS asset => {url}")
    for value, count in duplicate_titles.items():
        if count > 1:
            warnings.append(f"duplicate title {count}x: {value[:100]}")
    print("# ATREZZO — source-only static QA")
    for key, value in sorted(counts.items()):
        print(f"{key}: {value}")
    print(f"critical_errors: {len(issues)}")
    print(f"warnings: {len(warnings)}")
    for item in issues[:70]:
        print("ERROR:", item)
    for item in warnings[:30]:
        print("WARNING:", item)
    print("NOT TESTED: browser layout, responsive, forms delivery, performance, network HTTP, claims, rights, third-party APIs, real accessibility.")
    if len(issues) > 70:
        print(f"...and {len(issues)-70} further errors")
    return 1 if issues and args.fail_critical else 0

if __name__ == "__main__":
    sys.exit(main())
