import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useToast } from '../context/ToastContext'

export default function ContactPage() {
  const pageRef = useScrollReveal()
  const { showToast } = useToast()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Bulk / Enterprise Client Query',
    contactMethod: 'WhatsApp',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const validateField = (field, value, currentForm = form) => {
    let error = ''
    if (field === 'name') {
      if (!value.trim()) error = 'Full name is required.'
      else if (value.trim().length < 2) error = 'Name must be at least 2 characters.'
    }
    if (field === 'email') {
      const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!value.trim()) error = 'Email address is required.'
      else if (!emailRx.test(value.trim())) error = 'Enter a valid email address.'
    }
    if (field === 'phone') {
      const isRequired = currentForm.contactMethod === 'WhatsApp' || currentForm.contactMethod === 'Phone Call'
      const digits = value.replace(/[^0-9]/g, '')
      if (isRequired && !value.trim()) {
        error = `Phone number is required for ${currentForm.contactMethod} contact.`
      } else if (value.trim() && digits.length < 7) {
        error = 'Enter a valid phone number (at least 7 digits).'
      }
    }
    if (field === 'message') {
      if (!value.trim()) error = 'Message details are required.'
      else if (value.trim().length < 20) error = 'Message must be at least 20 characters.'
      else if (value.trim().length > 1000) error = 'Message cannot exceed 1000 characters.'
    }
    return error
  }

  const handleChange = (field) => (e) => {
    const val = e.target.value
    setForm(prev => {
      const updated = { ...prev, [field]: val }
      const error = validateField(field, val, updated)
      setErrors(prevErrors => ({ ...prevErrors, [field]: error }))
      return updated
    })
  }

  const handleBlur = (field) => () => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const error = validateField(field, form[field])
    setErrors(prevErrors => ({ ...prevErrors, [field]: error }))
  }

  const handleMethodChange = (method) => {
    setForm(prev => {
      const updated = { ...prev, contactMethod: method }
      const phoneError = validateField('phone', prev.phone, updated)
      setErrors(prevErrors => ({ ...prevErrors, phone: phoneError }))
      return updated
    })
    setTouched(prev => ({ ...prev, contactMethod: true }))
  }

  const getValidationClass = (field) => {
    if (!touched[field]) return ''
    if (errors[field]) return 'is-invalid'
    if (field === 'phone' && !form.phone.trim()) return ''
    return 'is-valid'
  }

  const getWhatsAppLink = () => {
    const phoneVal = form.phone.trim() || 'N/A'
    const text = `🚀 *New Contact Inquiry via Web*

👤 *Name:* ${form.name.trim()}
📧 *Email:* ${form.email.trim()}
📞 *Phone:* ${phoneVal}
🎯 *Subject:* ${form.subject}
💬 *Contact Preference:* ${form.contactMethod}

📝 *Message Details:*
${form.message.trim()}`

    return `https://wa.me/923230112464?text=${encodeURIComponent(text)}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const allTouched = { name: true, email: true, phone: true, message: true }
    setTouched(allTouched)

    const newErrors = {
      name: validateField('name', form.name),
      email: validateField('email', form.email),
      phone: validateField('phone', form.phone),
      message: validateField('message', form.message)
    }
    setErrors(newErrors)

    const hasErrors = Object.values(newErrors).some(err => err !== '')
    if (hasErrors) {
      showToast('Please fix the errors in the form before submitting.', 'error')
      return
    }

    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      const whatsappUrl = getWhatsAppLink()
      window.open(whatsappUrl, '_blank')
      
      setForm({
        name: '',
        email: '',
        phone: '',
        subject: 'Bulk / Enterprise Client Query',
        contactMethod: 'WhatsApp',
        message: ''
      })
      setTouched({})
      setErrors({})
      showToast('Redirecting to WhatsApp to send your message...', 'success')
    }, 1200)
  }

  return (
    <div ref={pageRef}>
      <main style={{ paddingTop: 'var(--nav-height)' }}>
        <section id="contact" className="contact section-padding">
          <div className="container">
            <div className="section-header fade-in-up">
              <h1 className="section-title">Contact Form</h1>
              <p className="section-subtitle">Reach out for bulk inquiries, fleet accounts, tech support, or media relations. Our team responds within hours.</p>
            </div>

            <div className="contact-grid">
              {/* Left: Contact Info */}
              <div className="contact-info-panel fade-in-up">
                <div className="contact-details">
                  {[
                    { icon: 'fa-phone', title: 'Contact no', content: '+92 3230-112464', sub: 'Also accepting WhatsApp calls for enterprise clients.' },
                    { icon: 'fa-envelope', title: 'Email ', content: 'm.daniyalkhan490@gmail.com', sub: 'For order modifications or cancellation requests.' },
                    { icon: 'fa-location-dot', title: 'Location', content: 'Lahore, Pakistan.', sub: 'Walk-in corporate meetings by appointment only.' },
                  ].map(item => (
                    <div key={item.title} className="contact-item">
                      <div className="contact-icon"><i className={`fa-solid ${item.icon}`}></i></div>
                      <div className="contact-text">
                        <h4>{item.title}</h4>
                        <p><strong>{item.content}</strong></p>
                        <p>{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="contact-item" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                  <div className="contact-icon"><i className="fa-solid fa-clock"></i></div>
                  <div className="contact-text" style={{ width: '100%' }}>
                    <h4>Office Hours</h4>
                    <table className="hours-table">
                      <tbody>
                        <tr><td>Monday – Thursday</td><td>8:00 AM – 8:00 PM</td></tr>
                        <tr><td>Friday</td><td>8:00 AM – 1:00 PM</td></tr>
                        <tr><td>Saturday – Sunday</td><td>10:00 AM – 6:00 PM</td></tr>
                        <tr><td>Delivery (24/7)</td><td style={{ color: 'var(--success-mint)' }}>Always Active</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right: Contact Form */}
              <div className="contact-form-panel fade-in-up" style={{ transitionDelay: '0.2s' }}>
                <div className="form-block-title">
                  <i className="fa-solid fa-paper-plane"></i> Send Message
                </div>
                <form id="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-group-grid">
                    <div className="form-group">
                      <label className="form-label" htmlFor="c-name">Full Name *</label>
                      <div className="input-icon-wrapper">
                        <input
                          type="text"
                          className={`form-control ${getValidationClass('name')}`}
                          id="c-name"
                          placeholder="Your full name"
                          value={form.name}
                          onChange={handleChange('name')}
                          onBlur={handleBlur('name')}
                          required
                        />
                        <i className="fa-solid fa-user"></i>
                      </div>
                      {touched.name && errors.name && (
                        <div className="validation-error-label" style={{ display: 'block' }}>{errors.name}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="c-email">Email Address *</label>
                      <div className="input-icon-wrapper">
                        <input
                          type="email"
                          className={`form-control ${getValidationClass('email')}`}
                          id="c-email"
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={handleChange('email')}
                          onBlur={handleBlur('email')}
                          required
                        />
                        <i className="fa-solid fa-envelope"></i>
                      </div>
                      {touched.email && errors.email && (
                        <div className="validation-error-label" style={{ display: 'block' }}>{errors.email}</div>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Preferred Contact Method *</label>
                    <div className="contact-method-grid">
                      {[
                        { method: 'WhatsApp', icon: 'fa-brands fa-whatsapp', label: 'WhatsApp' },
                        { method: 'Email', icon: 'fa-solid fa-envelope', label: 'Email' },
                        { method: 'Phone Call', icon: 'fa-solid fa-phone', label: 'Phone Call' }
                      ].map(item => (
                        <div
                          key={item.method}
                          className={`contact-method-card ${form.contactMethod === item.method ? 'selected' : ''}`}
                          onClick={() => handleMethodChange(item.method)}
                        >
                          <i className={item.icon}></i>
                          <span>{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-group-grid">
                    <div className="form-group">
                      <label className="form-label" htmlFor="c-phone">
                        {form.contactMethod === 'WhatsApp' || form.contactMethod === 'Phone Call' ? 'Phone Number *' : 'Phone (Optional)'}
                      </label>
                      <div className="input-icon-wrapper">
                        <input
                          type="tel"
                          className={`form-control ${getValidationClass('phone')}`}
                          id="c-phone"
                          placeholder="+92-3XX-XXXXXXX"
                          value={form.phone}
                          onChange={handleChange('phone')}
                          onBlur={handleBlur('phone')}
                        />
                        <i className="fa-solid fa-phone"></i>
                      </div>
                      {touched.phone && errors.phone && (
                        <div className="validation-error-label" style={{ display: 'block' }}>{errors.phone}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="c-subject">Subject</label>
                      <div className="input-icon-wrapper">
                        <select
                          className="form-control"
                          id="c-subject"
                          value={form.subject}
                          onChange={handleChange('subject')}
                        >
                          <option value="Bulk / Enterprise Client Query">Bulk / Enterprise Client Query</option>
                          <option value="Order Modification / Cancellation">Order Modification / Cancellation</option>
                          <option value="Fleet Accounts Setup">Fleet Accounts Setup</option>
                          <option value="Technical Support / Issue">Technical Support / Issue</option>
                          <option value="Media & Press Relations">Media & Press Relations</option>
                          <option value="General Inquiry">General Inquiry</option>
                        </select>
                        <i className="fa-solid fa-tag" style={{ zIndex: 10 }}></i>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="c-message">Message Details *</label>
                    <textarea
                      className={`form-control ${getValidationClass('message')}`}
                      id="c-message"
                      rows="5"
                      placeholder="Describe your requirements or inquiry in detail..."
                      value={form.message}
                      onChange={handleChange('message')}
                      onBlur={handleBlur('message')}
                      style={{ minHeight: '140px' }}
                      required
                    ></textarea>
                    <div className={`char-counter ${errors.message ? 'error' : form.message.length >= 20 ? 'success' : ''}`}>
                      <span className="error-text">
                        {touched.message && errors.message ? errors.message : ''}
                      </span>
                      <span className="count-text">{form.message.length} / 1000 characters</span>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={submitting}>
                    {submitting ? (
                      <><i className="fa-solid fa-spinner fa-spin"></i> Redirecting to WhatsApp...</>
                    ) : (
                      <><i className="fa-brands fa-whatsapp"></i> Send to WhatsApp</>
                    )}
                  </button>
                </form>

                {/* Google Maps Embed */}
                <div className="map-embed-wrapper" style={{ marginTop: '30px' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.8684025890936!2d74.33494967462437!3d31.507534674185766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904193ac33e5d%3A0x7b8fe01e5a38c5b1!2sGulberg%20III%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1720000000000!5m2!1sen!2s"
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                    title="Zyphuel Lahore Office Location"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <p className="map-caption"><i className="fa-solid fa-location-dot" style={{ color: 'var(--accent-color)' }}></i> 75-Main Boulevard, Gulberg III, Lahore</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating WhatsApp */}
      <a href="https://wa.me/923230112464" className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Contact Zyphuel on WhatsApp">
        <i className="fa-brands fa-whatsapp"></i>
      </a>
    </div>
  )
}
