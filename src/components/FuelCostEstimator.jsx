import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FUEL_PRICES } from '../data/fuelPrices'

const VOLUME_CHIPS = [5, 7, 10, 12, 15]

const REFUELING_TARGETS = [
  { id: 'car', label: 'Car / Sedan / SUV', icon: 'fa-car' },
  { id: 'bike', label: 'Motorbike / Scooter', icon: 'fa-motorcycle' },
  { id: 'generator', label: 'Standby Generator', icon: 'fa-plug-circle-bolt' },
  { id: 'machinery', label: 'Commercial Machinery', icon: 'fa-truck-front' }
]

export default function FuelCostEstimator() {
  const [selectedFuel, setSelectedFuel] = useState('petrol')
  const [volume, setVolume] = useState(10)
  const [selectedTarget, setSelectedTarget] = useState('car')
  const [isUrgent, setIsUrgent] = useState(false)
  const [copiedShareLink, setCopiedShareLink] = useState(false)

  // Delivery Fee Calculation: Strictly Rs. 300 up to 10L; Rs. 320 to Rs. 400 for 11L-15L (+Rs. 20/L step)
  const deliveryFee = useMemo(() => {
    let baseFee = 300
    if (volume > 10) {
      baseFee = 300 + (volume - 10) * 20
    }
    return isUrgent ? baseFee + 100 : baseFee
  }, [volume, isUrgent])

  const unitPrice = useMemo(() => {
    return FUEL_PRICES[selectedFuel] || FUEL_PRICES.petrol
  }, [selectedFuel])

  const fuelCost = useMemo(() => {
    return +(unitPrice * volume).toFixed(2)
  }, [unitPrice, volume])

  const totalCost = useMemo(() => {
    return +(fuelCost + deliveryFee).toFixed(2)
  }, [fuelCost, deliveryFee])

  const fuelNames = {
    petrol: 'Super Petrol (Euro-V)',
    diesel: 'Hi-Cetane Diesel (Euro-V)',
    highOctane: 'High-Octane 97'
  }

  // Pre-filled WhatsApp Share Text for Viral Spread
  const shareWhatsAppMessage = useMemo(() => {
    const text = `⛽ *Today's Official Fuel Rates in Lahore (Euro-V)*:
• Super Petrol: Rs. ${FUEL_PRICES.petrol.toFixed(2)}/L
• Euro-V Diesel: Rs. ${FUEL_PRICES.diesel.toFixed(2)}/L
• High-Octane 97: Rs. ${FUEL_PRICES.highOctane.toFixed(2)}/L

🚗 *Doorstep Fuel Delivery in Lahore (20–45 Mins)*:
Order verified fuel delivered directly to your car, bike, or generator. Cash on Delivery (COD) available!
Order link: https://zyphuel.netlify.app/order/?fuel=${selectedFuel}&volume=${volume}`
    return encodeURIComponent(text)
  }, [selectedFuel, volume])

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(`https://zyphuel.netlify.app/order/?fuel=${selectedFuel}&volume=${volume}`)
      setCopiedShareLink(true)
      setTimeout(() => setCopiedShareLink(false), 2500)
    } catch (e) {
      // clipboard fallback
    }
  }

  return (
    <section className="fuel-estimator-section" style={{ padding: '40px 0 60px 0' }}>
      <div className="container">
        <div style={{
          background: 'linear-gradient(135deg, #0b1329 0%, #0f172a 100%)',
          borderRadius: '24px',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          padding: '36px 32px',
          boxShadow: '0 20px 45px -15px rgba(2, 132, 199, 0.25)',
          color: '#ffffff'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 32px auto' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: '#38bdf8',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px'
            }}>
              <i className="fa-solid fa-calculator"></i>
              Live Lahore Fuel Rate &amp; Cost Estimator
            </div>
            <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
              Estimate Your Doorstep Fuel Cost in Seconds
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Choose your vehicle or generator, pick fuel volume (5L–15L Max), and see exact doorstep delivery costs at official OGRA rates. Share today's prices with friends on WhatsApp!
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '28px',
            alignItems: 'start'
          }}>
            {/* Left: Interactive Controls */}
            <div>
              {/* 1. Fuel Type Selector */}
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
                1. Select Fuel Type
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '22px' }}>
                {[
                  { id: 'petrol', label: 'Super Petrol', rate: FUEL_PRICES.petrol, icon: 'fa-gas-pump' },
                  { id: 'diesel', label: 'Euro-V Diesel', rate: FUEL_PRICES.diesel, icon: 'fa-truck-droplet' },
                  { id: 'highOctane', label: 'High-Octane', rate: FUEL_PRICES.highOctane, icon: 'fa-bolt-lightning' }
                ].map(fuel => (
                  <button
                    key={fuel.id}
                    type="button"
                    onClick={() => setSelectedFuel(fuel.id)}
                    style={{
                      background: selectedFuel === fuel.id ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' : 'rgba(255, 255, 255, 0.05)',
                      border: selectedFuel === fuel.id ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      padding: '12px 10px',
                      color: '#ffffff',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s ease',
                      boxShadow: selectedFuel === fuel.id ? '0 4px 14px rgba(2, 132, 199, 0.4)' : 'none'
                    }}
                  >
                    <i className={`fa-solid ${fuel.icon}`} style={{ fontSize: '1.2rem', color: selectedFuel === fuel.id ? '#ffffff' : '#38bdf8', marginBottom: '6px', display: 'block' }}></i>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>{fuel.label}</div>
                    <div style={{ fontSize: '0.78rem', color: selectedFuel === fuel.id ? 'rgba(255, 255, 255, 0.9)' : '#94a3b8', marginTop: '2px' }}>
                      Rs. {fuel.rate.toFixed(2)}/L
                    </div>
                  </button>
                ))}
              </div>

              {/* 2. Refueling Target (Strictly 4 targets) */}
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
                2. Select Refueling Target
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '22px' }}>
                {REFUELING_TARGETS.map(target => (
                  <button
                    key={target.id}
                    type="button"
                    onClick={() => setSelectedTarget(target.id)}
                    style={{
                      background: selectedTarget === target.id ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                      border: selectedTarget === target.id ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '10px',
                      padding: '10px 12px',
                      color: selectedTarget === target.id ? '#38bdf8' : '#cbd5e1',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <i className={`fa-solid ${target.icon}`}></i>
                    <span>{target.label}</span>
                  </button>
                ))}
              </div>

              {/* 3. Fuel Volume Selector (Strictly 5L to 15L Max) */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  3. Fuel Quantity (5L–15L Max)
                </label>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#38bdf8' }}>
                  {volume} Litres
                </span>
              </div>

              {/* Volume Chips */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {VOLUME_CHIPS.map(chip => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setVolume(chip)}
                    style={{
                      flex: 1,
                      minWidth: '55px',
                      background: volume === chip ? '#0284c7' : 'rgba(255, 255, 255, 0.05)',
                      border: volume === chip ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      padding: '8px 4px',
                      color: '#ffffff',
                      cursor: 'pointer',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      textAlign: 'center',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {chip}L {chip === 15 ? '(Max)' : ''}
                  </button>
                ))}
              </div>

              {/* Range Slider */}
              <input
                type="range"
                min="5"
                max="15"
                step="1"
                value={volume}
                onChange={(e) => setVolume(parseInt(e.target.value, 10))}
                style={{
                  width: '100%',
                  accentColor: '#38bdf8',
                  cursor: 'pointer',
                  marginBottom: '16px'
                }}
                aria-label="Fuel Volume Litres"
              />

              {/* Urgent Priority Dispatch Toggle */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
                padding: '10px 14px'
              }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
                    <i className="fa-solid fa-bolt" style={{ color: '#f59e0b', marginRight: '6px' }}></i>
                    Urgent Express Dispatch (10–20 Mins)
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    Standard is 20–45 mins. Urgent surcharge: +Rs. 100.00
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#f59e0b' }}
                  aria-label="Urgent Priority Dispatch"
                />
              </div>
            </div>

            {/* Right: Instant Breakdown & Viral CTAs */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '18px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingBottom: '12px',
                  marginBottom: '16px'
                }}>
                  <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 600 }}>Itemized Estimate</span>
                  <span style={{
                    fontSize: '0.75rem',
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#10b981',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontWeight: 700
                  }}>
                    Cash on Delivery (COD)
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#cbd5e1' }}>{fuelNames[selectedFuel]} ({volume}L):</span>
                    <strong style={{ color: '#ffffff' }}>Rs. {fuelCost.toLocaleString('en-PK', { minimumFractionDigits: 2 })}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#cbd5e1' }}>Doorstep Delivery Fee:</span>
                    <strong style={{ color: '#ffffff' }}>Rs. {deliveryFee.toFixed(2)}</strong>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#94a3b8', fontStyle: 'italic' }}>
                    <span>Rate Basis:</span>
                    <span>OGRA Base + Rs. 5.00/L Pump Markup</span>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    borderTop: '1px solid rgba(56, 189, 248, 0.3)',
                    paddingTop: '14px',
                    marginTop: '8px'
                  }}>
                    <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#38bdf8' }}>Total Payable:</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff' }}>
                      Rs. {totalCost.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link
                  to={`/order/?fuel=${selectedFuel}&volume=${volume}`}
                  className="btn btn-primary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px 18px',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    borderRadius: '10px',
                    textDecoration: 'none'
                  }}
                >
                  <i className="fa-solid fa-truck-fast"></i> Order {volume}L Doorstep Delivery Now
                </Link>

                {/* Viral 1-Click WhatsApp Rate Sharing */}
                <a
                  href={`https://api.whatsapp.com/send?text=${shareWhatsAppMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '11px 18px',
                    background: '#25D366',
                    color: '#ffffff',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    textDecoration: 'none',
                    transition: 'opacity 0.2s ease',
                    boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
                  }}
                  title="Share today's official fuel prices with family, friends, or office groups on WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.1rem' }}></i>
                  Share Today's Fuel Rates on WhatsApp
                </a>

                {/* Copy Link Utility */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#cbd5e1',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <i className={copiedShareLink ? "fa-solid fa-check text-success" : "fa-solid fa-copy"}></i>
                  <span>{copiedShareLink ? "Link Copied to Clipboard!" : "Copy Order Link to Share"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
