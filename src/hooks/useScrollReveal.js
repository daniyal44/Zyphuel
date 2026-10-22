import { useEffect, useRef } from 'react'

/**
 * High-performance viewport reveal engine.
 *
 * Three animation sources are supported and all of them are pure compositor work
 * (`opacity` + `transform`), so they never shift layout (CLS stays 0):
 *
 *  1. Legacy `.fade-in-up` elements — kept so existing pages do not change behaviour.
 *  2. `[data-reveal]` elements — variants: up | down | left | right | scale | fade.
 *     - `data-reveal="up"`          → slides up into place
 *     - `data-reveal-delay="0.2"`   → extra delay in seconds
 *     - `data-reveal-stagger`       → put on a container; its direct `[data-reveal]`
 *                                     children are revealed one after another.
 *  3. `[data-scrub="parallax"]` media — scroll-linked drift. Unlike the one-shot
 *     reveals this keeps moving for as long as the user scrolls, which is what makes
 *     a page feel scroll-driven rather than a sequence of pop-ins. Every marked
 *     element must sit inside an `overflow: hidden` frame; the fixed `scale()` gives
 *     it the slack to drift without ever exposing an edge.
 *
 * Above-the-fold elements are revealed synchronously on mount (no flash, no delay).
 * Everything below the fold waits for an IntersectionObserver.
 *
 * CSS only hides elements while `<html class="reveal-ready">` is present, which this
 * hook adds once it runs — so with JavaScript disabled every page still shows all
 * content instead of a blank page.
 *
 * `prefers-reduced-motion: reduce` used to switch the whole system off, which left
 * these pages looking completely static next to the canvas-driven Home/Services/
 * Download heroes. It now runs in **soft mode** instead (`<html class="reveal-soft">`):
 * the rise is cut to 16 px and the parallax to ±5 px (no zoom, no large movement),
 * so the page keeps its scroll rhythm while still honouring the user's setting.
 */

const PARALLAX_TRAVEL = { full: 12, soft: 5 }
const PARALLAX_SCALE = { full: 1.12, soft: 1.06 }

export function useScrollReveal(dependencies = []) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const root = document.documentElement
    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Soft mode = smaller, motion-safe variant of the same system. Keeping the
    // observer and the scroll listener alive is what makes the effect happen at all.
    root.classList.add('reveal-ready')
    root.classList.toggle('reveal-soft', reduceMotion)

    const stopFunctions = []

    /* ------------------------------------------------------------------ *
     * 1. Scroll-linked parallax for [data-scrub="parallax"] media
     * ------------------------------------------------------------------ */
    const scrubs = [...container.querySelectorAll('[data-scrub="parallax"]')]
    if (scrubs.length) {
      const travel = reduceMotion ? PARALLAX_TRAVEL.soft : PARALLAX_TRAVEL.full
      const scale = reduceMotion ? PARALLAX_SCALE.soft : PARALLAX_SCALE.full
      let lastWrite = 0

      const paint = () => {
        const vh = window.innerHeight || 800
        // Read every geometry first, then write — one style pass, no layout thrash.
        // The parent frame is measured instead of the element itself because the
        // element's own rect already includes the transform being applied here.
        const progress = scrubs.map((el) => {
          const frame = el.parentElement || el
          const rect = frame.getBoundingClientRect()
          if (rect.bottom < -240 || rect.top > vh + 240) return null
          const ratio = (vh - rect.top) / (vh + rect.height)
          return Math.min(1, Math.max(0, ratio))
        })

        scrubs.forEach((el, index) => {
          const ratio = progress[index]
          if (ratio === null) return
          const shift = (ratio - 0.5) * 2 * travel
          el.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0) scale(${scale})`
        })
      }

      const onScroll = () => {
        const now = performance.now()
        if (now - lastWrite < 16) return
        lastWrite = now
        paint()
      }

      paint()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll, { passive: true })
      stopFunctions.push(() => {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
      })
    }

    /* ------------------------------------------------------------------ *
     * 2. Stagger delays for [data-reveal-stagger] containers
     * ------------------------------------------------------------------ */
    container.querySelectorAll('[data-reveal-stagger]').forEach((group) => {
      const stepSeconds = parseFloat(group.dataset.revealStagger) || 0.08
      const children = [...group.children].filter((el) => el.hasAttribute('data-reveal'))
      children.forEach((el, index) => {
        if (!el.hasAttribute('data-reveal-delay')) {
          el.style.transitionDelay = `${(index * stepSeconds).toFixed(2)}s`
        }
      })
    })

    /* ------------------------------------------------------------------ *
     * 3. One-shot reveals (IntersectionObserver)
     * ------------------------------------------------------------------ */
    const elements = [
      ...container.querySelectorAll('.fade-in-up'),
      ...container.querySelectorAll('[data-reveal]')
    ]

    const markRevealed = (el) =>
      el.classList.add(el.hasAttribute('data-reveal') ? 'is-revealed' : 'animated')

    if (elements.length) {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 800
      const toObserve = []

      // Immediately reveal anything already inside (or just below) the first screen.
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top <= viewportHeight + 100) {
          markRevealed(el)
        } else {
          toObserve.push(el)
        }
      })

      if (toObserve.length) {
        if (!('IntersectionObserver' in window)) {
          toObserve.forEach(markRevealed)
        } else {
          const observer = new IntersectionObserver(
            (entries, obs) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) return
                const el = entry.target
                markRevealed(el)
                // `data-reveal-repeat` lets a block re-animate when scrolled back to.
                if (!el.hasAttribute('data-reveal-repeat')) obs.unobserve(el)
              })
            },
            { threshold: 0.05, rootMargin: '0px 0px 50px 0px' }
          )

          toObserve.forEach((el) => observer.observe(el))
          stopFunctions.push(() => observer.disconnect())
        }
      }
    }

    return () => {
      stopFunctions.forEach((stop) => stop())
    }
  }, dependencies)

  return containerRef
}
