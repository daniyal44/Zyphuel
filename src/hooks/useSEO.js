import { useEffect } from 'react'

export function useSEO({ title, description, keywords }) {
  useEffect(() => {
    if (title) {
      document.title = title
    }

    let metaDesc = document.querySelector("meta[name='description']")
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.setAttribute('name', 'description')
      document.head.appendChild(metaDesc)
    }
    if (description) {
      metaDesc.setAttribute('content', description)
    }

    let metaKeywords = document.querySelector("meta[name='keywords']")
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta')
      metaKeywords.setAttribute('name', 'keywords')
      document.head.appendChild(metaKeywords)
    }
    if (keywords) {
      metaKeywords.setAttribute('content', Array.isArray(keywords) ? keywords.join(', ') : keywords)
    }
  }, [title, description, keywords])
}
