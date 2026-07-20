import { useState } from 'react'
import { useToast } from '../context/ToastContext'
import './ViralShareHub.css'

export default function ViralShareHub() {
  const [isOpen, setIsOpen] = useState(false)
  const { showToast } = useToast()

  const shareUrl = 'https://zyphuel.netlify.app'
  const shareTitle = "Zyphuel – Pakistan’s #1 Fuel Supplier & Agency in Lahore"
  const shareText = "Check out Zyphuel - Pakistan's #1 On-Demand Mobile Fuel & Petrol Delivery Service in Lahore! 24/7 terminal-grade fuel delivered directly to your vehicle or generator. Order now:"

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        showToast('Link copied to clipboard! Share it with your friends to go viral! 🚀', 'success')
      })
      .catch(() => {
        showToast('Failed to copy link.', 'error')
      })
  }

  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedText = encodeURIComponent(`${shareText} ${shareUrl}`)

  return (
    <div className={`viral-share-hub ${isOpen ? 'active' : ''}`}>
      {/* Floating Action Button */}
      <button 
        className="share-fab" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Viral Sharing Menu"
        title="Share & Go Viral!"
      >
        <span className="fab-glow"></span>
        <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-share-nodes'}`}></i>
      </button>

      {/* Expanded Menu Options */}
      <div className="share-menu">
        <a 
          href={`https://api.whatsapp.com/send?text=${encodedText}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="share-item whatsapp"
          title="Share on WhatsApp Status & Groups"
          onClick={() => setIsOpen(false)}
        >
          <i className="fa-brands fa-whatsapp"></i>
          <span className="tooltip">WhatsApp</span>
        </a>

        <a 
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="share-item facebook"
          title="Share on Facebook Timeline"
          onClick={() => setIsOpen(false)}
        >
          <i className="fa-brands fa-facebook-f"></i>
          <span className="tooltip">Facebook</span>
        </a>

        <a 
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="share-item linkedin"
          title="Share on LinkedIn Post"
          onClick={() => setIsOpen(false)}
        >
          <i className="fa-brands fa-linkedin-in"></i>
          <span className="tooltip">LinkedIn</span>
        </a>

        <a 
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodedUrl}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="share-item twitter"
          title="Share on X (Twitter)"
          onClick={() => setIsOpen(false)}
        >
          <i className="fa-brands fa-x-twitter"></i>
          <span className="tooltip">X (Twitter)</span>
        </a>

        <a 
          href="https://share.google/Nb4XGKYq5aU0nzLr3" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="share-item gmb"
          title="Visit our Google Business Map Listing"
          onClick={() => setIsOpen(false)}
        >
          <i className="fa-brands fa-google"></i>
          <span className="tooltip">Google Maps</span>
        </a>

        <button 
          onClick={() => {
            handleCopyLink()
            setIsOpen(false)
          }} 
          className="share-item copy-link"
          title="Copy Site Link"
        >
          <i className="fa-solid fa-copy"></i>
          <span className="tooltip">Copy Link</span>
        </button>
      </div>
    </div>
  )
}
