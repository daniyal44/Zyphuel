import { useEffect, useState } from 'react'
import {
  analyticsConsentDecision,
  denyAnalyticsConsent,
  grantAnalyticsConsent,
} from '../analytics/posthog'

/**
 * Analytics consent bar.
 *
 * Nothing is captured until the visitor accepts here: the PostHog client boots opted out and
 * the funnels only start at the next event. The decision is stored under
 * `zyphuel_analytics_consent` and the bar never appears again once a choice is made.
 * It renders nothing on the server and on the first client render, so prerendered HTML and
 * hydration stay identical.
 */
export default function AnalyticsConsent() {
  const [decision, setDecision] = useState('unknown')

  useEffect(() => {
    setDecision(analyticsConsentDecision() || 'none')
  }, [])

  if (decision !== 'none') return null

  const accept = () => {
    grantAnalyticsConsent()
    setDecision('granted')
  }

  const decline = () => {
    denyAnalyticsConsent()
    setDecision('denied')
  }

  return (
    <div
      className="analytics-consent"
      role="region"
      aria-label="Analytics consent"
      style={{
        position: 'fixed',
        left: '16px',
        right: '16px',
        bottom: '16px',
        zIndex: 9999,
        margin: '0 auto',
        maxWidth: '640px',
        padding: '16px 18px',
        borderRadius: '14px',
        background: '#0f172a',
        color: '#e2e8f0',
        boxShadow: '0 18px 40px -12px rgba(15, 23, 42, 0.55)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '12px',
        fontSize: '0.85rem',
        lineHeight: 1.5
      }}
    >
      <p style={{ margin: 0, flex: '1 1 260px' }}>
        May we count anonymous product analytics (which order steps visitors reach)? No name,
        phone, email or address is ever sent.{' '}
        <a href="/privacy/" style={{ color: '#38bdf8', fontWeight: 600 }}>
          Privacy Policy
        </a>
      </p>
      <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
        <button
          type="button"
          onClick={decline}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            border: '1px solid rgba(226, 232, 240, 0.35)',
            background: 'transparent',
            color: '#e2e8f0',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          No thanks
        </button>
        <button
          type="button"
          onClick={accept}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid #0369a1',
            background: '#0369a1',
            color: '#ffffff',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Allow analytics
        </button>
      </div>
    </div>
  )
}
