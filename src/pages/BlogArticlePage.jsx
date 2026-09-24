import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { articles } from '../data/articles'
import { useSEO } from '../hooks/useSEO'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useToast } from '../context/ToastContext'
import Breadcrumbs from '../components/Breadcrumbs'
import ReadingProgressBar from '../components/ReadingProgressBar'
import { APP_VERSION } from '../data/appVersion'

export default function BlogArticlePage() {
  const { slug } = useParams()
  const article = articles.find(a => a.slug === slug)
  const pageRef = useScrollReveal()
  const { showToast } = useToast()
  const [activeFaq, setActiveFaq] = useState(null)

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx)
  }

  const articleUrl = `https://zyphuel.netlify.app/blog/${slug}/`

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(articleUrl)
      showToast('Article link copied to clipboard!', 'success')
    }
  }

  // Construct dynamic Schema.org graph for the article
  const schemaGraph = article ? [
    {
      "@type": article.category.includes('App') || article.slug.includes('telemetry') ? "TechArticle" : "Article",
      "@id": `${articleUrl}#article`,
      "headline": article.title,
      "description": article.summary,
      "image": article.image,
      "datePublished": article.date,
      "dateModified": "2026-09-06T00:00:00+05:00",
      "author": {
        "@type": article.author.includes('CEO') ? "Person" : "Organization",
        "name": article.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Zyphuel",
        "logo": "https://zyphuel.netlify.app/images/logo.png"
      },
      "mainEntityOfPage": articleUrl,
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".article-takeaways-box", ".article-lead-summary"]
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zyphuel.netlify.app/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://zyphuel.netlify.app/blog/" },
        { "@type": "ListItem", "position": 3, "name": article.title, "item": articleUrl }
      ]
    }
  ] : null

  if (article && article.faqs && article.faqs.length > 0) {
    schemaGraph.push({
      "@type": "FAQPage",
      "@id": `${articleUrl}#faq`,
      "mainEntity": article.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    })
  }

  useSEO({
    title: article ? `${article.title} | Zyphuel Blog` : 'Article Not Found | Zyphuel',
    description: article ? article.summary : 'The requested article could not be found.',
    keywords: article ? [...article.tags, 'fuel delivery Lahore', 'diesel delivery Lahore', 'Zyphuel energy guide'] : [],
    image: article ? article.image : undefined,
    url: articleUrl,
    canonicalPath: article ? `/blog/${slug}/` : undefined,
    type: 'article',
    schema: schemaGraph ? {
      "@context": "https://schema.org",
      "@graph": schemaGraph
    } : null
  })

  if (!article) {
    return (
      <div ref={pageRef} className="section-padding" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Article Not Found</h1>
        <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>The article you're looking for doesn't exist.</p>
        <Link to="/blog/" className="btn btn-primary">← Back to Blog</Link>
      </div>
    )
  }

  return (
    <div ref={pageRef}>
      <ReadingProgressBar />
      <article className="section-padding" style={{ maxWidth: '880px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <Breadcrumbs
          items={[
            { label: 'Blog', path: '/blog/' },
            { label: article.title, path: `/blog/${slug}/` }
          ]}
        />

        {/* Back Link */}
        <Link to="/blog/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', textDecoration: 'none', marginBottom: '1.5rem', fontSize: '0.95rem', fontWeight: 600 }} className="fade-in-up">
          <i className="fa-solid fa-arrow-left"></i> Back to All Articles
        </Link>

        {/* Category & Meta */}
        <div className="fade-in-up" style={{ marginBottom: '1rem' }}>
          <span className={`blog-card-category ${article.categoryClass}`}>{article.category}</span>
        </div>

        {/* Title */}
        <h1 className="fade-in-up article-header" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', lineHeight: 1.28, marginBottom: '1.25rem', color: 'var(--text-primary)', fontWeight: 800 }}>
          {article.title}
        </h1>

        {/* Author, Date & Reading Time Bar */}
        <div className="fade-in-up" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.92rem', flexWrap: 'wrap', borderBottom: '1px solid var(--border-color, #e2e8f0)', paddingBottom: '1rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            <i className={article.authorIcon} style={{ color: 'var(--brand-petrol, #0284c7)' }}></i>
            {article.author}
          </span>
          <span>•</span>
          <span><i className="fa-regular fa-calendar-days" style={{ marginRight: '0.35rem' }}></i>{article.date}</span>
          <span>•</span>
          <span><i className="fa-regular fa-clock" style={{ marginRight: '0.35rem' }}></i>{article.readTime}</span>
        </div>

        {/* Hero Image */}
        <div className="fade-in-up" style={{ marginBottom: '2rem', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
          <img
            src={article.image}
            alt={article.title}
            loading="eager"
            fetchpriority="high"
            decoding="async"
            width="880"
            height="495"
            style={{ width: '100%', height: 'auto', display: 'block', aspectRatio: '16/9', objectFit: 'cover' }}
          />
        </div>

        {/* Article Summary Lead Paragraph */}
        <div className="fade-in-up article-lead-summary" style={{ fontSize: '1.15rem', lineHeight: 1.7, color: 'var(--text-primary)', fontWeight: 500, marginBottom: '2rem', padding: '1rem 1.25rem', backgroundColor: '#f8fafc', borderLeft: '4px solid var(--brand-petrol, #0284c7)', borderRadius: '0 8px 8px 0' }}>
          {article.summary}
        </div>

        {/* Key Takeaways Box (AEO & GEO Executive Summary) */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="fade-in-up article-takeaways-box" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '1.5rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', color: '#166534', fontWeight: 700, fontSize: '1.1rem' }}>
              <i className="fa-solid fa-lightbulb" style={{ color: '#15803d' }}></i>
              <span>Key Takeaways &amp; Executive Summary</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.4rem', color: '#14532d', lineHeight: 1.65, fontSize: '0.96rem' }}>
              {article.keyTakeaways.map((takeaway, tIdx) => (
                <li key={tIdx} style={{ marginBottom: '0.5rem' }}>
                  {takeaway}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Table of Contents Quick Links */}
        {article.sections && article.sections.length > 0 && (
          <div className="fade-in-up" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem 1.5rem', marginBottom: '2.5rem' }}>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#334155', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <i className="fa-solid fa-list-ol" style={{ marginRight: '0.5rem', color: 'var(--brand-petrol)' }}></i>
              In This Comprehensive Guide:
            </div>
            <ol style={{ margin: 0, paddingLeft: '1.25rem', color: '#0284c7', fontSize: '0.93rem', lineHeight: 1.6 }}>
              {article.sections.map((sec, sIdx) => (
                <li key={sIdx} style={{ marginBottom: '0.35rem' }}>
                  <a href={`#section-${sIdx + 1}`} style={{ color: '#0369a1', textDecoration: 'none', fontWeight: 600 }}>
                    {sec.heading}
                  </a>
                </li>
              ))}
              {article.faqs && article.faqs.length > 0 && (
                <li style={{ marginBottom: '0.35rem' }}>
                  <a href="#article-faqs" style={{ color: '#0369a1', textDecoration: 'none', fontWeight: 600 }}>
                    Frequently Asked Questions (FAQs)
                  </a>
                </li>
              )}
            </ol>
          </div>
        )}

        {/* Structured Sections */}
        {article.sections ? (
          <div className="article-body">
            {article.sections.map((section, sIdx) => (
              <section key={sIdx} id={`section-${sIdx + 1}`} style={{ marginBottom: '2.75rem' }} className="fade-in-up">
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: 1.35, paddingTop: '0.5rem' }}>
                  {section.heading}
                </h2>
                {section.subheading && (
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--brand-petrol, #0284c7)', marginBottom: '1rem', lineHeight: 1.4 }}>
                    {section.subheading}
                  </h3>
                )}

                {section.paragraphs && section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} style={{ fontSize: '1.03rem', lineHeight: 1.8, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
                    {p}
                  </p>
                ))}

                {/* Optional Table */}
                {section.table && (
                  <div style={{ margin: '1.5rem 0 2rem 0', overflowX: 'auto', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    {section.table.caption && (
                      <div style={{ padding: '0.75rem 1rem', background: '#f1f5f9', fontWeight: 700, fontSize: '0.88rem', color: '#1e293b', borderBottom: '1px solid #e2e8f0' }}>
                        <i className="fa-solid fa-table" style={{ marginRight: '0.4rem', color: '#0284c7' }}></i>
                        {section.table.caption}
                      </div>
                    )}
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                      <thead>
                        <tr style={{ background: '#f8fafc', borderBottom: '2px solid #cbd5e1' }}>
                          {section.table.headers.map((head, hIdx) => (
                            <th key={hIdx} style={{ padding: '10px 14px', fontWeight: 700, color: '#0f172a' }}>
                              {head}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} style={{ borderBottom: '1px solid #e2e8f0', background: rIdx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} style={{ padding: '10px 14px', color: cIdx === 0 ? '#0f172a' : '#475569', fontWeight: cIdx === 0 ? 600 : 400 }}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Optional Quote */}
                {section.quote && (
                  <blockquote style={{ margin: '1.5rem 0', padding: '1.25rem 1.5rem', background: '#f8fafc', borderLeft: '4px solid #0284c7', borderRadius: '0 10px 10px 0', fontStyle: 'italic', color: '#1e293b' }}>
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.02rem', lineHeight: 1.6 }}>
                      "{section.quote.text}"
                    </p>
                    {section.quote.author && (
                      <cite style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#0284c7', fontStyle: 'normal' }}>
                        — {section.quote.author}
                      </cite>
                    )}
                  </blockquote>
                )}

                {/* Optional Bullets */}
                {section.bullets && (
                  <ul style={{ margin: '1rem 0 1.5rem 0', paddingLeft: '1.4rem', color: 'var(--text-primary)', lineHeight: 1.7, fontSize: '0.98rem' }}>
                    {section.bullets.map((b, bIdx) => (
                      <li key={bIdx} style={{ marginBottom: '0.5rem' }}>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        ) : (
          /* Fallback content */
          <div className="fade-in-up" style={{ lineHeight: 1.8, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
            {article.content.map((paragraph, idx) => (
              <p key={idx} style={{ marginBottom: '1.5rem' }}>
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {/* On-Page FAQ Accordion */}
        {article.faqs && article.faqs.length > 0 && (
          <section id="article-faqs" className="fade-in-up" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '2px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
              <i className="fa-solid fa-circle-question" style={{ color: '#0284c7', fontSize: '1.4rem' }}></i>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                Frequently Asked Questions
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {article.faqs.map((faq, fIdx) => {
                const isOpen = activeFaq === fIdx
                return (
                  <div
                    key={fIdx}
                    style={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      background: isOpen ? '#f8fafc' : '#ffffff',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <button
                      onClick={() => toggleFaq(fIdx)}
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '0.98rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        gap: '12px'
                      }}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <i
                        className={`fa-solid ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}
                        style={{ color: '#0284c7', flexShrink: 0, transition: 'transform 0.2s ease' }}
                      ></i>
                    </button>
                    {isOpen && (
                      <div style={{ padding: '0 20px 16px 20px', color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.65, borderTop: '1px solid #f1f5f9' }}>
                        {faq.answer}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Share and Action Toolbar */}
        <div className="fade-in-up" style={{ marginTop: '2.5rem', padding: '1.25rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            <i className="fa-solid fa-share-nodes" style={{ color: '#0284c7' }}></i> Share this Guide:
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' - ' + articleUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ fontSize: '0.82rem', padding: '6px 12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              title="Share on WhatsApp"
            >
              <i className="fa-brands fa-whatsapp" style={{ color: '#25D366' }}></i> WhatsApp
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ fontSize: '0.82rem', padding: '6px 12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              title="Share on LinkedIn"
            >
              <i className="fa-brands fa-linkedin" style={{ color: '#0077B5' }}></i> LinkedIn
            </a>
            <button
              onClick={handleCopyLink}
              className="btn btn-outline"
              style={{ fontSize: '0.82rem', padding: '6px 12px', display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
              title="Copy Link to Clipboard"
            >
              <i className="fa-solid fa-link"></i> Copy Link
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="fade-in-up" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color, #e0e0e0)' }}>
          {article.tags.map(tag => (
            <span key={tag} style={{ background: 'var(--bg-secondary, #f0f4f8)', padding: '0.35rem 0.85rem', borderRadius: '20px', fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              #{tag}
            </span>
          ))}
        </div>

        {/* Author Bio Box */}
        <div className="fade-in-up" style={{ marginTop: '2.5rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#0284c7', fontSize: '1.5rem' }}>
            <i className={article.authorIcon}></i>
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#64748b', fontWeight: 600 }}>Written By</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>{article.author}</div>
            <div style={{ fontSize: '0.86rem', color: '#475569', marginTop: '2px', lineHeight: 1.4 }}>
              Specialized research and engineering team at Zyphuel covering downstream petroleum regulations, IoT flow telemetry, and urban fuel logistics in Pakistan.
            </div>
          </div>
        </div>

        {/* Related Articles & Fuel Guides Internal Web */}
        <div className="fade-in-up" style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color, #e0e0e0)' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.2rem', color: 'var(--text-primary)' }}>
            Related Fuel Guides &amp; Energy Insights
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {articles
              .filter(a => a.id !== article.id)
              .slice(0, 3)
              .map(rel => (
                <Link
                  to={`/blog/${rel.slug}/`}
                  key={rel.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    color: 'inherit',
                    background: '#f8fafc',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: '1px solid #e2e8f0',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                >
                  <img src={rel.image} alt={rel.title} loading="lazy" decoding="async" width="280" height="150" style={{ width: '100%', height: '130px', objectFit: 'cover' }} />
                  <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase' }}>{rel.category}</span>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700, margin: '6px 0 0 0', lineHeight: 1.4, color: '#0f172a' }}>{rel.title}</h4>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '10px' }}><i className="fa-regular fa-clock"></i> {rel.readTime}</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="fade-in-up" style={{ marginTop: '3.5rem', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '16px', padding: '2.5rem 2rem', textAlign: 'center', color: '#ffffff', boxShadow: '0 12px 32px rgba(0,0,0,0.15)' }}>
          <span style={{ display: 'inline-block', background: 'rgba(56,189,248,0.15)', color: '#38bdf8', padding: '4px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 700, marginBottom: '12px' }}>
            Doorstep Fuel Logistics in Lahore
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '10px', color: '#ffffff' }}>
            Ready to Experience Modern Refueling?
          </h2>
          <p style={{ maxWidth: '580px', margin: '0 auto 24px auto', color: '#94a3b8', fontSize: '0.96rem', lineHeight: 1.6 }}>
            Order certified Euro-V Super Petrol, High-Octane 97, or Euro-V Diesel delivered to your doorstep within 45 minutes with calibrated 0.01L digital metering.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link to="/order/" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '0.96rem', fontWeight: 700 }}>
              <i className="fa-solid fa-truck-fast"></i> Order Fuel Online (45 Mins SLA)
            </Link>
            <Link to="/download/" className="btn btn-secondary" style={{ padding: '12px 24px', fontSize: '0.96rem', fontWeight: 700 }}>
              <i className="fa-brands fa-android"></i> Download APK (v{APP_VERSION})
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
