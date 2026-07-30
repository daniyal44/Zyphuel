import React from 'react'

export default function ServiceCard({ svc, index, activeTab, onOrder }) {
  const isConsumer = activeTab === 'consumer'

  return (
    <div
      className="service-card-enhanced fade-in-up"
      style={{ transitionDelay: `${0.05 + index * 0.05}s` }}
      itemScope
      itemType="https://schema.org/Service"
    >
      <span className={`service-card-tag ${isConsumer ? 'b2c' : 'b2b'}`}>
        {svc.tag}
      </span>
      <div className="service-card-icon">
        <i className={`fa-solid ${svc.icon}`}></i>
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
