import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import ServicesGraphic from '../components/ServicesGraphic'
import ServiceCard from '../components/ServiceCard'
import StepCard from '../components/StepCard'
import {
  servicesB2C,
  servicesB2B,
  steps,
  whatWeProvide,
  whatWeDoNotProvide,
  operationalPipeline,
  serviceArticles
} from '../data/servicesData'
import { useSEO } from '../hooks/useSEO'
import BrandAIIndex from '../components/BrandAIIndex'
import { useFuelPrices } from '../context/FuelPriceContext'

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('consumer')
  const { prices: livePrices } = useFuelPrices()
  const pageRef = useScrollReveal([activeTab])
  const navigate = useNavigate()

  useSEO({
    title: 'Doorstep Fuel Delivery Services in Lahore | Petrol & Diesel | Zyphuel',
    description: 'Explore Zyphuel\'s 24/7 doorstep fuel delivery services across Lahore: Euro-V Super Petrol, High-Octane 97, Generator Diesel, LPG Cylinders, and Corporate Fleet Solutions with calibrated flow metering and live GPS tracking.',
    keywords: [
      'diesel', 'diesel delivery Lahore', 'petrol and diesel', 'patrol and diesel', 'generator diesel refueling Lahore',
      'commercial diesel supply', 'diesel gasoline', 'i want diesel', 'perol price in Pakistan', 'fuel price in pakistan',
      'desil price in pakistan', 'gas price in paksitan', 'oil price in Pakistan', 'petrol price cheker wesbite',
      'petrol rate today', 'diesel rate today', 'OGRA fuel rates', 'fleet refueling Pakistan', 'doorstep petrol delivery',
      'LPG gas cylinder refills', 'water tanker refill Lahore', 'Zyphuel services', 'ItxMDK'
    ],
    image: 'https://zyphuel.netlify.app/images/fuel.png',
    url: 'https://zyphuel.netlify.app/services',
    type: 'website',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": "https://zyphuel.netlify.app/services#service",
          "name": "On-Demand Doorstep Fuel & Utility Delivery",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Zyphuel Mobile Refueling",
            "url": "https://zyphuel.netlify.app",
            "telephone": "+923230112464",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "75-Main Boulevard, Gulberg III",
              "addressLocality": "Lahore",
              "addressRegion": "Punjab",
              "postalCode": "54000",
              "addressCountry": "PK"
            }
          },
          "serviceType": "Energy Logistics and Fuel Delivery",
          "areaServed": "Lahore, Pakistan",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Zyphuel Energy & Utility Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Doorstep Petrol & High-Octane Refueling",
                  "description": "On-demand Super Petrol and High-Octane 97 delivered directly into parked vehicle tanks."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Commercial Standby Generator Diesel Refueling",
                  "description": "Euro-V diesel delivery for commercial generators, IT plazas, hospitals, and residential estates."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Corporate Fleet Management & Micro-Bowser Dispatch",
                  "description": "Overnight fleet refueling with RFID telemetry and monthly consolidated invoicing."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "LPG Gas Cylinder Refills & Swap",
                  "description": "Doorstep sealed LPG gas cylinder refills with weight verification."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Bulk Water Tanker Refill",
                  "description": "Potable clean water tanker delivery at Rs. 100 per gallon."
                }
              }
            ]
          }
        },
        {
          "@type": "FAQPage",
          "@id": "https://zyphuel.netlify.app/services#faq",
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
        }
      ]
    }
  })

  const handleOrderRedirect = (fuelTypeKey, qtyVal) => {
    navigate('/order', {
      state: {
        fuelType: fuelTypeKey,
        qty: qtyVal || 50
      }
    })
    window.scrollTo(0, 0)
  }

  return (
    <div ref={pageRef}>
      <main style={{ paddingTop: 'var(--nav-height)' }}>

        {/* Hero Section */}
        <section className="services-hero">
          <div className="container">
            <div className="services-hero-grid">
              <div className="services-hero-content fade-in-up">
                <div className="hero-subtitle-badge" style={{ backgroundColor: 'rgba(58,134,200,0.12)', borderColor: 'rgba(58,134,200,0.25)', color: '#1a4f7c' }}>
                  <i className="fa-solid fa-truck-droplet"></i>
                  <span>24/7 On-Demand Fuel Mobility Lahore</span>
                </div>
                <h1 className="hero-title" style={{ marginBottom: '16px' }}>
                  Doorstep <span>Petrol, Diesel &amp; Utilities</span> Refueling in Lahore
                </h1>
                <p className="hero-description" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.65' }}>
                  Eliminate petrol station trips, long queues, and fuel shortage risks. Zyphuel delivers terminal-grade 
                  <strong> Euro-V Super Petrol</strong>, <strong>High-Octane 97</strong>, and <strong>Ultra-Low Sulfur Diesel</strong> directly 
                  into your parked car, commercial generator, or enterprise fleet with digital flow-meter accuracy across Lahore.
                </p>

                {/* Live Rates Ticker */}
                <div className="live-pricing-bar fade-in-up" style={{ marginBottom: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--brand-petrol)' }}></span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>Petrol: Rs. {livePrices.petrol.toFixed(2)}/L</span>
                  </div>
                  <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#7c3aed' }}></span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>Diesel: Rs. {livePrices.diesel.toFixed(2)}/L</span>
                  </div>
                  <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#0ea5e9' }}></span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>High-Octane: Rs. {livePrices.highOctane.toFixed(2)}/L</span>
                  </div>
                  <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f97316' }}></span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>LPG: Rs. {livePrices.lpg ? livePrices.lpg.toFixed(2) : '241.43'}/kg</span>
                  </div>
                  <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#06b6d4' }}></span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>Water: Rs. 100/gal</span>
                  </div>
                </div>

                <div className="hero-ctas" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <button onClick={() => handleOrderRedirect('petrol', 50)} className="btn btn-primary">
                    <i className="fa-solid fa-cart-shopping"></i> Order Fuel Online
                  </button>
                  <Link to="/download" className="btn btn-secondary">
                    <i className="fa-solid fa-mobile-screen-button"></i> Download Mobile App v1.5.0
                  </Link>
                  <a href="#services-scope" className="btn btn-ghost">
                    Service Scope &amp; Safety <i className="fa-solid fa-arrow-down"></i>
                  </a>
                </div>
              </div>
              <div className="services-hero-graphic fade-in-up" style={{ transitionDelay: '0.2s' }}>
                <div className="isometric-3d-container">
                  <ServicesGraphic />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Catalog (Consumer vs Enterprise) */}
        <section id="catalog" className="section-padding" style={{ backgroundColor: '#ffffff' }}>
          <div className="container">
            <div className="section-header fade-in-up">
              <span className="section-eyebrow" style={{ color: 'var(--brand-petrol)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
                Complete Service Catalog
              </span>
              <h2 className="section-title">Explore Our Tailored Refueling Services</h2>
              <p className="section-subtitle">
                Select your category to browse personalized refueling services engineered for individual motorists, residential estates, or large-scale corporate fleets.
              </p>
            </div>

            <div className="services-tabs-container fade-in-up" style={{ marginBottom: '32px' }}>
              <div className="services-tabs">
                <button
                  className={`services-tab-btn ${activeTab === 'consumer' ? 'active' : ''}`}
                  onClick={() => setActiveTab('consumer')}
                >
                  <i className="fa-solid fa-user"></i> Consumer &amp; Domestic Services
                </button>
                <button
                  className={`services-tab-btn ${activeTab === 'enterprise' ? 'active' : ''}`}
                  onClick={() => setActiveTab('enterprise')}
                >
                  <i className="fa-solid fa-building"></i> Commercial &amp; Enterprise Solutions
                </button>
              </div>
            </div>

            <div className="services-grid-enhanced">
              {(activeTab === 'consumer' ? servicesB2C : servicesB2B).map((svc, idx) => (
                <ServiceCard
                  key={svc.title}
                  svc={svc}
                  index={idx}
                  activeTab={activeTab}
                  onOrder={(fuelTypeKey) => handleOrderRedirect(fuelTypeKey, 50)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* What We Provide vs What We Do NOT Provide (Service Scope Matrix) */}
        <section id="services-scope" className="section-padding" style={{ backgroundColor: '#f8fafc', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="container">
            <div className="section-header fade-in-up" style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span className="section-eyebrow" style={{ color: 'var(--brand-petrol)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
                Service Transparency &amp; Safety Compliance
              </span>
              <h2 className="section-title">What We Provide vs. What We Do NOT Provide</h2>
              <p className="section-subtitle" style={{ maxWidth: '780px', margin: '0 auto' }}>
                Zyphuel operates under strict OGRA regulations, NFPA 30A hazardous material safety protocols, and calibrated electronic metering standards.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
              
              {/* Box 1: What We Provide */}
              <div style={{ background: '#ffffff', borderRadius: '14px', padding: '28px', border: '1px solid rgba(34,197,94,0.3)', boxShadow: '0 4px 16px rgba(34,197,94,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid rgba(34,197,94,0.15)' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(34,197,94,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a', fontSize: '1.2rem' }}>
                    <i className="fa-solid fa-circle-check"></i>
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#15803d', fontWeight: 700 }}>What Zyphuel Provides</h3>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Guaranteed Quality, Accuracy &amp; Safety Standards</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {whatWeProvide.map((item) => (
                    <div key={item.title} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <i className={`fa-solid ${item.icon}`} style={{ color: '#16a34a', fontSize: '1.1rem', marginTop: '3px' }}></i>
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.98rem', color: 'var(--text-primary)', marginBottom: '3px' }}>
                          {item.title}
                        </strong>
                        <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box 2: What We Do NOT Provide */}
              <div style={{ background: '#ffffff', borderRadius: '14px', padding: '28px', border: '1px solid rgba(239,68,68,0.3)', boxShadow: '0 4px 16px rgba(239,68,68,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid rgba(239,68,68,0.15)' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(239,68,68,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626', fontSize: '1.2rem' }}>
                    <i className="fa-solid fa-circle-xmark"></i>
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#b91c1c', fontWeight: 700 }}>What We Do NOT Do</h3>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Strict Hazardous &amp; Quality Red Lines</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {whatWeDoNotProvide.map((item) => (
                    <div key={item.title} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <i className={`fa-solid ${item.icon}`} style={{ color: '#dc2626', fontSize: '1.1rem', marginTop: '3px' }}></i>
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.98rem', color: 'var(--text-primary)', marginBottom: '3px' }}>
                          {item.title}
                        </strong>
                        <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Complete 6-Stage Operational Workflow */}
        <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
          <div className="container">
            <div className="section-header fade-in-up" style={{ textAlign: 'center', marginBottom: '44px' }}>
              <span className="section-eyebrow" style={{ color: 'var(--brand-petrol)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
                End-to-End Delivery Pipeline
              </span>
              <h2 className="section-title">How Your Fuel Moves From Depot to Destination</h2>
              <p className="section-subtitle" style={{ maxWidth: '820px', margin: '0 auto' }}>
                Every order follows a strictly monitored 6-stage operational lifecycle connecting customers, primary depots, smart dispatch telemetry, and certified bowser operators.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '24px' }}>
              {operationalPipeline.map((stage) => (
                <div
                  key={stage.stage}
                  style={{
                    background: '#f8fafc',
                    borderRadius: '12px',
                    padding: '24px',
                    border: '1px solid var(--border-color)',
                    position: 'relative',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--brand-petrol)', opacity: 0.8 }}>
                      Stage {stage.stage}
                    </span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, background: 'rgba(58,134,200,0.1)', color: 'var(--brand-petrol)', padding: '4px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <i className={`fa-solid ${stage.roleIcon}`}></i> {stage.role}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    {stage.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.55', margin: 0 }}>
                    {stage.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* In-Depth Service Articles & Knowledge Guides */}
        <section className="section-padding" style={{ backgroundColor: '#f1f5f9', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="container">
            <div className="section-header fade-in-up" style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span className="section-eyebrow" style={{ color: 'var(--brand-petrol)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
                Energy Logistics &amp; Technical Insights
              </span>
              <h2 className="section-title">In-Depth Fuel Logistics &amp; Engineering Articles</h2>
              <p className="section-subtitle" style={{ maxWidth: '780px', margin: '0 auto' }}>
                Authoritative guides on mobile refueling, volumetric calibration, generator maintenance, and corporate fleet economics.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {serviceArticles.map((art) => (
                <article
                  key={art.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: '14px',
                    padding: '32px',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--brand-petrol)', background: 'rgba(58,134,200,0.1)', padding: '5px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <i className={`fa-solid ${art.badgeIcon}`}></i> {art.badge}
                    </span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      <i className="fa-regular fa-clock"></i> {art.readTime}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px', lineHeight: '1.4' }}>
                    {art.title}
                  </h3>

                  <p style={{ fontSize: '0.96rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px', lineHeight: '1.6', background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', borderLeft: '4px solid var(--brand-petrol)' }}>
                    {art.summary}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.65' }}>
                    {art.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} style={{ margin: 0 }}>
                        {p}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
          <div className="container">
            <div className="section-header fade-in-up" style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span className="section-eyebrow" style={{ color: 'var(--brand-petrol)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
                Service FAQs
              </span>
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">
                Clear answers regarding delivery times, fuel calibration, pricing transparency, and safety protocols.
              </p>
            </div>

            <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '20px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                  <i className="fa-solid fa-circle-question text-primary"></i> What areas in Lahore are covered for doorstep petrol &amp; diesel delivery?
                </h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  Zyphuel operates citywide across Lahore, including DHA Phase 1 through Phase 9, Gulberg, Johar Town, Model Town, Bahria Town, Lahore Cantt, Garden Town, Faisal Town, Wapda Town, and Sundar &amp; Quaid-e-Azam Industrial Estates.
                </p>
              </div>

              <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '20px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                  <i className="fa-solid fa-circle-question text-primary"></i> How is fuel measured and calibrated during delivery?
                </h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  Every Zyphuel micro-bowser uses positive-displacement digital flow meters with optical encoders calibrated to national weights and measures standards. You receive a printed volumetric receipt and a real-time digital sync on your phone.
                </p>
              </div>

              <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '20px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                  <i className="fa-solid fa-circle-question text-primary"></i> Can I schedule recurring diesel deliveries for my commercial generator?
                </h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  Yes. We offer automated recurring replenishment contracts for commercial plazas, factories, hospitals, and schools. We monitor your consumption schedule and refill standby tanks before power outages occur.
                </p>
              </div>

              <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '20px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                  <i className="fa-solid fa-circle-question text-primary"></i> Is Cash on Delivery (COD) supported?
                </h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  Yes! Cash on Delivery (COD) is available for domestic orders up to 10 liters of fuel, 10 kg LPG, or 20 gallons of water. For commercial orders and fleets, direct bank transfers and monthly billing accounts are supported.
                </p>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '36px' }}>
              <button onClick={() => handleOrderRedirect('petrol', 50)} className="btn btn-primary btn-lg">
                <i className="fa-solid fa-truck-droplet"></i> Place Your Fuel Order Now
              </button>
            </div>
          </div>
        </section>

        {/* Bookshelf Animation */}
        <section style={{ padding: '4rem 0', backgroundColor: '#f3f4f6' }}>
          <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#1f2937', marginBottom: '2rem' }}>
            <h2>Services Knowledge &amp; Digital Library</h2>
          </div>
          <div style={{ width: '100%', height: '600px', maxWidth: '1200px', margin: '0 auto' }}>
            <iframe
              src="https://bookssection.netlify.app/"   
              title="Book Animation"
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </div>
        </section>

        {/* Global AI & Search Engine Directory Index */}
        <BrandAIIndex />
      </main>
    </div>
  )
}