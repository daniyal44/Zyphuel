import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { articles } from './src/data/articles.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const DOMAIN = 'https://zyphuel.netlify.app'

// Common knowledge entities
const ORGANIZATION_SCHEMA = {
  "@type": "Organization",
  "@id": `${DOMAIN}/#organization`,
  "name": "Zyphuel",
  "alternateName": ["zphuel"],
  "description": "Zyphuel delivers petrol and diesel to your door in Lahore, Pakistan — serving households, generator owners, and commercial fleets with calibrated metering and live GPS tracking.",
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
    "https://www.facebook.com/muhammad.daniyal.522942/"
  ],
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
  "founder": {
    "@type": "Person",
    "@id": `${DOMAIN}/#person-daniyal`,
    "name": "Muhammad Daniyal",
    "jobTitle": "Founder & CEO",
    "sameAs": [
      "https://www.linkedin.com/in/muhammad-daniyal490",
      "https://github.com/daniyal44",
      "https://www.facebook.com/muhammad.daniyal.522942/"
    ],
    "knowsAbout": ["Fuel delivery logistics", "On-demand energy delivery", "Fleet refueling"]
  }
}

const LOCAL_BUSINESS_SCHEMA = {
  "@type": "LocalBusiness",
  "@id": `${DOMAIN}/#localbusiness`,
  "name": "Zyphuel Mobile Refueling",
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
  "alternateName": ["zphuel"],
  "description": "Official website for Zyphuel (zphuel) - Pakistan's #1 fuel brand, agency, and supplier, and the premier mobile application for fuel suppliers by Muhammad Daniyal (ItxMDK / itsmdk / MuhammadDaniel).",
  "publisher": {
    "@id": `${DOMAIN}/#organization`
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${DOMAIN}/services?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
}

const ARTICLES_SCHEMA = [
  {
    "@type": "Article",
    "@id": `${DOMAIN}/#article-1`,
    "headline": "Pakistan’s Shift to Daily Fuel Pricing: How OGRA’s 2026 Reform Works & Why App Alerts Protect Consumers",
    "description": "Analyzing Pakistan’s historic transition to daily fuel pricing based on rolling 7-day international Platts benchmarks, the roadmap to full 2027 deregulation, and how Zyphuel’s 2-hour push notification engine protects motorists and fleet budgets.",
    "image": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=90",
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
    "headline": "How to Download and Install Zyphuel APK v2.3.0.1: Biometrics, Live GPS Auto-Pinning & Daily Rate Sync",
    "description": "A complete, step-by-step setup guide for the official Zyphuel Android APK (v2.3.0.1, 31.4 MB), covering biometric security checkout, GPS sector auto-detection across Lahore, and real-time bowser telemetry.",
    "image": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=90",
    "datePublished": "2026-09-05T08:00:00+05:00",
    "dateModified": "2026-09-06T00:00:00+05:00",
    "author": {
      "@type": "Organization",
      "name": "Zyphuel App Engineering"
    },
    "publisher": {
      "@id": `${DOMAIN}/#organization`
    },
    "mainEntityOfPage": `${DOMAIN}/download`
  },
  {
    "@type": "Article",
    "@id": `${DOMAIN}/#article-3`,
    "headline": "Powering Through Load-Shedding: Industrial Generator Refueling & Direct Euro-V Diesel Logistics in Lahore",
    "description": "How factories, medical plazas, IT technology parks, and high-rise commercial facilities eliminate unpredicted blackout downtime with scheduled Euro-V generator diesel replenishment.",
    "image": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=90",
    "datePublished": "2026-09-04T08:00:00+05:00",
    "dateModified": "2026-09-06T00:00:00+05:00",
    "author": {
      "@type": "Organization",
      "name": "Zyphuel Commercial Ops"
    },
    "publisher": {
      "@id": `${DOMAIN}/#organization`
    },
    "mainEntityOfPage": `${DOMAIN}/services`
  },
  {
    "@type": "Article",
    "@id": `${DOMAIN}/#article-4`,
    "headline": "Commercial Generator Diesel & Sealed LPG Cylinder Refills: 2026 Safety Standards & Doorstep Delivery in Lahore",
    "description": "A definitive safety guide on ordering certified Euro-V generator diesel, sealed LPG gas cylinders, and bulk clean water tankers directly to doorsteps across Lahore.",
    "image": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=90",
    "datePublished": "2026-09-03T08:00:00+05:00",
    "dateModified": "2026-09-06T00:00:00+05:00",
    "author": {
      "@type": "Organization",
      "name": "Zyphuel Utilities Team"
    },
    "publisher": {
      "@id": `${DOMAIN}/#organization`
    },
    "mainEntityOfPage": `${DOMAIN}/services`
  },
  {
    "@type": "TechArticle",
    "@id": `${DOMAIN}/#article-5`,
    "headline": "Combating Pump Short-Fueling: Inside Zyphuel’s Calibrated Positive-Displacement Flow Meters & Cloud Telemetry",
    "description": "An engineering breakdown of how positive-displacement electronic flow meters, 0.01L pulse encoders, and IoT cloud telemetry eliminate retail pump short-fueling and fuel adulteration.",
    "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=90",
    "datePublished": "2026-09-01T08:00:00+05:00",
    "dateModified": "2026-09-06T00:00:00+05:00",
    "author": {
      "@type": "Organization",
      "name": "Zyphuel Telemetry Engineering"
    },
    "publisher": {
      "@id": `${DOMAIN}/#organization`
    },
    "mainEntityOfPage": `${DOMAIN}/about`
  },
  {
    "@type": "Article",
    "@id": `${DOMAIN}/#article-6`,
    "headline": "Pakistan’s Mobile Energy Logistics Revolution: Founder & CEO Muhammad Daniyal (ItxMDK) on Scaling Zyphuel",
    "description": "Inside Zyphuel’s journey from Lahore’s first on-demand mobile refueler to a tech-enabled energy network, led by Founder & CEO Muhammad Daniyal (ItxMDK / itsmdk / MuhammadDaniel).",
    "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=90",
    "datePublished": "2026-08-28T08:00:00+05:00",
    "dateModified": "2026-09-06T00:00:00+05:00",
    "author": {
      "@type": "Person",
      "name": "Muhammad Daniyal (CEO)",
      "alternateName": ["ItxMDK", "itsmdk", "MuhammadDaniel"]
    },
    "publisher": {
      "@id": `${DOMAIN}/#organization`
    },
    "mainEntityOfPage": `${DOMAIN}/about`
  }
]

const RELEVANT_KEYWORDS = "Zyphuel, fuel delivery Lahore, diesel delivery Lahore, petrol delivery Lahore, mobile refueling Pakistan, doorstep fuel delivery, generator diesel delivery, bulk diesel supplier Lahore, fleet refueling service, on-demand fuel delivery app, order fuel online Lahore, diesel delivery near me, petrol delivery at home, LPG gas cylinder delivery Lahore, water tanker Lahore"

const ROUTES = [
  {
    path: '/',
    outFile: 'dist/index.html',
    title: "Diesel & Petrol Delivery in Lahore | Zyphuel Mobile Refueling",
    description: "Zyphuel delivers petrol and diesel to your door in Lahore — homes, generators, and commercial fleets. Calibrated metering, live GPS tracking, and 24/7 dispatch. Order online or on the app.",
    keywords: RELEVANT_KEYWORDS,
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
              "name": "Which areas of Lahore does Zyphuel deliver to?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zyphuel delivers petrol and diesel across Lahore, including Gulberg, DHA, Johar Town, Model Town, Bahria Town, and surrounding industrial zones. Contact us to confirm coverage for your address."
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
                "text": "Yes. Zyphuel supplies scheduled and on-demand diesel for standby generators, construction equipment, and commercial vehicle fleets, with fleet accounts available for recurring deliveries."
              }
            }
          ]
        },
        ...ARTICLES_SCHEMA
      ]
    }
  },
  {
    path: '/about',
    outFile: 'dist/about/index.html',
    title: "About Zyphuel – Lahore's Trusted Fuel Delivery Service | Our Team",
    description: "Learn about Zyphuel, Lahore's trusted doorstep fuel delivery service. Meet our team, our mission, and how we deliver petrol and diesel safely to homes, generators, and commercial fleets.",
    keywords: RELEVANT_KEYWORDS,
    canonical: `${DOMAIN}/about`,
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
            { "@type": "ListItem", "position": 2, "name": "About Us", "item": `${DOMAIN}/about` }
          ]
        },
        {
          "@type": "AboutPage",
          "@id": `${DOMAIN}/about#aboutpage`,
          "url": `${DOMAIN}/about`,
          "name": "About Zyphuel & Leadership Team",
          "mainEntity": {
            "@id": `${DOMAIN}/#organization`
          }
        },
        ...ARTICLES_SCHEMA.filter(a => a["@id"].includes('article-5') || a["@id"].includes('article-6'))
      ]
    }
  },
  {
    path: '/services',
    outFile: 'dist/services/index.html',
    title: "Doorstep Fuel Delivery Services in Lahore | Petrol & Diesel | Zyphuel",
    description: "Explore Zyphuel's 24/7 doorstep fuel delivery services across Lahore: Euro-V Super Petrol, High-Octane 97, Generator Diesel, LPG Cylinders, and Corporate Fleet Solutions with calibrated flow metering and live GPS tracking.",
    keywords: RELEVANT_KEYWORDS,
    canonical: `${DOMAIN}/services`,
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
            { "@type": "ListItem", "position": 2, "name": "Services", "item": `${DOMAIN}/services` }
          ]
        },
        {
          "@type": "Service",
          "@id": `${DOMAIN}/services#service`,
          "name": "On-Demand Doorstep Fuel & Utility Delivery",
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
                  "name": "Commercial Generator Diesel Refueling"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "LPG Gas Cylinder Refill & Doorstep Delivery"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Bulk Water Tanker Refill"
                }
              }
            ]
          }
        },
        {
          "@type": "FAQPage",
          "@id": `${DOMAIN}/services#faq`,
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What services does Zyphuel provide in Lahore?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zyphuel provides 24/7 on-demand doorstep fuel delivery including Euro-V Super Petrol (92 Octane), High-Octane 97, Euro-V Diesel for vehicles and backup generators, sealed LPG Gas Cylinder refills, and bulk potable Water Tanker delivery across Lahore."
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
                "text": "Yes. Zyphuel specializes in commercial standby generator diesel replenishment with 100-foot high-pressure hoses capable of fueling rooftop, basement, and ground-level generator tanks for corporate offices, hospitals, factories, and residential buildings."
              }
            },
            {
              "@type": "Question",
              "name": "Is Cash on Delivery (COD) supported for fuel orders?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Cash on Delivery (COD) is supported for domestic orders up to 10 liters of fuel, 10 kg LPG cylinder, or 20 gallons of water. For larger orders or corporate fleets, online bank transfers and 30-day billing accounts are available."
              }
            }
          ]
        },
        ...ARTICLES_SCHEMA.filter(a => a["@id"].includes('article-3') || a["@id"].includes('article-4'))
      ]
    }
  },
  {
    path: '/download',
    outFile: 'dist/download/index.html',
    title: "Download Zyphuel App – Order Fuel from Your Phone | Android APK",
    description: "Download the official Zyphuel Android App (v2.3.0.1, 31.4 MB). Order petrol, diesel, LPG gas delivery in Lahore. GPS auto-detection, live fuel prices, and 2-hour OGRA rate alerts.",
    keywords: "Download Zyphuel APK, Zyphuel App v2.3.0.1, mobile application for fuel suppliers, petrol delivery app Android, fuel price alert app Pakistan, Muhammad Daniyal ItxMDK app, best mobile application for fuel suppliers, Lahore fuel delivery app",
    canonical: `${DOMAIN}/download`,
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
            { "@type": "ListItem", "position": 2, "name": "Download App", "item": `${DOMAIN}/download` }
          ]
        },
        {
          "@type": "SoftwareApplication",
          "@id": `${DOMAIN}/download#app`,
          "name": "Zyphuel Mobile Application for Fuel Suppliers",
          "operatingSystem": "Android 8.0 and above",
          "applicationCategory": "BusinessApplication, UtilitiesApplication",
          "downloadUrl": `${DOMAIN}/APK/Zyphuel.apk`,
          "fileSize": "31.4MB",
          "softwareVersion": "2.3.0.1",
          "author": { "@id": `${DOMAIN}/#organization` },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "PKR"
          }
        },
        {
          "@type": "Article",
          "@id": `${DOMAIN}/download#app-article-1`,
          "headline": "Zyphuel Mobile App v2.3.0.1: Next-Gen Doorstep Fuel Logistics & Cloud Telemetry in Pakistan",
          "description": "Explore how the official Zyphuel Android APK (v2.3.0.1, 31.4 MB) transforms urban energy delivery in Lahore with instant GPS auto-detection and zero-latency cloud telemetry.",
          "image": `${DOMAIN}/images/1.jpeg`,
          "datePublished": "2026-09-02T00:00:00+05:00",
          "dateModified": "2026-09-02T00:00:00+05:00",
          "author": {
            "@type": "Person",
            "name": "Muhammad Daniyal",
            "alternateName": ["ItxMDK", "itsmdk", "MuhammadDaniel"]
          },
          "publisher": { "@id": `${DOMAIN}/#organization` }
        },
        {
          "@type": "Article",
          "@id": `${DOMAIN}/download#app-article-2`,
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
          "@id": `${DOMAIN}/download#app-article-3`,
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
        }
      ]
    }
  },
  {
    path: '/order',
    outFile: 'dist/order/index.html',
    title: "Order Diesel & Petrol Online | Doorstep Fuel Delivery Lahore | Zyphuel",
    description: "Order petrol, diesel, LPG gas cylinders, or water refills online with Zyphuel. 24/7 doorstep delivery in Lahore with calibrated metering and live GPS tracking.",
    keywords: "diesel, diesel delivery Lahore, order diesel Lahore, petrol and diesel, patrol and diesel, diesel gasoline, i want diesel, generator diesel order, Order petrol Lahore, diesel dispatch online, emergency fuel delivery, LPG cylinder order Lahore, water tanker delivery, Cash on Delivery fuel Lahore, Pakistan number 1 best fuel delivery",
    canonical: `${DOMAIN}/order`,
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
            { "@type": "ListItem", "position": 2, "name": "Order Fuel", "item": `${DOMAIN}/order` }
          ]
        },
        {
          "@type": "OrderAction",
          "@id": `${DOMAIN}/order#action`,
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${DOMAIN}/order`,
            "actionPlatform": [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform"
            ]
          },
          "object": {
            "@type": "Product",
            "name": "Zyphuel Mobile Refueling - Diesel & Petrol Delivery",
            "description": "On-demand doorstep fuel and utility delivery in Lahore with certified digital flow-meter calibration. Super petrol, diesel, LPG cylinders, and water refills.",
            "image": `${DOMAIN}/images/tank.png`,
            "brand": {
              "@type": "Brand",
              "name": "Zyphuel"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "128",
              "bestRating": "5",
              "worstRating": "1"
            },
            "review": [
              {
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": "Hamza Tariq"
                },
                "datePublished": "2026-08-10",
                "reviewBody": "Fast and dependable doorstep diesel delivery in Lahore. Genuine fuel quality and digital flow meter ensures exact quantity.",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "5",
                  "bestRating": "5",
                  "worstRating": "1"
                }
              }
            ],
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "PKR",
              "lowPrice": "100.00",
              "highPrice": "448.00",
              "offerCount": "5"
            }
          },
          "agent": { "@id": `${DOMAIN}/#organization` }
        },
        {
          "@type": "FAQPage",
          "@id": `${DOMAIN}/order#faq`,
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How can I order diesel or petrol online in Lahore?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Choose your required fuel category (Diesel, Petrol, High-Octane, LPG Cylinder, or Water Refill) on this order page, set your quantity, enter your delivery address in Lahore, and select your delivery speed. Our dispatcher routes the nearest certified bowser to your location."
              }
            },
            {
              "@type": "Question",
              "name": "What is the minimum quantity for doorstep diesel delivery?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "You can order as little as 1 liter up to 2,000+ liters per order. Bulk orders of 50+ liters receive free delivery in covered zones in Lahore."
              }
            },
            {
              "@type": "Question",
              "name": "Is Cash on Delivery (COD) supported?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Cash on Delivery (COD) is supported for domestic orders (up to 10 liters of fuel, 10 kg LPG, or 20 gallons of water). Bank transfers and corporate invoicing are available for commercial clients."
              }
            },
            {
              "@type": "Question",
              "name": "Are Zyphuel fuel supplies OGRA certified and Euro-V compliant?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "100% of Zyphuel fuel supplies are sourced from licensed primary oil marketing depots, strictly compliant with official OGRA regulations and Euro-V environmental standards."
              }
            }
          ]
        }
      ]
    }
  },
  {
    path: '/contact',
    outFile: 'dist/contact/index.html',
    title: "Contact Zyphuel – 24/7 Fuel Delivery Support in Lahore",
    description: "Get in touch with Zyphuel for fuel delivery inquiries, fleet accounts, and customer support in Lahore. Call, WhatsApp, or email us 24/7.",
    keywords: "Contact Zyphuel, diesel delivery contact, fuel helpline Lahore, Muhammad Daniyal contact, fuel agency Lahore address, WhatsApp fuel delivery Lahore",
    canonical: `${DOMAIN}/contact`,
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
            { "@type": "ListItem", "position": 2, "name": "Contact", "item": `${DOMAIN}/contact` }
          ]
        },
        {
          "@type": "ContactPage",
          "@id": `${DOMAIN}/contact#contactpage`,
          "url": `${DOMAIN}/contact`,
          "name": "Contact Zyphuel Helpline & Support",
          "mainEntity": {
            "@type": "ContactPoint",
            "telephone": "+923230112464",
            "email": "m.daniyalkhan490@gmail.com",
            "contactType": "Customer Support & Fleet Inquiries",
            "areaServed": "PK",
            "availableLanguage": ["English", "Urdu"]
          }
        }
      ]
    }
  },
  {
    path: '/privacy-policy',
    outFile: 'dist/privacy-policy/index.html',
    title: "Privacy Policy | Zyphuel Fuel Delivery",
    description: "Zyphuel's privacy policy. Learn how we protect your data when you order fuel delivery in Lahore through our website and Android app.",
    keywords: "Zyphuel privacy policy, data protection, user security, Android app permissions, Lahore privacy standards",
    canonical: `${DOMAIN}/privacy-policy`,
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
            { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": `${DOMAIN}/privacy-policy` }
          ]
        },
        {
          "@type": "WebPage",
          "@id": `${DOMAIN}/privacy-policy#webpage`,
          "url": `${DOMAIN}/privacy-policy`,
          "name": "Privacy Policy - Zyphuel",
          "description": "Zyphuel data privacy policy and data security standards for users in Pakistan and globally."
        }
      ]
    }
  },
  {
    path: '/terms-of-use',
    outFile: 'dist/terms-of-use/index.html',
    title: "Terms of Use | Zyphuel Fuel Delivery",
    description: "Terms of use for Zyphuel fuel delivery service. Understand our order policies, cancellation rules, and service agreements for petrol and diesel delivery in Lahore.",
    keywords: "Terms of use, service contract, fuel order terms, cancellation rules, Zyphuel legal terms",
    canonical: `${DOMAIN}/terms-of-use`,
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
            { "@type": "ListItem", "position": 2, "name": "Terms of Use", "item": `${DOMAIN}/terms-of-use` }
          ]
        },
        {
          "@type": "WebPage",
          "@id": `${DOMAIN}/terms-of-use#webpage`,
          "url": `${DOMAIN}/terms-of-use`,
          "name": "Terms of Use - Zyphuel",
          "description": "Terms of use and service agreement for Zyphuel fuel delivery and digital logistics platform."
        }
      ]
    }
  },
  {
    path: '/blog',
    outFile: 'dist/blog/index.html',
    title: "Fuel Delivery Blog & Guides | Zyphuel Lahore",
    description: "Read the latest articles and guides on doorstep fuel delivery, generator diesel replenishment, and mobile energy logistics in Lahore from Zyphuel.",
    keywords: RELEVANT_KEYWORDS,
    canonical: `${DOMAIN}/blog`,
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
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${DOMAIN}/blog` }
          ]
        },
        ...ARTICLES_SCHEMA
      ]
    }
  },
  ...articles.map(article => ({
    path: `/blog/${article.slug}`,
    outFile: `dist/blog/${article.slug}/index.html`,
    title: `${article.title} | Zyphuel Blog`,
    description: article.summary,
    keywords: `${article.tags.join(', ')}, fuel delivery Lahore, diesel delivery Lahore, Zyphuel`,
    canonical: `${DOMAIN}/blog/${article.slug}`,
    ogImage: article.image || `${DOMAIN}/images/logo.png`,
    ogType: 'article',
    schema: {
      "@graph": [
        WEBSITE_SCHEMA,
        ORGANIZATION_SCHEMA,
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${DOMAIN}/` },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${DOMAIN}/blog` },
            { "@type": "ListItem", "position": 3, "name": article.title, "item": `${DOMAIN}/blog/${article.slug}` }
          ]
        },
        {
          "@type": "Article",
          "@id": `${DOMAIN}/blog/${article.slug}#article`,
          "headline": article.title,
          "description": article.summary,
          "image": article.image,
          "datePublished": article.date,
          "dateModified": "2026-09-06T00:00:00+05:00",
          "author": {
            "@type": "Organization",
            "name": article.author
          },
          "publisher": {
            "@id": `${DOMAIN}/#organization`
          },
          "mainEntityOfPage": `${DOMAIN}/blog/${article.slug}`
        }
      ]
    }
  }))
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
  const { render } = await import(`file://${ssrPath.replace(/\\/g, '/')}`)

  for (const route of ROUTES) {
    console.log(`⚡ Pre-rendering: ${route.path} -> ${route.outFile}`)

    // Render React tree to HTML
    let appHtml = ''
    try {
      appHtml = render(route.path)
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

    // Replace Canonical & Inject Static Hreflang Tags
    const canonicalAndHreflang = `<link rel="canonical" href="${route.canonical}" />
    <link rel="alternate" hreflang="x-default" href="${route.canonical}" />
    <link rel="alternate" hreflang="en-PK" href="${route.canonical}" />
    <link rel="alternate" hreflang="en-US" href="${route.canonical}" />
    <link rel="alternate" hreflang="ur-PK" href="${route.canonical}" />`

    html = html.replace(
      /<link\s+rel=["']canonical["']\s+href=["'][\s\S]*?["']\s*\/?>/i,
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

  // Ensure sitemap.xml and robots.txt in dist are synced
  const sitemapSrc = toAbsolute('public/sitemap.xml')
  const sitemapDist = toAbsolute('dist/sitemap.xml')
  if (fs.existsSync(sitemapSrc)) {
    fs.copyFileSync(sitemapSrc, sitemapDist)
    console.log('📋 Synced sitemap.xml to dist/')
  }

  const robotsSrc = toAbsolute('public/robots.txt')
  const robotsDist = toAbsolute('dist/robots.txt')
  if (fs.existsSync(robotsSrc)) {
    fs.copyFileSync(robotsSrc, robotsDist)
    console.log('🤖 Synced robots.txt to dist/')
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
