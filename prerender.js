import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { articles } from './src/data/articles.js'
import { APP_VERSION, APP_SIZE, RELEASE_DATE } from './src/data/appVersion.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const DOMAIN = 'https://zyphuel.netlify.app'

// Common knowledge entities
const ORGANIZATION_SCHEMA = {
  "@type": "Organization",
  "@id": `${DOMAIN}/#organization`,
  "name": "Zyphuel",
  "alternateName": [
    "Zyphuel Pakistan",
    "Zyphuel Fuel Delivery",
    "Zyphuel Mobile Refueling",
    "Zyphuel Technologies",
    "Zyphuel Energy Logistics"
  ],
  "description": "Zyphuel delivers petrol and diesel to your door in Lahore, Pakistan — serving households, generator owners, and commercial fleets with calibrated 0.01L positive-displacement metering and live GPS tracking.",
  "url": DOMAIN,
  "logo": `${DOMAIN}/images/logo.png`,
  "image": `${DOMAIN}/images/logo.png`,
  "telephone": "+923230112464",
  "email": "m.daniyalkhan490@gmail.com",
  "hasMap": "https://share.google/Nb4XGKYq5aU0nzLr3",
  "sameAs": [
    "https://www.linkedin.com/company/zyphuel/",
    "https://www.linkedin.com/in/muhammad-daniyal490",
    "https://share.google/Nb4XGKYq5aU0nzLr3",
    "https://github.com/daniyal44",
    "https://www.facebook.com/muhammad.daniyal.522942/",
    "https://en.wikipedia.org/wiki/Lahore"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Lahore",
    "addressLocality": "Lahore",
    "addressRegion": "Punjab",
    "postalCode": "54000",
    "addressCountry": "PK"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 31.507534,
    "longitude": 74.334949
  },
  "founder": {
    "@type": "Person",
    "@id": `${DOMAIN}/#person-daniyal`,
    "name": "Muhammad Daniyal",
    "jobTitle": "Founder & Leading Web Developer",
    "sameAs": [
      "https://www.linkedin.com/in/muhammad-daniyal490",
      "https://github.com/daniyal44",
      "https://www.facebook.com/muhammad.daniyal.522942/"
    ],
    "knowsAbout": [
      "Fuel delivery logistics",
      "On-demand energy delivery",
      "Fleet refueling",
      "https://en.wikipedia.org/wiki/Fuel_dispenser",
      "https://en.wikipedia.org/wiki/Euro_V",
      "https://en.wikipedia.org/wiki/Diesel_engine",
      "https://en.wikipedia.org/wiki/Electric_generator"
    ]
  },
  "knowsAbout": [
    "https://en.wikipedia.org/wiki/Fuel_dispenser",
    "https://en.wikipedia.org/wiki/Euro_V",
    "https://en.wikipedia.org/wiki/Lahore",
    "https://en.wikipedia.org/wiki/Diesel_engine",
    "https://en.wikipedia.org/wiki/Electric_generator",
    "On-demand fuel delivery",
    "Doorstep petrol delivery Lahore",
    "Generator diesel logistics Pakistan",
    "Calibrated electronic flow meters"
  ]
}

const LOCAL_BUSINESS_SCHEMA = {
  "@type": ["LocalBusiness", "GasStation"],
  "@id": `${DOMAIN}/#localbusiness`,
  "name": "Zyphuel Mobile Refueling & Fuel Agency",
  "alternateName": [
    "Zyphuel Mobile Petrol Pump Lahore",
    "Zyphuel Fuel Agency Lahore",
    "Zyphuel Fuel Station On-Demand",
    "Zyphuel Energy Delivery"
  ],
  "url": DOMAIN,
  "logo": `${DOMAIN}/images/logo.png`,
  "image": `${DOMAIN}/images/logo.png`,
  "telephone": "+923230112464",
  "email": "m.daniyalkhan490@gmail.com",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "75-Main Boulevard, Gulberg III",
    "addressLocality": "Lahore",
    "addressRegion": "Punjab",
    "postalCode": "54000",
    "addressCountry": "PK"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 31.507534,
    "longitude": 74.334949
  },
  "areaServed": [
    { "@type": "City", "name": "Lahore", "sameAs": "https://en.wikipedia.org/wiki/Lahore" },
    { "@type": "AdministrativeArea", "name": "Gulberg, Lahore" },
    { "@type": "AdministrativeArea", "name": "Defence Housing Authority (DHA) Lahore" },
    { "@type": "AdministrativeArea", "name": "Johar Town, Lahore" },
    { "@type": "AdministrativeArea", "name": "Model Town, Lahore" },
    { "@type": "AdministrativeArea", "name": "Bahria Town, Lahore" },
    { "@type": "AdministrativeArea", "name": "Cantt, Lahore" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Zyphuel Doorstep Refueling & Energy Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Doorstep Euro-V Super Petrol Delivery & Mobile Petrol Pump",
          "description": "On-demand Super Euro-V petrol delivered directly to vehicles and homes with 0.01L digital calibrated metering, replacing traditional petrol pump visits."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Standby Generator Euro-V Diesel Refueling",
          "description": "Scheduled and emergency diesel logistics for commercial, residential, and industrial generators across Lahore."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Authorized Fuel Agency & Bulk Diesel Supply",
          "description": "Commercial fuel agency services offering bulk Euro-V diesel deliveries with calibrated flow meters and digital invoices."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Commercial Logistics Fleet Yard Refueling",
          "description": "Bulk fuel replenishment for logistics vans, corporate vehicle fleets, and construction equipment."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Potable Clean Water Tanker Dispatch",
          "description": "Commercial and residential clean water delivery across Lahore."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Certified Sealed LPG Cylinder Delivery",
          "description": "Weight-verified 11.8kg and 45.4kg LPG cylinders delivered with safety valve inspection."
        }
      }
    ]
  },
  "knowsAbout": [
    "Euro-V Fuel Standards",
    "Positive-Displacement Flow Meters",
    "OGRA Daily Fuel Pricing",
    "Standby Generator Refueling Logistics",
    "Doorstep Fuel Delivery Systems",
    "NFPA 385 Hazardous Material Safety",
    "Petrol Pump Operations Lahore",
    "Fuel Agency Bulk Supply Lahore",
    "Industrial Diesel Delivery Logistics"
  ],
  "hasMap": "https://share.google/Nb4XGKYq5aU0nzLr3",
  "founder": {
    "@id": `${DOMAIN}/#person-daniyal`
  }
}

const WEBSITE_SCHEMA = {
  "@type": "WebSite",
  "@id": `${DOMAIN}/#website`,
  "url": DOMAIN,
  "name": "Zyphuel",
  "description": "Zyphuel delivers on-demand petrol and diesel to homes, businesses, and fleets across Lahore, Pakistan, with calibrated digital flow meters.",
  "publisher": {
    "@id": `${DOMAIN}/#organization`
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${DOMAIN}/services/?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
}

const ARTICLES_SCHEMA = [
  {
    "@type": "Article",
    "@id": `${DOMAIN}/#article-1`,
    "headline": "Pakistan’s Shift to Daily Fuel Pricing: How OGRA’s 2026 Reform Works & Why App Alerts Protect Consumers",
    "description": "Analyzing Pakistan’s historic transition to daily fuel pricing based on rolling 7-day international Platts benchmarks, the roadmap to full 2027 deregulation, and how Zyphuel’s 2-hour push notification engine protects motorists and fleet budgets.",
    "image": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=720&q=80",
    "datePublished": "2026-09-05T08:00:00+05:00",
    "dateModified": "2026-09-06T00:00:00+05:00",
    "author": {
      "@type": "Organization",
      "name": "Zyphuel Energy Analysis Team"
    },
    "publisher": {
      "@id": `${DOMAIN}/#organization`
    },
    "mainEntityOfPage": `${DOMAIN}/`
  },
  {
    "@type": "TechArticle",
    "@id": `${DOMAIN}/#article-2`,
    "headline": `How to Download and Install Zyphuel APK v${APP_VERSION}: Biometrics, Live GPS Auto-Pinning & Daily Rate Sync`,
    "description": `A complete, step-by-step setup guide for the official Zyphuel Android APK (v${APP_VERSION}, ${APP_SIZE}), covering biometric security checkout, GPS sector auto-detection across Lahore, and real-time bowser telemetry.`,
    "image": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=720&q=80",
    "datePublished": "2026-09-05T08:00:00+05:00",
    "dateModified": "2026-09-09T00:00:00+05:00",
    "author": {
      "@type": "Organization",
      "name": "Zyphuel App Engineering"
    },
    "publisher": {
      "@id": `${DOMAIN}/#organization`
    },
    "mainEntityOfPage": `${DOMAIN}/download/`
  },
  {
    "@type": "Article",
    "@id": `${DOMAIN}/#article-3`,
    "headline": "Powering Through Load-Shedding: Industrial Generator Refueling & Direct Euro-V Diesel Logistics in Lahore",
    "description": "How factories, medical plazas, IT technology parks, and high-rise commercial facilities eliminate unpredicted blackout downtime with scheduled Euro-V generator diesel replenishment.",
    "image": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=720&q=80",
    "datePublished": "2026-09-04T08:00:00+05:00",
    "dateModified": "2026-09-06T00:00:00+05:00",
    "author": {
      "@type": "Organization",
      "name": "Zyphuel Commercial Ops"
    },
    "publisher": {
      "@id": `${DOMAIN}/#organization`
    },
    "mainEntityOfPage": `${DOMAIN}/services/`
  },
  {
    "@type": "Article",
    "@id": `${DOMAIN}/#article-4`,
    "headline": "Commercial Generator Diesel & Sealed LPG Cylinder Refills: 2026 Safety Standards & Doorstep Delivery in Lahore",
    "description": "A definitive safety guide on ordering certified Euro-V generator diesel, sealed LPG gas cylinders, and bulk clean water tankers directly to doorsteps across Lahore.",
    "image": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=720&q=80",
    "datePublished": "2026-09-03T08:00:00+05:00",
    "dateModified": "2026-09-06T00:00:00+05:00",
    "author": {
      "@type": "Organization",
      "name": "Zyphuel Utilities Team"
    },
    "publisher": {
      "@id": `${DOMAIN}/#organization`
    },
    "mainEntityOfPage": `${DOMAIN}/services/`
  },
  {
    "@type": "TechArticle",
    "@id": `${DOMAIN}/#article-5`,
    "headline": "Combating Pump Short-Fueling: Inside Zyphuel’s Calibrated Positive-Displacement Flow Meters & Cloud Telemetry",
    "description": "An engineering breakdown of how positive-displacement electronic flow meters, 0.01L pulse encoders, and IoT cloud telemetry eliminate retail pump short-fueling and fuel adulteration.",
    "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=720&q=80",
    "datePublished": "2026-09-01T08:00:00+05:00",
    "dateModified": "2026-09-06T00:00:00+05:00",
    "author": {
      "@type": "Organization",
      "name": "Zyphuel Telemetry Engineering"
    },
    "publisher": {
      "@id": `${DOMAIN}/#organization`
    },
    "mainEntityOfPage": `${DOMAIN}/about/`
  },
  {
    "@type": "Article",
    "@id": `${DOMAIN}/#article-6`,
    "headline": "Mobile Energy Logistics in Lahore: Inside Zyphuel's Doorstep Delivery Fleet",
    "description": "Inside Zyphuel's journey building on-demand doorstep refueling across Lahore, led by Founder & Leading Web Developer Muhammad Daniyal.",
    "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=720&q=80",
    "datePublished": "2026-08-28T08:00:00+05:00",
    "dateModified": "2026-09-06T00:00:00+05:00",
    "author": {
      "@type": "Person",
      "name": "Muhammad Daniyal"
    },
    "publisher": {
      "@id": `${DOMAIN}/#organization`
    },
    "mainEntityOfPage": `${DOMAIN}/about/`
  },
  {
    "@type": "TechArticle",
    "@id": `${DOMAIN}/#article-7`,
    "headline": "On-Demand Fuel Delivery in 2026: Global Tech Benchmarks (Zyphuel vs. CAFU, Booster & FuelBuddy) & The Doorstep Refueling Revolution in Lahore",
    "description": "A definitive 2026 comparative benchmark evaluating global mobile fueling titans (CAFU UAE, Booster USA, FuelBuddy India) against Zyphuel in Pakistan. Calibrated 0.01L positive-displacement flow meters and 45-minute dispatch.",
    "image": "https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=1200&q=80",
    "datePublished": "2026-09-27T08:00:00+05:00",
    "dateModified": "2026-09-27T00:00:00+05:00",
    "author": {
      "@type": "Person",
      "name": "Muhammad Daniyal",
      "jobTitle": "Founder & Lead Architect"
    },
    "publisher": {
      "@id": `${DOMAIN}/#organization`
    },
    "mainEntityOfPage": `${DOMAIN}/blog/global-vs-pakistan-on-demand-fuel-delivery-benchmarks/`
  }
]

const RELEVANT_KEYWORDS = "fuel delivery Lahore, diesel delivery Lahore, petrol delivery Lahore, generator refueling Lahore, mobile refueling Pakistan"

// ── Truthful <lastmod> resolution ───────────────────────────────────────────
// Google deprioritises sitemaps whose every <lastmod> moves on every single deploy.
// Stamping the build date on all 16 URLs makes the freshness signal worthless, so
// resolve the last commit date of the source files that actually produce each page
// instead. Degrades to the build date when git history is unavailable (shallow CI clone).
const ROUTE_SOURCE_FILES = {
  '/': ['src/pages/HomePage.jsx', 'src/index.css', 'src/data/fuelPrices.js'],
  '/about/': ['src/pages/AboutPage.jsx', 'src/data/aboutData.js'],
  '/services/': ['src/pages/ServicesPage.jsx', 'src/data/servicesData.js'],
  '/order/': ['src/pages/OrderPage.jsx', 'src/utils/officeHours.js'],
  '/contact/': ['src/pages/ContactPage.jsx', 'src/data/companyInfo.js'],
  '/download/': ['src/pages/DownloadPage.jsx', 'src/data/appVersion.js'],
  '/blog/': ['src/pages/BlogListPage.jsx', 'src/data/articles.js'],
  '/privacy/': ['src/pages/PrivacyPolicyPage.jsx'],
  '/terms/': ['src/pages/TermsOfUsePage.jsx'],
}

const gitDateCache = new Map()
function gitLastCommitDate(relPath) {
  if (gitDateCache.has(relPath)) return gitDateCache.get(relPath)
  let value = null
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', relPath], {
      cwd: __dirname,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    if (/^\d{4}-\d{2}-\d{2}$/.test(out)) value = out
  } catch {
    value = null
  }
  gitDateCache.set(relPath, value)
  return value
}

function lastModifiedForRoute(routePath, fallback) {
  const sources = ROUTE_SOURCE_FILES[routePath]
  if (!sources) return fallback
  const dates = sources.map(gitLastCommitDate).filter(Boolean).sort()
  return dates.length ? dates[dates.length - 1] : fallback
}

const ROUTES = [
  {
    path: '/',
    outFile: 'dist/index.html',
    title: "Online Petrol Delivery in Lahore | Doorstep Fuel & Diesel (COD) | Zyphuel",
    description: "Order verified Euro-V petrol and diesel delivered directly to your doorstep in Lahore within 45 mins. Cash on delivery (COD), calibrated digital meters, and official OGRA rates.",
    keywords: "online petrol delivery in lahore, petrol home delivery lahore, online petrol delivery near me, diesel home delivery near me, petrol delivery app pakistan, emergency petrol delivery lahore, buy petrol online pakistan, fuel delivery Lahore, diesel delivery Lahore, petrol delivery Lahore, petrol pump near me Lahore, fuel station near me, petrol price today Lahore, diesel price today Lahore, diesel supplier Lahore, fuel agency Lahore, mobile refueling Pakistan, doorstep fuel delivery, generator diesel delivery, generator refueling service, fleet refueling service, on-demand fuel delivery app, fuel delivery DHA Lahore, petrol delivery Gulberg, diesel delivery Johar Town, OGRA compliant fuel rates, what is Zyphuel, is Zyphuel safe, Zyphuel mobile app, Zyphuel APK download, emergency fuel delivery Lahore, petrol delivery near me, petrol price in Pakistan today, diesel price in Pakistan today, today petrol rate in Pakistan, which app delivers petrol, can petrol be delivered at home, doorstep diesel delivery, best delivery app in Pakistan, diesel delivery companies",
    canonical: `${DOMAIN}/`,
    ogImage: `${DOMAIN}/images/logo.png`,
    ogType: 'website',
    schema: {
      "@graph": [
        WEBSITE_SCHEMA,
        ORGANIZATION_SCHEMA,
        LOCAL_BUSINESS_SCHEMA,
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${DOMAIN}/` }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": `${DOMAIN}/#faq`,
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is Zyphuel?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zyphuel is an on-demand doorstep fuel delivery service in Lahore. It brings Euro-V petrol, High-Octane 97, or diesel to your address within 45 minutes — order 5 to 15 litres online or through the Android app and pay cash or online, without visiting a petrol pump."
              }
            },
            {
              "@type": "Question",
              "name": "What does Zyphuel do for its customers?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zyphuel dispatches a calibrated micro-refueler to your location in Lahore and delivers fuel for cars, motorbikes, standby generators, and commercial machinery. Every litre is metered on a calibrated 0.01L flow meter and itemised on a QR/barcoded PDF invoice."
              }
            },
            {
              "@type": "Question",
              "name": "Is Zyphuel safe to use?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Zyphuel delivers only OGRA-notified Euro-V fuel from sealed, metered bowsers operated by trained dispatch staff, and every order is backed by a verifiable QR/barcode invoice plus a 24/7 WhatsApp helpline on +92 3230-112464."
              }
            },
            {
              "@type": "Question",
              "name": "Does Zyphuel have a mobile application?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Zyphuel's Android app is available as a direct APK download with live delivery tracking and 2-hour fuel price alerts. The iOS version is in development; iPhone users can order on the website, and official Google Play and App Store listings are launching soon."
              }
            },
            {
              "@type": "Question",
              "name": "Which areas of Lahore does Zyphuel deliver to?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zyphuel delivers petrol and diesel across Lahore, including Gulberg, DHA, Johar Town, Model Town, Bahria Town, and surrounding industrial zones. Contact us to confirm coverage for your address."
              }
            },
            {
              "@type": "Question",
              "name": "What is the minimum fuel delivery quantity on Zyphuel?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The fuel delivery volume is strictly 5 Litres minimum up to 15 Litres maximum per doorstep delivery order. Customers can choose from volume chips (5, 7, 10, 12, 15L) or input custom amounts between 5L and 15L in 1-Litre increments."
              }
            },
            {
              "@type": "Question",
              "name": "What are Zyphuel delivery charges for petrol and diesel in Lahore?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zyphuel charges a fixed nominal delivery fee of Rs. 300.00 for doorstep fuel orders of 5–10 Litres, delivered within 45 minutes. For high-capacity orders of 11–15 Litres, delivery fees scale linearly between Rs. 300.00 and Rs. 400.00 (+Rs. 20/L step: 11L = Rs. 320, 12L = Rs. 340, 13L = Rs. 360, 14L = Rs. 380, 15L = Rs. 400 Max). Urgent priority dispatch (10–20 minutes) carries an additional surcharge of +Rs. 100.00."
              }
            },
            {
              "@type": "Question",
              "name": "How do I order fuel from Zyphuel?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Place an order through the website order page or the Zyphuel Android app. Pin your location, choose petrol or diesel and the quantity you need, and a refueling unit is dispatched to you."
              }
            },
            {
              "@type": "Question",
              "name": "How is the fuel quantity measured?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Every delivery uses a calibrated digital flow meter. You receive an itemised invoice showing the exact litres dispensed and the rate applied."
              }
            },
            {
              "@type": "Question",
              "name": "Does Zyphuel serve commercial fleets and generators?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Zyphuel supplies scheduled and on-demand Euro-V diesel for standby generators, construction equipment, and commercial vehicle fleets with long-reach 50m hoses."
              }
            },
            {
              "@type": "Question",
              "name": "Why choose Zyphuel instead of traditional petrol pumps in Lahore?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zyphuel eliminates petrol pump queues and pump short-fueling with 0.01L calibrated digital flow meters, 100% OGRA compliant regulated pricing, genuine terminal-sourced Euro-V fuel, and doorstep delivery within 45 minutes."
              }
            },
            {
              "@type": "Question",
              "name": "Is Zyphuel an authorized commercial fuel agency in Lahore?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Zyphuel operates as a compliant mobile refueling and fuel agency supplying bulk Euro-V diesel directly to corporate generator tanks, manufacturing plants, telecommunication towers, and construction yards across Lahore at official OGRA rates with verified batch quality certificates."
              }
            },
            {
              "@type": "Question",
              "name": "What should I do if I run out of petrol or diesel on the road in Lahore?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Simply open Zyphuel or send your live WhatsApp location to +92 323 0112464. Our rapid mobile bowsers dispatch emergency Euro-V petrol or diesel directly to your stranded vehicle within 45 minutes anywhere in Lahore."
              }
            },
            {
              "@type": "Question",
              "name": "How fast does Zyphuel deliver fuel to DHA, Gulberg, or Johar Town?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zyphuel operates decentralized mobile refueler hubs across Lahore, delivering within 45 minutes to Gulberg, Model Town, Cantt, Johar Town, DHA Lahore, and Bahria Town."
              }
            },
            {
              "@type": "Question",
              "name": "Which app delivers petrol in Lahore?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The Zyphuel Android app delivers petrol and diesel in Lahore — choose 5 to 15 litres, pin your location, and a refueling unit reaches you within 45 minutes with cash or online payment. Download the APK from our Download page; the iOS version is in development."
              }
            },
            {
              "@type": "Question",
              "name": "Can I have petrol delivered to my home?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. In Lahore you can order 5 to 15 litres of Euro-V petrol or diesel straight to your home, car, or workplace — delivered within 45 minutes for a flat Rs. 300.00 delivery fee on 5–10 litre orders."
              }
            },
            {
              "@type": "Question",
              "name": "What is doorstep diesel delivery?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Doorstep diesel delivery means ordering diesel online and having it pumped directly into your vehicle, generator, or storage tank at your address — no pump queues, no jerrycans. Zyphuel dispatches a calibrated, metered bows with sealed Euro-V diesel anywhere in Lahore within 45 minutes."
              }
            },
            {
              "@type": "Question",
              "name": "Can diesel be delivered at home?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Households and businesses in Lahore can have diesel delivered to their address for standby generators, cars, and machinery — order on the website or Android app, minimum 5 litres up to 15 litres per doorstep order, with an itemised metered invoice."
              }
            }
          ]
        },
        ...ARTICLES_SCHEMA
      ]
    }
  },
  {
    path: '/about/',
    outFile: 'dist/about/index.html',
    title: "About Zyphuel | On-Demand Fuel Delivery in Lahore",
    description: "Learn about Zyphuel's mission to deliver reliable on-demand petrol and diesel across Lahore. Founded by Muhammad Daniyal, bringing calibrated digital flow meters to doorstep refueling.",
    keywords: "about Zyphuel, fuel delivery company Lahore, mobile refueling Pakistan, diesel delivery Lahore, generator fuel Pakistan, calibrated fuel metering, Zyphuel team, Muhammad Daniyal Zyphuel, on-demand fuel delivery Pakistan, fuel delivery app Pakistan, what is Zyphuel, fuel delivery startup Pakistan, doorstep fuel delivery company, Zyphuel fuel company Lahore",
    canonical: `${DOMAIN}/about/`,
    ogImage: `${DOMAIN}/images/daniyal.jpeg`,
    ogType: 'website',
    schema: {
      "@graph": [
        WEBSITE_SCHEMA,
        ORGANIZATION_SCHEMA,
        LOCAL_BUSINESS_SCHEMA,
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${DOMAIN}/` },
            { "@type": "ListItem", "position": 2, "name": "About Us", "item": `${DOMAIN}/about/` }
          ]
        },
        {
          "@type": "AboutPage",
          "@id": `${DOMAIN}/about/#aboutpage`,
          "url": `${DOMAIN}/about/`,
          "name": "About Zyphuel & Leadership Team",
          "mainEntity": {
            "@id": `${DOMAIN}/#organization`
          }
        },
        {
          "@type": "FAQPage",
          "@id": `${DOMAIN}/about/#faq`,
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Who is the founder of Zyphuel and what is the company's background?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zyphuel was founded by Pakistani software engineer and entrepreneur Muhammad Daniyal. Zyphuel operates as a modern mobile refueling and energy logistics company providing certified Euro-V petroleum, standby generator diesel, and clean utilities across Lahore with 0.01L calibrated electronic flow meters."
              }
            },
            {
              "@type": "Question",
              "name": "What specialized vehicles and metering equipment does Zyphuel operate?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zyphuel deploys custom-built micro-refuelers featuring double-walled baffled steel tanks, positive-displacement flow meters with optical pulse encoders (0.01L precision), automatic 15°C temperature compensation, 50-meter high-reach delivery hoses, and heavy-duty static bonding reels."
              }
            },
            {
              "@type": "Question",
              "name": "Is Zyphuel compliant with Pakistani safety and petroleum regulations?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Zyphuel complies with OGRA Euro-V petroleum quality standards (<10 ppm sulfur diesel and 92+ octane petrol sourced directly from licensed terminal depots), Civil Defence Lahore fire safety codes, Punjab EPA standards, and NFPA 30A motor fuel dispensing protocols."
              }
            },
            {
              "@type": "Question",
              "name": "What are Zyphuel's doorstep delivery limits and pricing?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Doorstep consumer fuel orders are strictly bounded between 5 Litres minimum and 15 Litres maximum per dispatch. We charge a fixed delivery fee of Rs. 300.00 for orders up to 10 Litres, with dynamic demand surge pricing for 11L to 15L orders, and a guaranteed SLA of 'Delivered: Within 45 Mins'. Payment is supported via Cash on Delivery (COD for 5L–10L) and on-the-spot Online Payments (JazzCash, Easypaisa, NayaPay, Raast)."
              }
            },
            {
              "@type": "Question",
              "name": "Can businesses and corporate fleets open dedicated commercial accounts?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Zyphuel offers centralized billing accounts with 15-day or 30-day payment terms, scheduled weekly generator replenishment, digital consumption telemetry, and priority emergency dispatch helpline (24/7) for hospitals, IT plazas, and logistics hubs."
              }
            }
          ]
        },
        ...ARTICLES_SCHEMA.filter(a => a["@id"].includes('article-5') || a["@id"].includes('article-6'))
      ]
    }
  },
  {
    path: '/services/',
    outFile: 'dist/services/index.html',
    title: "Fuel Delivery Services in Lahore | Petrol, Diesel & High-Octane | Zyphuel",
    description: "On-demand fuel delivery in Lahore: Euro-V Super Petrol, High-Octane 97, and Euro-V Diesel for vehicles and standby generators across DHA, Gulberg, Johar Town & Bahria Town. Fast dispatch within 45 minutes.",
    keywords: "fuel delivery services Lahore, diesel delivery Lahore, petrol delivery Lahore, generator diesel refueling Lahore, commercial diesel supply Lahore, fleet refueling Pakistan, doorstep petrol delivery, high octane 97 delivery Lahore, Zyphuel services, fuel delivery DHA Lahore, petrol delivery Gulberg, diesel delivery Johar Town, generator diesel Model Town, emergency fuel Bahria Town Lahore, bulk diesel Sundar Industrial Estate, petrol pump near me Lahore, online fuel order Lahore, diesel delivery companies, load shedding generator fuel Lahore, standby generator diesel delivery, fuel supplier Lahore",
    canonical: `${DOMAIN}/services/`,
    ogImage: `${DOMAIN}/images/fuel.png`,
    ogType: 'website',
    schema: {
      "@graph": [
        WEBSITE_SCHEMA,
        ORGANIZATION_SCHEMA,
        LOCAL_BUSINESS_SCHEMA,
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${DOMAIN}/` },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": `${DOMAIN}/services/` }
          ]
        },
        {
          "@type": "Service",
          "@id": `${DOMAIN}/services/#service`,
          "name": "On-Demand Doorstep Fuel Delivery",
          "provider": { "@id": `${DOMAIN}/#organization` },
          "serviceType": "Energy Logistics and Fuel Supply",
          "areaServed": "Lahore, Pakistan",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Zyphuel Energy Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Consumer Doorstep Petrol & Diesel Delivery"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Commercial Standby Generator Diesel Refueling"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Emergency Roadside Fuel Delivery"
                }
              }
            ]
          }
        },
        {
          "@type": "FAQPage",
          "@id": `${DOMAIN}/services/#faq`,
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What services does Zyphuel provide in Lahore?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zyphuel provides on-demand doorstep fuel delivery including Euro-V Super Petrol (92 Octane), High-Octane 97, and Euro-V Diesel for vehicles and backup generators across Lahore with calibrated digital flow-meters."
              }
            },
            {
              "@type": "Question",
              "name": "What does Zyphuel NOT do?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zyphuel does NOT supply uncertified or open-market fuel, does NOT decant fuel through manual uncalibrated jerrycans or plastic funnels, does NOT outsource deliveries to uncertified bike riders, and does NOT charge hidden surcharges above official OGRA rates."
              }
            },
            {
              "@type": "Question",
              "name": "How is fuel measured and calibrated during doorstep delivery?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Every Zyphuel mobile micro-tanker is equipped with electronic positive-displacement flow meters with digital pulse encoders that measure volume to 0.01 Liter precision, generating an instant digital and printed volumetric receipt."
              }
            },
            {
              "@type": "Question",
              "name": "Can I order diesel for commercial generator backup during load shedding?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Zyphuel specializes in commercial standby generator diesel replenishment with 50-meter high-pressure delivery hoses capable of fueling rooftop, basement, and ground-level generator tanks for corporate offices, hospitals, factories, and residential buildings."
              }
            },
            {
              "@type": "Question",
              "name": "Is Cash on Delivery (COD) supported for fuel orders?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Cash on Delivery (COD) is supported for doorstep orders from 5 to 10 liters of fuel. If you don't have cash, instant on-spot Online Payments payments via JazzCash, Easypaisa, NayaPay, and Raast are accepted. For orders exceeding 10 liters (up to 15L Max) or commercial fleets, advance payment and billing accounts are available."
              }
            }
          ]
        },
        ...ARTICLES_SCHEMA.filter(a => a["@id"].includes('article-3') || a["@id"].includes('article-4'))
      ]
    }
  },
  {
    path: '/download/',
    outFile: 'dist/download/index.html',
    title: "Download Zyphuel App: On-Demand Fuel Delivery APK for Android | Official v2.6.4",
    description: `Download the official Zyphuel Android APK (v${APP_VERSION}, ${APP_SIZE}) for on-demand doorstep petrol and diesel delivery in Lahore. Real-time GPS tracking, 45-minute dispatch, and 2-hour OGRA price-lock alerts.`,
    keywords: `Download Zyphuel APK, Zyphuel App v${APP_VERSION}, petrol delivery app pakistan, fuel delivery app Lahore, online petrol delivery in lahore, doorstep diesel delivery lahore, generator fuel delivery lahore, emergency fuel app pakistan, buy fuel online pakistan, mobile fuel delivery app Pakistan, fuel rate alerts app Lahore, which app delivers petrol, best fuel delivery app Pakistan, petrol delivery app download, fuel delivery app with GPS tracking`,
    canonical: `${DOMAIN}/download/`,
    ogImage: `${DOMAIN}/images/1.jpeg`,
    ogType: 'website',
    schema: {
      "@graph": [
        WEBSITE_SCHEMA,
        ORGANIZATION_SCHEMA,
        LOCAL_BUSINESS_SCHEMA,
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${DOMAIN}/` },
            { "@type": "ListItem", "position": 2, "name": "Download App", "item": `${DOMAIN}/download/` }
          ]
        },
        {
          "@type": "SoftwareApplication",
          "@id": `${DOMAIN}/download/#app`,
          "name": "Zyphuel Mobile Application - Doorstep Fuel Delivery Lahore",
          "operatingSystem": "Android 8.0 and above (Android 15/16 Ready)",
          "applicationCategory": "UtilitiesApplication, ShoppingApplication",
          "downloadUrl": `${DOMAIN}/APK/Zyphuel.apk`,
          "fileSize": APP_SIZE,
          "softwareVersion": APP_VERSION,
          "author": { "@id": `${DOMAIN}/#organization` },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "PKR"
          }
        },
        {
          "@type": "Article",
          "@id": `${DOMAIN}/download/#app-article-1`,
          "headline": `Zyphuel Mobile App v${APP_VERSION}: Next-Gen Doorstep Fuel Logistics & Cloud Telemetry in Pakistan`,
          "description": `Explore how the official Zyphuel Android APK (v${APP_VERSION}, ${APP_SIZE}) transforms urban energy delivery in Lahore with instant GPS auto-detection and zero-latency cloud telemetry.`,
          "image": `${DOMAIN}/images/1.jpeg`,
          "datePublished": "2026-09-02T00:00:00+05:00",
          "dateModified": "2026-09-02T00:00:00+05:00",
          "author": {
            "@type": "Person",
            "name": "Muhammad Daniyal"
          },
          "publisher": { "@id": `${DOMAIN}/#organization` }
        },
        {
          "@type": "Article",
          "@id": `${DOMAIN}/download/#app-article-2`,
          "headline": "2-Hour Automated Fuel Rate Push Notifications: Why Fleet Managers Rely on Zyphuel",
          "description": "How Zyphuel's built-in 2-hour push notification engine delivers official OGRA price updates and live market rate tracking directly to Android lock screens.",
          "image": `${DOMAIN}/images/3.jpeg`,
          "datePublished": "2026-09-02T00:00:00+05:00",
          "dateModified": "2026-09-02T00:00:00+05:00",
          "author": {
            "@type": "Organization",
            "name": "Zyphuel Telemetry Engineering"
          },
          "publisher": { "@id": `${DOMAIN}/#organization` }
        },
        {
          "@type": "Article",
          "@id": `${DOMAIN}/download/#app-article-3`,
          "headline": "Commercial Generator Refueling & Sealed LPG Gas Cylinder Refills in Lahore",
          "description": "Eliminate power outage downtime in factories, hospitals, and corporate plazas with scheduled generator diesel refills and safety-tested LPG cylinder deliveries.",
          "image": `${DOMAIN}/images/2.jpeg`,
          "datePublished": "2026-09-02T00:00:00+05:00",
          "dateModified": "2026-09-02T00:00:00+05:00",
          "author": {
            "@type": "Person",
            "name": "Adil Farooq"
          },
          "publisher": { "@id": `${DOMAIN}/#organization` }
        },
        {
          "@type": "FAQPage",
          "@id": `${DOMAIN}/download/#faq`,
          "mainEntity": [
            {
              "@type": "Question",
              "name": `Is the Zyphuel APK v${APP_VERSION} safe to download and install?`,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": `Yes, absolutely. The Zyphuel Android Application package (v${APP_VERSION}, ${APP_SIZE}) is safe, verified, and free from any malware. It is compiled and digitally signed by our engineering team. We recommend downloading the APK directly from our official portal to ensure you get the genuine, unaltered app.`
              }
            },
            {
              "@type": "Question",
              "name": "How do the 2-hour market fuel price notifications work?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Following OGRA's implementation of the daily fuel pricing mechanism based on international Platts benchmarks, the app monitors official price updates and sends automated lock-screen notifications every 2 hours, so drivers and fleet managers can lock current rates before depot price adjustments take effect."
              }
            },
            {
              "@type": "Question",
              "name": "How does Zyphuel ensure volumetric accuracy and prevent short-fueling?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Every micro-refueler bowser is equipped with positive-displacement electronic flow meters calibrated to 0.01L precision with automatic 15°C temperature compensation. The meter streams the live dispensing volume to your smartphone screen, followed by an immutable digital QR/barcoded receipt."
              }
            },
            {
              "@type": "Question",
              "name": "Which areas of Lahore are covered by the mobile app?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The Zyphuel app uses automated GPS coordinate detection covering all major Lahore zones including DHA Phase 1–9, Gulberg, Johar Town, Model Town, Green Town, Bahria Town, Faisal Town, Cantt, and surrounding industrial corridors, with average 45-minute dispatch."
              }
            },
            {
              "@type": "Question",
              "name": "Can I pay with Cash on Delivery (COD) or mobile Online Payments?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Household fuel orders from 5 to 10 Litres can be paid via Cash on Delivery. Riders also carry instant QR codes for on-the-spot online payments via JazzCash, Easypaisa, NayaPay, and Raast / bank transfer. For commercial generator refueling and corporate fleet accounts, we support bank transfers and structured 15/30-day corporate billing."
              }
            },
            {
              "@type": "Question",
              "name": "Why is the app distributed via direct APK instead of Google Play?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The APK is distributed directly to enable rapid deployment of logistics features, real-time GPS updates, and telemetry sync without store review delays. The official Google Play Store listing is launching soon."
              }
            },
            {
              "@type": "Question",
              "name": "When will the iOS App Store version be available?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The iOS version is in active development. In the meantime, iPhone users can order through the fully responsive web platform at https://zyphuel.netlify.app/order/."
              }
            }
          ]
        }
      ]
    }
  },
  {
    path: '/order/',
    outFile: 'dist/order/index.html',
    title: "Order Fuel Online in Lahore | Doorstep Petrol & Diesel Booking Portal | Zyphuel",
    description: "Book verified Euro-V petrol, high-octane 97, and generator diesel delivery online in Lahore with Zyphuel. Fast 45 min dispatch, 5L–15L Max capacity, Cash on Delivery (COD) & digital meters.",
    keywords: "order fuel online Lahore, book petrol delivery Lahore, order diesel Lahore, online fuel ordering Lahore, doorstep petrol delivery booking, generator diesel order, petrol cash on delivery Lahore, Zyphuel fuel booking, order petrol online near me, buy petrol online Lahore, fuel home delivery near me, doorstep fuel delivery cost, can I buy petrol online in Pakistan, 24/7 fuel delivery Lahore",
    canonical: `${DOMAIN}/order/`,
    ogImage: `${DOMAIN}/images/tank.png`,
    ogType: 'website',
    schema: {
      "@graph": [
        WEBSITE_SCHEMA,
        ORGANIZATION_SCHEMA,
        LOCAL_BUSINESS_SCHEMA,
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${DOMAIN}/` },
            { "@type": "ListItem", "position": 2, "name": "Order Fuel", "item": `${DOMAIN}/order/` }
          ]
        },
        {
          "@type": "OrderAction",
          "@id": `${DOMAIN}/order/#action`,
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${DOMAIN}/order/`,
            "actionPlatform": [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform"
            ]
          },
          "object": {
            "@type": "DeliveryService",
            "name": "Zyphuel Mobile Refueling - Diesel & Petrol Delivery",
            "serviceType": "On-Demand Doorstep Fuel Delivery",
            "description": "On-demand doorstep fuel delivery in Lahore with certified digital flow-meter calibration. Super petrol, diesel, and high-octane 97.",
            "image": `${DOMAIN}/images/tank.png`,
            "provider": { "@id": `${DOMAIN}/#organization` },
            "areaServed": {
              "@type": "City",
              "name": "Lahore"
            }
          },
          "agent": { "@id": `${DOMAIN}/#organization` }
        },
        {
          "@type": "HowTo",
          "@id": `${DOMAIN}/order/#howto`,
          "name": "How to Order Petrol and Diesel Delivery Online in Lahore with Zyphuel",
          "description": "Step-by-step instructions for scheduling doorstep petrol or diesel refueling in Lahore with calibrated 0.01L digital meters and 45-minute dispatch.",
          "totalTime": "PT2M",
          "estimatedCost": {
            "@type": "MonetaryAmount",
            "currency": "PKR",
            "value": "300"
          },
          "step": [
            {
              "@type": "HowToStep",
              "position": 1,
              "name": "Select Fuel Grade",
              "text": "Choose your required fuel type: Super Euro-V Petrol (92 Octane), High-Octane 97 (HOBC), or Euro-V Commercial Diesel.",
              "url": `${DOMAIN}/order/#step-fuel-type`
            },
            {
              "@type": "HowToStep",
              "position": 2,
              "name": "Select Refueling Target Application",
              "text": "Choose your receiving asset: Car / Sedan / SUV, Motorbike / Scooter, Standby Generator, or Commercial Machinery.",
              "url": `${DOMAIN}/order/#step-refuel-target`
            },
            {
              "@type": "HowToStep",
              "position": 3,
              "name": "Select Delivery Volume (5L to 15L Max)",
              "text": "Choose a preset volume chip (5L, 7L, 10L, 12L, or 15L Max) or enter an exact quantity between 5 Litres minimum and 15 Litres maximum.",
              "url": `${DOMAIN}/order/#step-volume`
            },
            {
              "@type": "HowToStep",
              "position": 4,
              "name": "Enter Lahore Address & Dispatch Priority",
              "text": "Provide your delivery address in Lahore, select Simple (Within 45 mins, Rs. 300 for 5–10L, dynamic surge for 11–15L) or Urgent (+Rs. 100) priority, choose payment mode (COD or instant QR Online Payments), and submit.",
              "url": `${DOMAIN}/order/#step-address`
            }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": `${DOMAIN}/order/#faq`,
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How can I order diesel or petrol online in Lahore?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Choose your required fuel grade (Super Petrol, High-Octane 97, or Euro-V Diesel), select your refueling target asset, set your quantity (5L to 15L Max), enter your delivery address in Lahore, and select your delivery speed. Our dispatcher routes the nearest certified bowser to your location."
              }
            },
            {
              "@type": "Question",
              "name": "What is the minimum quantity for doorstep diesel delivery?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "You can order from 5 liters minimum up to 15 liters maximum per doorstep fuel order on the checkout portal with calibrated flow metering."
              }
            },
            {
              "@type": "Question",
              "name": "Is Cash on Delivery (COD) supported?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Cash on Delivery (COD) is supported for domestic orders from 5 to 10 liters of fuel. If you don't have cash ready, riders carry instant QR codes for mobile wallets (JazzCash, Easypaisa, NayaPay, Raast). Orders from 11L to 15L require advance payment, and corporate invoicing is available for commercial clients."
              }
            },
            {
              "@type": "Question",
              "name": "Are Zyphuel fuel supplies OGRA certified and Euro-V compliant?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "100% of Zyphuel fuel supplies are sourced from licensed primary oil marketing depots, strictly compliant with official OGRA regulations and Euro-V environmental standards."
              }
            },
            {
              "@type": "Question",
              "name": "How long does Zyphuel take to deliver fuel in Lahore?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Standard doorstep dispatch arrives within 45 minutes anywhere in covered Lahore areas, and Urgent priority dispatch arrives in 10–20 minutes for a +Rs. 100.00 surcharge. A live countdown runs from order confirmation, with online order intake daily from 8:00 AM to 10:00 PM PKT."
              }
            },
            {
              "@type": "Question",
              "name": "Can I order fuel for a standby generator or commercial machinery?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Choose one of four refueling targets — Car/Sedan/SUV, Motorbike/Scooter, Standby Generator, or Commercial Machinery. Doorstep orders cover 5–15 litres; larger generator or commercial requirements beyond 15 litres are supplied through scheduled B2B bowsers via our corporate desk."
              }
            }
          ]
        }
      ]
    }
  },
  {
    path: '/contact/',
    outFile: 'dist/contact/index.html',
    title: "Contact Zyphuel | Fuel Delivery Support in Lahore",
    description: "Reach Zyphuel for fuel orders, generator diesel, and commercial fleet accounts in Lahore. Call, WhatsApp, or send an enquiry — support available 24/7 in English and Urdu.",
    keywords: "Contact Zyphuel, fuel delivery helpline Lahore, diesel supplier contact Lahore, fleet fuel account Pakistan, generator diesel enquiry, Zyphuel support, emergency fuel delivery Lahore, 24/7 fuel delivery Pakistan, fuel delivery WhatsApp number, Zyphuel WhatsApp number, petrol delivery contact number Lahore, fuel delivery customer care",
    canonical: `${DOMAIN}/contact/`,
    ogImage: `${DOMAIN}/images/logo.png`,
    ogType: 'website',
    schema: {
      "@graph": [
        WEBSITE_SCHEMA,
        ORGANIZATION_SCHEMA,
        LOCAL_BUSINESS_SCHEMA,
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${DOMAIN}/` },
            { "@type": "ListItem", "position": 2, "name": "Contact", "item": `${DOMAIN}/contact/` }
          ]
        },
        {
          "@type": "ContactPage",
          "@id": `${DOMAIN}/contact/#contactpage`,
          "url": `${DOMAIN}/contact/`,
          "name": "Contact Zyphuel Helpline & Support",
          "mainEntity": {
            "@type": "ContactPoint",
            "telephone": "+923230112464",
            "email": "m.daniyalkhan490@gmail.com",
            "contactType": "Customer Support & Fleet Inquiries",
            "areaServed": "PK",
            "availableLanguage": ["English", "Urdu"]
          }
        },
        {
          "@type": "FAQPage",
          "@id": `${DOMAIN}/contact/#faq`,
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How do I contact Zyphuel for urgent fuel dispatch in Lahore?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "For emergency fuel dispatch, message or call our 24/7 hotline at +92 3230-112464 with your live WhatsApp location pin. You can also order directly via our online order portal or Android app for rapid arrival within 45 minutes."
              }
            },
            {
              "@type": "Question",
              "name": "What are Zyphuel's customer support and delivery operating hours?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our doorstep mobile refueling fleet operates across all Lahore sectors during business hours (Mon–Thu 8AM–8PM, Fri 8AM–1PM, Sat–Sun 10AM–6PM). Corporate office and billing desk hours are Monday–Thursday 8:00 AM–8:00 PM, Friday 8:00 AM–1:00 PM, and Saturday–Sunday 10:00 AM–6:00 PM."
              }
            },
            {
              "@type": "Question",
              "name": "Where is Zyphuel's corporate office located in Lahore?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zyphuel's registered headquarters is located at Lahore, Pakistan. Corporate client visits and supplier consultations are held by appointment."
              }
            },
            {
              "@type": "Question",
              "name": "Can corporate clients setup bulk commercial credit accounts?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Commercial clients, fleet operators, and industrial generator owners can apply for corporate accounts featuring monthly consolidated billing, computerized consumption telemetry, and pre-scheduled emergency deliveries."
              }
            }
          ]
        }
      ]
    }
  },
  {
    path: '/privacy/',
    outFile: 'dist/privacy/index.html',
    title: "Privacy Policy | Zyphuel Fuel Delivery",
    description: "How Zyphuel collects, uses, and protects your personal data when you order fuel delivery in Lahore through our website and Android app.",
    keywords: "Zyphuel privacy policy, data protection, user security, Android app permissions, Lahore privacy standards",
    canonical: `${DOMAIN}/privacy/`,
    ogImage: `${DOMAIN}/images/logo.png`,
    ogType: 'website',
    schema: {
      "@graph": [
        WEBSITE_SCHEMA,
        ORGANIZATION_SCHEMA,
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${DOMAIN}/` },
            { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": `${DOMAIN}/privacy/` }
          ]
        },
        {
          "@type": "WebPage",
          "@id": `${DOMAIN}/privacy/#webpage`,
          "url": `${DOMAIN}/privacy/`,
          "name": "Privacy Policy - Zyphuel",
          "description": "Zyphuel data privacy policy and data security standards for users in Pakistan and globally."
        }
      ]
    }
  },
  {
    path: '/terms/',
    outFile: 'dist/terms/index.html',
    title: "Terms of Use | Zyphuel Fuel Delivery",
    description: "The terms that govern your use of the Zyphuel website and Android app for fuel delivery in Lahore, including orders, payment, delivery, and dispute resolution.",
    keywords: "Terms of use, service contract, fuel order terms, cancellation rules, Zyphuel legal terms",
    canonical: `${DOMAIN}/terms/`,
    ogImage: `${DOMAIN}/images/logo.png`,
    ogType: 'website',
    schema: {
      "@graph": [
        WEBSITE_SCHEMA,
        ORGANIZATION_SCHEMA,
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${DOMAIN}/` },
            { "@type": "ListItem", "position": 2, "name": "Terms of Use", "item": `${DOMAIN}/terms/` }
          ]
        },
        {
          "@type": "WebPage",
          "@id": `${DOMAIN}/terms/#webpage`,
          "url": `${DOMAIN}/terms/`,
          "name": "Terms of Use - Zyphuel",
          "description": "Terms of use and service agreement for Zyphuel fuel delivery and digital logistics platform."
        }
      ]
    }
  },
  {
    path: '/blog/',
    outFile: 'dist/blog/index.html',
    title: "Zyphuel Blog | Fuel Delivery, Energy & Vehicle Guides",
    description: "Read the latest articles about fuel delivery, generator refueling, LPG gas delivery, and mobile energy logistics in Lahore, Pakistan.",
    keywords: "fuel delivery blog, diesel delivery articles, generator refueling guide, Lahore fuel news, Zyphuel blog, petrol price in Pakistan today, diesel price today Pakistan, OGRA fuel price update, fuel price news Pakistan, load shedding generator fuel, high octane petrol price Pakistan",
    canonical: `${DOMAIN}/blog/`,
    ogImage: `${DOMAIN}/images/logo.png`,
    ogType: 'website',
    schema: {
      "@graph": [
        WEBSITE_SCHEMA,
        ORGANIZATION_SCHEMA,
        LOCAL_BUSINESS_SCHEMA,
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${DOMAIN}/` },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${DOMAIN}/blog/` }
          ]
        },
        ...ARTICLES_SCHEMA
      ]
    }
  },
  {
    path: '/404.html',
    outFile: 'dist/404.html',
    title: "Page Not Found (404) | Zyphuel",
    description: "The page you are looking for could not be found. Return to Zyphuel homepage or browse fuel delivery services in Lahore.",
    keywords: "404 not found, Zyphuel",
    canonical: `${DOMAIN}/404.html`,
    ogImage: `${DOMAIN}/images/logo.png`,
    ogType: 'website',
    noIndex: true,
    schema: {
      "@type": "WebPage",
      "name": "Page Not Found - Zyphuel",
      "url": `${DOMAIN}/404.html`
    }
  },
  ...articles.map(article => {
    const toISO = (dateStr) => {
      const d = new Date(dateStr)
      return isNaN(d.getTime()) ? dateStr : d.toISOString().split('T')[0]
    }
    const articleGraph = [
      WEBSITE_SCHEMA,
      ORGANIZATION_SCHEMA,
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${DOMAIN}/` },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${DOMAIN}/blog/` },
          { "@type": "ListItem", "position": 3, "name": article.title, "item": `${DOMAIN}/blog/${article.slug}/` }
        ]
      },
      {
        "@type": article.category.includes('App') || article.slug.includes('telemetry') || article.slug.includes('benchmarks') ? "TechArticle" : "Article",
        "@id": `${DOMAIN}/blog/${article.slug}/#article`,
        "headline": article.title,
        "description": article.summary,
        "image": article.image,
        "datePublished": toISO(article.date),
        "dateModified": "2026-09-27T00:00:00+05:00",
        "author": {
          "@type": article.author.includes('CEO') || article.author.includes('Founder') ? "Person" : "Organization",
          "name": article.author
        },
        "publisher": {
          "@id": `${DOMAIN}/#organization`
        },
        "mainEntityOfPage": `${DOMAIN}/blog/${article.slug}/`,
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": [".article-takeaways-box", ".article-lead-summary", ".article-header h1"]
        }
      }
    ]

    if (article.faqs && article.faqs.length > 0) {
      articleGraph.push({
        "@type": "FAQPage",
        "@id": `${DOMAIN}/blog/${article.slug}/#faq`,
        "mainEntity": article.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      })
    }

    return {
      path: `/blog/${article.slug}/`,
      outFile: `dist/blog/${article.slug}/index.html`,
      title: `${article.title} | Zyphuel Blog`,
      description: article.summary,
      keywords: `${article.tags.join(', ')}, fuel delivery Lahore, diesel delivery Lahore, Zyphuel`,
      canonical: `${DOMAIN}/blog/${article.slug}/`,
      ogImage: article.image || `${DOMAIN}/images/logo.png`,
      ogType: 'article',
      schema: {
        "@graph": articleGraph
      }
    }
  })
]

async function prerender() {
  console.log('🚀 Starting Zyphuel Static Site Generation (SSG) Pre-rendering...')

  // Load client template
  const templatePath = toAbsolute('dist/index.html')
  if (!fs.existsSync(templatePath)) {
    throw new Error('dist/index.html not found. Run client build first.')
  }
  const baseTemplate = fs.readFileSync(templatePath, 'utf-8')

  // Load SSR bundle
  const ssrPath = toAbsolute('dist-ssr/entry-server.js')
  if (!fs.existsSync(ssrPath)) {
    throw new Error('dist-ssr/entry-server.js not found. Run SSR build first.')
  }
  const { render } = await import(pathToFileURL(ssrPath).href)

  for (const route of ROUTES) {
    console.log(`⚡ Pre-rendering: ${route.path} -> ${route.outFile}`)

    // Render React tree to HTML
    let appHtml = ''
    try {
      appHtml = await render(route.path)
    } catch (err) {
      console.error(`❌ Failed to render route ${route.path}:`, err)
      throw err
    }

    // Build route-specific head tags
    let html = baseTemplate

    // Replace Title
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${route.title}</title>`)

    // Replace Description
    html = html.replace(
      /<meta\s+name=["']description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta name="description" content="${route.description.replace(/"/g, '&quot;')}" />`
    )

    // Replace Keywords
    html = html.replace(
      /<meta\s+name=["']keywords["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta name="keywords" content="${route.keywords.replace(/"/g, '&quot;')}" />`
    )

    // Replace Canonical & Inject Static Hreflang Tags (Canonical + x-default + en + en-PK)
    const canonicalAndHreflang = route.noIndex ? '' : `<link rel="canonical" href="${route.canonical}" />
    <link rel="alternate" hreflang="x-default" href="${route.canonical}" />
    <link rel="alternate" hreflang="en" href="${route.canonical}" />
    <link rel="alternate" hreflang="en-PK" href="${route.canonical}" />`

    html = html.replace(
      /<link\s+rel=["']canonical["'][\s\S]*?<link\s+rel=["']alternate["']\s+hreflang=["']en-PK["']\s+href=["'][^"']*["']\s*\/?>/i,
      canonicalAndHreflang
    )

    // Replace image_src
    html = html.replace(
      /<link\s+rel=["']image_src["']\s+href=["'][\s\S]*?["']\s*\/?>/i,
      `<link rel="image_src" href="${route.ogImage}" />`
    )

    // Replace Open Graph Tags
    html = html.replace(
      /<meta\s+property=["']og:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:title" content="${route.title.replace(/"/g, '&quot;')}" />`
    )
    html = html.replace(
      /<meta\s+property=["']og:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:description" content="${route.description.replace(/"/g, '&quot;')}" />`
    )
    html = html.replace(
      /<meta\s+property=["']og:url["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:url" content="${route.canonical}" />`
    )
    html = html.replace(
      /<meta\s+property=["']og:image["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:image" content="${route.ogImage}" />`
    )
    html = html.replace(
      /<meta\s+property=["']og:image:secure_url["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:image:secure_url" content="${route.ogImage}" />`
    )

    const ogImgExt = route.ogImage.match(/\.(jpeg|jpg)$/i) ? 'image/jpeg' : 'image/png'
    html = html.replace(
      /<meta\s+property=["']og:image:type["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:image:type" content="${ogImgExt}" />`
    )

    html = html.replace(
      /<meta\s+property=["']og:type["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:type" content="${route.ogType || 'website'}" />`
    )

    // Handle noIndex routes (e.g. 404 page)
    if (route.noIndex) {
      html = html.replace(
        /<meta\s+name=["']robots["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
        '<meta name="robots" content="noindex, follow" />'
      )
      html = html.replace(
        /<meta\s+name=["']googlebot["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
        '<meta name="googlebot" content="noindex, follow" />'
      )
    }

    // Replace Twitter Tags
    html = html.replace(
      /<meta\s+name=["']twitter:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta name="twitter:title" content="${route.title.replace(/"/g, '&quot;')}" />`
    )
    html = html.replace(
      /<meta\s+name=["']twitter:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta name="twitter:description" content="${route.description.replace(/"/g, '&quot;')}" />`
    )
    html = html.replace(
      /<meta\s+name=["']twitter:image["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta name="twitter:image" content="${route.ogImage}" />`
    )
    html = html.replace(
      /<meta\s+name=["']twitter:url["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta name="twitter:url" content="${route.canonical}" />`
    )

    // Replace JSON-LD Schema
    const schemaJson = JSON.stringify({
      "@context": "https://schema.org",
      ...route.schema
    }, null, 2)

    html = html.replace(
      /<script\s+type=["']application\/ld\+json["'](?:\s+id=["'][^"']*["'])?>[\s\S]*?<\/script>/i,
      `<script type="application/ld+json" id="seo-schema">\n${schemaJson}\n    </script>`
    )

    // Strip Home-only hero animation preload on non-home pages to eliminate browser preload warnings
    if (route.path !== '/') {
      html = html.replace(
        /\s*<link\s+rel=["']preload["']\s+as=["']image["']\s+href=["']\/ezgif-2f1a39c97e5b173b-jpg\/ezgif-frame-001\.jpg["'][^>]*\/?>/i,
        ''
      )
    }

    // Inject Pre-rendered App Content into <div id="root">
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    )

    // Ensure output directory exists
    const outPath = toAbsolute(route.outFile)
    const outDir = path.dirname(outPath)
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true })
    }

    fs.writeFileSync(outPath, html, 'utf-8')
    console.log(`✅ Saved ${route.outFile} (${Buffer.byteLength(html, 'utf-8')} bytes)`)
  }

  // Dynamically generate XML sitemap from canonical routes (Pakistan local date UTC+5)
  const today = new Date(Date.now() + 5 * 3600 * 1000).toISOString().split('T')[0]
  const sitemapUrls = ROUTES
    .filter(r => !r.noIndex)
    .map(r => {
      let priority = '0.8'
      let changefreq = 'weekly'
      let lastmod = lastModifiedForRoute(r.path, today)
      let imageLoc = ''
      let imageTitle = ''
      let imageCaption = ''

      if (r.path === '/') {
        priority = '1.0'
        changefreq = 'daily'
        imageLoc = `${DOMAIN}/images/logo.png`
        imageTitle = 'Zyphuel - Doorstep Fuel Delivery in Lahore'
        imageCaption = 'Doorstep petrol and diesel delivery in Lahore with 0.01L calibrated electronic positive-displacement flow meters.'
      } else if (r.path === '/order/') {
        priority = '0.9'
        changefreq = 'daily'
        imageLoc = `${DOMAIN}/images/tank.png`
        imageTitle = 'Order Fuel Online in Lahore - Zyphuel'
        imageCaption = 'Online doorstep fuel ordering portal in Lahore with 45-minute dispatch SLA.'
      } else if (r.path === '/services/') {
        priority = '0.9'
        changefreq = 'daily'
        imageLoc = `${DOMAIN}/images/fuel.png`
        imageTitle = 'Zyphuel Fuel Delivery Services in Lahore'
        imageCaption = 'Comprehensive fuel delivery services: Super Euro-V Petrol, High-Octane 97, and Generator Diesel.'
      } else if (r.path === '/contact/') {
        priority = '0.9'
        changefreq = 'daily'
        imageLoc = `${DOMAIN}/images/logo.png`
        imageTitle = 'Contact Zyphuel Customer Support'
        imageCaption = 'Contact Zyphuel 24/7 emergency fuel delivery dispatch and customer support in Lahore.'
      } else if (r.path === '/about/') {
        priority = '0.9'
        changefreq = 'daily'
        imageLoc = `${DOMAIN}/images/daniyal.jpeg`
        imageTitle = 'About Zyphuel - Founder & Leading Web Developer Muhammad Daniyal'
        imageCaption = 'About Zyphuel - Founder & Leading Web Developer Muhammad Daniyal and the calibrated mobile refueling fleet.'
      } else if (r.path === '/download/') {
        priority = '0.9'
        changefreq = 'daily'
        imageLoc = `${DOMAIN}/images/1.jpeg`
        imageTitle = 'Download Zyphuel Android App'
        imageCaption = `Download Zyphuel Android APK v${APP_VERSION} with real-time GPS tracking and 60-second checkout.`
      } else if (r.path === '/blog/') {
        priority = '0.9'
        changefreq = 'daily'
        imageLoc = `${DOMAIN}/images/logo.png`
        imageTitle = 'Zyphuel Energy & Fuel Guides Blog'
        imageCaption = 'Guides on doorstep fuel delivery, standby generator refueling, LPG cylinder delivery and mobile energy logistics in Lahore.'
      } else if (r.path.startsWith('/blog/') && r.path !== '/blog/') {
        priority = '0.8'
        changefreq = 'weekly'
        const slug = r.path.replace(/^\/blog\//, '').replace(/\/$/, '')
        const article = articles.find(a => a.slug === slug)
        if (article) {
          if (article.image) {
            imageLoc = article.image
            imageTitle = article.title
            imageCaption = article.summary
          }
          if (article.date) {
            try {
              const d = new Date(article.date)
              if (!isNaN(d.getTime())) {
                // Format in the build machine's local calendar day. Using toISOString() here
                // shifted every article date back one day on UTC+5 build hosts.
                const pad = (n) => String(n).padStart(2, '0')
                lastmod = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
              }
            } catch (e) {}
          }
        }
      } else if (r.path === '/privacy/' || r.path === '/terms/') {
        priority = '0.7'
        changefreq = 'monthly'
      }

      const escapeXml = (str) => {
        if (!str) return ''
        return String(str)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
      }

      const escapedLoc = escapeXml(`${DOMAIN}${r.path}`)
      const escapedTitle = escapeXml(imageTitle)
      const escapedImageLoc = escapeXml(imageLoc)
      const escapedCaption = escapeXml(imageCaption)
      const imageTag = escapedImageLoc ? `\n    <image:image>\n      <image:loc>${escapedImageLoc}</image:loc>\n      <image:title>${escapedTitle}</image:title>\n      <image:caption>${escapedCaption}</image:caption>\n      <image:geo_location>Lahore, Punjab, Pakistan</image:geo_location>\n    </image:image>` : ''
      return `  <url>
    <loc>${escapedLoc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${imageTag}
  </url>`
    })
    .join('\n')

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemapUrls}
</urlset>`

  fs.writeFileSync(toAbsolute('public/sitemap.xml'), sitemapXml, 'utf-8')
  fs.writeFileSync(toAbsolute('dist/sitemap.xml'), sitemapXml, 'utf-8')
  console.log('📋 Dynamically generated & synced sitemap.xml to public/ and dist/')

  const robotsSrc = toAbsolute('public/robots.txt')
  const robotsDist = toAbsolute('dist/robots.txt')
  if (fs.existsSync(robotsSrc)) {
    fs.copyFileSync(robotsSrc, robotsDist)
    console.log('🤖 Synced robots.txt to dist/')
  }

  const feedSrc = toAbsolute('public/feed.xml')
  const feedDist = toAbsolute('dist/feed.xml')
  if (fs.existsSync(feedSrc)) {
    fs.copyFileSync(feedSrc, feedDist)
    console.log('📡 Synced feed.xml to dist/')
  }

  const llmsSrc = toAbsolute('public/llms.txt')
  const llmsDist = toAbsolute('dist/llms.txt')
  if (fs.existsSync(llmsSrc)) {
    fs.copyFileSync(llmsSrc, llmsDist)
    console.log('📄 Synced llms.txt to dist/')
  }

  const llmsFullSrc = toAbsolute('public/llms-full.txt')
  const llmsFullDist = toAbsolute('dist/llms-full.txt')
  if (fs.existsSync(llmsFullSrc)) {
    fs.copyFileSync(llmsFullSrc, llmsFullDist)
    console.log('📄 Synced llms-full.txt to dist/')
  }

  const gscSrc = toAbsolute('public/google1ab7400cf65ca469.html')
  const gscDist = toAbsolute('dist/google1ab7400cf65ca469.html')
  if (fs.existsSync(gscSrc)) {
    fs.copyFileSync(gscSrc, gscDist)
    console.log('🔍 Synced google1ab7400cf65ca469.html to dist/')
  }

  const indexNowSrc = toAbsolute('public/185084a8fa7dac10b46ec58d30c56792.txt')
  const indexNowDist = toAbsolute('dist/185084a8fa7dac10b46ec58d30c56792.txt')
  if (fs.existsSync(indexNowSrc)) {
    fs.copyFileSync(indexNowSrc, indexNowDist)
    console.log('🔑 Synced 185084a8fa7dac10b46ec58d30c56792.txt to dist/')
  }

  const adsTxtSrc = toAbsolute('public/ads.txt')
  const adsTxtDist = toAbsolute('dist/ads.txt')
  if (fs.existsSync(adsTxtSrc)) {
    fs.copyFileSync(adsTxtSrc, adsTxtDist)
    console.log('📢 Synced ads.txt to dist/')
  }

  const headersSrc = toAbsolute('public/_headers')
  const headersDist = toAbsolute('dist/_headers')
  if (fs.existsSync(headersSrc)) {
    fs.copyFileSync(headersSrc, headersDist)
    console.log('🛡️ Synced _headers to dist/')
  }

  // Clean up temporary dist-ssr directory
  const ssrDir = toAbsolute('dist-ssr')
  if (fs.existsSync(ssrDir)) {
    fs.rmSync(ssrDir, { recursive: true, force: true })
    console.log('🧹 Cleaned up temporary dist-ssr directory.')
  }

  console.log(`🎉 Static Site Generation (SSG) completed successfully for all ${ROUTES.length} routes!`)
}

prerender().catch((err) => {
  console.error('Fatal pre-render error:', err)
  process.exit(1)
})
