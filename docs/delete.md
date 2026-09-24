# Zyphuel Deletion & Dead Code Cleanup Log (`delete.md`)

This document records all permanently deleted files, purged UI banners, removed formula tags, stripped fields, and cleaned dead code across the Zyphuel codebase from project inception ("start") to the present ("now").

---

## 1. Purged UI Banners, Badges & Labels

### 1.1 "Orders of 50 Litres or more receive 100% FREE Delivery" Banner Text
- **Deleted From**: `src/pages/OrderPage.jsx`, `src/data/articles.js`, `src/data/servicesData.js`, `public/llms.txt`, `public/llms-full.txt`.
- **Reason**: Consumer fuel order flow is calibrated for agile doorstep car and generator top-ups (strictly 5L–15L). Advertising bulk 50L+ free delivery caused severe user confusion on consumer checkout screens.
- **Action Taken**: Deleted all 50L bulk notices, free delivery text, and corresponding badges across all files and schemas.

### 1.2 "Notice Before Ordering: Due to nationwide fuel price increases..." Banner
- **Deleted From**: `src/pages/OrderPage.jsx` (previously rendered above Step 1 form items).
- **Reason**: Cluttered the order form flow. The standard Rs. 280 fee is already clearly integrated into checkout calculations and price breakdown tables.
- **Action Taken**: Completely removed the orange bilingual highlight banner from the order checkout block.

### 1.3 Visible "Pump Rate (+Rs. 2.50)" & Internal Formula Badges
- **Deleted From**: `src/pages/OrderPage.jsx` and `src/pages/ServicesPage.jsx`.
- **Reason**: User requested: *"Pump Rate (+Rs. 2.50) ya users ko nai show hona chaye ya text , gaha per be lika ha"*. The +Rs. 2.50 calculation operates quietly in the background without revealing internal margin formulas or cluttering UI cards.
- **Action Taken**: Removed all visible `Pump Rate (+Rs. 2.50)` tags, `[Petrol Pump Rate]` suffixes, `(Pump)` service chip labels, and the `(OGRA Base: ... + Rs. 2.50 Pump Rate)` summary breakdown. Consumers see pure, clean fuel rates.

### 1.4 "• Min" Tag on Volume Chip Selector
- **Deleted From**: `src/pages/OrderPage.jsx` (Quick Select Volume chip 5L).
- **Reason**: User explicitly requested: *"• Min is ko be remove karo"*. The chip now cleanly reads `5 L`.
- **Action Taken**: Removed `{qty === 5 ? '• Min' : ...}` conditional label from the quick volume selector buttons.

### 1.5 Vehicle Registration / Number Plate Input Field
- **Deleted From**: `src/pages/OrderPage.jsx` (`Step 2: Refueling Target Asset`).
- **Reason**: User requested: *"Vehicle Registration / Number Plate (Optional for driver dispatch) Vehicle plate (e.g. LEA-2024) is ko be remove karo"*. The field added unnecessary friction during rapid mobile checkouts.
- **Action Taken**: Removed the input field, its state tracking (`vehiclePlate`), and payload references from the order form.

### 1.6 Urgent Dispatch Surcharge Section (+Rs. 100)
- **Deleted From**: `src/pages/OrderPage.jsx`.
- **Reason**: User requested: *"⚡ Urgent Dispatch Selected (+Rs. 100) is wale section ko be remove karo"*.
- **Action Taken**: Removed the urgent priority fee card, the selection radio inputs, and the top badge `✓ Standard Dispatch Selected (Within 45 Mins)` to keep the delivery speed section clean, presenting a single transparent flat Rs. 280 fee with a 45-minute SLA.

### 1.7 Volume-Based Price Tier Notice Banner
- **Deleted From**: `src/pages/OrderPage.jsx`.
- **Reason**: User requested: *"Price Notice • ریٹ اپ ڈیٹ / Delivery Fee Adjustment • Volume-Based Rates ... is wale section ko be remove karo"*.
- **Action Taken**: Completely removed the volume-based pricing notice banner ("Rs. 250 (5L) • Rs. 300 (10L) • Rs. 350 (15L)") from the order header.

### 1.8 Redundant Startup Transparency Notice Callouts
- **Deleted From**: `AboutPage.jsx`, `ServicesPage.jsx`, `OrderPage.jsx`.
- **Reason**: Repetitive startup disclaimer boxes (`"Not a corporate giant — just an agile startup..."`) duplicated across child pages cluttered the user experience.
- **Action Taken**: Consolidated into a single prominent, polished hero card on `HomePage.jsx` and purged from all child pages.

### 1.9 Redundant `RefuelingLifecycleTracker` SVG Simulation Box
- **Deleted From**: `src/pages/OrderPage.jsx`.
- **Reason**: Bulky 765-line SVG vector simulation box caused visual clutter on the checkout sidebar.
- **Action Taken**: Replaced with an interactive code-based modal tracker that launches upon order submission, with live second-by-second countdown and WhatsApp dispatch integration.

---

## 2. Deleted Legacy Files & Build Artifacts

| Deleted File / Artifact | Phase / Date | Description & Reason |
|---|---|---|
| `dist-ssr/` (build time) | Automated post-build | Temporary SSR bundle generated during SSG pre-rendering, purged immediately after route export to prevent stale builds. |
| Legacy hardcoded rate modules | Phase 2 | Replaced with reactive Trackmate scraping context and `fuelPrices.js`. |
| Duplicated startup disclaimer divs | Phase 6 | Removed from child pages (`AboutPage.jsx`, `ServicesPage.jsx`, `OrderPage.jsx`). |
| Unused vector simulation graphics | Phase 7 | Removed obsolete drone and cone SVG assets from the codebase. |

---

## 3. Maintenance & Cleanup Checklist for Developers
- [x] Run `npm run build` after any deletion to verify zero broken imports or missing symbols.
- [x] Verify no unused styles or broken class names remain in `src/index.css`.
- [x] Ensure all documentation in `docs/` is updated to reflect deleted sections.
