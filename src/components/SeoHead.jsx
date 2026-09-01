import { useEffect } from 'react'

const DOMAIN = 'https://zyphuel.netlify.app'

export default function SeoHead({
  title = "Diesel & Petrol Delivery in Lahore | Zyphuel Mobile Refueling",
  description = "Zyphuel delivers petrol and diesel to your door in Lahore — homes, generators, and commercial fleets. Calibrated metering, live GPS tracking, and 24/7 dispatch.",
  keywords = "fuel delivery Lahore, diesel delivery Lahore, petrol delivery Lahore, mobile refueling Pakistan, doorstep fuel delivery, generator diesel delivery, bulk diesel supplier Lahore, fleet refueling service, on-demand fuel delivery app, Zyphuel",
  canonicalPath = '/',
  ogImage = `${DOMAIN}/images/logo.png`,
  ogType = 'website',
  jsonLd = null,
}) {
  useEffect(() => {
    // 1. Update Title
    document.title = title

    // Helper function to create or update meta/link tags
    const setMetaTag = (selector, attrName, attrValue, content) => {
      let element = document.querySelector(selector)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attrName, attrValue)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    const setLinkTag = (rel, href, attributes = {}) => {
      let element = document.querySelector(`link[rel="${rel}"]${attributes.hreflang ? `[hreflang="${attributes.hreflang}"]` : ''}`)
      if (!element) {
        element = document.createElement('link')
        element.setAttribute('rel', rel)
        Object.keys(attributes).forEach((key) => element.setAttribute(key, attributes[key]))
        document.head.appendChild(element)
      }
      element.setAttribute('href', href)
    }

    const fullUrl = `${DOMAIN}${canonicalPath === '/' ? '' : canonicalPath}`

    // 2. Standard Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', description)
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords)
    setMetaTag('meta[name="robots"]', 'name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')

    // 3. Canonical Tag
    setLinkTag('canonical', fullUrl)

    // 4. Internationalization (hreflang) Tags
    setLinkTag('alternate', fullUrl, { hreflang: 'x-default' })
    setLinkTag('alternate', fullUrl, { hreflang: 'en-PK' })
    setLinkTag('alternate', fullUrl, { hreflang: 'en-US' })
    setLinkTag('alternate', fullUrl, { hreflang: 'ur-PK' })

    // 5. OpenGraph Meta Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title)
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description)
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', fullUrl)
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage)
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType)
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Zyphuel')

    // 6. Twitter Meta Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage)

    // 7. Inject Route-Specific Dynamic JSON-LD Schema
    const schemaId = 'dynamic-seo-schema'
    let scriptTag = document.getElementById(schemaId)
    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement('script')
        scriptTag.id = schemaId
        scriptTag.type = 'application/ld+json'
        document.head.appendChild(scriptTag)
      }
      scriptTag.textContent = JSON.stringify(jsonLd)
    } else if (scriptTag) {
      scriptTag.remove()
    }
  }, [title, description, keywords, canonicalPath, ogImage, ogType, jsonLd])

  return null
}
