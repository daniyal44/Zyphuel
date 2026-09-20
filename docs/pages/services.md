# Page Documentation: Services Page

## Overview & Identity
- **Page Name**: Services
- **Route**: `/services/`
- **Component File**: `src/pages/ServicesPage.jsx`
- **Primary Purpose**: Comprehensive catalog detailing Zyphuel's on-demand consumer (B2C) and commercial/industrial (B2B) energy delivery offerings in Lahore, including Euro-V fuels, generator diesel, LPG cylinders, and clean water tankers, complete with process flows, safety guarantees, and `#b2b` anchor routing.

---

## SEO & Structured Data
- **Page Title**: `Fuel Delivery Services in Lahore | Petrol, Diesel & High-Octane | Zyphuel`
- **Meta Description**: `On-demand fuel delivery in Lahore: Euro-V petrol, diesel for vehicles and standby generators, sealed LPG gas cylinders, and water tanker delivery. Fast 20-45 minute dispatch.`
- **Canonical URL**: `https://zyphuel.netlify.app/services/`
- **Schema Type**: `Service` / `LocalBusiness` / `OfferCatalog` / `FAQPage`
- **Sitemap Priority**: `0.9` (daily change frequency)

---

## Service Offerings & Categories

### 1. Consumer (B2C) Refueling Solutions
- **Super Euro-5 Petrol Delivery**: On-demand refueling for private cars, bikes, and small equipment at homes, offices, or roadside in Lahore.
- **High-Octane (HOBC 97) Delivery**: Premium fuel delivery for luxury, turbocharged, and high-compression performance vehicles.
- **Domestic Generator Emergency Top-Up**: Rapid fuel dispatch for residential generators during local power outages.
- **Sealed LPG Gas Cylinders**: 5 kg, 11.8 kg, and 45.4 kg kitchen and heating gas cylinders delivered with tare-weight verification and valve leak tests.
- **Bulk Potable Water**: Potable water tanker dispatch for residential storage tanks.

### 2. Commercial & Enterprise (B2B) Solutions
- **Standby Generator Scheduled Diesel Logistics**: Regular weekly/monthly diesel replenishment for hospitals, commercial plazas, IT parks, and factories, equipped with 50-meter high-reach delivery hoses for rooftop and basement day tanks.
- **Fleet Yard Refueling**: Overnight or off-peak yard fueling for delivery vans, corporate car fleets, and logistics trucks.
- **Construction & Heavy Machinery On-Site Fueling**: Direct-to-tank refueling for excavators, cranes, and heavy construction equipment.
- **Commercial LPG Manifolds**: High-volume LPG supply for restaurants, bakeries, and industrial kitchens.

---

## Operational Process & Quality Standards
1. **The 4-Step Fulfilment Flow**:
   - Step 1: Fuel & Volume Selection (Web / Android App) - Domestic COD supported for 5 to 10 Litres.
   - Step 2: High-Precision GPS Address Pinning.
   - Step 3: Calibrated Positive-Displacement Dispensing with 0.01L accuracy.
   - Step 4: Digital Invoicing with GPS, meter serial, and volume logs.
2. **What Zyphuel Provides**:
   - 100% OGRA-compliant Euro-V fuels sourced from certified oil terminals.
   - Automatic temperature compensation calibrated to 15°C reference standards.
   - Flame-proof nozzles, static grounding reels, and dry-break safety couplings.
   - 50-meter delivery hoses reaching high-rise rooftop generators and underground storage tanks.
3. **What Zyphuel Explicitly Does NOT Do**:
   - No loose unsealed open cans or unauthorized container transport.
   - No substandard or blended low-grade fuels.
   - No manual uncalibrated flow meters.

---

## Changelog
| Date | Changes Made | Rationale / User Request |
| :--- | :--- | :--- |
| **2026-09-20** | Updated LPG Gas price to actual market rate of **Rs. 450.00 / kg**; updated fallback display, context provider, and order form highlights. | User requested: *"gas actual market price is 450 pkr per kg is ko be price ma adjust karo mention"*. Adjusted centralized pricing in `fuelPrices.js`, `FuelPriceContext.jsx`, `ServicesPage.jsx`, and added market rate badge on checkout configuration. |
| **2026-09-19** | Synchronized live service preview rates with the **+Rs. 2.50 / Litre** Retail Petrol Pump Rate Markup on Petrol, Diesel, and High-Octane; updated category rate pill labels. | Reflect verified retail pump prices consistently across services catalog and link directly to updated Order Page checkout. |
| **2026-09-17** | Fixed Google Search Console canonical exclusion (`Alternative page with proper canonical tag`), synchronized SEO title & description between `ServicesPage.jsx` and `prerender.js`, boosted sitemap priority to 0.9 daily, added `#b2b` anchor and automated tab activation for commercial links. | Resolve GSC indexing issue from 2026-08-20 crawl drilldown report and eliminate canonical conflict. |
| **2026-09-16** | Harmonized Hose Reach (50m) and COD Domestic Order Window (5–10L). | Standardized generator refueling hose specifications to 50-meter high-reach delivery hoses and domestic COD eligibility to 5–10 Litres across ServicesPage.jsx, schema FAQs, and servicesData.js. |
| **2026-09-11** | Integrated live price synchronisation using `useFuelPrices` context. | Ensure service rate previews stay synchronized with the central pricing engine. |
| **2026-09-07** | Added structured B2C vs B2B segmented tab views and operational pipeline steps. | Clarify distinct commercial enterprise logistics vs consumer home deliveries. |
| **2026-09-02** | Added LPG cylinder tare-weight verification details and water tanker specifications. | Expanding multi-utility delivery options across Lahore. |
