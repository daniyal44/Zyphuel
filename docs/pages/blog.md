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
- **Total Articles**: 6 published authoritative technical pillar guides (1,000+ words each).

---

## Changelog
| Date | Changes Made | Rationale / User Request |
| :--- | :--- | :--- |
| **2026-09-25** | **Expanded all 6 articles to 1,000+ words each, added Key Takeaways, Data Tables, Expert Quotes, FAQ Accordions, RSS 2.0 Feed (`/feed.xml`), and LCP hero image optimizations**. | Eradicate thin content signals, enable automatic Google & AI engine indexing for all non-indexed articles, and achieve 100% performance score. |
| **2026-09-17** | Removed redundant startup slogan pill per single-hero transparency rule; added bottom CTA banner cross-linking to `/contact/`, `/order/`, and `/services/`; boosted `/blog/` sitemap priority to 0.9 daily and articles to 0.8 weekly. | Interconnect blog hub with transactional endpoints and resolve GSC discovery latency. |
| **2026-09-12** | Added Startup Slogan Pill to blog header. | Reinforce startup authenticity and mission without corporate clutter. |
| **2026-09-09** | Added reactive scroll reveal triggers on category tab switches. | Ensure smooth entrance transitions when switching between categories. |
| **2026-09-05** | Published 6 in-depth guides covering daily pricing, APK setup, generator diesel, and IoT flow meters. | Solidify topical authority and local SEO keywords for Lahore. |
