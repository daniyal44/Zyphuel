import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import ServicesGraphic from '../components/ServicesGraphic'
import ServiceCard from '../components/ServiceCard'
import StepCard from '../components/StepCard'
import { FUEL_RATES, servicesB2C, servicesB2B, steps } from '../data/servicesData'

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('consumer')
  const pageRef = useScrollReveal([activeTab])
  const navigate = useNavigate()

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
                <div className="hero-subtitle-badge" style={{ backgroundColor: 'var(--brand-petrol)', borderColor: 'rgba(58,134,200,0.15)', color: '#1a4f7c' }}>
                  <span>Premium Fuel Mobility</span>
                </div>
                <h1 className="hero-title" style={{ marginBottom: '16px' }}>
                  We Bring the <span>Fuel Station</span> to You
                </h1>
                <p className="hero-description" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  Eliminate time-consuming petrol station trips. Zyphuel delivers terminal-grade petrol,
                  high-octane, and diesel directly into your vehicle, generator, or fleet yard.
                  Enjoy digital telemetry, transparent billing, and 24/7 express dispatch across Lahore.
                </p>
                <div className="live-pricing-bar fade-in-up" style={{ marginBottom: '28px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ background: 'rgba(255, 255, 255, 0.8)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', backdropFilter: 'blur(4px)' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--brand-petrol)' }}></span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>Petrol: Rs. {FUEL_RATES.petrol.toFixed(2)}/L</span>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.8)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', backdropFilter: 'blur(4px)' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#7c3aed' }}></span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>Diesel: Rs. {FUEL_RATES.diesel.toFixed(2)}/L</span>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.8)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', backdropFilter: 'blur(4px)' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0ea5e9' }}></span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>High-Octane: Rs. {FUEL_RATES.highOctane.toFixed(2)}/L</span>
                  </div>
                </div>
                <div className="hero-ctas">
                  <button onClick={() => handleOrderRedirect('petrol', 50)} className="btn btn-primary">
                    <i className="fa-solid fa-cart-shopping"></i> Order Fuel Now
                  </button>
                  <a href="#catalog" className="btn btn-ghost">
                    Our Catalog <i className="fa-solid fa-arrow-down"></i>
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

        {/* Services Catalog */}
        <section id="catalog" className="section-padding" style={{ backgroundColor: '#ffffff' }}>
          <div className="container">
            <div className="section-header fade-in-up">
              <h2 className="section-title">Explore Our Services</h2>
              <p className="section-subtitle">
                Select your category to browse personalized refueling services tailored for individual drivers or large-scale enterprise operations.
              </p>
            </div>

            <div className="services-tabs-container fade-in-up">
              <div className="services-tabs">
                <button
                  className={`services-tab-btn ${activeTab === 'consumer' ? 'active' : ''}`}
                  onClick={() => setActiveTab('consumer')}
                >
                  <i className="fa-solid fa-user"></i> Consumer Services
                </button>
                <button
                  className={`services-tab-btn ${activeTab === 'enterprise' ? 'active' : ''}`}
                  onClick={() => setActiveTab('enterprise')}
                >
                  <i className="fa-solid fa-building"></i> Enterprise Solutions
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

        {/* How It Works */}
        <section className="section-padding" style={{ borderTop: '1px solid var(--border-color)', backgroundColor: '#ffffff' }}>
          <div className="container">
            <div className="section-header fade-in-up">
              <h2 className="section-title">How It Works</h2>
              <p className="section-subtitle">Four simple steps to refuel your assets safely without visiting a petrol pump.</p>
            </div>

            <div className="steps-grid">
              {steps.map((step, idx) => (
                <StepCard
                  key={step.number}
                  step={step}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Bookshelf Animation */}
        <section style={{ padding: '4rem 0', backgroundColor: '#f3f4f6' }}>
          <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#1f2937', marginBottom: '2rem' }}>
            <h1>Services Book Section</h1>
          </div>
          <div style={{ width: '100%', height: '600px', maxWidth: '1200px', margin: '0 auto' }}>
            <iframe
              src="/src/pages/books.html"   
              title="Book Animation"
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </div>
        </section>
      </main>
    </div>
  )
}