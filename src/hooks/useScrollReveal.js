import { useEffect, useRef } from 'react'

/**
 * High-performance viewport reveal hook:
 * Immediately activates above-the-fold elements so tabs load instantly with 0ms delay,
 * and attaches IntersectionObserver only to off-screen elements below the fold.
 */
export function useScrollReveal(dependencies = []) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll('.fade-in-up')
    if (!elements.length) return

    // Immediately animate any element that is in the initial viewport
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 800
    const toObserve = []

    elements.forEach(el => {
      const rect = el.getBoundingClientRect()
      if (rect.top <= viewportHeight + 100) {
        el.classList.add('animated')
      } else {
        toObserve.push(el)
      }
    })

    if (!toObserve.length) return

    if (!('IntersectionObserver' in window)) {
      toObserve.forEach(el => el.classList.add('animated'))
      return
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px 50px 0px' }
    )

    toObserve.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, dependencies)

  return containerRef
}

