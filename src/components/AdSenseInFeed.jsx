import { useEffect, useRef } from 'react'

/**
 * AdSenseInFeed - Google AdSense Native In-Feed Ad Component
 *
 * Implements fluid in-feed ads with variable-height container
 * conforming to Google AdSense guidelines:
 * Client: ca-pub-6127960264752741
 * Slot: 8572960244
 * Layout Key: -6t+ed+2i-1n-4w
 */
export default function AdSenseInFeed({
  slot = '8572960244',
  layoutKey = '-6t+ed+2i-1n-4w',
  client = 'ca-pub-6127960264752741',
  className = '',
  style = {}
}) {
  const adRef = useRef(null)
  const isPushed = useRef(false)

  useEffect(() => {
    // Only execute on browser client
    if (typeof window === 'undefined') return
    if (isPushed.current) return

    // Ensure the AdSense library script is in document head
    if (!document.querySelector('script[src*="pagead2.googlesyndication.com"]')) {
      const script = document.createElement('script')
      script.async = true
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`
      script.crossOrigin = 'anonymous'
      document.head.appendChild(script)
    }

    try {
      const insEl = adRef.current
      // Push ad only if this specific ins element hasn't already been filled
      if (insEl && !insEl.getAttribute('data-adsbygoogle-status')) {
        window.adsbygoogle = window.adsbygoogle || []
        window.adsbygoogle.push({})
        isPushed.current = true
      }
    } catch (err) {
      if (import.meta.env?.DEV) {
        console.debug('AdSense In-feed push notice:', err)
      }
    }
  }, [client])

  return (
    <div
      className={`adsense-infeed-container ${className}`}
      style={{
        width: '100%',
        height: 'auto', // Important: Google AdSense mandates variable height to prevent distorted ads
        overflow: 'hidden',
        minHeight: '120px',
        ...style
      }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format="fluid"
        data-ad-layout-key={layoutKey}
        data-ad-client={client}
        data-ad-slot={slot}
      />
    </div>
  )
}
