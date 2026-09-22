# Zyphuel Deprecated & Removed Features Log (`remove.md`)

This document records all deprecated, phased-out, or removed features, legacy pricing rules, outdated API endpoints, and superseded architectural patterns across the Zyphuel platform.

---

## 1. Fuel Pricing & Margin Deprecations

### 1.1 Direct Ex-Depot Fuel Billing (Superseded in Phase 7)
- **What Was Removed**: Direct charging of unadjusted ex-depot OGRA base rates on consumer fuel orders without retail petrol pump station tariff adjustment.
- **Why Removed**: Physical petrol pump stations in Lahore charge a retail rate including dealer margin and inland freight equalization margin (+Rs. 2.50/L). Charging raw ex-depot rates created a discrepancy between physical petrol station receipts and app pricing.
- **Replacement**: Automated calculation of `Retail Petrol Pump Rate = Base OGRA Rate + Rs. 2.50 / Litre` across Petrol, Diesel, and High-Octane in `src/data/fuelPrices.js`, `src/context/FuelPriceContext.jsx`, and `src/pages/OrderPage.jsx`.

### 1.2 Outdated Delivery Fee Threshold (Rs. 250 Old Standard Fee & Volume Scaling Formula)
- **What Was Removed**: The old Rs. 250.00 simple delivery fee and the volume scaling formula `200 + qty * 10`.
- **Why Removed**: High nationwide fuel price inflation required calibrating delivery logistics fees to sustain micro-bowser operating costs, while variable formulas created pricing confusion.
- **Replacement**: Calibrated flat Rs. 280.00 standard delivery fee across all doorstep fuel orders (and flat +Rs. 100 urgent priority surcharge, Total Rs. 380.00).

### 1.3 Obsolete "50L+" Bulk Free Delivery Concept
- **What Was Removed**: All marketing, invoice, and UI references to 50L bulk orders, "50L+ Free Delivery", and "sub-50L" fee brackets.
- **Why Removed**: Doorstep consumer mobile bowser delivery is strictly structured between 5 Litres minimum and 15 Litres maximum per single order to guarantee rapid transit (20–45 mins) and comply with metropolitan fire & road safety protocols.
- **Replacement**: Explicit 5L Min – 15L Max capacity limits integrated across Order Page, Terms of Use, service data, and educational articles.

---

## 2. UI & Component Removals

### 2.1 Redundant Startup Transparency Notice Callouts
- **What Was Removed**: Repetitive startup disclaimer boxes (`"Not a corporate giant — just an agile startup..."`) duplicated across `OrderPage`, `AboutPage`, and `ServicesPage`.
- **Why Removed**: Cluttered child page checkout and service browsing experiences.
- **Replacement**: Consolidated into a single prominent, polished hero card on `HomePage.jsx`.

### 2.2 Hardcoded Fuel Price Constants in Child Components
- **What Was Removed**: Static inline fuel prices previously hardcoded into individual page JSX files.
- **Why Removed**: Incurred high risk of stale pricing when OGRA notified new fuel price revisions.
- **Replacement**: Complete centralized consumption of `useFuelPrices()` React Context.

---

## 3. Storage & Network Cleanups

### 3.1 Unbounded LocalStorage Order Records
- **What Was Removed**: Old, unkeyed localStorage entries from early prototypes (`zyphuel_cart`, `user_fuel_choice`).
- **Why Removed**: Conflicted with the new `zyphuel_active_order` and `zyphuel_last_order` structured schemas.
- **Replacement**: Standardized schema documented in `docs/vibe-coding/database.md`.
