# Page Documentation: 404 Not Found Page

## Overview & Identity
- **Page Name**: 404 Not Found Error Page
- **Route**: `/404.html` (and all unmatched URL paths)
- **Component File**: `src/pages/NotFoundPage.jsx`
- **Primary Purpose**: Graceful error recovery interface displayed when users attempt to navigate to a non-existent or moved URL. Guides users back into the ordering and service discovery funnel.

---

## SEO & Meta
- **Page Title**: `Page Not Found (404) | Zyphuel Fuel Delivery Lahore`
- **Meta Description**: `The page you requested could not be found. Explore Zyphuel doorstep fuel delivery services, fuel guides, or contact our support team in Lahore.`
- **Canonical Path**: `/404.html`
- **Robots / Indexing**: Excluded from search indexation (`noindex, nofollow` recommended).

---

## Layout & Interactive Elements
1. **Interactive SVG Graphic**:
   - Renders `NotFoundGraphic` with themed fuel nozzle and road cone motifs.
2. **Clear Error Messaging**:
   - Headline: `404 - Page Not Found`.
   - Explanatory copy reassuring the user and presenting alternate routes.
3. **Primary Action Buttons**:
   - `Return to Homepage` (`/`)
   - `Explore Services` (`/services/`)
   - `Contact Support` (`/contact/`)
4. **Quick Links Navigation Box**:
   - Deep links to Order Fuel (`/order/`), Download App (`/download/`), and About Zyphuel (`/about/`).
5. **Emergency Contact Notice**:
   - Direct helpline link to `+92 3230-112464` for immediate fuel dispatch assistance.

---

## Changelog
| Date | Changes Made | Rationale / User Request |
| :--- | :--- | :--- |
| **2026-09-08** | Enhanced emergency telephone dispatch link on 404 screen. | Enable stranded users to immediately dial helpline even when navigating broken URLs. |
| **2026-08-20** | Added responsive multi-button recovery navigation and fuel theme styling. | Prevent dead-ends and bounce rate on incorrect URLs. |
