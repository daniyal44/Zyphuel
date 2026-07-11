import { useEffect } from 'react'

export function useSEO({ title, description, keywords, schema, image, url, type }) {
  useEffect(() => {
    // 1. Basic Meta Elements
    if (title) {
      document.title = title
    }

    const defaultUrl = url || window.location.href || 'https://zyphuel.netlify.app'
    const defaultImage = image || 'https://zyphuel.netlify.app/images/logo.png'
    const defaultType = type || 'website'

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

    setMetaTag('description', null, description)
    if (keywords) {
      setMetaTag('keywords', null, Array.isArray(keywords) ? keywords.join(', ') : keywords)
    }
    setMetaTag('robots', null, 'index, follow')

    // 2. Open Graph Tags
    setMetaTag(null, 'og:title', title)
    setMetaTag(null, 'og:description', description)
    setMetaTag(null, 'og:image', defaultImage)
    setMetaTag(null, 'og:url', defaultUrl)
    setMetaTag(null, 'og:type', defaultType)
    setMetaTag(null, 'og:site_name', 'Zyphuel')

    // 3. Twitter Card Tags
    setMetaTag('twitter:card', null, 'summary_large_image')
    setMetaTag('twitter:title', title)
    setMetaTag('twitter:description', description)
    setMetaTag('twitter:image', defaultImage)

    // 4. Canonical Link
    let canonical = document.querySelector("link[rel='canonical']")
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', defaultUrl)

    // 5. JSON-LD Schema Injection
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
  }, [title, description, keywords, schema, image, url, type])
}

