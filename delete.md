# Zyphuel Deletion & Dead Code Cleanup Log (`delete.md`)

This document records all deleted files, purged assets, pruned legacy code blocks, and cleanup protocols across the Zyphuel codebase.

---

## 1. Purged UI Notice Blocks

### 1.1 "Orders of 50 Litres or more receive 100% FREE Delivery" Banner Text
- **Deleted From**: `src/pages/OrderPage.jsx`
- **Reason for Deletion**: Consumer fuel order flow is designed for rapid doorstep car/generator top-ups (strictly 5L–15L). Advertising bulk 50L+ free delivery caused user confusion on consumer checkout screens.
- **Action Taken**: Deleted the 50L bulk notice and corresponding green badge from the order page.

### 1.2 "Notice Before Ordering: Due to nationwide fuel price increases..."
- **Deleted From**: `src/pages/OrderPage.jsx` (previously above Step 1 form items).
- **Reason for Deletion**: Cluttered the order form flow. The standard Rs. 280 fee is already clearly integrated into checkout calculations and price breakdown tables.
- **Action Taken**: Completely removed the orange highlight banner from the order checkout block.

### 1.3 Visible "Pump Rate (+Rs. 2.50)" & Formula Badges
- **Deleted From**: `src/pages/OrderPage.jsx` and `src/pages/ServicesPage.jsx`.
- **Reason for Deletion**: User requested: *"Pump Rate (+Rs. 2.50) ya users ko nai show hona chaye ya text , gaha per be lika ha"*. The +Rs. 2.50 calculation operates quietly in the background without revealing internal margin formulas or cluttering UI cards.
- **Action Taken**: Removed all visible `Pump Rate (+Rs. 2.50)` tags, `[Petrol Pump Rate]` suffixes, `(Pump)` service chip labels, and the `(OGRA Base: ... + Rs. 2.50 Pump Rate)` summary breakdown. Consumers see pure, clean fuel rates.

### 1.4 "• Min" Tag on Volume Chip Selector
- **Deleted From**: `src/pages/OrderPage.jsx` (Quick Select Volume chip 5L).
- **Reason for Deletion**: User explicitly requested: *"• Min is ko be remove karo"*. The chip now cleanly reads `5 L`.
- **Action Taken**: Removed `{qty === 5 ? '• Min' : ...}` conditional label from the quick volume selector buttons.

### 1.5 Purge of All "50L" References & Obsolete Bulk Offers
- **Deleted From**: `OrderPage.jsx`, `generateInvoicePdf.js`, `TermsOfUsePage.jsx`, `servicesData.js`, `articles.js`, `public/llms.txt`, `public/llms-full.txt`, and system documentation.
- **Reason for Deletion**: User requested: *"50L gaha per be lika ha us ko remove karo har gaja sa"*. The service is strictly 5L–15L for agile mobile doorstep delivery, making 50L bulk notices obsolete.
- **Action Taken**: Purged all occurrences of `50L`, `50 Litres`, `50L+ Bulk Offer`, and `FREE (50L+ Offer)`. Standardized flat delivery charges to Rs. 280.00 standard and Rs. 380.00 urgent.

---

## 2. Deleted Legacy Files & Scripts

| Deleted File / Artifact | Date Deleted | Description & Reason |
|---|---|---|
| `dist-ssr/` (build time) | Automated post-build | Temporary SSR bundle generated during SSG pre-rendering, purged immediately after route export to prevent stale builds. |
| Legacy hardcoded rate modules | Phase 2 | Replaced with reactive Trackmate scraping context and `fuelPrices.js`. |
| Duplicated startup disclaimer divs | Phase 6 | Removed from child pages (`AboutPage.jsx`, `ServicesPage.jsx`, `OrderPage.jsx`). |

---

## 3. Maintenance & Cleanup Checklist for Developers
- [x] Run `npm run build` after any deletion to verify zero broken imports or missing symbols.
- [x] Verify no unused styles or broken class names remain in `src/index.css`.
- [x] Ensure all documentation in `docs/pages/` is updated to reflect deleted sections.
