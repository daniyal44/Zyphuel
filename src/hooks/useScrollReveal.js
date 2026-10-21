import { useEffect, useRef } from 'react'

/**
 * High-performance viewport reveal engine.
 *
 * Two animation sources are supported and both are pure compositor work
 * (`opacity` + `transform`), so they never shift layout (CLS stays 0):
 *
 *  1. Legacy `.fade-in-up` elements — kept so existing pages do not change behaviour.
 *  2. `[data-reveal]` elements — variants: up | down | left | right | scale | fade.
 *     - `data-reveal="up"`          → slides up into place
 *     - `data-reveal-delay="0.2"`   → extra delay in seconds
 *     - `data-reveal-stagger`       → put on a container; its direct `[data-reveal]`
 *                                     children are revealed one after another.
 *
 * Above-the-fold elements are revealed synchronously on mount (no flash, no delay).
 * Everything below the fold waits for an IntersectionObserver.
 *
 * CSS only hides elements while `<html class="reveal-ready">` is present, which this
 * hook adds once it runs — so with JavaScript disabled every page still shows all
 * content instead of a blank page.
 */
export function useScrollReveal(dependencies = []) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const root = document.documentElement
    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Reduced motion: never hide anything, just let content sit in its final state.
    if (reduceMotion) {
      root.classList.remove('reveal-ready')
      return
    }

    root.classList.add('reveal-ready')

    // Assign stagger delays to children of `[data-reveal-stagger]` containers.
    container.querySelectorAll('[data-reveal-stagger]').forEach((group) => {
      const stepSeconds = parseFloat(group.dataset.revealStagger) || 0.08
      const children = [...group.children].filter((el) => el.hasAttribute('data-reveal'))
      children.forEach((el, index) => {
        if (!el.hasAttribute('data-reveal-delay')) {
          el.style.transitionDelay = `${(index * stepSeconds).toFixed(2)}s`
        }
      })
    })

    const elements = [
      ...container.querySelectorAll('.fade-in-up'),
      ...container.querySelectorAll('[data-reveal]')
    ]
    if (!elements.length) return

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 800
    const toObserve = []

    // Immediately reveal anything already inside (or just below) the first screen.
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.top <= viewportHeight + 100) {
        el.classList.add(el.hasAttribute('data-reveal') ? 'is-revealed' : 'animated')
      } else {
        toObserve.push(el)
      }
    })

    if (!toObserve.length) return

    if (!('IntersectionObserver' in window)) {
      toObserve.forEach((el) => {
        el.classList.add(el.hasAttribute('data-reveal') ? 'is-revealed' : 'animated')
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target
            el.classList.add(el.hasAttribute('data-reveal') ? 'is-revealed' : 'animated')
            // `data-reveal-repeat` lets a block re-animate when scrolled back to.
            if (!el.hasAttribute('data-reveal-repeat')) obs.unobserve(el)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px 50px 0px' }
    )

    toObserve.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, dependencies)

  return containerRef
}
