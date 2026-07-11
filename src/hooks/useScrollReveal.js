import { useEffect, useRef } from 'react'

/**
 * Attaches IntersectionObserver to a container ref and
 * adds the 'animated' class to all .fade-in-up children when they enter view.
 */
export function useScrollReveal(dependencies = []) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = container.querySelectorAll('.fade-in-up')
    if (!elements.length) return

    if (!('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('animated'))
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
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, dependencies)

  return containerRef
}
