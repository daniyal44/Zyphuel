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
    title: 'Doorstep Fuel Delivery in Lahore | Fast Petrol & Diesel | Zyphuel',
    description: 'Order certified Euro-V petrol, diesel, and generator fuel delivered directly to your doorstep in Lahore within 45 minutes. Calibrated digital flow meters, OGRA rates, and live GPS tracking.',
    keywords: [
      'fuel delivery Lahore', 'diesel delivery Lahore', 'petrol delivery Lahore',
      'petrol pump near me Lahore', 'fuel station near me', 'petrol pump open now Lahore',
      'petrol price today Lahore', 'diesel price today Lahore', 'diesel supplier Lahore',
      'fuel agency Lahore', 'bulk diesel supply Lahore', 'commercial petroleum contractor Lahore',
      'mobile refueling Pakistan', 'doorstep fuel delivery', 'generator diesel delivery',
      'generator refueling service', 'bulk diesel supplier Lahore', 'fleet refueling service',
      'on-demand fuel delivery app', 'fuel delivery DHA Lahore', 'petrol delivery Gulberg',
      'diesel delivery Johar Town', 'OGRA compliant fuel rates', 'calibrated flow meter fuel delivery'
    ],
    image: 'https://zyphuel.netlify.app/images/logo.png',
    url: 'https://zyphuel.netlify.app/',
    type: 'website',
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
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
              "description": "24/7 scheduled and emergency diesel logistics for commercial, residential, and industrial generators."
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
        "jobTitle": "Founder & CEO",
        "sameAs": [
          "https://www.linkedin.com/in/muhammad-daniyal490",
          "https://github.com/daniyal44"
        ]
      }
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
      eta: "15–25 min",
      desc: "Instant doorstep petrol & diesel for luxury vehicles, corporate offices, and estate standby generators across DHA Phase 1 through Phase 9 Prism.",
      link: "/order/?sector=dha"
    },
    {
      name: "Gulberg I, II, III & MM Alam",
      eta: "15–20 min",
      desc: "Rapid delivery to commercial tech parks, high-rises, restaurants, and retail plazas along Main Boulevard and MM Alam Road.",
      link: "/order/?sector=gulberg"
    },
    {
      name: "Johar Town & PIA Society",
      eta: "20–30 min",
      desc: "Serving residential villas, medical clinics, hospitals, and commercial avenues near Shaukat Khanum and Expo Centre.",
      link: "/order/?sector=johar-town"
    },
    {
      name: "Model Town & Garden Town",
      eta: "20–25 min",
      desc: "Emergency load-shedding generator diesel supply and private car refueling across Model Town Blocks A through M.",
      link: "/order/?sector=model-town"
    },
    {
      name: "Bahria Town Lahore",
      eta: "25–35 min",
      desc: "Scheduled and on-demand micro-bowser dispatch for Sector A through F, Safari Villas, and commercial plazas.",
      link: "/order/?sector=bahria-town"
    },
    {
      name: "Lahore Cantt & Cavalry Ground",
      eta: "20–30 min",
      desc: "Priority gated-community fuel logistics, Askari I–XI apartments, and executive transport fleet replenishment.",
      link: "/order/?sector=cantt"
    },
    {
      name: "Industrial Estates (Sundar & Kot Lakhpat)",
      eta: "Scheduled 24/7",
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
                  color: 'var(--brand-primary, #0284c7)',
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
                      color: 'var(--brand-primary, #0284c7)',
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
                <Link to="/about/" className="btn btn-ghost">
                  Learn More About Zyphuel <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="hero-badges-row">
                <div className="hero-trust-badge">
                  <i className="fa-solid fa-clock"></i>
                  <span>24/7 Delivery</span>
                </div>
                <div className="hero-trust-badge">
                  <i className="fa-solid fa-bolt"></i>
                  <span>15–30 Min Dispatch</span>
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
              <h3>
                <i className="fa-solid fa-location-crosshairs"></i> Searching for a "Petrol Pump Near Me" in Lahore?
              </h3>
              <p>
                Don't wait in long fuel queues at PSO, Shell, or Total Parco stations. We deliver Euro-V Super Petrol &amp; Diesel directly into your car or generator within 15–30 minutes at official OGRA rates.
              </p>
            </div>
            <div className="pump-callout-ctas">
              <Link to="/order/" className="btn-white-pump">
                <i className="fa-solid fa-gas-pump"></i> Dispatch to My Location
              </Link>
              <a
                href="https://wa.me/923230112464?text=Hello%20Zyphuel!%20I%20am%20looking%20for%20a%20petrol%20pump%20near%20me%20in%20Lahore.%20Please%20dispatch%20fuel%20to%20my%20location."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-dispatch"
                style={{ padding: '10px 16px', fontSize: '0.88rem' }}
              >
                <i className="fa-brands fa-whatsapp"></i> WhatsApp Fuel
              </a>
            </div>
          </div>
        </div>
      </div>

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
              <h3>100% OGRA Compliant Rates</h3>
              <p>
                We adhere strictly to official government pricing notified by the Oil &amp; Gas Regulatory Authority (OGRA). Transparent pricing, zero surge gouging, and official receipts with every single order.
              </p>
              <div className="comp-proof-tag">
                <i className="fa-solid fa-shield-check text-primary"></i> Zero Price Markup Guarantee
              </div>
            </div>

            <div className="comp-card fade-in-up" style={{ transitionDelay: '0.2s' }}>
              <div className="comp-icon-box amber">
                <i className="fa-solid fa-bolt"></i>
              </div>
              <h3>15–30 Minute Rapid Dispatch</h3>
              <p>
                Our decentralized micro-refueler fleet is strategically staged across major Lahore sectors. Whether you ran dry on the road or need urgent generator diesel during a power outage, help arrives fast.
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
              <Link to="/download/" className="comp-proof-tag" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }} title="Download Zyphuel Android APK App">
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
                  <td className="highlight-zyphuel">✅ Yes (15–30 min express dispatch)</td>
                  <td>❌ No (Must drive &amp; wait in queue)</td>
                  <td>⚠️ Bulk only (No passenger cars)</td>
                  <td>⚠️ Limited / Karachi only</td>
                </tr>
                <tr>
                  <td><strong>Measurement Accuracy &amp; Anti-Short-Fueling</strong></td>
                  <td className="highlight-zyphuel">✅ 0.01L Calibrated Digital Meter</td>
                  <td>⚠️ High risk of pump short-fueling</td>
                  <td>⚠️ Dipstick / manual bulk meters</td>
                  <td>❌ Uncalibrated jerry cans</td>
                </tr>
                <tr>
                  <td><strong>Government Regulated Pricing (OGRA)</strong></td>
                  <td className="highlight-zyphuel">✅ 100% OGRA daily rates, zero markup</td>
                  <td>✅ Standard station price</td>
                  <td>⚠️ Broker commissions added</td>
                  <td>⚠️ High surge delivery fees</td>
                </tr>
                <tr>
                  <td><strong>Generator Standby Fueling (50m Hoses)</strong></td>
                  <td className="highlight-zyphuel">✅ Direct rooftop &amp; basement access</td>
                  <td>❌ Dangerous manual cans required</td>
                  <td>⚠️ Ground storage tanks only</td>
                  <td>❌ No long-reach hoses</td>
                </tr>
                <tr>
                  <td><strong>Order Flexibility (Minimum Volume)</strong></td>
                  <td className="highlight-zyphuel">✅ 5 Liters to 10,000+ Liters</td>
                  <td>✅ No minimum (at station)</td>
                  <td>❌ Strict 5,000L+ minimum order</td>
                  <td>⚠️ Inflexible order limits</td>
                </tr>
                <tr>
                  <td><strong>Operating Hours &amp; Emergency Response</strong></td>
                  <td className="highlight-zyphuel">✅ 24/7/365 Uninterrupted Delivery</td>
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
            <h2 className="section-title">24/7 Doorstep Fuel Delivery Coverage Across Lahore</h2>
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

      {/* Operating & Office Hours Section */}
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
                24/7 Delivery Active
              </div>
              <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
                Zyphuel Operating &amp; Office Hours
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px' }}>
                Corporate support and billing inquiries are handled during official office hours, while our <strong>doorstep fuel delivery fleet operates 24 hours a day, 7 days a week</strong> across all Lahore sectors.
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
                  <i className="fa-solid fa-headset"></i> Support &amp; Contact Desk
                </Link>
                <a
                  href="tel:+923230112464"
                  className="btn btn-ghost"
                  style={{ padding: '10px 20px', fontSize: '0.9rem', color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.3)' }}
                >
                  <i className="fa-solid fa-phone"></i> Direct Helpline
                </a>
              </div>
            </div>

            {/* Right: Office Hours Schedule Card */}
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
                <i className="fa-solid fa-clock"></i> Office &amp; Delivery Timings
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '8px' }}>
                  <span style={{ color: '#cbd5e1' }}>Monday – Thursday</span>
                  <strong style={{ color: '#ffffff' }}>8:00 AM – 8:00 PM</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '8px' }}>
                  <span style={{ color: '#cbd5e1' }}>Friday</span>
                  <strong style={{ color: '#ffffff' }}>8:00 AM – 1:00 PM</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '8px' }}>
                  <span style={{ color: '#cbd5e1' }}>Saturday – Sunday</span>
                  <strong style={{ color: '#ffffff' }}>10:00 AM – 6:00 PM</strong>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 14px',
                  background: 'rgba(16, 185, 129, 0.12)',
                  borderRadius: '10px',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  marginTop: '4px'
                }}>
                  <span style={{ color: '#ffffff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="fa-solid fa-truck-fast" style={{ color: '#10b981' }}></i> Delivery (24/7)
                  </span>
                  <strong style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></span>
                    Always Active
                  </strong>
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

