# Zyphuel Deprecated & Removed Features Log (`remove.md`)

This document records all deprecated, phased-out, or removed features, legacy pricing rules, outdated API endpoints, and superseded architectural patterns across the Zyphuel platform.

---

## 1. Fuel Pricing & Margin Deprecations

### 1.1 Direct Ex-Depot Fuel Billing (Superseded in Phase 7)
- **What Was Removed**: Direct charging of unadjusted ex-depot OGRA base rates on consumer fuel orders without retail petrol pump station tariff adjustment.
- **Why Removed**: Physical petrol pump stations in Lahore charge a retail rate including dealer margin and inland freight equalization margin (+Rs. 2.50/L). Charging raw ex-depot rates created a discrepancy between physical petrol station receipts and app pricing.
- **Replacement**: Automated calculation of `Retail Petrol Pump Rate = Base OGRA Rate + Rs. 2.50 / Litre` across Petrol, Diesel, and High-Octane in `src/data/fuelPrices.js`, `src/context/FuelPriceContext.jsx`, and `src/pages/OrderPage.jsx`.

### 1.2 Outdated Delivery Fee Threshold (Rs. 250 Old Standard Fee)
- **What Was Removed**: The old Rs. 250.00 simple delivery fee for sub-50L orders.
- **Why Removed**: High nationwide fuel price inflation required calibrating delivery logistics fees to sustain micro-bowser operating costs.
- **Replacement**: Calibrated Rs. 280.00 standard delivery fee for fuel orders <50L (Free for ≥50L).

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
