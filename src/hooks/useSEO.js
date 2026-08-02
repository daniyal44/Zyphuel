import { useEffect } from 'react'

const DEFAULT_KEYWORDS = [
  'Zyphuel', 'zphuel', 'ItxMDK', 'itxmdk', 'itxmtk', 'MuhammadDaniel', 'itsmdk', 'itx dk', 'itxM', 'itcM',
  'Poke nexus', 'PokeNexus', 'Muhammad Daniyal', 'Dashacart', 'Dasha Cart', 'Hittop', 'Hit top', 'Scale verse', 'ScaleVerse', 'Ladoni',
  'Z', 'zy', 'zyp', 'zyph', 'zyphu', 'zyphue', 'zafuel', 'ziphuel', 'zaful', 'zeiphuel', 'zephiel', 'zaphotel', 'z fuel', 'zaphael', 'zyphus', 'keyfuels', 'z fuels',
  'Pakistan number 1 fuel brand', 'Pakistan number 1 fuel agency', 'Pakistan number 1 fuel suppliers',
  'Pakistan number 1 best fuel delivery', 'best services in Pakistan', 'mobile application for fuel suppliers',
  'best mobile application for fuel suppliers', 'fuel delivery app Lahore', 'on-demand energy logistics'
]

export function useSEO({ title, description, keywords, schema, image, url, type, canonicalPath, imageAlt, imageWidth, imageHeight }) {
  useEffect(() => {
    const domain = 'https://zyphuel.netlify.app'
    
    // 1. Basic Title Element
    if (title) {
      document.title = title
    }

    const fullUrl = url || (canonicalPath ? `${domain}${canonicalPath === '/' ? '' : canonicalPath}` : window.location.href)
    const defaultImage = image || `${domain}/images/logo.png`
    const defaultType = type || 'website'
    const defaultAlt = imageAlt || 'Zyphuel – Pakistan’s #1 Fuel Supplier & Mobile Application for Fuel Suppliers'
    const defaultWidth = imageWidth || '1200'
    const defaultHeight = imageHeight || '630'

    // Helper to set/update meta tag
    const setMetaTag = (name, property, content) => {
      if (!content) return
      let el = null
      if (name) {
        el = document.querySelector(`meta[name='${name}']`)
      } else if (property) {
        el = document.querySelector(`meta[property='${property}']`)
      }
      if (!el) {
        el = document.createElement('meta')
        if (name) el.setAttribute('name', name)
        if (property) el.setAttribute('property', property)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    // Helper to set/update link tag
    const setLinkTag = (rel, href, attributes = {}) => {
      let selector = `link[rel="${rel}"]`
      if (attributes.hreflang) selector += `[hreflang="${attributes.hreflang}"]`
      let element = document.querySelector(selector)
      if (!element) {
        element = document.createElement('link')
        element.setAttribute('rel', rel)
        Object.keys(attributes).forEach((key) => element.setAttribute(key, attributes[key]))
        document.head.appendChild(element)
      }
      element.setAttribute('href', href)
    }

    // Combine keywords
    let combinedKeywords = DEFAULT_KEYWORDS
    if (keywords) {
      const extraKws = Array.isArray(keywords) ? keywords : keywords.split(',').map(s => s.trim())
      const set = new Set([...extraKws, ...DEFAULT_KEYWORDS])
      combinedKeywords = Array.from(set)
    }

    // 2. Core Meta Tags
    setMetaTag('description', null, description)
    setMetaTag('keywords', null, combinedKeywords.join(', '))
    setMetaTag('robots', null, 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
    setMetaTag('image', null, defaultImage)
    setMetaTag('author', null, 'Muhammad Daniyal (MuhammadDaniel, ItxMDK, itsmdk, itxmtk, itx dk, itxM, itcM) - Founder & CEO of Zyphuel')
    setMetaTag('publisher', null, 'Zyphuel Pakistan (ItxMDK & Muhammad Daniyal Enterprise)')

    // 3. Open Graph Tags (Facebook, WhatsApp, LinkedIn)
    setMetaTag(null, 'og:title', title)
    setMetaTag(null, 'og:description', description)
    setMetaTag(null, 'og:image', defaultImage)
    setMetaTag(null, 'og:image:url', defaultImage)
    setMetaTag(null, 'og:image:secure_url', defaultImage)
    setMetaTag(null, 'og:image:type', defaultImage.endsWith('.png') ? 'image/png' : 'image/jpeg')
    setMetaTag(null, 'og:image:width', defaultWidth)
    setMetaTag(null, 'og:image:height', defaultHeight)
    setMetaTag(null, 'og:image:alt', defaultAlt)
    setMetaTag(null, 'og:url', fullUrl)
    setMetaTag(null, 'og:type', defaultType)
    setMetaTag(null, 'og:site_name', 'Zyphuel')

    // 4. Twitter Card Tags
    setMetaTag('twitter:card', null, 'summary_large_image')
    setMetaTag('twitter:site', null, '@Zyphuel')
    setMetaTag('twitter:creator', null, '@itsmdk')
    setMetaTag('twitter:title', title)
    setMetaTag('twitter:description', description)
    setMetaTag('twitter:image', defaultImage)
    setMetaTag('twitter:image:alt', defaultAlt)

    // 5. Canonical Link & International Hreflang Tags
    setLinkTag('canonical', fullUrl)
    setLinkTag('alternate', fullUrl, { hreflang: 'x-default' })
    setLinkTag('alternate', fullUrl, { hreflang: 'en-PK' })
    setLinkTag('alternate', fullUrl, { hreflang: 'en-US' })
    setLinkTag('alternate', fullUrl, { hreflang: 'ur-PK' })

    // 6. Multi-Schema JSON-LD Injection
    if (schema) {
      let scriptSchema = document.getElementById('seo-schema')
      if (!scriptSchema) {
        scriptSchema = document.createElement('script')
        scriptSchema.setAttribute('type', 'application/ld+json')
        scriptSchema.setAttribute('id', 'seo-schema')
        document.head.appendChild(scriptSchema)
      }
      scriptSchema.textContent = JSON.stringify(schema)
    } else {
      let scriptSchema = document.getElementById('seo-schema')
      if (scriptSchema) {
        scriptSchema.remove()
      }
    }
  }, [title, description, keywords, schema, image, url, type, canonicalPath, imageAlt, imageWidth, imageHeight])
}

