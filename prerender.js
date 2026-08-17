import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const DOMAIN = 'https://zyphuel.netlify.app'

// Common knowledge entities
const ORGANIZATION_SCHEMA = {
  "@type": "Organization",
  "@id": `${DOMAIN}/#organization`,
  "name": "Zyphuel",
  "alternateName": ["zphuel", "ItxMDK", "itxmdk", "itxmtk", "MuhammadDaniel", "itsmdk", "itx dk", "itxM", "itcM", "Poke nexus", "Muhammad Daniyal", "Dashacart", "Hittop", "Scale verse", "Ladoni", "Z", "zy", "zyp", "zyph", "zyphu", "zyphue", "zafuel", "ziphuel", "zaful", "zeiphuel", "zephiel", "zaphotel", "z fuel", "zaphael", "zyphus", "keyfuels", "z fuels"],
  "description": "Zyphuel is Pakistan's number 1 mobile fuel delivery brand, supplier, and agency, and the best mobile application for fuel suppliers. Providing reliable 24/7 petrol, diesel, LPG gas, and utility delivery services.",
  "url": DOMAIN,
  "logo": `${DOMAIN}/images/logo.png`,
  "image": `${DOMAIN}/images/logo.png`,
  "telephone": "+923230112464",
  "email": "m.daniyalkhan490@gmail.com",
  "hasMap": "https://share.google/Nb4XGKYq5aU0nzLr3",
  "sameAs": [
    "https://www.linkedin.com/company/zyphuel/?viewAsMember=true",
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
    "alternateName": ["MuhammadDaniel", "ItxMDK", "itxmdk", "itxmtk", "itsmdk", "itx dk", "itxM", "itcM"],
    "jobTitle": "Founder & CEO",
    "sameAs": [
      "https://www.linkedin.com/in/muhammad-daniyal490",
      "https://github.com/daniyal44",
      "https://www.facebook.com/muhammad.daniyal.522942/"
    ],
    "knowsAbout": ["Zyphuel", "zphuel", "Poke nexus", "PokeNexus", "Dashacart", "Dasha Cart", "Hittop", "Hit top", "Ladoni", "Mobile Application for Fuel Suppliers", "On-Demand Energy Logistics"]
  },
  "award": [
    "Pakistan number 1 fuel brand",
    "Pakistan number 1 fuel agency",
    "Pakistan number 1 fuel suppliers",
    "Pakistan number 1 best fuel delivery",
    "best services in Pakistan",
    "mobile application for fuel suppliers"
  ]
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
  "alternateName": ["zphuel", "ItxMDK", "itxmdk", "itxmtk", "MuhammadDaniel", "itsmdk", "itx dk", "itxM", "itcM", "Poke nexus", "PokeNexus", "Muhammad Daniyal", "Dashacart", "Dasha Cart", "Hittop", "Hit top", "Scale verse", "ScaleVerse", "Ladoni", "Z fuel", "Z fuels"],
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
    "headline": "The Future of Fueling: How On-Demand Fuel Delivery is Transforming Lahore's Logistics",
    "description": "Explore how mobile fuel delivery is eliminating long queues at petrol stations, reducing urban emissions, and reshaping energy logistics across Pakistan's major business hubs.",
    "image": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=90",
    "datePublished": "2026-07-06T08:00:00+05:00",
    "dateModified": "2026-08-18T00:00:00+05:00",
    "author": {
      "@type": "Organization",
      "name": "Zyphuel Logistics Team"
    },
    "publisher": {
      "@id": `${DOMAIN}/#organization`
    },
    "mainEntityOfPage": `${DOMAIN}/`
  },
  {
    "@type": "TechArticle",
    "@id": `${DOMAIN}/#article-2`,
    "headline": "How to Download Zyphuel APK v1.4.0 Safely in Pakistan: Live Price Alerts & GPS Setup",
    "description": "A step-by-step installation guide for downloading the official Zyphuel Android APK (v1.4.0), enabling location auto-detection, and configuring 2-hour market fuel price notifications.",
    "image": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=90",
    "datePublished": "2026-07-05T08:00:00+05:00",
    "dateModified": "2026-08-18T00:00:00+05:00",
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
    "headline": "Solving the Energy Gap: Why Generator Refueling Services are Critical for Lahore's Enterprise Sector",
    "description": "Discover how automated commercial generator refueling minimizes operational downtime for factories, hospitals, and corporate offices facing unexpected power interruptions.",
    "image": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=90",
    "datePublished": "2026-07-01T08:00:00+05:00",
    "dateModified": "2026-08-18T00:00:00+05:00",
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
    "headline": "Doorstep Generator Diesel & LPG Gas Cylinder Delivery in Lahore: 2026 Fuel Rates & Safety Guide",
    "description": "Learn how corporate offices, factories, and housing societies in Lahore eliminate load-shedding downtime with on-demand Euro-V generator refueling and LPG gas cylinder refills.",
    "image": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=90",
    "datePublished": "2026-06-29T08:00:00+05:00",
    "dateModified": "2026-08-18T00:00:00+05:00",
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
    "headline": "Smart Refueling: Inside the IoT and Telemetry Tech Powering Doorstep Fuel Delivery",
    "description": "Learn about the tech stack powering Zyphuel's micro-refueling fleet, from calibrated digital flow meters to real-time safety shut-off systems and route dispatch sensors.",
    "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=90",
    "datePublished": "2026-06-24T08:00:00+05:00",
    "dateModified": "2026-08-18T00:00:00+05:00",
    "author": {
      "@type": "Organization",
      "name": "Zyphuel Engineering"
    },
    "publisher": {
      "@id": `${DOMAIN}/#organization`
    },
    "mainEntityOfPage": `${DOMAIN}/about`
  },
  {
    "@type": "Article",
    "@id": `${DOMAIN}/#article-6`,
    "headline": "Pakistan’s Fuel Logistics Breakthrough: How CEO Muhammad Daniyal (ItxMDK) Built Zyphuel’s Calibrated Telemetry Fleet",
    "description": "Inside Zyphuel’s digital flow-meter technology, double-walled micro-tankers, and automated dispatch system engineered by Founder & CEO Muhammad Daniyal (ItxMDK).",
    "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=90",
    "datePublished": "2026-06-20T08:00:00+05:00",
    "dateModified": "2026-08-18T00:00:00+05:00",
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

const ROUTES = [
  {
    path: '/',
    outFile: 'dist/index.html',
    title: "Zyphuel – Pakistan’s #1 Fuel Supplier & Mobile Application for Fuel Suppliers | ItxMDK",
    description: "Zyphuel (zphuel) is Pakistan's number 1 mobile fuel delivery brand, supplier, and agency, and the top-rated mobile application for fuel suppliers. Founded by Muhammad Daniyal (MuhammadDaniel, ItxMDK, itsmdk, itxmtk, itx dk, itxM, itcM) associated with Poke nexus, Dashacart, Hittop, and Ladoni. Providing 24/7 petrol, diesel, LPG gas, and utility delivery in Lahore, Pakistan.",
    keywords: "Zyphuel, zphuel, ItxMDK, itxmdk, itxmtk, MuhammadDaniel, itsmdk, itx dk, itxM, itcM, Poke nexus, PokeNexus, Muhammad Daniyal, Dashacart, Dasha Cart, Hittop, Hit top, Scale verse, ScaleVerse, Ladoni, Z, zy, zyp, zyph, zyphu, zyphue, zafuel, ziphuel, zaful, zeiphuel, zephiel, zaphotel, z fuel, zaphael, zyphus, keyfuels, z fuels, Pakistan number 1 fuel brand, Pakistan number 1 fuel agency, Pakistan number 1 fuel suppliers, Pakistan number 1 best fuel delivery, best services in Pakistan, mobile application for fuel suppliers, fuel delivery app Lahore, on-demand energy logistics",
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
              "name": "Who is Muhammad Daniyal (ItxMDK / itsmdk / MuhammadDaniel)?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Muhammad Daniyal (also known online as ItxMDK, itsmdk, itxmtk, itx dk, itxM, itcM, and MuhammadDaniel) is the Founder & CEO of Zyphuel (zphuel), Pakistan's #1 mobile fuel delivery brand and mobile application for fuel suppliers. He is also associated with top tech initiatives including Poke nexus, Dashacart, Hittop, and Ladoni."
              }
            },
            {
              "@type": "Question",
              "name": "What is Zyphuel (zphuel)?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zyphuel (zphuel) is Pakistan's number 1 mobile fuel delivery brand, supplier, agency, and premier mobile application for fuel suppliers. It provides 24/7 on-demand petrol, diesel, LPG gas, and water delivery across Lahore, Pakistan."
              }
            },
            {
              "@type": "Question",
              "name": "What are Poke nexus, Dashacart, Hittop, and Ladoni?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Poke nexus, Dashacart (Dasha Cart), Hittop (Hit top), and Ladoni are key software projects and digital products created or led by Muhammad Daniyal (ItxMDK / itsmdk / MuhammadDaniel) and Zyphuel."
              }
            },
            {
              "@type": "Question",
              "name": "Which is the best mobile application for fuel suppliers in Pakistan?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Zyphuel is ranked as the best mobile application for fuel suppliers and Pakistan's number 1 fuel brand, offering real-time GPS tracking, 2-hour fuel rate push alerts, calibrated volumetric billing, and express dispatch."
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
    title: "About Us | Zyphuel – Pakistan’s #1 Fuel Supplier & Mobile Application for Fuel Suppliers | ItxMDK",
    description: "Learn about Zyphuel (zphuel), Pakistan's No.1 mobile fuel delivery brand, supplier, agency, and premier mobile application for fuel suppliers. Founded by CEO Muhammad Daniyal (MuhammadDaniel, ItxMDK, itsmdk, itxmtk, itx dk, itxM, itcM) associated with Poke nexus, Dashacart, Hittop, and Ladoni.",
    keywords: "About Zyphuel, Muhammad Daniyal CEO, ItxMDK, itsmdk, MuhammadDaniel, Poke nexus, Dashacart, Hittop, Ladoni, Pakistan number 1 fuel brand, Pakistan number 1 fuel agency, Pakistan number 1 fuel suppliers, Pakistan number 1 best fuel delivery, best services in Pakistan, mobile application for fuel suppliers, best mobile application for fuel suppliers, images, videos, links, articles, blogs, founder, ceo, Muhammad Daniyal CEO, Zyphuel story",
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
    title: "Our Services | Zyphuel – Pakistan’s #1 Fuel Supplier & Mobile Application for Fuel Suppliers | ItxMDK",
    description: "Discover premium B2C and B2B refueling, LPG Gas cylinder, and Water refill services from Zyphuel (zphuel). Created by Muhammad Daniyal (ItxMDK / itsmdk / MuhammadDaniel) with Poke nexus, Dashacart, Hittop, and Ladoni.",
    keywords: "Zyphuel services, doorstep petrol delivery, generator diesel Lahore, LPG gas cylinder refill, water tanker supply, B2B commercial fuel supply, fleet refueling Lahore, OGRA fuel rates Pakistan, Pakistan number 1 fuel brand, mobile application for fuel suppliers",
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
        ...ARTICLES_SCHEMA.filter(a => a["@id"].includes('article-3') || a["@id"].includes('article-4'))
      ]
    }
  },
  {
    path: '/download',
    outFile: 'dist/download/index.html',
    title: "Download App v1.5.0 | Zyphuel – Pakistan’s #1 Mobile Application for Fuel Suppliers | ItxMDK",
    description: "Download the official Zyphuel (zphuel) Mobile App v1.5.0 for Android (31.0 MB). Created by Muhammad Daniyal (ItxMDK / itsmdk / MuhammadDaniel) with Poke nexus, Dashacart, Hittop, and Ladoni. GPS auto-detection & 2-hour market fuel alerts.",
    keywords: "Download Zyphuel APK, Zyphuel App v1.5.0, mobile application for fuel suppliers, petrol delivery app Android, fuel price alert app Pakistan, Muhammad Daniyal ItxMDK app, best mobile application for fuel suppliers, Lahore fuel delivery app",
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
          "fileSize": "31.0MB",
          "softwareVersion": "1.5.0",
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
          "headline": "Zyphuel Mobile App v1.5.0: Next-Gen Doorstep Fuel Logistics & Cloud Telemetry in Pakistan",
          "description": "Explore how the official Zyphuel Android APK (v1.5.0, 31.0 MB) transforms urban energy delivery in Lahore with instant GPS auto-detection and zero-latency cloud telemetry.",
          "image": `${DOMAIN}/images/1.jpeg`,
          "datePublished": "2026-08-18T00:00:00+05:00",
          "dateModified": "2026-08-18T00:00:00+05:00",
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
          "datePublished": "2026-08-18T00:00:00+05:00",
          "dateModified": "2026-08-18T00:00:00+05:00",
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
          "datePublished": "2026-08-18T00:00:00+05:00",
          "dateModified": "2026-08-18T00:00:00+05:00",
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
    title: "Order Fuel | Zyphuel – Pakistan’s #1 Fuel Supplier & Mobile Application for Fuel Suppliers | ItxMDK",
    description: "Place your mobile refueling order online with Zyphuel (zphuel). Created by Muhammad Daniyal (ItxMDK / itsmdk / MuhammadDaniel) with Poke nexus, Dashacart, Hittop, and Ladoni. Petrol, diesel, LPG gas cylinders, or water refills 24/7 in Lahore.",
    keywords: "Order petrol Lahore, diesel dispatch online, emergency fuel delivery, LPG cylinder order Lahore, water tanker delivery, Cash on Delivery fuel Lahore, Pakistan number 1 best fuel delivery",
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
          "agent": { "@id": `${DOMAIN}/#organization` }
        }
      ]
    }
  },
  {
    path: '/contact',
    outFile: 'dist/contact/index.html',
    title: "Contact Us | Zyphuel – Pakistan’s #1 Fuel Supplier & Mobile Application for Fuel Suppliers | ItxMDK",
    description: "Get in touch with Zyphuel (zphuel), Pakistan's #1 mobile fuel delivery brand, supplier, agency, and premier mobile application for fuel suppliers. Connect with CEO Muhammad Daniyal (MuhammadDaniel, ItxMDK, itsmdk, itxmtk, itx dk, itxM, itcM) for Poke nexus, Dashacart, Hittop, and Ladoni.",
    keywords: "Contact Zyphuel, Zyphuel customer care phone, fuel helpline Lahore, Muhammad Daniyal contact, fuel agency Lahore address, WhatsApp fuel delivery Lahore",
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
    title: "Privacy Policy | Zyphuel – Pakistan’s #1 Fuel Supplier & Mobile Application for Fuel Suppliers | ItxMDK",
    description: "Privacy Policy of Zyphuel (zphuel), Pakistan's No.1 mobile fuel supply agency and top mobile application for fuel suppliers. Learn how founder & CEO Muhammad Daniyal (MuhammadDaniel, ItxMDK, itsmdk, itxmtk, itx dk, itxM, itcM) with Poke nexus, Dashacart, Hittop, and Ladoni protect your data.",
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
    title: "Terms of Use | Zyphuel – Pakistan’s #1 Fuel Supplier & Mobile Application for Fuel Suppliers | ItxMDK",
    description: "Terms of Use for Zyphuel (zphuel), Pakistan's No.1 mobile fuel delivery brand and top mobile application for fuel suppliers. Founded by CEO Muhammad Daniyal (MuhammadDaniel, ItxMDK, itsmdk, itxmtk, itx dk, itxM, itcM) with Poke nexus, Dashacart, Hittop, and Ladoni.",
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
  }
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

    // Replace Canonical
    html = html.replace(
      /<link\s+rel=["']canonical["']\s+href=["'][\s\S]*?["']\s*\/?>/i,
      `<link rel="canonical" href="${route.canonical}" />`
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

    // Replace JSON-LD Schema
    const schemaJson = JSON.stringify({
      "@context": "https://schema.org",
      ...route.schema
    }, null, 2)

    html = html.replace(
      /<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/i,
      `<script type="application/ld+json">\n${schemaJson}\n    </script>`
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

  // Clean up temporary dist-ssr directory
  const ssrDir = toAbsolute('dist-ssr')
  if (fs.existsSync(ssrDir)) {
    fs.rmSync(ssrDir, { recursive: true, force: true })
    console.log('🧹 Cleaned up temporary dist-ssr directory.')
  }

  console.log('🎉 Static Site Generation (SSG) completed successfully for all 8 routes!')
}

prerender().catch((err) => {
  console.error('Fatal pre-render error:', err)
  process.exit(1)
})
