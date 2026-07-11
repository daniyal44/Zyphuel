import { useState, createContext, useContext } from 'react'
import { useToast } from '../context/ToastContext'

// Create modal context so Header can trigger it
const InterestModalContext = createContext(null)

export function useInterestModal() {
  return useContext(InterestModalContext)
}

export default function InterestModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState(false)
  const { showToast } = useToast()

  const open = () => setIsOpen(true)
  const close = () => {
    setIsOpen(false)
    setPhoneError(false)
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) close()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const pRegex = /^((\+92)|(0092))?-?3[0-9]{2}-?[0-9]{7}$|^03[0-9]{2}-?[0-9]{7}$/
    if (!pRegex.test(phone.trim())) {
      setPhoneError(true)
      return
    }
    setPhoneError(false)

    // Save to LocalStorage
    const subscribers = JSON.parse(localStorage.getItem('zyphuel_city_subscribers') || '[]')
    subscribers.push({ city: 'Islamabad & Karachi', phone: phone.trim(), date: new Date().toISOString() })
    localStorage.setItem('zyphuel_city_subscribers', JSON.stringify(subscribers))

    close()
    setPhone('')
    showToast('Thank you! We will alert you on launching in your city.')
  }

  // Expose open function globally so Header can call it
  if (typeof window !== 'undefined') {
    window.__openInterestModal = open
  }

  return (
    <div
      className={`interest-dialog-backdrop${isOpen ? ' open' : ''}`}
      id="interest-backdrop"
      onClick={handleBackdropClick}
    >
      <div className="interest-dialog">
        <button
          className="interest-close-btn"
          id="interest-close-btn"
          aria-label="Close dialog"
          onClick={close}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h3 className="interest-title">Coming Soon!</h3>
        <p className="interest-desc">
          We are actively preparing to launch Zyphuel services in your city.
          Enter your mobile number to receive priority notifications and a
          launch discount coupon.
        </p>
        <form id="interest-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="interest-phone">Mobile Number</label>
            <input
              type="tel"
              className="form-control"
              id="interest-phone"
              placeholder="+92-300-1234567"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
            {phoneError && (
              <div className="validation-error-label visible" id="err-interest-phone">
                Use format: +92-3XX-XXXXXXX.
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Notify Me on Launch
          </button>
        </form>
      </div>
    </div>
  )
}
