import { useParams, Link } from 'react-router-dom'
import { articles } from '../data/articles'
import { useSEO } from '../hooks/useSEO'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function BlogArticlePage() {
  const { slug } = useParams()
  const article = articles.find(a => a.slug === slug)
  const pageRef = useScrollReveal()

  useSEO({
    title: article ? `${article.title} | Zyphuel Blog` : 'Article Not Found | Zyphuel',
    description: article ? article.summary : 'The requested article could not be found.',
    keywords: article ? article.tags : [],
    image: article ? article.image : undefined,
    url: `https://zyphuel.netlify.app/blog/${slug}`,
    type: 'article',
    schema: article ? {
      "@type": "Article",
      "headline": article.title,
      "description": article.summary,
      "image": article.image,
      "datePublished": article.date,
      "author": {
        "@type": "Organization",
        "name": article.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Zyphuel",
        "logo": "https://zyphuel.netlify.app/images/logo.png"
      }
    } : null
  })

  if (!article) {
    return (
      <div ref={pageRef} className="section-padding" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Article Not Found</h1>
        <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>The article you're looking for doesn't exist.</p>
        <Link to="/blog" className="btn btn-primary">← Back to Blog</Link>
      </div>
    )
  }

  return (
    <div ref={pageRef}>
      <article className="section-padding" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Back Link */}
        <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', textDecoration: 'none', marginBottom: '2rem', fontSize: '0.95rem' }} className="fade-in-up">
          <i className="fa-solid fa-arrow-left"></i> Back to Blog
        </Link>

        {/* Category & Meta */}
        <div className="fade-in-up" style={{ marginBottom: '1rem' }}>
          <span className={`blog-card-category ${article.categoryClass}`}>{article.category}</span>
        </div>

        {/* Title */}
        <h1 className="fade-in-up" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', lineHeight: 1.3, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          {article.title}
        </h1>

        {/* Author & Date */}
        <div className="fade-in-up" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem', flexWrap: 'wrap' }}>
          <span><i className={article.authorIcon} style={{ marginRight: '0.4rem' }}></i>{article.author}</span>
          <span>•</span>
          <span>{article.date}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>

        {/* Hero Image */}
        <div className="fade-in-up" style={{ marginBottom: '2rem', borderRadius: '12px', overflow: 'hidden' }}>
          <img
            src={article.image}
            alt={article.title}
            loading="lazy"
            style={{ width: '100%', height: 'auto', display: 'block', aspectRatio: '16/9', objectFit: 'cover' }}
          />
        </div>

        {/* Content Paragraphs */}
        <div className="fade-in-up" style={{ lineHeight: 1.8, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
          {article.content.map((paragraph, idx) => (
            <p key={idx} style={{ marginBottom: '1.5rem' }}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags */}
        <div className="fade-in-up" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color, #e0e0e0)' }}>
          {article.tags.map(tag => (
            <span key={tag} style={{ background: 'var(--bg-secondary, #f0f4f8)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>#{tag}</span>
          ))}
        </div>

        {/* CTA */}
        <div className="fade-in-up" style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link to="/order" className="btn btn-primary">
            <i className="fa-solid fa-gas-pump"></i> Order Fuel Now
          </Link>
        </div>
      </article>
    </div>
  )
}
