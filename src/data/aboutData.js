import { APP_VERSION, APP_SIZE } from './appVersion.js';

export const aboutArticles = [
  {
    id: 'art-social-linkedin-1',
    source: 'LinkedIn Enterprise Publication',
    sourceIcon: 'fa-brands fa-linkedin',
    sourceColor: '#0077b5',
    title: "Pakistan’s Fuel Logistics Breakthrough: How CEO Muhammad Daniyal (ItxMDK) Built Zyphuel’s Calibrated Telemetry Fleet",
    author: 'Muhammad Daniyal (Founder & CEO)',
    date: 'September 2026',
    readTime: '6 min read',
    url: 'https://www.linkedin.com/in/muhammad-daniyal490',
    external: true,
    summary: 'An executive breakdown of Zyphuel’s positive-displacement flow meters, double-walled micro-tankers, and automated routing dispatch system engineered to eliminate fuel short-fueling and station queue idling.',
    highlights: [
      'Digital pulse encoder flow-meters with 0.01L precision',
      'Real-time GPS telemetry and automated 2-hour OGRA price sync',
      'Zero-leakage closed loop refueling for enterprise fleets'
    ]
  },
  {
    id: 'art-social-engineering',
    source: 'Tech & Software Architecture',
    sourceIcon: 'fa-solid fa-code',
    sourceColor: '#6366f1',
    title: 'Smart Refueling: Inside the IoT and Cloud Telemetry Tech Powering Doorstep Fuel Delivery in Pakistan',
    author: 'Zyphuel Engineering Team',
    date: 'September 2026',
    readTime: '5 min read',
    url: '/download',
    external: false,
    summary: `Inside the software architecture of the Zyphuel Android APK (v${APP_VERSION}, ${APP_SIZE}), featuring geolocation auto-pinning, live bowser tracking, and automated 2-hour market rate alerts.`,
    highlights: [
      `Native Android APK v${APP_VERSION} with real-time GPS location lock`,
      'Instant volumetric digital billing receipt generation',
      'Direct WhatsApp emergency dispatch bridge'
    ]
  },
  {
    id: 'art-social-generator',
    source: 'Commercial Energy & Industry Research',
    sourceIcon: 'fa-solid fa-bolt',
    sourceColor: '#eab308',
    title: 'Solving the Energy Gap: Why Standby Generator Refueling Services are Critical for Lahore’s Enterprise Sector',
    author: 'Commercial Operations Team',
    date: 'September 2026',
    readTime: '5 min read',
    url: '/services',
    external: false,
    summary: 'A deep-dive into how hospitals, IT plazas, manufacturing plants, and corporate offices eliminate blackout downtime through scheduled Euro-V generator diesel deliveries.',
    highlights: [
      '100-foot high-reach hoses for rooftop and basement generator tanks',
      'Automated scheduled deliveries prior to load-shedding cycles',
      '100% low-emission Euro-V diesel with density certificates'
    ]
  },
  {
    id: 'art-social-facebook',
    source: 'Official Facebook & Community Channel',
    sourceIcon: 'fa-brands fa-facebook',
    sourceColor: '#1877f2',
    title: 'Doorstep Euro-V Petrol, High-Octane 97 & Sealed LPG Gas Cylinder Refills in Lahore: Customer Safety Guide',
    author: 'Customer Experience & Safety Team',
    date: 'September 2026',
    readTime: '4 min read',
    url: 'https://www.facebook.com/muhammad.daniyal.522942/',
    external: true,
    summary: 'Consumer guide on ordering on-demand fuel safely at home, avoiding dangerous open canister transportation, and verifying electronic flow-meter receipts.',
    highlights: [
      'Cash on Delivery (COD) for household orders up to 10 Liters',
      'Weight-verified sealed LPG gas cylinders with safety checks',
      '24/7 customer support helpline (+92 323 0112464)'
    ]
  }
];
