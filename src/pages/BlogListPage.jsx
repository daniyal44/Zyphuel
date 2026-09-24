import { useState } from 'react'
import { Link } from 'react-router-dom'
import { articles } from '../data/articles'
import { useSEO } from '../hooks/useSEO'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Breadcrumbs from '../components/Breadcrumbs'

export default function BlogListPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const pageRef = useScrollReveal([activeFilter])

  useSEO({
    title: 'Zyphuel Blog | Fuel Delivery, Energy & Vehicle Guides',
    description: 'Read the latest articles about fuel delivery, generator refueling, LPG gas delivery, and mobile energy logistics in Lahore, Pakistan.',
    keywords: ['fuel delivery blog', 'diesel delivery articles', 'generator refueling guide', 'Lahore fuel news', 'Zyphuel blog'],
    url: 'https://zyphuel.netlify.app/blog/',
    canonicalPath: '/blog/',
    type: 'website'
  })

  const filteredArticles = activeFilter === 'All'
    ? articles
    : articles.filter(a => a.category === activeFilter)

  return (
    <div ref={pageRef}>
      <section className="blog-section section-padding">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Blog', path: '/blog/' }]} />
          <div className="blog-header fade-in-up">
            <h1 className="section-title">Zyphuel Blog &amp; Fuel Guides</h1>
            <p className="section-subtitle">
              Read the latest updates about mobile fuel logistics, energy mobility,
              and fuel delivery innovations in Lahore.
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

          {/* Article Cards */}
          <div className="blog-grid">
            {filteredArticles.map((article, idx) => (
              <Link
                to={`/blog/${article.slug}/`}
                key={article.id}
                className="blog-card fade-in-up"
                style={{ transitionDelay: `${idx * 0.1}s`, textDecoration: 'none', color: 'inherit' }}
              >
                <div className="blog-card-image-wrapper">
                  <img src={article.image} alt={article.title} loading="lazy" decoding="async" width="400" height="225" className="blog-card-image" />
                </div>
                <div className="blog-card-content">
                  <span className={`blog-card-category ${article.categoryClass}`}>{article.category}</span>
                  <h3 className="blog-card-title">{article.title}</h3>
                  <p className="blog-card-summary">{article.summary}</p>
                  <div className="blog-card-meta">
                    <span><i className={article.authorIcon}></i> {article.author}</span>
                    <span>{article.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom Help & Refueling Dispatch Banner */}
          <div className="fade-in-up" style={{
            marginTop: '50px',
            background: 'linear-gradient(135deg, #0b1329 0%, #0f172a 100%)',
            borderRadius: '16px',
            padding: '30px',
            color: '#ffffff',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            border: '1px solid rgba(56, 189, 248, 0.2)'
          }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '6px', color: '#ffffff' }}>
                Need Fuel or Energy Logistics Advice?
              </h3>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', maxWidth: '560px', lineHeight: 1.5 }}>
                Have questions about standby generator diesel logistics or need a custom corporate refueling proposal in Lahore? Reach out to our operational dispatch desk.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link to="/order/" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
                <i className="fa-solid fa-gas-pump"></i> Order Fuel
              </Link>
              <Link to="/contact/" className="btn btn-ghost" style={{ padding: '10px 20px', fontSize: '0.9rem', color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.3)' }}>
                <i className="fa-solid fa-headset"></i> Contact Us
              </Link>
              <Link to="/services/" className="btn btn-ghost" style={{ padding: '10px 20px', fontSize: '0.9rem', color: '#cbd5e1', borderColor: 'rgba(255, 255, 255, 0.15)' }}>
                <i className="fa-solid fa-list-check"></i> All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
