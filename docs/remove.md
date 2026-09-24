# Zyphuel Deprecated & Removed Features Log (`remove.md`)

This document records all deprecated, phased-out, or removed features, legacy pricing rules, outdated API endpoints, and superseded architectural patterns across the Zyphuel platform from inception ("start") to the present ("now").

---

## 1. Fuel Pricing & Margin Deprecations

### 1.1 Direct Ex-Depot Fuel Billing (Superseded in Phase 7)
- **What Was Removed**: Direct charging of unadjusted ex-depot OGRA base rates on consumer fuel orders without retail petrol pump station tariff adjustment.
- **Why Removed**: Physical petrol pump stations in Lahore charge a retail rate including dealer margin and inland freight equalization margin (+Rs. 2.50/L). Charging raw ex-depot rates created a discrepancy between physical petrol station receipts and app pricing.
- **Replacement**: Automated calculation of `Retail Petrol Pump Rate = Base OGRA Rate + Rs. 2.50 / Litre` across Petrol, Diesel, and High-Octane in `src/data/fuelPrices.js`, `src/context/FuelPriceContext.jsx`, and `src/pages/OrderPage.jsx`.

### 1.2 Outdated Delivery Fee Threshold (Rs. 250 Old Standard Fee & Volume Scaling Formula)
- **What Was Removed**: The old Rs. 250.00 simple delivery fee and the volume scaling formula `200 + qty * 10`.
- **Why Removed**: High nationwide fuel price inflation required calibrating delivery logistics fees to sustain micro-bowser operating costs, while variable formulas created pricing confusion.
- **Replacement**: Calibrated flat Rs. 280.00 standard delivery fee across all doorstep fuel orders.

### 1.3 Obsolete "50L+" Bulk Free Delivery Concept
- **What Was Removed**: All marketing, invoice, and UI references to 50L bulk orders, "50L+ Free Delivery", and "sub-50L" fee brackets.
- **Why Removed**: Doorstep consumer mobile bowser delivery is strictly structured between 5 Litres minimum and 15 Litres maximum per single order to guarantee rapid transit (within 45 mins) and comply with metropolitan fire & road safety protocols.
- **Replacement**: Explicit 5L Min – 15L Max capacity limits integrated across Order Page, Terms of Use, service data, and educational articles.

### 1.4 Variable Volume-Based Delivery Fee Structure
- **What Was Removed**: Volume-based tiered delivery fees: Rs. 250 (5L), Rs. 300 (10L), Rs. 350 (15L).
- **Why Removed**: User requested a clean, uniform, transparent delivery fee structure without complex tiers.
- **Replacement**: Unified flat **Rs. 280.00** delivery fee across all eligible fuel quantities (5L–15L).

---

## 2. Order Flow & Checkout Deprecations

### 2.1 Premature WhatsApp Auto-Redirect
- **What Was Removed**: Immediate client-side redirection to WhatsApp upon clicking "Complete Order", before the user could view or save their invoice.
- **Why Removed**: Users reported not having enough time to download their official tax receipt PDF before the page transitioned away.
- **Replacement**: Two-step order completion workflow:
  1. Instant invoice modal presentation with primary **"1. Download Invoice (PDF)"** action.
  2. 3-second animated auto-redirection countdown with pause and manual **"2. Proceed to WhatsApp Dispatch"** button.

### 2.2 1D Barcode-Only Invoice Verification
- **What Was Removed**: Relying exclusively on 1D Code 128 barcodes for invoice verification.
- **Why Removed**: Native smartphone camera apps (especially iOS Camera) cannot natively read 1D linear barcodes in live camera view, causing "barcode scan failed" errors.
- **Replacement**: Dual Verification System featuring an instant 2D QR Code (ISO/IEC 18004) scanned in <100ms by 100% of smartphone cameras, alongside an industrial Code 128 barcode for handheld laser guns.

### 2.3 HTML2Canvas Raster PDF Generation
- **What Was Removed**: Capturing an HTML DOM node via `html2canvas` and converting the raster image to PDF.
- **Why Removed**: Caused CORS issues, blurry fonts on high-DPI displays, and occasional browser hangs during canvas rendering.
- **Replacement**: 100% programmatic client-side vector PDF generation using `jspdf` (`src/utils/generateInvoicePdf.js`), downloading crisp vector invoices in <50ms.

### 2.4 Unrestricted Back-to-Back Order Placement
- **What Was Removed**: Unrestricted order placement allowing users to place repetitive orders without cooldown safeguards.
- **Why Removed**: Risk of accidental duplicate dispatches and spam orders.
- **Replacement**: Anti-spam order cooldown guard in `OrderPage.jsx` detecting orders placed within 15 minutes and requiring explicit confirmation before placing a second bowser order.

---

## 3. Storage & Network Cleanups

### 3.1 Unbounded LocalStorage Order Records
- **What Was Removed**: Old, unkeyed localStorage entries from early prototypes (`zyphuel_cart`, `user_fuel_choice`).
- **Why Removed**: Conflicted with the structured `zyphuel_active_order` and `zyphuel_last_order` schemas.
- **Replacement**: Standardized schema with active countdown timestamps, persisted order IDs, and clean expiry validation.
