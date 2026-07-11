import { useEffect } from 'react'

export default function BlogModal({ article, onClose }) {
  // Escape key event listener to close modal + body scroll prevention
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (article) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [article, onClose])

  return (
    <div
      className={`blog-modal-backdrop ${article ? 'open' : ''}`}
      onClick={onClose}
    >
      {article && (
        <div className="blog-modal" onClick={e => e.stopPropagation()}>
          <button
            className="blog-modal-close-btn"
            onClick={onClose}
            aria-label="Close article modal"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className="blog-modal-img-wrapper">
            <span className={`blog-modal-category ${article.categoryClass}`}>
              {article.category}
            </span>
            <img
              src={article.image}
              alt={article.title}
              className="blog-modal-img"
            />
          </div>
          <div className="blog-modal-body-wrapper">
            <div className="blog-modal-meta">
              <span>
                <i className="fa-regular fa-calendar"></i> {article.date}
              </span>
              <span>•</span>
              <span>
                <i className="fa-regular fa-clock"></i> {article.readTime}
              </span>
              <span>•</span>
              <span>
                <i className={article.authorIcon}></i> {article.author}
              </span>
            </div>
            <h2 className="blog-modal-title">{article.title}</h2>
            <div className="blog-modal-text-content">
              {article.content.map((paragraph, index) => (
                <p key={index} className="blog-modal-paragraph">{paragraph}</p>
              ))}
            </div>
            <div className="blog-modal-tags">
              {article.tags.map(tag => (
                <span key={tag} className="blog-modal-tag">#{tag}</span>
              ))}
            </div>
          </div>
          <div className="blog-modal-footer">
            <button className="btn btn-ghost" onClick={onClose}>
              Close Window
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
