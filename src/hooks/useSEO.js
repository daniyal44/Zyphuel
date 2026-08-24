import { useEffect } from 'react'

const DEFAULT_KEYWORDS = [
  'Zyphuel', 'zphuel', 'ItxMDK', 'itxmdk', 'itxmtk', 'MuhammadDaniel', 'itsmdk', 'itx dk', 'itxM', 'itcM',
  'Poke nexus', 'PokeNexus', 'Muhammad Daniyal', 'Dashacart', 'Dasha Cart', 'Hittop', 'Hit top', 'Scale verse', 'ScaleVerse', 'Ladoni',
  'Z', 'zy', 'zyp', 'zyph', 'zyphu', 'zyphue', 'zafuel', 'ziphuel', 'zaful', 'zeiphuel', 'zephiel', 'zaphotel', 'z fuel', 'zaphael', 'zyphus', 'keyfuels', 'z fuels',
  'Pakistan number 1 fuel brand', 'Pakistan number 1 fuel agency', 'Pakistan number 1 fuel suppliers',
  'Pakistan number 1 best fuel delivery', 'best services in Pakistan', 'mobile application for fuel suppliers',
  'best mobile application for fuel suppliers', 'fuel delivery app Lahore', 'on-demand energy logistics',
  // Fuel & Price search trends
  'perol price in Pakistan', 'fuel price in pakistan', 'desil price in pakistan', 'gas price in paksitan', 'oil price in Pakistan',
  'petrol price cheker wesbite', 'diesel', 'diesel gasoline', 'patrol and diesel', 'i want diesel', 'fuel', 'OGRA fuel rates', 'petrol rate today', 'diesel rate today',
  // Sports & Cricket trending entities
  'Asia cup', 'Asian games', 'ICC', 't20 world cup', 'ODI world cup', 'test match',
  'pak vs Australia', 'pak vs india', 'pak vs Bangladesh', 'pak vs new Zealand', 'pak vs Sri Lanka', 'pak vs Ireland',
  'pak vs Afghanistan', 'pak vs Zimbabwe', 'pak vs south Africa', 'pak vs west indies', 'pak vs England', 'pak vs Oman', 'pak vs UAE',
  'upcoming cricket matches', 'aus vs ban', 'aus vs ind', 't20 league\'s', 't10 leagues', 'PSL live score', 'cricket match updates Pakistan',
  // Geopolitical & World Events
  'iran USA war', 'state of hormuz', 'strait of hormuz', 'Greater Israel', 'USA war', 'Israel attack on turkey',
  'Gulf country situation', 'china', 'Russia', 'north korea', 'south Korea', 'trending keyowrds',
  // Tech & Mobile Gadgets
  'iphone latest model', 'android latest phone',
  // Social Media & Discover terms
  'linkedln', 'facebok', 'reels', 'trending reels', 'social media updates'
]

// Global Knowledge Graph Objects (AEO, GEO, VSO, Local SEO)
const GLOBAL_ORGANIZATION = {
  "@type": "Organization",
  "@id": "https://zyphuel.netlify.app/#organization",
  "name": "Zyphuel",
  "alternateName": ["zphuel", "ItxMDK", "itsmdk", "MuhammadDaniel", "Poke nexus", "DashaCart", "Hittop", "Ladoni"],
  "url": "https://zyphuel.netlify.app",
  "logo": "https://zyphuel.netlify.app/images/logo.png",
  "sameAs": [
    "https://www.linkedin.com/company/zyphuel/?viewAsMember=true",
    "https://www.linkedin.com/in/muhammad-daniyal490",
    "https://github.com/daniyal44",
    "https://www.facebook.com/muhammad.daniyal.522942/"
  ]
}

const GLOBAL_LOCAL_BUSINESS = {
  "@type": "LocalBusiness",
  "@id": "https://zyphuel.netlify.app/#localbusiness",
  "name": "Zyphuel Mobile Refueling",
  "url": "https://zyphuel.netlify.app",
  "logo": "https://zyphuel.netlify.app/images/logo.png",
  "image": "https://zyphuel.netlify.app/images/logo.png",
  "telephone": "+923230112464",
  "email": "m.daniyalkhan490@gmail.com",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "75-Main Boulevard, Gulberg III",
    "addressLocality": "Lahore",
    "addressRegion": "Punjab",
    "postalCode": "54000",
    "addressCountry": "PK"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 31.507534,
    "longitude": 74.334949
  },
  "hasMap": "https://share.google/Nb4XGKYq5aU0nzLr3",
  "founder": {
    "@type": "Person",
    "@id": "https://zyphuel.netlify.app/#person-daniyal",
    "name": "Muhammad Daniyal",
    "alternateName": ["ItxMDK", "itsmdk", "MuhammadDaniel", "itxmtk", "itx dk"],
    "jobTitle": "Founder & CEO of Zyphuel",
    "sameAs": [
      "https://www.linkedin.com/in/muhammad-daniyal490",
      "https://github.com/daniyal44",
      "https://www.facebook.com/muhammad.daniyal.522942/"
    ]
  }
}

const GLOBAL_WEBSITE = {
  "@type": "WebSite",
  "@id": "https://zyphuel.netlify.app/#website",
  "url": "https://zyphuel.netlify.app",
  "name": "Zyphuel",
  "alternateName": ["zphuel", "ItxMDK", "itsmdk", "MuhammadDaniel"],
  "description": "Pakistan's #1 mobile fuel delivery brand and premier application for fuel suppliers by Muhammad Daniyal (ItxMDK).",
  "publisher": {
    "@id": "https://zyphuel.netlify.app/#organization"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://zyphuel.netlify.app/services?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".hero-title", ".hero-description", "h1", "h2", ".brand-ai-title"]
  }
}

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

    // 2. Core On-Page & Technical Meta Tags
    setMetaTag('description', null, description)
    setMetaTag('keywords', null, combinedKeywords.join(', '))
    setMetaTag('robots', null, 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
    setMetaTag('image', null, defaultImage)
    setMetaTag('author', null, 'Muhammad Daniyal (MuhammadDaniel, ItxMDK, itsmdk, itxmtk, itx dk, itxM, itcM) - Founder & CEO of Zyphuel')
    setMetaTag('publisher', null, 'Zyphuel Pakistan (ItxMDK & Muhammad Daniyal Enterprise)')

    // 2b. Local SEO Geo Location Tags (Lahore, Pakistan)
    setMetaTag('geo.region', null, 'PK-PB')
    setMetaTag('geo.placename', null, 'Lahore')
    setMetaTag('geo.position', null, '31.507534;74.334949')
    setMetaTag('ICBM', null, '31.507534, 74.334949')

    // 2c. Generative Engine & Voice Search Directives (GEO, AEO & VSO)
    setMetaTag('chatgpt-user', null, 'allow')
    setMetaTag('claudebot', null, 'allow')
    setMetaTag('perplexitybot', null, 'allow')
    setMetaTag('google-extended', null, 'allow')
    setMetaTag('oai-searchbot', null, 'allow')

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

    // 6. Dynamic Multi-Schema Graph Construction (AEO, GEO, VSO & Schema.org)
    const currentPath = window.location.pathname
    const pathNameClean = currentPath === '/' ? 'Home' : currentPath.replace('/', '').replace('-', ' ')
    const pathTitleFormatted = pathNameClean.charAt(0).toUpperCase() + pathNameClean.slice(1)

    const breadcrumbSchema = {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": domain
        },
        ...(currentPath !== '/' ? [{
          "@type": "ListItem",
          "position": 2,
          "name": pathTitleFormatted,
          "item": fullUrl
        }] : [])
      ]
    }

    let finalGraph = [
      GLOBAL_WEBSITE,
      GLOBAL_ORGANIZATION,
      GLOBAL_LOCAL_BUSINESS,
      breadcrumbSchema
    ]

    if (schema) {
      if (schema['@graph'] && Array.isArray(schema['@graph'])) {
        finalGraph = [...finalGraph, ...schema['@graph']]
      } else {
        finalGraph.push(schema)
      }
    }

    const fullSchemaPayload = {
      "@context": "https://schema.org",
      "@graph": finalGraph
    }

    let scriptSchema = document.getElementById('seo-schema')
    if (!scriptSchema) {
      scriptSchema = document.createElement('script')
      scriptSchema.setAttribute('type', 'application/ld+json')
      scriptSchema.setAttribute('id', 'seo-schema')
      document.head.appendChild(scriptSchema)
    }
    scriptSchema.textContent = JSON.stringify(fullSchemaPayload)

  }, [title, description, keywords, schema, image, url, type, canonicalPath, imageAlt, imageWidth, imageHeight])
}
