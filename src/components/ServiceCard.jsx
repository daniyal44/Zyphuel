import React from 'react'

// Fuel-specific SVG micro-illustrations
const ServiceSvgIcon = ({ fuelTypeKey, fallbackIcon }) => {
  if (fuelTypeKey === 'petrol' || fuelTypeKey === 'highOctane') {
    return (
      <svg viewBox="0 0 40 40" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="20" cy="20" r="18" fill="rgba(2, 132, 199, 0.12)" stroke="#0284c7" strokeWidth="1.5" />
        <path d="M20 10 C20 10 13 19 13 24 A7 7 0 0 0 27 24 C27 19 20 10 20 10 Z" fill="#0284c7" />
        <path d="M18 23 A3 3 0 0 0 21 26" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }
  if (fuelTypeKey === 'diesel') {
    return (
      <svg viewBox="0 0 40 40" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="20" cy="20" r="18" fill="rgba(245, 158, 11, 0.12)" stroke="#f59e0b" strokeWidth="1.5" />
        <rect x="13" y="14" width="14" height="17" rx="3" fill="#f59e0b" />
        <path d="M16 11 L24 11 L24 14 L16 14 Z" fill="#b45309" />
        <line x1="20" y1="18" x2="20" y2="27" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
  if (fuelTypeKey === 'lpg') {
    return (
      <svg viewBox="0 0 40 40" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="20" cy="20" r="18" fill="rgba(239, 68, 68, 0.12)" stroke="#ef4444" strokeWidth="1.5" />
        <rect x="14" y="16" width="12" height="15" rx="4" fill="#ef4444" />
        <path d="M17 11 L23 11 A2 2 0 0 1 25 13 L25 16 L15 16 L15 13 A2 2 0 0 1 17 11 Z" fill="#991b1b" />
        <circle cx="20" cy="23" r="2.5" fill="#ffffff" />
      </svg>
    )
  }
  if (fuelTypeKey === 'water') {
    return (
      <svg viewBox="0 0 40 40" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="20" cy="20" r="18" fill="rgba(6, 182, 212, 0.12)" stroke="#06b6d4" strokeWidth="1.5" />
        <path d="M20 11 C20 11 14 18 14 23 A6 6 0 0 0 26 23 C26 18 20 11 20 11 Z" fill="#06b6d4" />
        <path d="M18 22 C18 23.5 19 25 20.5 25" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }
  // Default fontawesome icon inside branded vector circle
  return (
    <div style={{
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      background: 'rgba(2, 132, 199, 0.12)',
      border: '1.5px solid #0284c7',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#0284c7',
      fontSize: '1rem'
    }}>
      <i className={`fa-solid ${fallbackIcon}`}></i>
    </div>
  )
}

export default function ServiceCard({ svc, index, activeTab, onOrder }) {
  const isConsumer = activeTab === 'consumer'

  return (
    <div
      className="service-card-enhanced fade-in-up"
      style={{
        transitionDelay: `${0.05 + index * 0.05}s`,
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease'
      }}
      itemScope
      itemType="https://schema.org/Service"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <span className={`service-card-tag ${isConsumer ? 'b2c' : 'b2b'}`}>
          {svc.tag}
        </span>
        <ServiceSvgIcon fuelTypeKey={svc.fuelTypeKey} fallbackIcon={svc.icon} />
      </div>

      <h3 className="service-card-title" itemProp="name">{svc.title}</h3>
      <p className="service-card-desc" itemProp="description">{svc.desc}</p>
      
      <ul className="service-card-specs">
        {svc.specs.map(spec => (
          <li key={spec}>
            <i className="fa-solid fa-circle-check"></i>
            <span>{spec}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onOrder(svc.fuelTypeKey)}
        className={`service-card-cta ${isConsumer ? 'b2c-cta' : 'b2b-cta'}`}
        title={`Order ${svc.title} - Zyphuel Pakistan`}
        aria-label={`Order ${svc.title} service from Zyphuel`}
      >
        Order Service <i className="fa-solid fa-arrow-right-long" style={{ marginLeft: '4px' }}></i>
      </button>
    </div>
  )
}
