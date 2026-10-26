import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { articles } from '../data/articles'
import BlogCard from '../components/BlogCard'
import BlogModal from '../components/BlogModal'
import Carousel3D from '../components/Carousel3D'
import ScrollAnimationSection from '../components/ScrollAnimationSection'
import HeroGraphic from '../components/HeroGraphic'
import { useSEO } from '../hooks/useSEO'
import { APP_VERSION } from '../data/appVersion'
export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [showStartupTransparency, setShowStartupTransparency] = useState(false)
  const [openHomeFaq, setOpenHomeFaq] = useState(null)

  // Canonical AEO Q&A hub — mirrors the FAQPage schema in prerender.js / index.html.
  // Order matters: brand-answer questions first (what is Zyphuel / is it safe / app),
  // then the operational questions search engines and AI assistants cite most.
  const homeFaqs = [
    {
      q: 'What is Zyphuel?',
      a: 'Zyphuel is an on-demand doorstep fuel delivery service in Lahore. It brings Euro-V petrol, High-Octane 97, or diesel to your address within 45 minutes — order 5 to 15 litres online or through the Android app and pay cash or online, without visiting a petrol pump.'
    },
    {
      q: 'What does Zyphuel do for its customers?',
      a: 'Zyphuel dispatches a calibrated micro-refueler to your location in Lahore and delivers fuel for cars, motorbikes, standby generators, and commercial machinery. Every litre is metered on a calibrated 0.01L flow meter and itemised on a QR/barcoded PDF invoice.'
    },
    {
      q: 'Is Zyphuel safe to use?',
      a: 'Yes. Zyphuel delivers only OGRA-notified Euro-V fuel from sealed, metered bowsers operated by trained dispatch staff, and every order is backed by a verifiable QR/barcode invoice plus a 24/7 WhatsApp helpline on +92 3230-112464.'
    },
    {
      q: 'Does Zyphuel have a mobile application?',
      a: "Yes. Zyphuel's Android app is available as a direct APK download with live delivery tracking and 2-hour fuel price alerts. The iOS version is in development; iPhone users can order on the website, and official Google Play and App Store listings are launching soon."
    },
    {
      q: 'Which areas of Lahore does Zyphuel deliver to?',
      a: 'Zyphuel delivers petrol and diesel across Lahore, including Gulberg, DHA, Johar Town, Model Town, Bahria Town, and surrounding industrial zones. Contact us to confirm coverage for your address.'
    },
    {
      q: 'What is the minimum fuel delivery quantity on Zyphuel?',
      a: 'The fuel delivery volume is strictly 5 Litres minimum up to 15 Litres maximum per doorstep delivery order. Customers can choose from volume chips (5, 7, 10, 12, 15L) or input custom amounts between 5L and 15L in 1-Litre increments.'
    },
    {
      q: 'What are Zyphuel delivery charges for petrol and diesel in Lahore?',
      a: 'Zyphuel charges a fixed nominal delivery fee of Rs. 300.00 for doorstep fuel orders of 5–10 Litres, delivered within 45 minutes. For high-capacity orders of 11–15 Litres, delivery fees scale linearly between Rs. 300.00 and Rs. 400.00 (+Rs. 20/L step: 11L = Rs. 320, 12L = Rs. 340, 13L = Rs. 360, 14L = Rs. 380, 15L = Rs. 400 Max). There is one delivery speed only: every order is dispatched within 45 minutes, with no express tier and no priority surcharge.'
    },
    {
      q: 'How do I order fuel from Zyphuel?',
      a: 'Place an order through the website order page or the Zyphuel Android app. Pin your location, choose petrol or diesel and the quantity you need, and a refueling unit is dispatched to you.'
    },
    {
      q: 'How is the fuel quantity measured?',
      a: 'Every delivery uses a calibrated digital flow meter. You receive an itemised invoice showing the exact litres dispensed and the rate applied.'
    },
    {
      q: 'Does Zyphuel serve commercial fleets and generators?',
      a: 'Yes. Zyphuel supplies scheduled and on-demand Euro-V diesel for standby generators, construction equipment, and commercial vehicle fleets with long-reach 50m hoses.'
    },
    {
      q: 'Why choose Zyphuel instead of traditional petrol pumps in Lahore?',
      a: 'Zyphuel eliminates petrol pump queues and pump short-fueling with 0.01L calibrated digital flow meters, 100% OGRA compliant regulated pricing, genuine terminal-sourced Euro-V fuel, and doorstep delivery within 45 minutes.'
    },
    {
      q: 'Is Zyphuel an authorized commercial fuel agency in Lahore?',
      a: 'Yes. Zyphuel operates as a compliant mobile refueling and fuel agency supplying bulk Euro-V diesel directly to corporate generator tanks, manufacturing plants, telecommunication towers, and construction yards across Lahore at official OGRA rates with verified batch quality certificates.'
    },
    {
      q: 'What should I do if I run out of petrol or diesel on the road in Lahore?',
      a: 'Simply open Zyphuel or send your live WhatsApp location to +92 323 0112464. Our rapid mobile bowsers dispatch emergency Euro-V petrol or diesel directly to your stranded vehicle within 45 minutes anywhere in Lahore.'
    },
    {
      q: 'How fast does Zyphuel deliver fuel to DHA, Gulberg, or Johar Town?',
      a: 'Zyphuel operates decentralized mobile refueler hubs across Lahore, delivering within 45 minutes to Gulberg, Model Town, Cantt, Johar Town, DHA Lahore, and Bahria Town.'
    },
    {
      q: 'Which app delivers petrol in Lahore?',
      a: "The Zyphuel Android app delivers petrol and diesel in Lahore — choose 5 to 15 litres, pin your location, and a refueling unit reaches you within 45 minutes with cash or online payment. Download the APK from our Download page; the iOS version is in development."
    },
    {
      q: 'Can I have petrol delivered to my home?',
      a: 'Yes. In Lahore you can order 5 to 15 litres of Euro-V petrol or diesel straight to your home, car, or workplace — delivered within 45 minutes for a flat Rs. 300.00 delivery fee on 5–10 litre orders.'
    },
    {
      q: 'What is doorstep diesel delivery?',
      a: 'Doorstep diesel delivery means ordering diesel online and having it pumped directly into your vehicle, generator, or storage tank at your address — no pump queues, no jerrycans. Zyphuel dispatches a calibrated, metered bows with sealed Euro-V diesel anywhere in Lahore within 45 minutes.'
    },
    {
      q: 'Can diesel be delivered at home?',
      a: 'Yes. Households and businesses in Lahore can have diesel delivered to their address for standby generators, cars, and machinery — order on the website or Android app, minimum 5 litres up to 15 litres per doorstep order, with an itemised metered invoice.'
    }
  ]

  // Show Startup Transparency notice strictly once per day
  useEffect(() => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const lastShownDate = localStorage.getItem('zyphuel_transparency_last_date');
      if (lastShownDate !== today) {
        setShowStartupTransparency(true);
        localStorage.setItem('zyphuel_transparency_last_date', today);
      }
    } catch (e) {
      // Fallback for SSR / restricted storage environments
    }
  }, [])

  const handleDismissTransparency = () => {
    setShowStartupTransparency(false)
    try {
      const today = new Date().toISOString().slice(0, 10)
      localStorage.setItem('zyphuel_transparency_last_date', today)
    } catch (e) {}
  }

  useSEO({
    title: 'Online Petrol & Diesel Delivery in Lahore | Zyphuel',
    description: 'Order Euro-V petrol or diesel to your doorstep in Lahore within 45 mins. Cash on delivery, calibrated meters, OGRA rates.',
    keywords: [
      'online petrol delivery in lahore', 'petrol home delivery lahore', 'online petrol delivery near me',
      'diesel home delivery near me', 'petrol delivery app pakistan', 'emergency petrol delivery lahore',
      'buy petrol online pakistan', 'fuel delivery Lahore', 'diesel delivery Lahore', 'petrol delivery Lahore',
      'petrol pump near me Lahore', 'fuel station near me', 'petrol pump open now Lahore',
      'petrol price today Lahore', 'diesel price today Lahore', 'diesel supplier Lahore',
      'fuel agency Lahore', 'mobile refueling Pakistan', 'doorstep fuel delivery', 'generator diesel delivery',
      'generator refueling service', 'fleet refueling service', 'on-demand fuel delivery app',
      'fuel delivery DHA Lahore', 'petrol delivery Gulberg', 'diesel delivery Johar Town',
      'OGRA compliant fuel rates', 'calibrated flow meter fuel delivery',
      'what is Zyphuel', 'is Zyphuel safe', 'Zyphuel mobile app', 'Zyphuel APK download',
      'emergency fuel delivery Lahore', 'petrol delivery near me',
      'petrol price in Pakistan today', 'diesel price in Pakistan today', 'today petrol rate in Pakistan',
      'which app delivers petrol', 'can petrol be delivered at home', 'doorstep diesel delivery',
      'best delivery app in Pakistan', 'diesel delivery companies', 'petrol delivered to home Lahore'
    ],
    url: 'https://zyphuel.netlify.app/',
    type: 'website',
    schema: {
      "@context": "https://schema.org",
      "@graph": [{
      "@type": "LocalBusiness",
      "@id": "https://zyphuel.netlify.app/#localbusiness",
      "name": "Zyphuel",
      "description": "Zyphuel delivers certified Euro-V petrol and diesel to your doorstep in Lahore, Pakistan — serving households, generator owners, and commercial fleets with calibrated digital metering and live GPS tracking.",
      "url": "https://zyphuel.netlify.app",
      "logo": "https://zyphuel.netlify.app/images/logo.png",
      "telephone": "+923230112464",
      "priceRange": "$$",
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
              "name": "Doorstep Euro-V Super Petrol Delivery",
              "description": "On-demand Super Euro-V petrol delivered directly to vehicles and homes with 0.01L digital calibrated metering."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Standby Generator Euro-V Diesel Refueling",
              "description": "Scheduled and emergency diesel logistics for commercial, residential, and industrial generators."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Commercial Logistics Fleet Yard Refueling",
              "description": "Bulk fuel replenishment for logistics vans, corporate vehicle fleets, and construction equipment."
            }
          }
        ]
      },
      "hasMap": "https://share.google/Nb4XGKYq5aU0nzLr3",
      "sameAs": [
        "https://www.linkedin.com/company/zyphuel/",
        "https://share.google/Nb4XGKYq5aU0nzLr3",
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
        "name": "Muhammad Daniyal",
        "jobTitle": "Founder & Leading Web Developer",
        "sameAs": [
          "https://www.linkedin.com/in/muhammad-daniyal490",
          "https://github.com/daniyal44"
        ]
      }
      }, {
        // Mirrors the visible AEO Q&A hub so the FAQ schema survives hydration
        "@type": "FAQPage",
        "@id": "https://zyphuel.netlify.app/#faq",
        "mainEntity": homeFaqs.map(({ q, a }) => ({
          "@type": "Question",
          "name": q,
          "acceptedAnswer": { "@type": "Answer", "text": a }
        }))
      }]
    }
  })

  // Pass activeFilter to useScrollReveal so scroll animation re-triggers on tab changes
  const pageRef = useScrollReveal([activeFilter])

  const filteredArticles = activeFilter === 'All'
    ? articles
    : articles.filter(a => a.category === activeFilter)

  const lahoreSectors = [
    {
      name: "DHA Lahore (Phases 1–9)",
      eta: "Within 45 Mins",
      desc: "Instant doorstep petrol & diesel for luxury vehicles, corporate offices, and estate standby generators across DHA Phase 1 through Phase 9 Prism.",
      link: "/order/#dha"
    },
    {
      name: "Gulberg I, II, III & MM Alam",
      eta: "Within 45 Mins",
      desc: "Rapid delivery to commercial tech parks, high-rises, restaurants, and retail plazas along Main Boulevard and MM Alam Road.",
      link: "/order/#gulberg"
    },
    {
      name: "Johar Town & PIA Society",
      eta: "Within 45 Mins",
      desc: "Serving residential villas, medical clinics, hospitals, and commercial avenues near Shaukat Khanum and Expo Centre.",
      link: "/order/#johar-town"
    },
    {
      name: "Model Town & Garden Town",
      eta: "Within 45 Mins",
      desc: "Emergency load-shedding generator diesel supply and private car refueling across Model Town Blocks A through M.",
      link: "/order/#model-town"
    },
    {
      name: "Bahria Town Lahore",
      eta: "Within 45 Mins",
      desc: "Scheduled and on-demand micro-bowser dispatch for Sector A through F, Safari Villas, and commercial plazas.",
      link: "/order/#bahria-town"
    },
    {
      name: "Lahore Cantt & Cavalry Ground",
      eta: "Within 45 Mins",
      desc: "Priority gated-community fuel logistics, Askari I–XI apartments, and executive transport fleet replenishment.",
      link: "/order/#cantt"
    },
    {
      name: "Industrial Estates (Sundar & Kot Lakhpat)",
      eta: "Scheduled Daily",
      desc: "Bulk Euro-V diesel deliveries for manufacturing plants, heavy machinery, excavators, and logistics delivery fleets.",
      link: "/services/#b2b"
    }
  ]

  return (
    
    <main id="main-content" ref={pageRef}>
      {/* New Cinematic 3D Scroll Refueling Hero (300 Frames with Hello Everyone Greeting) */}
      <ScrollAnimationSection />

      {/* Main Home Hero Section with Doorstep Fuel Delivery CTAs */}
      <section id="home" className="hero" style={{ scrollMarginTop: 'var(--nav-height)' }}>
        <div className="container">
          <div className="hero-grid">
            {/* Left: Content */}
            <div className="hero-content fade-in-up">
              {showStartupTransparency && (
                <div className="hero-transparency-banner" style={{
                  background: 'rgba(2, 132, 199, 0.08)',
                  border: '1px solid rgba(2, 132, 199, 0.25)',
                  borderRadius: '10px',
                  padding: '8px 14px',
                  marginBottom: '16px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.85rem',
                  color: 'var(--brand-primary, #0369a1)',
                  maxWidth: '100%',
                  boxSizing: 'border-box'
                }}>
                  <i className="fa-solid fa-seedling"></i>
                  <span style={{ flex: 1 }}>
                    <strong>Startup Transparency:</strong> Zyphuel is currently an early-stage startup serving Lahore, Pakistan, not a large corporation.
                  </span>
                  <button
                    type="button"
                    onClick={handleDismissTransparency}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--brand-primary, #0369a1)',
                      cursor: 'pointer',
                      padding: '2px 6px',
                      marginLeft: '6px',
                      fontSize: '1rem',
                      lineHeight: 1,
                      opacity: 0.75,
                      transition: 'opacity 0.2s',
                      display: 'inline-flex',
                      alignItems: 'center'
                    }}
                    title="Dismiss for today"
                    aria-label="Dismiss startup transparency notice for today"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              )}
             
              <div className="hero-subtitle-badge">
                <i className="fa-solid fa-gas-pump"></i>
                <span>Fuel on Your Doorstep – Lahore</span>
              </div>
              <h1 className="hero-title">
                Doorstep <span>Fuel Delivery</span> in Lahore
              </h1>
              <p className="hero-description">
                From Euro-V diesel to super petrol – order online and get certified fuel delivered directly
                to your vehicle, standby generator, fleet yard, or construction site. 100% OGRA compliant rates with 0.01L digital calibrated metering.
              </p>
              <div className="hero-ctas">
                <Link to="/order/" className="btn btn-primary">
                  <i className="fa-solid fa-gas-pump"></i> Order Fuel Now
                </Link>
                <Link
                  to="/download/"
                  id="home-hero-download-btn"
                  data-testid="home-hero-download-btn"
                  className="btn btn-secondary"
                  title="Download Zyphuel Mobile App (Android APK)"
                >
                  <i className="fa-brands fa-android"></i> Download App
                </Link>
                <Link to="/about/" className="btn btn-ghost">
                  Learn More About Zyphuel <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="hero-badges-row">
                <div className="hero-trust-badge">
                  <i className="fa-solid fa-clock"></i>
                  <span>Fast Delivery</span>
                </div>
                <div className="hero-trust-badge">
                  <i className="fa-solid fa-bolt"></i>
                  <span>Within 45 Min Dispatch</span>
                </div>
                <div className="hero-trust-badge">
                  <i className="fa-solid fa-shield-halved"></i>
                  <span>0.01L Calibrated</span>
                </div>
              </div>
            </div>

            {/* Right: Animated Skyline & Truck SVG */}
            <div className="hero-graphic fade-in-up" style={{ transitionDelay: '0.2s' }}>
              <div className="animated-svg-container">
                <HeroGraphic />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Petrol Pump Near Me High-Intent Search Banner */}
      <div className="pump-callout-banner">
        <div className="container">
          <div className="pump-callout-grid">
            <div className="pump-callout-text">
              <h2>
                <i className="fa-solid fa-location-crosshairs"></i> Searching for a "Petrol Pump Near Me" in Lahore?
              </h2>
              <p>
                Don't wait in long fuel queues at PSO, Shell, or Total Parco stations. We deliver Euro-V Super Petrol &amp; Diesel directly into your car or generator within 45 minutes at official OGRA rates.
              </p>
            </div>
            <div className="pump-callout-ctas">
              <Link to="/order/" className="btn-white-pump">
                <i className="fa-solid fa-gas-pump"></i> Order Fuel
              </Link>
              <a
                href="https://wa.me/923230112464?text=Hello%20Zyphuel!%20I%20am%20looking%20for%20a%20petrol%20pump%20near%20me%20in%20Lahore.%20Please%20dispatch%20fuel%20to%20my%20location."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-dispatch"
                style={{ padding: '10px 16px', fontSize: '0.88rem' }}
              >
                <i className="fa-brands fa-whatsapp"></i> WhatsApp Contact
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Answer-Engine (AEO) Q&A Hub — "What is Zyphuel?" trending questions */}
      <section className="home-qa-section" id="what-is-zyphuel" style={{ padding: '80px 0', background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
        <div className="container">
          <div className="fade-in-up" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px' }}>
            <div className="section-badge-pill">
              <i className="fa-solid fa-circle-question"></i>
              <span>Quick Answers</span>
            </div>
            <h2 className="section-title">What Is Zyphuel? — Straight Answers to Common Questions</h2>
            <p className="section-subtitle">
              Everything people ask before ordering doorstep fuel delivery in Lahore — what Zyphuel is, how it works, safety, pricing, coverage, and the app.
            </p>
          </div>
          <div className="faq-accordion-container fade-in-up" style={{ maxWidth: '860px', margin: '0 auto' }}>
            {homeFaqs.map((faq, index) => {
              const isOpen = openHomeFaq === index
              return (
                <div key={index} className={`faq-accordion-item ${isOpen ? 'active' : ''}`}>
                  <button className="faq-trigger" onClick={() => setOpenHomeFaq(openHomeFaq === index ? null : index)} aria-expanded={isOpen} aria-controls={`home-faq-answer-${index}`}>
                    <span className="faq-question-text">{faq.q}</span>
                    <span className="faq-chevron">
                      <i className="fa-solid fa-chevron-down"></i>
                    </span>
                  </button>
                  <div id={`home-faq-answer-${index}`} className="faq-answer-panel" style={{ maxHeight: isOpen ? '480px' : '0' }}>
                    <div className="faq-answer-content">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Competitive Advantage & Trust Pillars */}
      <section className="competitive-section">
        <div className="container">
          <div className="competitive-header fade-in-up">
            <div className="section-badge-pill">
              <i className="fa-solid fa-award"></i>
              <span>Why Choose Zyphuel</span>
            </div>
            <h2 className="section-title">Why Zyphuel Beats Traditional Petrol Pumps & Other Services</h2>
            <p className="section-subtitle">
              Say goodbye to long fuel queues, adulterated fuel, and pump short-fueling. Experience Lahore's most advanced, tech-enabled mobile refueling service.
            </p>
          </div>

          <div className="competitive-grid">
            <div className="comp-card fade-in-up">
              <div className="comp-icon-box emerald">
                <i className="fa-solid fa-gauge-high"></i>
              </div>
              <h3>0.01L Calibrated Digital Metering</h3>
              <p>
                Unlike retail pumps where short-fueling is common, every Zyphuel micro-bowser is fitted with weights-and-measures certified positive-displacement electronic flow meters. You receive cryptographic volumetric receipts for every drop.
              </p>
              <div className="comp-proof-tag">
                <i className="fa-solid fa-check text-success"></i> Tamper-Proof Electronic Meter
              </div>
            </div>

            <div className="comp-card fade-in-up" style={{ transitionDelay: '0.1s' }}>
              <div className="comp-icon-box">
                <i className="fa-solid fa-file-invoice-dollar"></i>
              </div>
              <h3>100% OGRA Compliant Retail Rates</h3>
              <p>
                We adhere strictly to official government pricing notified by the Oil &amp; Gas Regulatory Authority (OGRA) with standard petrol pump retail margin (+Rs. 5.00/L). Transparent pricing, zero hidden gouging, and itemized receipts with every single order.
              </p>
              <div className="comp-proof-tag">
                <i className="fa-solid fa-shield-check text-primary"></i> Standard Retail Forecourt Pricing (+Rs. 5.00/L)
              </div>
            </div>

            <div className="comp-card fade-in-up" style={{ transitionDelay: '0.2s' }}>
              <div className="comp-icon-box amber">
                <i className="fa-solid fa-bolt"></i>
              </div>
              <h3>Within 45-Minute Rapid Dispatch</h3>
              <p>
                Our decentralized micro-refueler fleet is strategically staged across major Lahore sectors. Whether you ran dry on the road or need emergency generator diesel during a power outage, delivery is guaranteed within 45 minutes across Lahore.
              </p>
              <div className="comp-proof-tag">
                <i className="fa-solid fa-truck-fast text-warning"></i> Express Local Response
              </div>
            </div>

            <div className="comp-card fade-in-up">
              <div className="comp-icon-box">
                <i className="fa-solid fa-filter"></i>
              </div>
              <h3>Euro-V Certified Terminal Fuel</h3>
              <p>
                Sourced directly from certified primary oil marketing terminals. Pure Euro-V diesel with under 10 ppm sulfur content and high-octane petrol tested for clean engine combustion and maximum mileage.
              </p>
              <div className="comp-proof-tag">
                <i className="fa-solid fa-certificate"></i> Lab-Tested Quality
              </div>
            </div>

            <div className="comp-card fade-in-up" style={{ transitionDelay: '0.1s' }}>
              <div className="comp-icon-box emerald">
                <i className="fa-solid fa-plug-circle-bolt"></i>
              </div>
              <h3>Generator Standby Logistics</h3>
              <p>
                No more carrying dangerous jerry cans from the petrol station. We deliver directly to rooftop, basement, and ground generators with our 50-meter heavy-duty fuel hoses to beat WAPDA load-shedding.
              </p>
              <div className="comp-proof-tag">
                <i className="fa-solid fa-industry"></i> Rooftop &amp; Basement Access
              </div>
            </div>

            <div className="comp-card fade-in-up" style={{ transitionDelay: '0.2s' }}>
              <div className="comp-icon-box">
                <i className="fa-solid fa-mobile-screen-button"></i>
              </div>
              <h3>Official Android App with Live GPS</h3>
              <p>
                Track your fuel bowser in real time on the interactive map, receive 2-hour advance notifications before OGRA price revisions, and re-order with biometric speed.
              </p>
              <Link
                to="/download/"
                id="home-feature-download-btn"
                data-testid="home-feature-download-btn"
                className="comp-proof-tag"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                title="Download Zyphuel Android APK App"
              >
                <i className="fa-brands fa-android"></i> Download App v{APP_VERSION} &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Way Competitor Comparison Table */}
      <section className="comparison-section">
        <div className="container">
          <div className="competitive-header fade-in-up">
            <div className="section-badge-pill" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#059669', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
              <i className="fa-solid fa-code-compare"></i>
              <span>Market Benchmark &amp; Analysis</span>
            </div>
            <h2 className="section-title">Zyphuel vs. Petrol Pumps vs. Fuel Agencies vs. Delivery Apps</h2>
            <p className="section-subtitle">
              See how Zyphuel outperforms traditional retail fuel stations, conventional petroleum brokers, and third-party delivery apps across Lahore.
            </p>
          </div>

          <div className="comp-table-container fade-in-up">
            <table className="zyphuel-comparison-table">
              <thead>
                <tr>
                  <th>Feature / Service Capability</th>
                  <th className="highlight-zyphuel"><i className="fa-solid fa-bolt"></i> Zyphuel Mobile</th>
                  <th>Fixed Petrol Pumps (PSO/Shell/Total)</th>
                  <th>Industrial Fuel Agencies</th>
                  <th>Other Apps / Delivery Sites</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Doorstep Delivery to Vehicle / Generator</strong></td>
                  <td className="highlight-zyphuel">✅ Yes (Within 45 mins doorstep dispatch)</td>
                  <td>❌ No (Must drive &amp; wait in queue)</td>
                  <td>⚠️ Bulk only (No passenger cars)</td>
                  <td>⚠️ Limited / Karachi only</td>
                </tr>
                <tr>
                  <td><strong>Delivery Charges (Transparent Nominal Fee)</strong></td>
                  <td className="highlight-zyphuel">✅ Rs. 300.00 – Rs. 400.00 (Volume Scaled)</td>
                  <td>❌ Fuel wasted driving &amp; waiting in station queues</td>
                  <td>⚠️ Heavy bulk freight &amp; hauling surcharges</td>
                  <td>⚠️ High dynamic surge &amp; distance fees</td>
                </tr>
                <tr>
                  <td><strong>Measurement Accuracy &amp; Anti-Short-Fueling</strong></td>
                  <td className="highlight-zyphuel">✅ 0.01L Calibrated Digital Meter (15°C ATC)</td>
                  <td>⚠️ High risk of pump short-fueling</td>
                  <td>⚠️ Dipstick / manual bulk meters</td>
                  <td>❌ Uncalibrated jerry cans</td>
                </tr>
                <tr>
                  <td><strong>Government Regulated Pricing (OGRA)</strong></td>
                  <td className="highlight-zyphuel">✅ Official OGRA daily rate + standard pump margin (+Rs. 5.00/L)</td>
                  <td>✅ Standard station price</td>
                  <td>⚠️ Broker commissions added</td>
                  <td>⚠️ High surge delivery fees</td>
                </tr>
                <tr>
                  <td><strong>Generator Standby Fueling (50m Hoses)</strong></td>
                  <td className="highlight-zyphuel">✅ Direct rooftop &amp; basement access (50m hose)</td>
                  <td>❌ Dangerous manual cans required</td>
                  <td>⚠️ Ground storage tanks only</td>
                  <td>❌ No long-reach hoses</td>
                </tr>
                <tr>
                  <td><strong>Order Flexibility (Doorstep Fuel Limits)</strong></td>
                  <td className="highlight-zyphuel">✅ Strictly 5L min to 15L max per order</td>
                  <td>✅ No minimum (at station)</td>
                  <td>❌ Strict 5,000L+ minimum order</td>
                  <td>⚠️ Inflexible order limits</td>
                </tr>
                <tr>
                  <td><strong>Payment Options &amp; Cash on Delivery</strong></td>
                  <td className="highlight-zyphuel">✅ COD (5L–10L) &amp; Instant QR Wallets (JazzCash, Easypaisa, Raast)</td>
                  <td>⚠️ Cash or station POS (network down risks)</td>
                  <td>❌ 100% advance bank pay-order / PO only</td>
                  <td>⚠️ Credit cards only with payment processing delays</td>
                </tr>
                <tr>
                  <td><strong>Operating Hours &amp; Emergency Response</strong></td>
                  <td className="highlight-zyphuel">✅ Extended Hours Delivery (Mon–Sun)</td>
                  <td>⚠️ Station queues / Night closures</td>
                  <td>❌ 9-to-5 business hours only</td>
                  <td>❌ Irregular operating hours</td>
                </tr>
                <tr>
                  <td><strong>Dedicated Android App &amp; Live Bowser GPS</strong></td>
                  <td className="highlight-zyphuel">✅ Yes (v{APP_VERSION} with Live Radar Tracking)</td>
                  <td>❌ No app tracking</td>
                  <td>❌ Phone/paper dispatch only</td>
                  <td>⚠️ Basic web forms only</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Commercial Fuel Agency & Bulk Diesel Supply Section */}
      <section className="agency-section">
        <div className="container">
          <div className="competitive-header fade-in-up">
            <div className="section-badge-pill">
              <i className="fa-solid fa-industry"></i>
              <span>Commercial Energy Agency</span>
            </div>
            <h2 className="section-title">Authorized Fuel Agency &amp; Bulk Diesel Supply in Lahore</h2>
            <p className="section-subtitle">
              Zyphuel functions as an agile commercial petroleum contractor for commercial standby generators, manufacturing plants, corporate vehicle fleets, and construction sites.
            </p>
          </div>

          <div className="agency-grid">
            <div className="agency-card fade-in-up">
              <div className="comp-icon-box">
                <i className="fa-solid fa-hospital"></i>
              </div>
              <h3>Hospitals, Tech Parks &amp; Plazas</h3>
              <p>
                Zero-downtime standby generator refueling contracts. When WAPDA load-shedding hits, our automated refuelers ensure your backup power is replenished with laboratory-tested Euro-V diesel.
              </p>
              <ul className="agency-specs-list">
                <li><i className="fa-solid fa-check"></i> 50-meter high-pressure rooftop hoses</li>
                <li><i className="fa-solid fa-check"></i> Monthly consolidated invoicing</li>
                <li><i className="fa-solid fa-check"></i> 24/7 emergency dispatch helpline</li>
              </ul>
              <Link to="/services/#b2b" className="sector-cta-link">
                View Commercial Packages <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            <div className="agency-card fade-in-up" style={{ transitionDelay: '0.1s' }}>
              <div className="comp-icon-box emerald">
                <i className="fa-solid fa-truck-ramp-box"></i>
              </div>
              <h3>Logistics &amp; Transport Fleets</h3>
              <p>
                Overnight yard refueling for delivery vans, trucking fleets, and corporate shuttles. Vehicles start every morning fully fueled without wasting driver work hours at retail petrol pumps.
              </p>
              <ul className="agency-specs-list">
                <li><i className="fa-solid fa-check"></i> RFID tag vehicle authentication</li>
                <li><i className="fa-solid fa-check"></i> Digital fuel audit reports &amp; consumption telemetry</li>
                <li><i className="fa-solid fa-check"></i> Eliminates driver fuel card embezzlement</li>
              </ul>
              <Link to="/services/#b2b" className="sector-cta-link">
                Explore Fleet Solutions <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            <div className="agency-card fade-in-up" style={{ transitionDelay: '0.2s' }}>
              <div className="comp-icon-box amber">
                <i className="fa-solid fa-trowel-bricks"></i>
              </div>
              <h3>Construction Sites &amp; Heavy Machinery</h3>
              <p>
                On-site direct-to-machine diesel replenishment for excavators, road rollers, mobile generators, and earth-moving equipment across Lahore infrastructure developments.
              </p>
              <ul className="agency-specs-list">
                <li><i className="fa-solid fa-check"></i> Rugged micro-bowsers for unpaved terrain</li>
                <li><i className="fa-solid fa-check"></i> Bulk volume discounts on scheduled supply</li>
                <li><i className="fa-solid fa-check"></i> Spill-containment certified equipment</li>
              </ul>
              <Link to="/contact/" className="sector-cta-link">
                Request Industrial Quotation <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Lahore Sector Coverage & Dispatch Matrix */}
      <section className="sector-section">
        <div className="container">
          <div className="competitive-header fade-in-up">
            <div className="section-badge-pill">
              <i className="fa-solid fa-location-dot"></i>
              <span>Lahore Metropolitan Coverage</span>
            </div>
            <h2 className="section-title">Doorstep Fuel Delivery Coverage Across Lahore</h2>
            <p className="section-subtitle">
              Zyphuel’s mobile bowser fleet is deployed across 7 primary hubs to guarantee the quickest arrival time in your neighborhood.
            </p>
          </div>

          <div className="sector-grid">
            {lahoreSectors.map((sector, i) => (
              <div key={i} className="sector-card fade-in-up" style={{ transitionDelay: `${i * 0.05}s` }}>
                <div>
                  <div className="sector-top">
                    <h3 className="sector-name">{sector.name}</h3>
                    <span className="sector-eta">
                      <i className="fa-solid fa-clock"></i> {sector.eta}
                    </span>
                  </div>
                  <p className="sector-desc">{sector.desc}</p>
                </div>
                <div>
                  <Link to={sector.link} className="sector-cta-link">
                    Order for this area <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operating & Working Hours Section */}
      <section className="operating-hours-section" style={{ padding: '0 0 70px 0' }}>
        <div className="container">
          <div className="operating-hours-card fade-in-up" style={{
            background: 'linear-gradient(135deg, #0b1329 0%, #0f172a 100%)',
            borderRadius: '20px',
            padding: '32px 36px',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            boxShadow: '0 20px 40px -15px rgba(2, 132, 199, 0.2)',
            alignItems: 'center',
            color: '#ffffff',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Left: Info & 24/7 Delivery Status */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                color: '#10b981',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '14px'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></span>
                Operating Schedule
              </div>
              <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
                Zyphuel Operating &amp; Working Hours
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px' }}>
                Online doorstep fuel orders are accepted from <strong>8:00 AM to 10:00 PM (PKT)</strong> daily across all Lahore sectors. Corporate support desk and office verification operate during the schedule on the right, with 24/7 WhatsApp emergency assistance.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link to="/order/" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
                  <i className="fa-solid fa-gas-pump"></i> Order Fuel Now
                </Link>
                <Link
                  to="/contact/"
                  className="btn btn-ghost"
                  style={{ padding: '10px 20px', fontSize: '0.9rem', color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.3)' }}
                >
                  <i className="fa-solid fa-headset"></i> Customer Support
                </Link>
              </div>
            </div>

            {/* Right: Working Hours Schedule Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '20px 24px',
              backdropFilter: 'blur(8px)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.95rem',
                fontWeight: 800,
                color: '#38bdf8',
                marginBottom: '14px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                paddingBottom: '10px'
              }}>
                <i className="fa-solid fa-clock"></i> Working Hours &amp; Timings
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(56, 189, 248, 0.25)', paddingBottom: '8px', background: 'rgba(56, 189, 248, 0.08)', padding: '6px 8px', borderRadius: '6px' }}>
                  <span style={{ color: '#38bdf8', fontWeight: 700 }}>Doorstep Orders</span>
                  <strong style={{ color: '#38bdf8' }}>8:00 AM – 10:00 PM Daily</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '8px' }}>
                  <span style={{ color: '#cbd5e1' }}>Monday – Thursday</span>
                  <strong style={{ color: '#ffffff' }}>8:00 AM – 8:00 PM</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '8px' }}>
                  <span style={{ color: '#cbd5e1' }}>Friday</span>
                  <strong style={{ color: '#ffffff' }}>8:00 AM – 1:00 PM</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#cbd5e1' }}>Saturday – Sunday</span>
                  <strong style={{ color: '#ffffff' }}>10:00 AM – 6:00 PM</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog & Articles Section */}
      <section id="blog" className="blog-section section-padding">
        <div className="container">
          <div className="blog-header fade-in-up">
            <h2 className="section-title">Blog & Articles</h2>
            <p className="section-subtitle">
              Read the latest updates about mobile fuel logistics, digital accelerators,
              energy mobility, and our partnership engineering breakthroughs.
            </p>
          </div>

          {/* Filters */}
          <div className="blog-filters fade-in-up" style={{ transitionDelay: '0.1s' }}>
            {['All', 'Zyphuel Energy', 'Zyphuel App & Guides', 'Generator & Utilities'].map(filter => (
              <button
                key={filter}
                className={`blog-filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter === 'All' ? 'All Articles' : filter}
              </button>
            ))}
          </div>

          {/* Grid of articles */}
          <div className="blog-grid">
            {filteredArticles.map((article, idx) => (
              <BlogCard
                key={article.id}
                article={article}
                index={idx}
                onReadMore={setSelectedArticle}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link to="/blog/" className="btn btn-secondary" title="View all Zyphuel energy articles and fuel guides">
              <i className="fa-solid fa-newspaper"></i> View All Blog Articles &amp; Energy Guides &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Slideshow Section - 3D Card Carousel */}
      <Carousel3D />

      {/* Detailed Blog Modal */}
      <BlogModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </main>
  )
}

