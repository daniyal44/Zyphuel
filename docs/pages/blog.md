# Page Documentation: Blog Listing Page

## Overview & Identity
- **Page Name**: Blog & Fuel Guides Listing
- **Route**: `/blog/`
- **Component File**: `src/pages/BlogListPage.jsx`
- **Primary Purpose**: Editorial and knowledge hub publishing articles, market analyses, safety guides, and tech documentation regarding fuel delivery, daily price fluctuations, generator maintenance, and mobile energy in Pakistan.

---

## SEO & Structured Data
- **Page Title**: `Zyphuel Blog | Fuel Delivery, Energy & Vehicle Guides`
- **Meta Description**: `Read the latest articles about fuel delivery, generator refueling, LPG gas delivery, and mobile energy logistics in Lahore, Pakistan.`
- **Schema Type**: `CollectionPage` / `Blog`
- **Sitemap Priority**: `0.9` (`daily` change frequency) for `/blog/`; `0.8` (`weekly` change frequency) for all 6 individual article subpages.
- **Canonical URL**: `https://zyphuel.netlify.app/blog/`

---

## Layout & Interactive Components
1. **Breadcrumbs**:
   - Navigation: `Home / Blog`.
2. **Hero Header**:
   - Title: `Zyphuel Blog & Fuel Guides`.
   - Subtitle: Latest updates regarding mobile fuel logistics, daily OGRA price reforms, and smart refueling.
3. **Category Filtering Bar**:
   - Filter Tabs:
     - `All Articles`
     - `Zyphuel Energy`
     - `Zyphuel App & Guides`
     - `Generator & Utilities`
   - Dynamically re-triggers CSS scroll reveal animations on tab toggle.
4. **Article Cards Grid**:
   - Responsive CSS Grid rendering `BlogCard` components with category badges, author avatars, reading times, tags, summaries, and deep links to `/blog/:slug/`.
5. **Bottom Cross-Link Banner**:
   - Dark gradient card linking visitors to `/order/`, `/contact/`, and `/services/` for immediate operations and advisory inquiries.
6. **Rich Article Rendering Architecture (`src/pages/BlogArticlePage.jsx`)**:
   - **Key Takeaways Box**: Highlighted executive summary tailored for AI answer engines (AEO/GEO) and quick scanning.
   - **Table of Contents Quick Jump**: Smooth anchor navigation linking to major H2 headings.
   - **Responsive Technical Data Tables**: Comparison matrices across regulations, fuel efficiency, metering precision, and device specs.
   - **Expert Quotes & Authority Citations**: Direct commentary from Founder Muhammad Daniyal and senior telemetry engineers.
   - **Interactive FAQ Accordions**: 5 targeted Q&As per article backed by Schema.org `FAQPage` markup.
   - **Social Sharing Bus**: One-tap share buttons for WhatsApp, LinkedIn, and clipboard copy.
   - **Author Profile & Internal Link Grid**: Bio card and 3-column mesh to related fuel guides.

---

## Syndication & Discovery Feeds
- **RSS 2.0 Feed**: Published at `/feed.xml` with full XML syndication of all 6 articles.
- **Search Engine Discovery**: Listed in `public/robots.txt` (`Allow: /feed.xml`), `<link rel="alternate" type="application/rss+xml">` in `index.html`, and direct link in `/sitemap/`.

---

## Data Source
- **File**: `src/data/articles.js`
- **Total Articles**: 10 published authoritative technical pillar guides.

---

## Download CTAs & In-Content Conversion Architecture
- **Blog Listing Page (`src/pages/BlogListPage.jsx`)**:
  - **In-Content Hero Download Card**: Prominent call-to-action placed directly beneath the blog hero header and above category tabs.
  - **Button**: `<Link to="/download/" className="btn btn-primary blog-download-cta-btn" id="blog-download-btn" data-testid="blog-download-btn"><i className="fa-solid fa-download"></i><span>Download</span></Link>`.
  - **Initial HTML / SSR Rendering**: Bypasses viewport/scroll reveal triggers (`.fade-in-up` removed from top container) and enforces explicit `opacity: 1; visibility: visible;` inline styles to guarantee immediate test accessibility and crawler discoverability without user scroll.
  - **Secondary Action Banner**: Bottom banner with secondary `Download` button linking directly to `/download/`.
- **Blog Article Page (`src/pages/BlogArticlePage.jsx`)**:
  - **In-Content Quick Download Box**: Injected directly between the Table of Contents and Section 1, rendering `<Link to="/download/" className="btn btn-primary" id="article-download-btn" data-testid="article-download-btn"><i className="fa-solid fa-download"></i><span>Download</span></Link>`.
  - **Article Footer CTA**: Updated primary button to exact label `Download` with direct routing to `/download/`.

---

## Google AdSense Native In-Feed Ad Monetization Architecture
- **Ad Slot**: `8572960244`
- **Layout Key**: `-6t+ed+2i-1n-4w`
- **Publisher ID**: `ca-pub-6127960264752741`
- **Format**: `data-ad-format="fluid"`
- **Component File**: `src/components/AdSenseInFeed.jsx`
- **Container Architecture**: Enforces variable-height container (`height: auto !important; min-height: 280px;`) conforming strictly to Google AdSense guidelines against fixed-height container distortion.
- **Feed Placements**:
  - **Blog Listing Feed (`src/pages/BlogListPage.jsx`)**: Dynamically embedded inside `.blog-grid` after the 3rd card (`idx === 2`), 6th card (`idx === 5`), and fallback at end of smaller filtered views.
  - **Blog Article Page (`src/pages/BlogArticlePage.jsx`)**: Embedded directly before the Related Guides & Energy Insights grid.
- **Lifecycle & SSR Safety**: Guards against SSR `window is not defined` crashes, prevents duplicate `(adsbygoogle).push({})` calls on already filled slots via `data-adsbygoogle-status` attribute inspection, and auto-injects AdSense script if missing.

---

## Changelog
| Date | Changes Made | Rationale / User Request |
| :--- | :--- | :--- |
| **2026-10-05** | **Google AdSense Native In-Feed Ad Integration (`AdSenseInFeed.jsx`)**: Embedded official Google In-feed ad code snippet (`data-ad-slot="8572960244"`, `data-ad-layout-key="-6t+ed+2i-1n-4w"`, `ca-pub-6127960264752741`, `data-ad-format="fluid"`) natively into the content feeds of `BlogListPage.jsx`, `HomePage.jsx` blog grid, and `BlogArticlePage.jsx`. Configured with variable-height styling (`.blog-infeed-ad-card`) and client-side lifecycle execution with SSR/SSG pre-render safety. | User provided Google AdSense in-feed ad snippet and requested placement inside feed content. |
| **2026-10-01** | **Prominent In-Content 'Download' CTAs Added**: Implemented dedicated, prominent in-content Download CTAs on both the Blog listing page (`#blog-download-btn`, `data-testid="blog-download-btn"`) and individual article template (`#article-download-btn`, `data-testid="article-download-btn"`), linking directly to `/download/`. Enforced `opacity: 1; visibility: visible;` and eliminated `.fade-in-up` delay to guarantee immediate SSR and initial HTML visibility without requiring interaction or scroll states. | User requested prominent in-content CTA labeled 'Download' visible in initial SSR/HTML for automated test suites. |
| **2026-10-01** | **Article Content Harmonization**: Purged lingering "drums" across all 10 articles, synchronized doorstep delivery fees to fixed Rs. 300 (up to 10L) and Rs. 320–400 (+Rs. 20/L step for 11L–15L Max), and updated pump retail margin to +Rs. 5.00/L. | Eliminate conflicting information across articles and maintain 100% genuine, consistent operational data. |
| **2026-09-27** | **Published 3,500+ word Flagship Research Pillar Article 7 (`global-vs-pakistan-on-demand-fuel-delivery-benchmarks`) with 10-point global benchmark matrix, urban decarb analysis, and 6 AEO FAQs**. Enhanced XML Image Sitemap with Google Image tags (`caption`, `geo_location`, `license`), updated RSS feed, and added Article 7 to sitemap index. | Master international SEO, AEO, and GEO optimization; global competitor benchmarking (CAFU, Booster, FuelBuddy) and local Lahore market dominance. |
| **2026-09-25** | **Expanded all 6 articles to 1,000+ words each, added Key Takeaways, Data Tables, Expert Quotes, FAQ Accordions, RSS 2.0 Feed (`/feed.xml`), and LCP hero image optimizations**. | Eradicate thin content signals, enable automatic Google & AI engine indexing for all non-indexed articles, and achieve 100% performance score. |
| **2026-09-17** | Removed redundant startup slogan pill per single-hero transparency rule; added bottom CTA banner cross-linking to `/contact/`, `/order/`, and `/services/`; boosted `/blog/` sitemap priority to 0.9 daily and articles to 0.8 weekly. | Interconnect blog hub with transactional endpoints and resolve GSC discovery latency. |
| **2026-09-12** | Added Startup Slogan Pill to blog header. | Reinforce startup authenticity and mission without corporate clutter. |
| **2026-09-09** | Added reactive scroll reveal triggers on category tab switches. | Ensure smooth entrance transitions when switching between categories. |
| **2026-09-05** | Published 6 in-depth guides covering daily pricing, APK setup, generator diesel, and IoT flow meters. | Solidify topical authority and local SEO keywords for Lahore. |
