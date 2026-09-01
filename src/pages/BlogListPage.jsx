import { useState } from 'react'
import { Link } from 'react-router-dom'
import { articles } from '../data/articles'
import { useSEO } from '../hooks/useSEO'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function BlogListPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const pageRef = useScrollReveal([activeFilter])

  useSEO({
    title: 'Fuel Delivery Blog & Articles | Zyphuel Lahore',
    description: 'Read the latest articles about fuel delivery, generator refueling, LPG gas delivery, and mobile energy logistics in Lahore, Pakistan.',
    keywords: ['fuel delivery blog', 'diesel delivery articles', 'generator refueling guide', 'Lahore fuel news', 'Zyphuel blog'],
    url: 'https://zyphuel.netlify.app/blog',
    type: 'website'
  })

  const filteredArticles = activeFilter === 'All'
    ? articles
    : articles.filter(a => a.category === activeFilter)

  return (
    <div ref={pageRef}>
      <section className="blog-section section-padding">
        <div className="container">
          <div className="blog-header fade-in-up">
            <h1 className="section-title">Blog & Articles</h1>
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
                to={`/blog/${article.slug}`}
                key={article.id}
                className="blog-card fade-in-up"
                style={{ transitionDelay: `${idx * 0.1}s`, textDecoration: 'none', color: 'inherit' }}
              >
                <div className="blog-card-image-wrapper">
                  <img src={article.image} alt={article.title} loading="lazy" className="blog-card-image" />
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
        </div>
      </section>
    </div>
  )
}
