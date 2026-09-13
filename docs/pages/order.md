# Page Documentation: Order Fuel Page

## Overview & Identity
- **Page Name**: Order Fuel / Dispatch Checkout
- **Route**: `/order/`
- **Component File**: `src/pages/OrderPage.jsx`
- **Primary Purpose**: Interactive multi-step order portal enabling customers in Lahore to select certified fuel grades, configure quantities, choose delivery speeds, specify delivery location, review order pricing in real-time, and trigger live dispatch with automated WhatsApp synchronization.

---

## SEO & Structured Data
- **Page Title**: `Order Fuel Online in Lahore | Doorstep Petrol & Diesel Delivery | Zyphuel`
- **Meta Description**: `Order Euro-V petrol, high-speed diesel, and LPG gas delivered to your home, office, or generator in Lahore. 15-45 min delivery, calibrated digital flow meters, live tracking.`
- **Schema Type**: `OrderAction` / `Service` / `LocalBusiness`

---

## Pricing, Products & Minimum Quantities

| Fuel / Utility Grade | Unit Rate | Unit | Minimum Order | Increment Step | Volume Presets (Chips) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Premier Euro-5 Super Petrol** | Rs. 345.87 | Litre | **5 Litres** | +1 L | 5, 10, 20, 50, 100, 250, 500, 1000 |
| **Hi-Cetane Euro-5 Diesel** | Rs. 378.05 | Litre | **5 Litres** | +1 L | 5, 10, 20, 50, 100, 250, 500, 1000 |
| **High-Octane (Euro-5 / HOBC 97)**| Rs. 365.00 | Litre | **5 Litres** | +1 L | 5, 10, 20, 50, 100, 250, 500, 1000 |
| **LPG Commercial / Domestic Gas** | Rs. 258.65 | Kilogram | **5 Kilograms** | +1 kg | 5, 10, 20, 50, 100, 250, 500, 1000 |
| **Bulk Potable Clean Water** | Rs. 100.00 | Gallon | **5 Gallons** | +1 gal | 5, 10, 20, 50, 100, 250, 500, 1000 |

> **Enforced Rule**: Absolute minimum volume is **5 Litres / kg / gal**. Sub-5 unit inputs are automatically clamped to 5.

---

## Delivery Charges & Speed Options

### 1. Simple / Standard Dispatch (20–45 Mins)
- **Orders < 50 Litres**: **Rs. 250.00** nominal delivery fee.
- **Orders ≥ 50 Litres**: **Free Delivery (Rs. 0.00)**.

### 2. Urgent / Priority Dispatch (10–20 Mins)
- **Urgent Priority Surcharge**: **+Rs. 100.00 flat surcharge** (kept deliberately reasonable) applied to both sub-50L and 50L+ orders.
- **Orders < 50 Litres**: Rs. 250 base + Rs. 100 urgent = **Rs. 350.00**.
- **Orders ≥ 50 Litres**: Rs. 0 base + Rs. 100 urgent = **Rs. 100.00**.


---

## Form Flow & Checkout Architecture
1. **Live Marquee Price Ticker**:
   - Left-to-Right infinite continuous animation (`tickerSlideLTR`) featuring live rates with pause-on-hover.
2. **Item Selection (Step 1)**:
   - Visual radio tiles for Petrol, Diesel, High-Octane, and LPG Gas.
3. **Quantity Configuration (Step 2)**:
   - Stepper buttons (`-` and `+`) with live manual input, minimum 5L threshold, and quick volume chips `[5L, 10L, 20L, 50L ⚡ Free Delivery, 100L, 250L, 500L, 1000L]`.
4. **Delivery Location & Speed (Step 3)**:
   - Clean single input: `Complete Delivery Address in Lahore *`.
   - Toggle buttons: Simple Delivery (20–45 mins) vs. Urgent Delivery (10–20 mins, +Rs. 100).
5. **Contact & Payment (Step 4)**:
   - Customer Full Name and Active Contact Number.
   - Payment method toggle: Cash on Delivery (COD) / Direct Bank Transfer.
6. **Order Summary**:
   - Displays Selected Fuel, Litres, Fuel Subtotal, Dispatch Speed (+Rs. 100 indicator when urgent), Delivery Fee, and Grand Total.
7. **Live GSAP Dispatch Tracking & WhatsApp Automation**:
   - Interactive animated bowser truck simulation.
   - Automated redirection to official WhatsApp Dispatch (`+92 3230-112464`) with preformatted, encoded order parameters.

---

## Changelog
| Date | Changes Made | Rationale / User Request |
| **2026-09-13** | Set Simple Delivery charge to **Rs. 250** (<50L) with controlled Urgent surcharge (+Rs. 100). | User confirmed: *"simple delivery charges 250 ya save in ur memory, urgent delivery ma kudh he dekhlena za na ho"*. Total for urgent is Rs. 350 (<50L) and Rs. 100 (50L+). |
| **2026-09-13** | Reduced Urgent delivery fee surcharge from Rs. 250 to **Rs. 100**. | User requested: *"urgent delivery ma 250 rs bhot zada ha thora kam kaor delivery price ko"*. Surcharge updated to Rs. 100, making sub-50L urgent total Rs. 250 and 50L+ urgent total Rs. 100. |
| **2026-09-13** | Differentiated Simple vs Urgent delivery pricing in live calculation and UI summary. | User requested: *"dono sa price ma farak parna chaye delivery ma ahar kise ko urgent chaye"*. |
| **2026-09-13** | Removed Quick Lahore Sector Auto-Fill chips, "Powered by Google Maps" caption, and optional address instructions textarea. | User requested: *"Quick Lahore Sector Auto-Fill... is ko be remove karo"*. Simplified checkout to single clean address field. |
| **2026-09-13** | Removed breadcrumb navigation `[Home] / Order Fuel`. | User requested: *"Order Fuel is ko remove karo"*. |
| **2026-09-13** | Added Left-to-Right moving animation (`tickerSlideLTR`) to price ticker. | User requested: *"is wale section ma animation add karo left to right moving"*. Cloned track into 4 copies with smooth infinite marquee. |
| **2026-09-13** | Removed redundant Startup Transparency box from Order page. | User requested: *"Startup Transparency... ya be ek diikna chaye bar bar nai"*. Retained exclusively on Home page hero. |
| **2026-09-13** | Upgraded minimum fuel volume from 1L to **5 Litres**. | User requested: *"Min: 5 L, Quick Select: 5 L, 10 L..."*. Clamped stepper and inputs to minimum 5. |
| **2026-09-13** | Automated instant WhatsApp order dispatch forwarding to `+92 3230-112464`. | Ensures immediate dispatcher coordination upon order completion. |
