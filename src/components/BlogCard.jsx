import React from 'react'

export default function BlogCard({ article, index, onReadMore }) {
  return (
    <article
      className="blog-card fade-in-up"
      style={{ transitionDelay: `${0.05 + (index % 3) * 0.05}s` }}
    >
      <div className="blog-card-image-wrapper">
        <span className={`blog-card-category-badge ${article.categoryClass}`}>
          {article.category}
        </span>
        <img
          src={article.image}
          alt={article.title}
          className="blog-card-img"
          loading="lazy"
        />
      </div>
      <div className="blog-card-content">
        <div className="blog-card-meta">
          <i className="fa-regular fa-calendar"></i>
          <span>{article.date}</span>
          <span>•</span>
          <i className="fa-regular fa-clock"></i>
          <span>{article.readTime}</span>
        </div>
        <h3 className="blog-card-title">{article.title}</h3>
        <p className="blog-card-desc">{article.summary}</p>
        <div className="blog-card-tags">
          {article.tags.map(tag => (
            <span key={tag} className="blog-card-tag">
              #{tag}
            </span>
          ))}
        </div>
        <div className="blog-card-footer">
          <div className="blog-card-author">
            <div className="blog-card-author-icon">
              <i className={article.authorIcon}></i>
            </div>
            <span className="blog-card-author-name">{article.author}</span>
          </div>
          <button
            className="blog-card-link"
            onClick={() => onReadMore(article)}
            style={{ cursor: 'pointer', border: 'none', background: 'none' }}
          >
            Read Article <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </article>
  )
}
