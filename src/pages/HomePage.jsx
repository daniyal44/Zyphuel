import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import HeroGraphic from '../components/HeroGraphic'
import { articles } from '../data/articles'
import BlogCard from '../components/BlogCard'
import BlogModal from '../components/BlogModal'
import Carousel3D from '../components/Carousel3D'
import { useSEO } from '../hooks/useSEO'

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedArticle, setSelectedArticle] = useState(null)

  useSEO({
    title: 'Diesel & Petrol Delivery in Lahore | Zyphuel Mobile Refueling',
    description: 'Zyphuel delivers petrol and diesel to your door in Lahore — homes, generators, and commercial fleets. Calibrated metering, live GPS tracking, and 24/7 dispatch. Order online or on the app.',
    keywords: [
      'fuel delivery Lahore', 'diesel delivery Lahore', 'petrol delivery Lahore',
      'mobile refueling Pakistan', 'doorstep fuel delivery', 'generator diesel delivery',
      'bulk diesel supplier Lahore', 'fleet refueling service', 'on-demand fuel delivery app'
    ],
    image: 'https://zyphuel.netlify.app/images/logo.png',
    url: 'https://zyphuel.netlify.app',
    type: 'website',
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Zyphuel",
      "alternateName": ["zphuel"],
      "description": "Zyphuel delivers petrol and diesel to your location in Lahore, Pakistan — serving households, generator owners, and commercial fleets with calibrated metering and live GPS tracking.",
      "url": "https://zyphuel.netlify.app",
      "logo": "https://zyphuel.netlify.app/images/logo.png",
      "telephone": "+923230112464",
      "priceRange": "$$",
      "areaServed": {
        "@type": "City",
        "name": "Lahore"
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

  return (
    <main id="main-content" ref={pageRef}>
      {/* Hero Section */}
      <section id="home" className="hero" style={{ minHeight: 'calc(100vh - var(--nav-height))', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div className="hero-grid">
            {/* Left: Content */}
            <div className="hero-content fade-in-up">
              <div className="hero-subtitle-badge">
                <i className="fa-solid fa-gas-pump"></i>
                <span>Fuel on Your Doorstep – Lahore</span>
              </div>
              <h1 className="hero-title">
                Reliable <span>Fuel Delivery</span>
              </h1>
              <p className="hero-description">
                From diesel to petrol – order online and get premium fuel delivered directly
                to your vehicle, fleet yard, event generator, or construction site. Safe,
                swift, and transparent.
              </p>
              <div className="hero-ctas">
                <Link to="/order" className="btn btn-primary">
                  <i className="fa-solid fa-gas-pump"></i> Order Fuel Now
                </Link>
                <Link to="/about" className="btn btn-ghost">
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
                  <span>Fast 45-Min ETA</span>
                </div>
                <div className="hero-trust-badge">
                  <i className="fa-solid fa-shield-halved"></i>
                  <span>Genuine Fuel</span>
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
        </div>
      </section>

      {/* Slideshow Section - 3D Card Carousel */}
      <Carousel3D />

      {/* Global AI & Search Engine Directory Index */}

      {/* Detailed Blog Modal */}
      <BlogModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </main>
  )
}
