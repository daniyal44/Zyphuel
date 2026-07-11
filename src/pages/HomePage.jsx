import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import HeroGraphic from '../components/HeroGraphic'
import { articles } from '../data/articles'
import BlogCard from '../components/BlogCard'
import BlogModal from '../components/BlogModal'
import Carousel3D from '../components/Carousel3D'

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedArticle, setSelectedArticle] = useState(null)

  // Pass activeFilter to useScrollReveal so scroll animation re-triggers on tab changes
  const pageRef = useScrollReveal([activeFilter])

  const filteredArticles = activeFilter === 'All'
    ? articles
    : articles.filter(a => a.category === activeFilter)

  return (
    <div ref={pageRef}>
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
                  Learn More <i className="fa-solid fa-arrow-right"></i>
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
            {['All', 'Zyphuel Energy', 'Scale Verse Tech'].map(filter => (
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
    </div>
  )
}
