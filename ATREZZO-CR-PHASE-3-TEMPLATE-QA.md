# CR Plumbing — Phase 3 / Master Service Template Review

Date: 2026-10-27
Scope: four pilot pages only — **Water Heaters, Dryer Vent & Duct, Electrical Services, Gas Services**.

## What was implemented

1. A **single shared editorial template** in `assets/service-template-v1.css`, activated only by `body.cr-template-v1` on the four approved pilot pages.
2. On 1024 / 768 / 375-width layouts, the long sideways-scrolling chapter index is replaced by **Explore This Page**, a native `<details>` menu in the natural vertical flow. The full service-guide links remain visible in desktop layout.
3. The mobile details menu closes on item selection, outside pointer interaction, or Escape; it follows the active section when IntersectionObserver is available.
4. Major section headlines, paragraphs, whitespace, links, keyboard focus and question-answer text received an explicit legibility and spacing scale.
5. **Important contrast bug corrected:** when a source section labeled `cr-detail-band--navy` was rendered on a white editorial surface, its light text remained difficult to read. The template now uses dark text in those chapters; dark process chapters retain light text.
6. Electrical's oversized and awkward H1 was shortened to **Electrical Services Across DFW**, retaining the original city names in the page text. Electrical and Gas documentary interludes were simplified to full-width typographic passages. Irrelevant sideways images (Gas photo on Electrical, generic archive banner on Gas) were removed; corresponding text was retained.
7. The approved photographic design remains: category-specific heroes and A Closer Look scenes, shared How It Works and Let's Talk photos. No new photos were added in this phase; concept images are not customer jobs.
8. Reduced-motion and focus-visible accommodations added or preserved.

## Four pilot pages

| Page | H1 | Original FAQs retained |
|---|---|---:|
| `/plumbing-services/water-heaters/` | Water Heater Repair & Installation | 8 |
| `/hvac/dryer-vent-duct/` | Dryer Vent & Duct Services in DFW | 6 |
| `/electrical-services/` | Electrical Services Across DFW | 9 |
| `/gas-services/` | Gas Line Services & Repair in DFW | 8 |

**31/31 FAQ retained** in the reviewed pilots. Home design, other 62 service pages, service-area directory and footer were not redesigned.

## Verification status

| Check | Status | What was checked |
|---|---|---|
| GitHub repository write access | VERIFIED | Commits accepted in `main` |
| One H1 in each pilot | VERIFIED | HTML source checked |
| FAQ counts and section counts | VERIFIED | Before/after structural check |
| Shared template restricted to four pilots | VERIFIED | CSS body classes and link inclusion |
| JS syntax | VERIFIED | Script parsed successfully |
| Native details menu, Escape, outside click | IMPLEMENTED / NOT BROWSER-TESTED | Logic checked in code only |
| New contrast pairs | VERIFIED IN CSS | `#2b4351` on white: 10.37:1; `#dcebf0` on `#0b2230`: 13.37:1 |
| 375, 768, 1024, 1440 viewport appearance | NOT VISUALLY TESTED | Responsive rules reviewed in source only |
| No unwanted horizontal scrolling | NOT BROWSER-TESTED | Needs real viewport render |
| Actual mobile navigation and CTA interaction | NOT BROWSER-TESTED | Requires live interaction |
| Shared images and mobile cropping | NOT VISUALLY TESTED | Previously uploaded assets and CSS references are present |
| SEO indexability | PROPOSAL ONLY | Existing `noindex,nofollow` tags retained intentionally |
| Performance, accessibility audit, forms, link validation | NOT TESTED | Reserved for final QA |

This is a **proposal**, not an official CR Plumbing production site. All images created for this pilot are illustrative. Licenses, response times and other commercial claims remain subject to the separate claims-validation register.

## Decision gate before applying to 62 remaining service pages

Inspect the four pilots at **375 / 768 / 1024 / 1440 px** in a browser, verify page navigation and CTA interactions, confirm image crop and readable contrasts, and approve or correct any remaining defects. Apply this shared template systematically only after that visual QA. Other service images and local-area pages belong to later phases.

## Phase 3 — QA round 2 / 2026-10-27

### Fixes and verifications implemented
- Condensed the navigation labels for the four approved pilots to avoid overflowing and tall sticky multi-row desktop guides. Source H2 and all service paragraphs remain unchanged.
- Prevented `assets/service-design-manifest.json` from overriding the pilot-specific hero images with older category pictures.
- Refreshed the shared `site.js` and chapter-guide JS query versions on all four pilots.
- Scanned HTML internal `href`, `src` and hash references in the four pages against the actual repository tree: **0 invalid local file paths, 0 invalid static hash targets**.
- Verified referenced image paths in eight related CSS files: **0 missing local photo files**.
- Checked brace balance in eight CSS sources and parsed both shared scripts: **no syntax failures**.
- Verified a single H1 on each page and **31 of 31 pilot FAQs** (8 Water Heaters, 6 Dryer Vent, 9 Electrical, 8 Gas).

### Limits and next gate
The published website could not be rendered or controlled in a live browser through the tools available for this chat. This is a **repository and static-code QA**, not actual viewport testing. The user-approved visual gate remains pending at **375, 768, 1024, and 1440 px** on all four pages. In particular check:
- Navigation/menu open, Escape, close outside, selected section and scroll-to-position.
- Photo crop and subject visibility in mobile and tablet.
- Text wrapping, contrast, overflow and button visibility, including desktop navigation.
- Actual live asset/network requests and performance.

Status: **IMPLEMENTED AND STATIC-CODE-CHECKED, NOT VISUALLY SIGNED OFF**. Do not spread the `cr-template-v1` flag across all 66 routes until this gate is completed. Keep the proposal marked not production-ready and keep the claim validation register as pending.
