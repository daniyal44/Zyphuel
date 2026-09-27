# HTML Sitemap Page Documentation (`/sitemap/` - Retired / Removed)

> [!NOTE]
> **Status: Retired / Removed on 2026-09-28**
> The human-facing HTML sitemap (`/sitemap/`) was removed per user instruction. All search engine indexing and machine crawling are strictly handled by the canonical XML sitemap at [`/sitemap.xml`](https://zyphuel.netlify.app/sitemap.xml).

## 1. Overview & Historical Purpose
The **HTML Sitemap Page** (`/sitemap/`) previously served as an experimental navigational directory indexing public pages. In Phase 14, it was decommissioned to streamline application routes down to 17 core static pages, removing code weight and avoiding duplicate content paths.

---

## 2. Technical Specifications (Archived)
- **Status**: Decommissioned (Route removed from `App.jsx`, pre-rendering pruned from `prerender.js`, file `HtmlSitemapPage.jsx` deleted).
- **Canonical Machine Sitemap**: `https://zyphuel.netlify.app/sitemap.xml` (Automated SSG sync).

---

## 3. Directory Content Hierarchy
1. **Core Navigation & Commercial Services**:
   - `Home (Doorstep Fuel Delivery)` (`/`)
   - `Services & Commercial Fuel Rates` (`/services/`)
   - `Order Fuel Dispatch Online` (`/order/`)
   - `About Zyphuel & Leadership` (`/about/`)
   - `Download Android Mobile App (APK)` (`/download/`)
   - `Contact Helpline & 24/7 Support Desk` (`/contact/`)
2. **Fuel & Energy Knowledge Guides (Subpages)**:
   - `Zyphuel Energy & Technology Blog Archive` (`/blog/`)
   - `Pakistan’s Shift to Daily Fuel Pricing` (`/blog/future-of-fuel-delivery-lahore/`)
   - `How to Download and Install Zyphuel APK` (`/blog/download-zyphuel-apk-guide/`)
   - `Powering Through Load-Shedding: Industrial Generator Refueling` (`/blog/generator-refueling-services-lahore/`)
   - `Commercial Generator Diesel & Sealed LPG Cylinders` (`/blog/generator-diesel-lpg-delivery-lahore/`)
   - `Combating Pump Short-Fueling with Calibrated Meters` (`/blog/iot-telemetry-fuel-delivery/`)
   - `Mobile Energy Logistics in Lahore: Bowser Fleet` (`/blog/zyphuel-calibrated-telemetry-fleet/`)
   - `Global vs Pakistan Fuel Delivery Benchmarks (2026)` (`/blog/global-vs-pakistan-on-demand-fuel-delivery-benchmarks/`)
3. **Legal, Privacy & Compliance**:
   - `Privacy Policy` (`/privacy/`)
   - `Terms of Use & Service Agreement` (`/terms/`)
4. **Feeds & Machine-Readable Syndication**:
   - `RSS 2.0 Editorial Feed` (`/feed.xml`)
   - `XML Sitemap Protocol` (`/sitemap.xml`)
   - `LLM Context Engine` (`/llms.txt` and `/llms-full.txt`)

---

## 4. Structured Data (Schema.org)
- **Primary Entity**: `@type: "WebPage"`
- **Breadcrumbs**: `@type: "BreadcrumbList"` (Home → HTML Sitemap)
- **Knowledge Graph Integration**: Linked to global `@id: "https://zyphuel.netlify.app/#organization"` and `@id: "https://zyphuel.netlify.app/#website"`

---

## 5. Changelog
- **2026-09-28 (Removal & Retirement)**: Decommissioned HTML sitemap (`/sitemap/`): deleted `HtmlSitemapPage.jsx`, removed route from `App.jsx`, removed link from footer navigation, purged route from `prerender.js`, cleaned crawler directives from `robots.txt`, and eliminated redirect from `_redirects`.
- **2026-09-27 (Privacy Consolidation)**: Removed raw phone number display `(+92 3230-112464)` from the Contact Helpline card description in `HtmlSitemapPage.jsx`, consolidating personal telephone exposure exclusively to `/contact/`.
- **2026-09-27 (Phase 10: SEO/AEO/GEO)**: Added Flagship Research Article 7 (`/blog/global-vs-pakistan-on-demand-fuel-delivery-benchmarks/`) to `blogGuides` directory. Enhanced XML Sitemap generator with full Google Image extension metadata (`caption`, `geo_location`, `license`).
- **2026-09-27**: Upgraded all three content section grids in `HtmlSitemapPage.jsx` (Core Services, Knowledge Guides, and Legal Compliance) from rigid `minmax(320px, 1fr)` to fluid `minmax(min(100%, 280px), 1fr)`, ensuring clean single-column wrapping without horizontal scrolling on ultra-compact mobile screens (320px–360px).
- **2026-09-25**: Fixed XML entity escaping in `prerender.js` for `<image:loc>`, `<image:title>`, and `<loc>` tags (`&` -> `&amp;`), resolving Google Search Console and browser XML parsing syntax errors (`EntityRef: expecting ';'`) caused by unescaped query parameters in external image CDN URLs.
- **2026-09-25**: Integrated direct RSS 2.0 Feed (`/feed.xml`) syndication link and discovery badge to accelerate automated crawler re-indexing.
- **2026-09-24**: Upgraded XML Sitemap generation in `prerender.js` to include `<image:image>` blocks for all 16 canonical pages and blog articles, and derived truthful publication `<lastmod>` timestamps from `articles.js`.
- **2026-09-19**: Created dedicated HTML Sitemap page to resolve search engine indexing delays for deep pages and blog subpages. Added to footer and build pre-renderer.
