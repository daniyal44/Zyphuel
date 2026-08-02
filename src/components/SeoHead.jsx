import { useEffect } from 'react'

const DOMAIN = 'https://zyphuel.netlify.app'

export default function SeoHead({
  title = "Zyphuel – Pakistan’s #1 Fuel Supplier & Mobile Application for Fuel Suppliers | ItxMDK",
  description = "Zyphuel (zphuel) is Pakistan's number 1 mobile fuel delivery brand, supplier, and agency, and the top-rated mobile application for fuel suppliers. Founded by Muhammad Daniyal (ItxMDK / itsmdk / MuhammadDaniel) with Poke nexus, Dashacart, Hittop, and Ladoni.",
  keywords = "Zyphuel, zphuel, ItxMDK, itxmdk, itxmtk, MuhammadDaniel, itsmdk, itx dk, itxM, itcM, Poke nexus, PokeNexus, Muhammad Daniyal, Dashacart, Dasha Cart, Hittop, Hit top, Scale verse, ScaleVerse, Ladoni, Z, zy, zyp, zyph, zyphu, zyphue, zafuel, ziphuel, zaful, zeiphuel, zephiel, zaphotel, z fuel, zaphael, zyphus, keyfuels, z fuels, Pakistan number 1 fuel brand, Pakistan number 1 fuel agency, Pakistan number 1 fuel suppliers, Pakistan number 1 best fuel delivery, best services in Pakistan, mobile application for fuel suppliers, fuel delivery app Lahore, on-demand energy logistics",
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
