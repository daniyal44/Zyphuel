import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import HeroGraphic from '../components/HeroGraphic'
import { articles } from '../data/articles'
import BlogCard from '../components/BlogCard'
import BlogModal from '../components/BlogModal'
import Carousel3D from '../components/Carousel3D'
import { useSEO } from '../hooks/useSEO'
import { useFuelPrices } from '../context/FuelPriceContext'

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedArticle, setSelectedArticle] = useState(null)
  const { prices } = useFuelPrices()
  const [calcFuel, setCalcFuel] = useState('petrol')
  const [calcLitres, setCalcLitres] = useState(30)

  const currentUnitPrice = prices[calcFuel] || 345.87
  const calculatedTotal = (currentUnitPrice * calcLitres).toLocaleString('en-PK', { maximumFractionDigits: 2 })

  useSEO({
    title: 'Doorstep Fuel Delivery in Lahore | Fast Petrol & Diesel | Zyphuel',
    description: 'Order certified Euro-V petrol, diesel, and generator fuel delivered directly to your doorstep in Lahore within 15-45 minutes. Calibrated digital flow meters, OGRA rates, and live GPS tracking.',
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
      {/* Hero Section */}
      <section id="home" className="hero" style={{ minHeight: 'calc(100vh - var(--nav-height))', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div className="hero-grid">
            {/* Left: Content */}
            <div className="hero-content fade-in-up">
              <div style={{
                background: 'rgba(2, 132, 199, 0.08)',
                border: '1px solid rgba(2, 132, 199, 0.25)',
                borderRadius: '10px',
                padding: '8px 14px',
                marginBottom: '16px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                color: 'var(--brand-primary, #0284c7)'
              }}>
                <i className="fa-solid fa-seedling"></i>
                <span><strong>Startup Transparency:</strong> Zyphuel is currently an early-stage startup serving Lahore, Pakistan, not a large corporation.</span>
              </div>
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
              <div className="comp-proof-tag">
                <i className="fa-brands fa-android"></i> App v2.6.2 Available
              </div>
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
                  <td className="highlight-zyphuel">✅ 10 Liters to 10,000+ Liters</td>
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
                  <td className="highlight-zyphuel">✅ Yes (v2.6.2 with Live Radar Tracking)</td>
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

      {/* Interactive Quick Fuel & Generator Calculator */}
      <section className="calc-section">
        <div className="container">
          <div className="calc-box fade-in-up">
            <div className="calc-grid">
              {/* Left Column: Selector & Controls */}
              <div>
                <div className="section-badge-pill" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.3)' }}>
                  <i className="fa-solid fa-calculator"></i>
                  <span>Live Fuel Price Calculator</span>
                </div>
                <h2 className="calc-title">Instant Doorstep Fuel Cost Estimator</h2>
                <p className="calc-subtitle">
                  Calculate your fuel expense based on official OGRA rates in Lahore and dispatch a bowser to your location in seconds.
                </p>

                {/* Fuel Type Pills */}
                <div className="fuel-type-selector">
                  <button
                    type="button"
                    className={`fuel-type-pill ${calcFuel === 'petrol' ? 'active' : ''}`}
                    onClick={() => setCalcFuel('petrol')}
                  >
                    <i className="fa-solid fa-gas-pump"></i> Super Petrol
                  </button>
                  <button
                    type="button"
                    className={`fuel-type-pill ${calcFuel === 'diesel' ? 'active' : ''}`}
                    onClick={() => setCalcFuel('diesel')}
                  >
                    <i className="fa-solid fa-truck-droplet"></i> Euro-V Diesel
                  </button>
                  <button
                    type="button"
                    className={`fuel-type-pill ${calcFuel === 'highOctane' ? 'active' : ''}`}
                    onClick={() => setCalcFuel('highOctane')}
                  >
                    <i className="fa-solid fa-bolt-lightning"></i> High-Octane 97
                  </button>
                  <button
                    type="button"
                    className={`fuel-type-pill ${calcFuel === 'lpg' ? 'active' : ''}`}
                    onClick={() => setCalcFuel('lpg')}
                  >
                    <i className="fa-solid fa-fire-burner"></i> LPG Gas
                  </button>
                </div>

                {/* Liters Input & Presets */}
                <div style={{ marginBottom: '16px' }}>
                  <label htmlFor="litres-range" style={{ display: 'block', fontSize: '0.88rem', color: '#94a3b8', marginBottom: '8px', fontWeight: 600 }}>
                    Select Fuel Quantity (Liters): <span style={{ color: '#38bdf8', fontWeight: 800, fontSize: '1.1rem' }}>{calcLitres} {calcFuel === 'lpg' ? 'KG' : 'L'}</span>
                  </label>
                  <input
                    id="litres-range"
                    type="range"
                    min="10"
                    max="500"
                    step="5"
                    value={calcLitres}
                    onChange={(e) => setCalcLitres(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer' }}
                  />
                  <div className="volume-presets">
                    {[15, 30, 50, 100, 250, 500].map(v => (
                      <button
                        key={v}
                        type="button"
                        className={`vol-btn ${calcLitres === v ? 'active' : ''}`}
                        onClick={() => setCalcLitres(v)}
                      >
                        {v} {calcFuel === 'lpg' ? 'KG' : 'L'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Price Summary */}
              <div>
                <div className="calc-summary-card">
                  <div className="summary-row">
                    <span>Product Selected</span>
                    <strong style={{ color: '#ffffff', textTransform: 'capitalize' }}>{calcFuel}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Official OGRA Unit Rate</span>
                    <strong style={{ color: '#ffffff' }}>Rs. {currentUnitPrice.toFixed(2)} / {calcFuel === 'lpg' ? 'KG' : 'L'}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Estimated Dispatch Window</span>
                    <strong style={{ color: '#10b981' }}>15–30 Mins (Lahore)</strong>
                  </div>
                  <div className="summary-row">
                    <span>Measurement Accuracy</span>
                    <strong style={{ color: '#ffffff' }}>0.01L Calibrated</strong>
                  </div>

                  <div className="summary-total">
                    <span className="summary-total-label">Estimated Total:</span>
                    <span className="summary-total-val">Rs. {calculatedTotal}</span>
                  </div>

                  <div className="calc-action-buttons">
                    <Link to={`/order/?fuel=${calcFuel}&qty=${calcLitres}`} className="btn btn-primary" style={{ textAlign: 'center', justifyContent: 'center' }}>
                      <i className="fa-solid fa-gas-pump"></i> Proceed with Order
                    </Link>
                    <a
                      href={`https://wa.me/923230112464?text=${encodeURIComponent(`Hello Zyphuel! I want to order ${calcLitres}${calcFuel === 'lpg' ? 'KG' : 'L'} of ${calcFuel.toUpperCase()} at Rs. ${currentUnitPrice}/L (Total: Rs. ${calculatedTotal}). Please dispatch a bowser to my location in Lahore.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp-dispatch"
                    >
                      <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.2rem' }}></i> Instant WhatsApp Dispatch
                    </a>
                  </div>
                </div>
              </div>
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

      {/* Blog & Articles Section */}
      <section id="blog" className="blog-section section-padding">
        <div className="container">
          <div className="blog-header fade-in-up">
            <h2 className="section-title">Blog & Articles</h2>
            <p className="section-subtitle">
              Read the latest updates about mobile fuel logistics, digital accelerators,
              energy mobility, and our partnership engineering breakthroughs.
            </p>
            <div style={{ textAlign: 'center', marginTop: '12px' }}>
              <div className="startup-slogan-pill">
                <i className="fa-solid fa-rocket" style={{ color: '#0284c7' }}></i>
                <span>
                  <strong>Not a corporate giant — just an agile startup</strong> delivering certified doorstep fuel with care across Lahore.
                </span>
              </div>
            </div>
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

