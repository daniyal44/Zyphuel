import React from 'react'

export default function StepCard({ step, index }) {
  return (
    <div
      className="step-card fade-in-up"
      style={{ transitionDelay: `${0.05 + index * 0.05}s` }}
    >
      <div className="step-number">{step.number}</div>
      <div className="step-icon">
        <i className={`fa-solid ${step.icon}`}></i>
      </div>
      <h4 className="step-title">{step.title}</h4>
      <p className="step-desc">{step.desc}</p>
    </div>
  )
}
