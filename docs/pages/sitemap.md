# HTML Sitemap Page Documentation (`/sitemap/`)

## 1. Overview & Purpose
The **HTML Sitemap Page** (`/sitemap/`) is the central navigational directory of the Zyphuel web application. It exposes direct, search-engine-crawlable hyperlinks to all 16 canonical public pages, services, legal documents, and blog guides. Its primary objective is to eliminate orphan pages, maximize internal link equity distribution (PageRank), and accelerate comprehensive indexing across Google, Bing, and AI crawlers.

---

## 2. Technical Specifications
- **Route**: `/sitemap` and `/sitemap/` (canonical: `https://zyphuel.netlify.app/sitemap/`)
- **Component**: `src/pages/HtmlSitemapPage.jsx`
- **SSG Pre-rendered Output**: `dist/sitemap/index.html`
- **XML Sitemap Priority**: `0.9` (Change frequency: `daily`)
- **Robots Directive**: `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`

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
- **2026-09-25**: Integrated direct RSS 2.0 Feed (`/feed.xml`) syndication link and discovery badge to accelerate automated crawler re-indexing.
- **2026-09-24**: Upgraded XML Sitemap generation in `prerender.js` to include `<image:image>` blocks for all 16 canonical pages and blog articles, and derived truthful publication `<lastmod>` timestamps from `articles.js`.
- **2026-09-19**: Created dedicated HTML Sitemap page to resolve search engine indexing delays for deep pages and blog subpages. Added to footer and build pre-renderer.
