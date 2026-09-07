import React from 'react'
import { Link } from 'react-router-dom'

export default function BlogCard({ article, index, onReadMore }) {
  return (
    <article
      className="blog-card fade-in-up"
      style={{ transitionDelay: `${0.05 + (index % 3) * 0.05}s` }}
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      <div className="blog-card-image-wrapper">
        <span className={`blog-card-category-badge ${article.categoryClass}`}>
          {article.category}
        </span>
        <Link to={`/blog/${article.slug}/`} tabIndex="-1" aria-hidden="true">
          <img
            src={article.image}
            alt={`${article.title} - Zyphuel Pakistan Number 1 Fuel Delivery Article`}
            title={`${article.title} - Zyphuel Fuel Logistics`}
            className="blog-card-img"
            loading="lazy"
            decoding="async"
            width="360"
            height="240"
            itemProp="image"
          />
        </Link>
      </div>
      <div className="blog-card-content">
        <div className="blog-card-meta">
          <i className="fa-regular fa-calendar"></i>
          <span itemProp="datePublished">{article.date}</span>
          <span>•</span>
          <i className="fa-regular fa-clock"></i>
          <span>{article.readTime}</span>
        </div>
        <h3 className="blog-card-title" itemProp="headline">
          <Link to={`/blog/${article.slug}/`} style={{ color: 'inherit', textDecoration: 'none' }}>
            {article.title}
          </Link>
        </h3>
        <p className="blog-card-desc" itemProp="description">{article.summary}</p>
        <div className="blog-card-tags">
          {article.tags.slice(0, 2).map(tag => (
            <span key={tag} className="blog-card-tag">
              #{tag}
            </span>
          ))}
        </div>
        <div className="blog-card-footer">
          <div className="blog-card-author" itemProp="author" itemScope itemType="https://schema.org/Person">
            <div className="blog-card-author-icon">
              <i className={article.authorIcon}></i>
            </div>
            <span className="blog-card-author-name" itemProp="name">{article.author}</span>
          </div>
          <Link
            to={`/blog/${article.slug}/`}
            className="blog-card-link"
            aria-label={`Read full article: ${article.title}`}
          >
            Read Article <i className="fa-solid fa-chevron-right"></i>
          </Link>
        </div>
      </div>
    </article>
  )
}
