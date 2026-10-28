/**
 * Single source of truth for the /services/ FAQ block.
 *
 * Both the visible section (src/pages/ServicesPage.jsx) and the prerendered
 * FAQPage schema (prerender.js) read from here. They used to be written twice
 * — the schema declared "What does Zyphuel NOT do?" and four other questions
 * that were never rendered on the page, which is a structured-data violation.
 *
 * Rule for edits: a question may only be added here if it is also rendered.
 */

/** Answered visibly at the top of the FAQ section, in this order. */
export const BASE_SERVICE_FAQS = [
  {
    q: 'What areas in Lahore are covered for doorstep petrol & diesel delivery?',
    a: 'Zyphuel operates citywide across Lahore, including DHA Phase 1 through Phase 9, Gulberg, Johar Town, Model Town, Bahria Town, Lahore Cantt, Garden Town, Faisal Town, Wapda Town, and Sundar & Quaid-e-Azam Industrial Estates.',
  },
  {
    q: 'How is fuel measured and calibrated during delivery?',
    a: 'Every Zyphuel micro-bowser uses positive-displacement digital flow meters with optical encoders calibrated to national weights and measures standards. You receive a printed volumetric receipt and a real-time digital sync on your phone.',
  },
  {
    q: 'Can I schedule recurring diesel deliveries for my commercial generator?',
    a: 'Yes. We offer automated recurring replenishment contracts for commercial plazas, factories, hospitals, and schools. We monitor your consumption schedule and refill standby tanks before power outages occur.',
  },
  {
    q: 'Is Cash on Delivery (COD) or digital payment supported?',
    a: 'Yes! Cash on Delivery (COD) is available for domestic orders from 5 to 10 liters of fuel. If you do not have cash ready, our delivery pilots carry instant QR codes for on-spot mobile wallet transfers via JazzCash, Easypaisa, NayaPay, and Raast / Bank transfer. For commercial orders and fleets, direct bank transfers and monthly billing accounts are supported.',
  },
];

/** Area-level Q&A for the Lahore zones Zyphuel actually covers. */
export const AREA_FAQS = [
  {
    q: 'Do you deliver petrol and diesel in DHA Lahore?',
    a: 'Yes. Zyphuel covers DHA Phase 1 through Phase 9 Prism with doorstep Euro-V Super Petrol, High-Octane 97 and Euro-V Diesel for cars, villas and standby generators, delivered within 45 minutes of order confirmation.',
  },
  {
    q: 'How fast is fuel delivery in Gulberg and MM Alam Road?',
    a: 'Gulberg I, II, III and MM Alam Road are core coverage zones. A calibrated micro-refueler reaches your address within 45 minutes with 5 to 15 litres of Euro-V fuel and a metered QR/barcoded invoice.',
  },
  {
    q: 'Can I order generator diesel in Johar Town or Model Town?',
    a: 'Yes. Standby generator diesel for Johar Town, PIA Society, Model Town and Garden Town is delivered through a 50-metre high-pressure hose into rooftop, basement and ground-level tanks, in 5 to 15 litre doorstep orders.',
  },
  {
    q: 'Does Zyphuel deliver to Bahria Town and Lahore Cantt?',
    a: 'Yes. Bahria Town Lahore, Lahore Cantt, Cavalry Ground and Askari I to XI are all inside the delivery zone, along with Faisal Town, Wapda Town and the Sundar and Quaid-e-Azam industrial estates.',
  },
  {
    q: 'How much does doorstep fuel delivery cost in Lahore?',
    a: 'Delivery is a fixed Rs. 300.00 for orders of 5 to 10 litres. Orders of 11 to 15 litres scale from Rs. 320.00 to Rs. 400.00 in +Rs. 20 per litre steps. Fuel itself is billed at the official OGRA rate plus a Rs. 5.00 per litre retail margin, and every order arrives within 45 minutes.',
  },
];

/** Everything rendered in the FAQ section, in render order. */
export const ALL_SERVICE_FAQS = [...BASE_SERVICE_FAQS, ...AREA_FAQS];
