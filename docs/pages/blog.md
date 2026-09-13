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

---

## Layout & Interactive Components
1. **Breadcrumbs**:
   - Navigation: `Home / Blog`.
2. **Hero Header**:
   - Title: `Zyphuel Blog & Fuel Guides`.
   - Subtitle: Latest updates regarding mobile fuel logistics, daily OGRA price reforms, and smart refueling.
   - **Startup Slogan Pill**: *"Not a corporate giant — just an agile, passionate startup delivering doorstep energy with speed and honesty."*
3. **Category Filtering Bar**:
   - Filter Tabs:
     - `All Articles`
     - `Zyphuel Energy`
     - `Zyphuel App & Guides`
     - `Generator & Utilities`
   - Dynamically re-triggers CSS scroll reveal animations on tab toggle.
4. **Article Cards Grid**:
   - Responsive CSS Grid rendering `BlogCard` components with category badges, author avatars, reading times, tags, summaries, and deep links to `/blog/:slug/`.

---

## Data Source
- **File**: `src/data/articles.js`
- **Total Articles**: 6 published long-form technical guides.

---

## Changelog
| Date | Changes Made | Rationale / User Request |
| :--- | :--- | :--- |
| **2026-09-12** | Added Startup Slogan Pill to blog header. | Reinforce startup authenticity and mission without corporate clutter. |
| **2026-09-09** | Added reactive scroll reveal triggers on category tab switches. | Ensure smooth entrance transitions when switching between categories. |
| **2026-09-05** | Published 6 in-depth guides covering daily pricing, APK setup, generator diesel, and IoT flow meters. | Solidify topical authority and local SEO keywords for Lahore. |
