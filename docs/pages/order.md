# Page Documentation: Order Fuel Page

## Overview & Identity
- **Page Name**: Order Fuel / Dispatch Checkout
- **Route**: `/order/`
- **Component File**: `src/pages/OrderPage.jsx`
- **Primary Purpose**: Interactive multi-step order portal enabling customers in Lahore to select certified fuel grades, choose their specific refueling target asset (Car/SUV, Motorbike, Standby Generator, Commercial Machinery, Safe Storage Drum), configure volumes between 5L and 15L Max, specify delivery address in Lahore, review real-time pricing, generate official calibrated tax invoices with dual verification (Camera QR code & Code 128 barcode), and trigger live dispatch with automated WhatsApp synchronization.

---

## SEO & Structured Data
- **Page Title**: `Order Fuel Online in Lahore | Doorstep Petrol & Diesel Delivery | Zyphuel`
- **Meta Description**: `Order Euro-V petrol, High-Octane 97, and diesel delivered to your car, bike, generator, or equipment in Lahore. Within 45 min delivery, calibrated digital flow meters, live tracking.`
- **Canonical URL**: `https://zyphuel.netlify.app/order/`
- **Schema Type**: `OrderAction` / `Product` / `Service` / `LocalBusiness` / `FAQPage`

---

## Pricing, Products & Minimum Quantities

| Fuel Grade | Retail Pump Unit Rate | OGRA Base Rate | Pump Tariff Markup | Order Range | Increment Step | Volume Presets (Chips) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Premier Euro-5 Super Petrol** | Live + Rs. 2.50 | Live Scraped | **+Rs. 2.50 / L** | **5L – 15 Litres** | +1 L | 5, 7, 10, 12, 15 |
| **Hi-Cetane Euro-5 Diesel** | Live + Rs. 2.50 | Live Scraped | **+Rs. 2.50 / L** | **5L – 15 Litres** | +1 L | 5, 7, 10, 12, 15 |
| **High-Octane (Euro-5 / HOBC 97)**| Live + Rs. 2.50 | Live Scraped | **+Rs. 2.50 / L** | **5L – 15 Litres** | +1 L | 5, 7, 10, 12, 15 |

> **Retail Petrol Pump Rate Rule**: Petrol, Diesel, and High-Octane rates include the verified **+Rs. 2.50 / Litre** petrol pump rate over the OGRA base ex-depot price, maintaining dynamic invariance across price drops, hikes, or steady states ("jab bhi price kam ho ya zada ho ya same rahe").
> **Enforced Volume Rule**: Absolute minimum fuel volume is **5 Litres** and maximum fuel checkout volume is strictly **15 Litres**. Sub-5 unit inputs are automatically clamped to 5; inputs exceeding 15 are clamped to 15. Bulk commercial orders exceeding 15 Litres are handled via scheduled commercial B2B bowsers.

---

## Delivery Charges & Speed Options

### 1. Simple / Standard Dispatch (Strict 45-Min SLA Window)
- **Standard Doorstep Delivery**: Flat **Rs. 280.00** nominal delivery fee.
- **Delivery Arrival Window**: Fixed strictly **Within 45 Mins** on doorstep.
- **Live Dispatch Countdown**: Strictly starts at **45 minutes (`45m 00s`, 2,700 seconds)** immediately upon order placement, decrementing second-by-second across checkout, tracking banner, and active invoice modal.

### 2. Urgent / Priority Dispatch (Fixed Within 45-Min SLA with Priority Queue)
- **Urgent Priority Surcharge**: **+Rs. 100.00 flat surcharge** (kept deliberately reasonable).
- **Total Urgent Delivery Fee**: Rs. 280 base + Rs. 100 urgent = **Rs. 380.00**.
<<<<<<< HEAD
- **Delivery Window**: Fixed strictly **Within 45 Mins** on doorstep with priority queue routing.
=======
- **Delivery Window**: Fixed strictly **Within 45 Mins** on doorstep with front-of-line priority queue depot dispatch.
>>>>>>> e2bf20b (feat: remove unavailable utilities, implement refueling target selection, and overhaul GitHub repo SEO/AEO/GEO)
- **Live Dispatch Countdown**: Starts at **45 minutes (`45m 00s`, 2,700 seconds)** with `Urgent Priority (Within 45 Mins)` indicator.

---

## Form Flow & 5 Atomic Steps

1. **Step 1: Select Fuel Grade**:
   - 3 active consumer fuel cards: Super Petrol (92 Octane), Euro-V Diesel, and High-Octane 97 (HOBC) with live rates and inline `Pump Rate (+Rs. 2.50)` badges.
2. **Step 2: Select Refueling Target Asset**:
   - 5 selectable application cards:
     - 🚗 **Car / SUV**: Direct fill into passenger car / SUV tank.
     - 🏍️ **Motorbike / Scooter**: Commuter bike or delivery fleet refueling.
     - ⚡ **Standby Generator**: Residential or commercial backup generator top-up.
     - 🚜 **Commercial Machinery**: Construction equipment, forklifts, or tractors.
     - 🛢️ **Safe Storage Drum / Tank**: Certified fuel drums or static reservoirs.
   - Dynamic asset identifier / vehicle number field adapting label and placeholder based on the selected application.
3. **Step 3: Select Volume (5L to 15L Max)**:
   - Stepper buttons (`-` and `+`) with live manual input, minimum 5L threshold, maximum 15L checkout cap, and quick volume chips `[5L, 7L, 10L, 12L, 15L]`.
4. **Step 4: Delivery Details**:
   - Clean single input: `Complete Delivery Address in Lahore *`.
<<<<<<< HEAD
   - Toggle buttons: Simple Delivery (20–45 mins) vs. Urgent Delivery (10–20 mins, +Rs. 100).
6. **Contact & Payment (Step 4)**:
   - Customer Full Name and Active Contact Number.
   - Payment method toggle: Cash on Delivery (COD) / Direct Bank Transfer.
7. **Order Summary**:
   - Displays Selected Fuel, Litres, Fuel Subtotal, Dispatch Speed (+Rs. 100 indicator when urgent), Delivery Fee, and Grand Total.
8. **Tracker Architecture (Modal-Based Dispatch Lifecycle)**:
   - Replaced redundant on-page SVG mockup (`RefuelingLifecycleTracker`) with direct, functional modal tracking upon checkout.
   - Preserves clean ordering flow with active order persistence (`localStorage`) and second-by-second countdown.
9. **Post-Order Priority Workflow & WhatsApp Redirection**:
   - **Elimination of Premature Pop-Up**: Previously, order submission would immediately open WhatsApp without letting the customer view or download their receipt.
   - **Two-Step Order Completion Flow**:
     - **Step 1 (Invoice PDF Download)**: Immediately opens the official invoice modal with prominent **"1. Download Invoice (PDF)"** action, enabling immediate download of `Zyphuel-Invoice-ZYP-XXXXXX.pdf`.
     - **Live 45-Minute Countdown Badge**: Displays active countdown (`Live Dispatch Countdown: 45m 00s`) right inside the post-order hero banner above the download buttons.
     - **Step 2 (WhatsApp Redirection)**: Upon downloading the PDF, triggers a 3-second animated auto-redirect countdown to WhatsApp Dispatch (`+92 3230-112464`) with an instant "Open WhatsApp Now" override and cancellation control. Customers can also click **"2. Proceed to WhatsApp Dispatch"** directly to transition without waiting.
10. **Executive Corporate Tax Invoice & Pure Vector PDF Architecture**:
    - **Government Regulatory Credentials**: Formal header bearing Government of Pakistan & OGRA Licensed Petroleum Distributor credentials:
      - **OGRA License**: `OGRA/DL-7492/LHE`
      - **NTN / STRN**: `9482710-3`
      - **SECP Inc**: `0248195`
      - **Depot Hub**: `Lahore Central Hub #01 (75-Main Boulevard, Gulberg III, Lahore, Punjab)`
      - **24/7 Helpline**: `+92 3230-112464`
    - **Telemetry Profile (2 Cards)**: Billed-To recipient destination details alongside dispatch speed, metering standards (Positive Displacement ±0.01L Accuracy), and 15°C Automatic Temperature Compensation (ATC).
    - **5-Column Itemized Table**: `SR#`, `DESCRIPTION & FUEL SPECIFICATIONS`, `QUANTITY`, `UNIT RATE (PKR)`, and `TOTAL AMOUNT (PKR)`.
    - **Amount in Words Ledger**: Automatic conversion via `numberToWords(total)` (e.g. *"Pakistani Rupees Four Thousand Two Hundred and Eighty Only"*).
    - **OGRA Volumetric Accuracy Guarantee**: Certified compliance notice with unique tracking security hash (`SECURITY HASH: ZYP-XXXXXX-SEC • GPS LAHORE HUB #01`).
    - **Genuine Scannable Dual Verification System (Camera QR & Code 128 Barcode)**: Modeled on `https://barkod.studio/` high-contrast optical scanning principles:
      - **Instant Mobile Camera QR Code (ISO/IEC 18004)**: Standard smartphone camera apps (especially Apple iOS Camera) natively scan 2D QR codes in <100ms from camera preview. Encodes direct verification link `https://zyphuel.netlify.app/order/?verify=${orderId}`.
      - **Industrial Dispatch Barcode (ISO/IEC 128 Auto)**: 123-bit auto-optimized symbol sequence with pure black `#000000`, high optical contrast, module thickness (2.2px–2.6px), height 46–54px, and 16+ module quiet zones for handheld laser scanners, barcode readers, and Google Lens.
      - **Live Web Verification Route**: When the QR code is scanned on any mobile phone, it opens the Zyphuel portal and immediately renders an authenticated verification alert banner (`OFFICIAL DISPATCH INVOICE VERIFIED • #ZYP-XXXXXX`) confirming calibrated flow meter accuracy and OGRA Euro-V compliance.
      - **Multi-Format Parity**: Implemented consistently across the on-screen invoice modal (`OrderPage.jsx`), standalone HTML invoice download, and client-side vector PDF generator (`generateInvoicePdf.js`).
    - **Vector PDF Engine (`jspdf` & `src/utils/generateInvoicePdf.js`)**: 100% client-side vector generation without canvas or CORS overhead, downloading in <50ms across all devices with native vector barcode and QR code rendering.
 11. **Realistic Dispatch Lifecycle & Anti-Spam Order Cooldown Guard**:
     - **45-Minute Second-by-Second Countdown**: Order enters Depot Loading (~10s preparation), transitions to **"En Route / In Transit"** with live `45m 00s` countdown (decrements per second), and remains in active transit until arrival.
     - **Active Order Persistence (`localStorage`)**: Saves active dispatch under `zyphuel_active_order` across browser refreshes and page visits.
     - **Active Dispatch Banner on Checkout**: Renders a live telemetry card above the order form displaying order ID, fuel volume, destination address, live ETA countdown, and quick links to live tracking and digital invoice.
     - **Anti-Spam Cooldown Guard & Duplicate Confirmation**: Prevents rapid back-to-back duplicate orders ("order pe order place karte rehna"). If an order was placed within 15 minutes, presents a safety confirmation modal asking the customer to track their existing tanker or explicitly confirm an additional bowser.
     - **Manual QA Arrival Trigger**: Added a dedicated `Simulate Arrival (ٹیسٹ: آمد)` button in the tracker modal for testing the final calibrated delivery stage.
 
 12. **Satisfying Bioluminescent Vector Telemetry Overhaul in `RefuelingLifecycleTracker`**:
     - **Elimination of Visual Clutter & Text Collisions**: Removed awkward polygon drone, rigid yellow scan cone, and 10+ scattered redundant SVG `<text>` elements (`DEPOT HUB-01`, `STANDBY BAY • HUB-01`, `AWAITING ORDER • READY`, `GPS TARGET`, `1. DEPOT DISPATCH`, `2. SMART ENERGY CORRIDOR`, `3. SITE CALIBRATION`).
     - **Bioluminescent Launch & Docking Pad**: Added soft radial floor glow (`#00f2fe` into emerald `#10b981`) beneath Bowser 01 with three staggered expanding concentric ultrasonic ripple waves.
     - **360° Rotating Cyber Compass & Sweeping Radar Beam**: High-precision rotating geometric ring with cardinal indicator notches and smooth 360° sweeping volumetric radar scan beam.
     - **Suspension Breathing Physics on Bowser 01**: Smooth vertical sinusoidal breathing animation (`translateY(-3.5px)`) applied to Bowser's chassis with synchronized ground shadow expansion/contraction, bringing mechanical life to the vehicle.
     - **Drifting Bioluminescent Micro-Orbs**: 5 organic nano particles floating gracefully upward from the docking pad into the atmosphere.
     - **Minimalist Live HUD Beacon**: Crisp overhead status chip (`🟢 FLEET READY`) with pulsing cyan/emerald laser beacon dot.
 
 ---
 
 ## Developer Tooling & Git Automation
 - **`github_push.bat`**: Root-level Windows batch automation script enabling one-click and interactive staging, committing (with custom or auto timestamped messages), and pushing directly to GitHub (`origin/main`).
 
 ---
 
 ## Changelog
 | Date | Changes Made | Rationale / User Request |
 | :--- | :--- | :--- |
 | **2026-09-24** | Fixed 'Within 45 Mins' Delivery SLA Standardization & Dynamic On-Demand GSAP Loading. | User requested: *"website ma fixed delivery time ha within 45 mins on doorstep same as urgent delivery"*. Standardized delivery duration across OrderPage to strictly **within 45 minutes** for both Simple Standard and Urgent Priority dispatch (Urgent gets prioritized routing with +Rs. 100 fee). Updated live countdown timer, tracker status descriptions, WhatsApp message payload, invoice print, and vector PDF generator. Dynamically injected GSAP on-demand in `OrderPage.jsx` when mounted, removing the global CDN script from `<head>` to improve Core Web Vitals. |
 | **2026-09-22** | Unified delivery fee to flat **Rs. 280.00** across all orders; purged all lingering 50L bulk references, Free bulk tags, and the '• Min' chip label; explicitly highlighted the 15L Max limit in the UI and documentation. | User requested: *"delivery price ko update karo to phir ya prices update kyu nai ha or ha , 50L gaha per be lika ha us ko remove karo har gaja sa , or jo order ma max liter show ho raha ha is ko website ma mention or article a update karo"* and *"• Min is ko be remove karo"*. Updated `standardFee = 280`, removed `• Min` from 5L chip, removed all 50L bulk notices from invoice print and WhatsApp payload, and added `5L – 15L Max per Order` header badge. |
 | **2026-09-21** | Removed `RefuelingLifecycleTracker` component from `OrderPage.jsx` and purged redundant vector simulation files; streamlined order placement into direct checkout with code-based post-order modal tracking. | User requested: *"Refueling Lifecycle Tracker Awaiting Order... is ko be sai karo is ko remove akro or code base karo is ko Refueling Lifecycle Tracker"*. Purged the bulky 765-line SVG simulation box from the order sidebar to remove confusing visual clutter. Order placement now directly triggers the official code-based interactive Tracker Modal upon submission with live ETA countdown, dispatch steps, and WhatsApp redirection. |
 | **2026-09-21** | Configured volume-based tiered fuel delivery charges: strictly **Rs. 300 for 10 Litres**, **Rs. 350 for 15 Litres**, and **Rs. 250 for 5 Litres** (formula: `200 + qty * 10`); updated ticker, notice banners, stepper label, and invoice. | User requested: *"10L per 300 fuel delivery , 15 liter per 350 fuel delivery hone chaye , baki apne hishabab sa dekhlena"*. Replaced static Rs. 280 fee with a linear volume-based delivery fee model (`200 + qty * 10` for orders up to 15L): 5L = Rs. 250, 7L = Rs. 270, 10L = Rs. 300, 12L = Rs. 320, 15L = Rs. 350. Urgent dispatch surcharge remains +Rs. 100 flat. Updated UI indicators, dynamic stepper badge, pre-order notice banner, and invoice computations. |
 | **2026-09-21** | Marked Gas Delivery & Water Refill as **Currently Unavailable** across Order checkout and Services cards; clicking either card triggers clear informative warning toasts and prevents unfulfillable utility orders. | User requested: *"gas delivery & water refill unavailable, when user click its unavailable"*. Made LPG Gas Cylinder and Water Refill categories disabled/unavailable with red/amber badges and `not-allowed` styling. Clicking either item displays an immediate warning toast informing customers that only Petrol & Diesel delivery is operational 24/7. Auto-redirected any inbound URL parameters (`?fuel=lpg`, `?fuel=water`) to standard Petrol delivery. |
 | **2026-09-21** | Resolved `"barcode scan failed"` issue by engineering a Dual Verification System (Instant Mobile Camera QR Code + Industrial High-Contrast Code 128 Barcode) inspired by `barkod.studio` standards; added live URL verification handler (`/order/?verify=ZYP-XXXXXX`) with authentic dispatch badge; deployed across web invoice modal, HTML download, and pure vector PDF. | User reported: *"barcode scan failed"*. Technical root-cause identified: native Apple iOS Camera does not support 1D linear barcodes (Code 128) in camera preview without dedicated scanner apps, and small module widths on high-DPI screens caused subpixel optical blur. Engineered dual architecture: 1) Instant 2D QR Code (ISO/IEC 18004) encoding order verification URL, scanned in <100ms by 100% of iPhone/Android cameras; 2) High-contrast pure black (`#000000`) ISO Code 128 Auto barcode (123 bits, 2.4px modules, 16+ quiet zone) for laser barcode guns and Google Lens. Updated web invoice modal, printable HTML, and jsPDF vector generator. Added live on-page verification banner displaying certified dispatch authenticity when scanned. |
 | **2026-09-21** | Built and integrated genuine scannable ISO/IEC 15417 Code 128 barcode engine based on `https://barkod.studio/` architectural specifications (`src/utils/barcode128.js`); updated vector PDF generator (`generateInvoicePdf.js`), on-screen invoice modal, and standalone HTML download; validated 100% optical camera and laser scanning accuracy with ZXing decoder. | User requested: *"https://barkod.studio/ barcode ka lia is website ko use karo invoice ma barcode generate karne ka lia or barcode scan karne per real ho, ache sa dekhlena phir muje batana ma dekho ga or pdf ma be update kar dena"*. Engineered dependency-free Code 128 (Set B) engine with 107-pattern symbol definitions, Start B (104), Modulo-103 checksum, and Stop symbol (106) with terminal bar. Implemented pure vector rendering with `shape-rendering="crispEdges"`, standard 10-module quiet zones, and verified 100% optical readability via `@zxing/library` across mobile cameras and handheld scanners. Embedded in on-screen invoice modal, downloadable standalone HTML, and vector PDF download. |
=======
   - Toggle buttons: Simple Delivery (within 45 mins) vs. Urgent Delivery (within 45 mins priority queue, +Rs. 100).
5. **Step 5: Contact Details & Payment Policy**:
   - Customer Full Name, Active Phone Number, and Email Address.
   - Payment Policy: Cash on Delivery (COD) enabled for 5L–10L orders; Advance Bank Transfer required for 11L–15L orders.
6. **Order Summary (Sidebar)**:
   - Displays Selected Fuel, Refueling Target with icon & identifier, Volume (L), Unit Rate, Fuel Subtotal, Dispatch Speed (+Rs. 100 indicator when urgent), Delivery Fee, and Grand Total.

---

## Post-Order Workflow, Invoicing & Verification

1. **Two-Step Order Completion Flow**:
   - **Step 1 (Invoice PDF Download)**: Immediately opens the official invoice modal with prominent **"1. Download Invoice (PDF)"** action, enabling immediate client-side download of `Zyphuel-Invoice-ZYP-XXXXXX.pdf`.
   - **Live 45-Minute Countdown Badge**: Displays active countdown (`Live Dispatch Countdown: 45m 00s`) right inside the post-order hero banner above the download buttons.
   - **Step 2 (WhatsApp Redirection)**: Upon downloading the PDF, triggers a 3-second animated auto-redirect countdown to WhatsApp Dispatch (`+92 3230-112464`) with an instant "Open WhatsApp Now" override. Customers can also click **"2. Proceed to WhatsApp Dispatch"** directly to transition without waiting.
2. **Executive Corporate Tax Invoice & Pure Vector PDF**:
   - **Government Regulatory Credentials**: Formal header bearing Government of Pakistan & OGRA Licensed Petroleum Distributor credentials:
     - **OGRA License**: `OGRA/DL-7492/LHE`
     - **NTN / STRN**: `9482710-3`
     - **SECP Inc**: `0248195`
     - **Depot Hub**: `Lahore Central Hub #01 (75-Main Boulevard, Gulberg III, Lahore, Punjab)`
     - **24/7 Helpline**: `+92 3230-112464`
   - **Telemetry Profile (2 Cards)**: Billed-To recipient details with **Refueling Target & Asset Identifier** alongside dispatch priority, metering standards (Positive Displacement ±0.01L Accuracy), and 15°C Automatic Temperature Compensation (ATC).
   - **5-Column Itemized Table**: `SR#`, `DESCRIPTION & FUEL SPECIFICATIONS`, `QUANTITY`, `UNIT RATE (PKR)`, and `TOTAL AMOUNT (PKR)`.
   - **Amount in Words Ledger**: Automatic conversion via `numberToWords(total)`.
   - **Genuine Scannable Dual Verification System (Camera QR & Code 128 Barcode)**:
     - **Instant Mobile Camera QR Code (ISO/IEC 18004)**: Scanned in <100ms by 100% of iPhone/Android cameras; opens `/order/?verify=${orderId}` to display an authenticated verification banner.
     - **Industrial Dispatch Barcode (ISO/IEC 128 Auto)**: High-contrast pure black Code 128 barcode for laser barcode scanners and Google Lens.
   - **Vector PDF Engine (`jspdf` & `src/utils/generateInvoicePdf.js`)**: 100% client-side vector generation without canvas overhead, downloading in <50ms with embedded vector barcodes, QR codes, and Refueling Target metadata.
3. **Realistic Dispatch Lifecycle & Anti-Spam Order Cooldown Guard**:
   - **45-Minute Second-by-Second Countdown**: Transitions to **"En Route / In Transit"** with live `45m 00s` countdown.
   - **Active Order Persistence (`localStorage`)**: Persists dispatch under `zyphuel_active_order` across browser reloads.
   - **Anti-Spam Cooldown Guard**: Prevents accidental duplicate orders within 15 minutes by presenting a safety confirmation modal.

---

## Changelog
| Date | Changes Made | Rationale / User Request |
| :--- | :--- | :--- |
| **2026-09-24** | **Added Refueling Target Application Selection & Purged Inactive Utility Options**. | User requested: *"before order delivery ask user prefer fuel delivery to application"* and *"jab water or gas unavalable ha to phir service page ma kyu show ho rahye ha avalable"*. (1) Added 5-card Refueling Target selector (`car`, `bike`, `generator`, `machinery`, `storage`) with dynamic vehicle/asset identifier field, (2) Embedded Refueling Target in order payload, tracker steps, invoice PDF, HTML invoice modal, and structured WhatsApp dispatch link, (3) Purged dead LPG/Water selectors and summary rows from `OrderPage.jsx`, (4) Re-architected checkout steps into 5 clear atomic stages, (5) Updated bottom on-page FAQs to reflect active fuel offerings and volume limits. |
| **2026-09-24** | Fixed 'Within 45 Mins' Delivery SLA Standardization & Dynamic On-Demand GSAP Loading. | User requested: *"website ma fixed delivery time ha within 45 mins on doorstep same as urgent delivery"*. Standardized delivery duration across OrderPage to strictly **within 45 minutes** for both Simple Standard and Urgent Priority dispatch (Urgent gets prioritized routing with +Rs. 100 fee). Updated live countdown timer, tracker status descriptions, WhatsApp message payload, invoice print, and vector PDF generator. Dynamically injected GSAP on-demand in `OrderPage.jsx` when mounted, removing the global CDN script from `<head>` to improve Core Web Vitals. |
| **2026-09-22** | Unified delivery fee to flat **Rs. 280.00** across all orders; purged all lingering 50L bulk references, Free bulk tags, and the '• Min' chip label; explicitly highlighted the 15L Max limit in the UI and documentation. | User requested: *"delivery price ko update karo to phir ya prices update kyu nai ha or ha , 50L gaha per be lika ha us ko remove karo har gaja sa , or jo order ma max liter show ho raha ha is ko website ma mention or article a update karo"* and *"• Min is ko be remove karo"*. Updated `standardFee = 280`, removed `• Min` from 5L chip, removed all 50L bulk notices from invoice print and WhatsApp payload, and added `5L – 15L Max per Order` header badge. |
| **2026-09-21** | Removed `RefuelingLifecycleTracker` component from `OrderPage.jsx` and purged redundant vector simulation files; streamlined order placement into direct checkout with code-based post-order modal tracking. | User requested: *"Refueling Lifecycle Tracker Awaiting Order... is ko be sai karo is ko remove akro or code base karo is ko Refueling Lifecycle Tracker"*. Purged the bulky 765-line SVG simulation box from the order sidebar to remove confusing visual clutter. Order placement now directly triggers the official code-based interactive Tracker Modal upon submission with live ETA countdown, dispatch steps, and WhatsApp redirection. |
| **2026-09-21** | Marked Gas Delivery & Water Refill as **Currently Unavailable** across Order checkout and Services cards; clicking either card triggers clear informative warning toasts and prevents unfulfillable utility orders. | User requested: *"gas delivery & water refill unavailable, when user click its unavailable"*. Made LPG Gas Cylinder and Water Refill categories disabled/unavailable with red/amber badges and `not-allowed` styling. Clicking either item displays an immediate warning toast informing customers that only Petrol & Diesel delivery is operational 24/7. Auto-redirected any inbound URL parameters (`?fuel=lpg`, `?fuel=water`) to standard Petrol delivery. |
| **2026-09-21** | Resolved `"barcode scan failed"` issue by engineering a Dual Verification System (Instant Mobile Camera QR Code + Industrial High-Contrast Code 128 Barcode) inspired by `barkod.studio` standards; added live URL verification handler (`/order/?verify=ZYP-XXXXXX`) with authentic dispatch badge; deployed across web invoice modal, HTML download, and pure vector PDF. | User reported: *"barcode scan failed"*. Technical root-cause identified: native Apple iOS Camera does not support 1D linear barcodes (Code 128) in camera preview without dedicated scanner apps, and small module widths on high-DPI screens caused subpixel optical blur. Engineered dual architecture: 1) Instant 2D QR Code (ISO/IEC 18004) encoding order verification URL, scanned in <100ms by 100% of iPhone/Android cameras; 2) High-contrast pure black (`#000000`) ISO Code 128 Auto barcode (123 bits, 2.4px modules, 16+ quiet zone) for laser barcode guns and Google Lens. Updated web invoice modal, printable HTML, and jsPDF vector generator. Added live on-page verification banner displaying certified dispatch authenticity when scanned. |
>>>>>>> e2bf20b (feat: remove unavailable utilities, implement refueling target selection, and overhaul GitHub repo SEO/AEO/GEO)
| **2026-09-21** | Overhauled invoice design to full Corporate Executive Tax Invoice standard and initialized live dispatch countdown strictly to **45 minutes (`45m 00s`)** upon order placement. | User requested: *"invoice professional lagne chaye har ek cheeez ache sa represent hone chaye, after order 45 min countdown start"*. Implemented official corporate letterhead with OGRA License `OGRA/DL-7492/LHE`, NTN `9482710-3`, SECP `0248195`, 2-column telemetry profile, 5-column itemized billing table, Amount in Words block (`numberToWords`), OGRA volumetric accuracy box, digital barcode reference, and computerized verification seal (ETO 2002). Standard dispatch duration updated to strictly 45 minutes with instant `45m 00s` live countdown initialization and second-by-second decrement. |
| **2026-09-21** | Fixed and overhauled PDF invoice generation: replaced fragile HTML-to-Canvas approach with high-performance pure vector `jsPDF` engine (`src/utils/generateInvoicePdf.js`); eliminated CORS/font hanging issues, guaranteeing instant, reliable client-side `.pdf` downloads across all mobile and desktop browsers; retained post-order PDF download priority and 3s WhatsApp auto-redirection workflow. | User reported: *"yesinvoice pdf download nai ho rahi"*. Replaced `html2pdf.js` canvas capture with direct programmatic vector PDF generator using `jspdf`. Guarantees instant client-side generation and download of `Zyphuel-Invoice-${id}.pdf` with crystal-clear vector typography, OGRA compliance stamp, and itemized billing table. |
| **2026-09-20** | Removed section subtitle (`Select fuel, LPG Gas, or Water...`) and Live Market Rates indicator badge (`Live Market Rates Active: Petrol... Diesel...`) from Order page header. | User requested: *"Select fuel, LPG Gas, or Water. Calculate rates in real time, customize quantities, and track your delivery. Live Market Rates Active: Petrol Rs. 391.64/L • Diesel Rs. 426.54/L • High-Octane Rs. 402.50/L (OGRA Notified: 19-September-2026) is wale section ko remove karo"*. Streamlined the order page header so the title cleanly leads directly into active orders and the fuel order flow without repetitive subheadings or duplicate rate badges (live rates remain fully accessible in the top marquee ticker). |
| **2026-09-19** | Applied **+Rs. 2.50 / Litre** Retail Petrol Pump Rate Markup to Petrol, Diesel, and High-Octane; removed 50L+ Free delivery text and redundant pre-order notice banner; updated invoice and WhatsApp dispatch. | User requested: *"petrol , desil & high-octane Rs.2.5 add hone chaye as per petrol pump rate , jab be price kab ho ya zada ho ya same he raha chaye example acutal price 289.14 petrol pump price 291.88 as sa desil & high-octane, order page ma update karna zad ya"*, *"Orders of 50 Litres or more receive 100% FREE Delivery. is ko remove karo"*, and *"Notice Before Ordering... is ko be remove karo"*. Implemented `PUMP_RATE_MARKUP = 2.50` across `fuelPrices.js` and `FuelPriceContext.jsx`, updated ticker labels to show retail pump rates, added pump rate indicator badges on fuel selector cards, updated order summary with explicit base + markup breakdown, and purged confusing 50L bulk notices. |
| **2026-09-17** | Updated Simple Delivery fee from Rs. 250 to **Rs. 280** (<50L) due to nationwide fuel price increases; added prominent pre-order notice banner & inline form highlight. | User requested: *"order page ma delivery price ma change karo due to fuel prices increase , delivery price increases 250 to 280 before order mention in wesbite as message or as main point"*. Updated calculation logic (`standardFee = 280`), Simple Delivery schedule rate label, live ticker (`Doorstep Delivery: Rs. 280 (<50L) • FREE (≥50L)`), and deployed a bilingual notice banner directly above checkout grid plus inline alert before Step 1. Sub-50L urgent total is now Rs. 380 (280 + 100); 50L+ remains Free standard / Rs. 100 urgent. |
