import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './LahorePlacesMenu.css'

export const LAHORE_PLACES = [
  'DHA (Phase 1–9)',
  'Gulberg (I, II, III & MM Alam)',
  'Johar Town & PIA Society',
  'Model Town',
  'Garden Town',
  'Bahria Town Lahore',
  'Cantonment (Cantt) & Cavalry Ground',
  'Wapda Town',
  'Valencia Town',
  'Faisal Town',
  'Allama Iqbal Town',
  'Township (Quaid-e-Azam Town)',
  'Samanabad',
  'Shadbagh',
  'Mughalpura',
  'Liaquatabad & Kot Lakhpat',
  'Shalimar & Baghbanpura',
  'Ravi Town',
  'Aziz Bhatti Town',
  'Data Gunj Bakhsh Town',
  'Askari (I–XI)',
  'Lake City & Pine Avenue',
  'Sundar Industrial Estate',
  'Badami Bagh & Circular Road',
]

export default function LahorePlacesMenu({ isOpen, onClose }) {
  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Click-catcher backdrop to close when clicking outside */}
      <div
        className="lahore-menu-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Pure Places List Dropdown Menu */}
      <div
        className="lahore-places-menu"
        id="lahore-places-menu"
        role="dialog"
        aria-label="Lahore Places and Active Towns"
      >
        <div className="lahore-places-header">
          <div className="lahore-places-title-wrap">
            <div className="lahore-places-pin-icon" aria-hidden="true">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <div>
              <h3 className="lahore-places-heading">Lahore Places &amp; Active Towns</h3>
              <span className="lahore-places-count">24 Active Refueling Sectors</span>
            </div>
          </div>
          <button
            type="button"
            className="lahore-places-close-btn"
            onClick={onClose}
            title="Close menu"
            aria-label="Close Lahore places menu"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Pure Simple List of Place Names (No Form, No Inputs, No Labels, No Submit Buttons) */}
        <ul className="lahore-places-list">
          {LAHORE_PLACES.map((place) => (
            <li key={place} className="lahore-places-item">
              <Link
                to={`/order/?town=${encodeURIComponent(place)}`}
                className="lahore-place-link"
                onClick={onClose}
                title={`Order doorstep fuel delivery in ${place}`}
              >
                <span className="lahore-place-dot" aria-hidden="true"></span>
                <span className="lahore-place-name">{place}</span>
                <i className="fa-solid fa-arrow-right lahore-place-arrow" aria-hidden="true"></i>
              </Link>
            </li>
          ))}
        </ul>

        <div className="lahore-places-footer">
          <i className="fa-solid fa-circle-check" aria-hidden="true"></i>
          <span>Euro-V petrol &amp; diesel doorstep delivery within 45 mins across Lahore</span>
        </div>
      </div>
    </>
  )
}
