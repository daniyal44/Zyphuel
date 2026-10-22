import { useEffect, useRef, useState } from 'react'
import './ScrollStory.css'

/**
 * Pinned "scrollytelling" section.
 *
 * On desktop the rail (progress + step numbers) stays sticky while the steps scroll
 * past it, and each step lights up as it reaches the reading line. On mobile the rail
 * is dropped and the steps become a normal stacked list, so there is no tall pinned
 * track on small screens.
 *
 * Performance: no scroll listener. A single IntersectionObserver with a
 * `-45% 0px -45% 0px` root margin reports which step is at the reading line, so the
 * component costs nothing while the user is not scrolling through it.
 *
 * Accessibility: steps are real headings + paragraphs in DOM order; the active state
 * is purely visual. `prefers-reduced-motion` removes every transition (handled in
 * ScrollStory.css and the global reduced-motion block).
 */
export default function ScrollStory({
  eyebrow,
  title,
  description,
  steps = [],
  id,
  accent = 'var(--accent-color)'
}) {
  const sectionRef = useRef(null)
  const fillRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  // Steps are mounted only once the section is within one screen of the viewport.
  // Keeps the first paint of a long page (contact/about) identical to before this
  // section existed, so TBT is not spent laying out markup nobody has scrolled to yet.
  const [stepsMounted, setStepsMounted] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    if (!('IntersectionObserver' in window)) {
      setStepsMounted(true)
      return
    }

    const mountObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStepsMounted(true)
          mountObserver.disconnect()
        }
      },
      { rootMargin: '800px 0px 800px 0px' }
    )

    mountObserver.observe(section)
    return () => mountObserver.disconnect()
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section || !steps.length || !stepsMounted) return

    const stepEls = [...section.querySelectorAll('[data-story-step]')]
    if (!stepEls.length) return

    if (!('IntersectionObserver' in window)) {
      setActiveIndex(steps.length - 1)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const index = Number(entry.target.dataset.storyStep)
          if (!Number.isNaN(index)) setActiveIndex(index)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )

    stepEls.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [steps.length, stepsMounted])

  // Scroll-linked rail fill.
  //
  // The fill tracks the scroll position 1:1 (like a scrollbar) instead of jumping
  // when a step becomes active, which is what makes the section feel scroll-driven
  // rather than a sequence of one-shot reveals. It is written straight to the DOM —
  // no React re-render, no state, no work at all while the page is idle. The write is
  // rate-limited to one per animation frame by `performance.now()` rather than by
  // `requestAnimationFrame`, so the indicator still advances when a background or
  // occluded tab has its frame callbacks suspended.
  useEffect(() => {
    const section = sectionRef.current
    const fill = fillRef.current
    if (!section || !fill) return

    let lastWrite = 0
    const update = () => {
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight || 800
      // 0 → the section head is still at the 80% line; 1 → the last step has passed
      // above the 20% line. Between those points the fill moves 1:1 with the scroll.
      const entered = vh * 0.8 - rect.top
      const span = Math.max(rect.height + vh * 0.5, 1)
      const ratio = Math.min(1, Math.max(0, entered / span))
      fill.style.transform = `scaleY(${(0.02 + ratio * 0.98).toFixed(4)})`
    }
    const onScroll = () => {
      const now = performance.now()
      if (now - lastWrite < 16) return
      lastWrite = now
      update()
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [steps.length])

  return (
    <section
      ref={sectionRef}
      id={id}
      className="scroll-story"
      aria-label={title}
      style={{ '--story-accent': accent }}
    >
      <div className="container">
        <header className="scroll-story-head" data-reveal="up">
          {eyebrow && (
            <span className="scroll-story-eyebrow">
              <i className="fa-solid fa-route" aria-hidden="true" />
              {eyebrow}
            </span>
          )}
          <h2 className="scroll-story-title">{title}</h2>
          {description && <p className="scroll-story-desc">{description}</p>}
        </header>

        <div className="scroll-story-grid">
          <aside className="scroll-story-rail" aria-hidden="true">
            <div className="scroll-story-rail-sticky">
              <div className="scroll-story-rail-track">
                <span
                  ref={fillRef}
                  className="scroll-story-rail-fill"
                  style={{ transform: 'scaleY(0.02)' }}
                />
              </div>
              <ol className="scroll-story-rail-list">
                {steps.map((step, index) => (
                  <li
                    key={step.title}
                    className={`scroll-story-rail-item${index <= activeIndex ? ' is-done' : ''}${index === activeIndex ? ' is-active' : ''}`}
                  >
                    <span className="scroll-story-rail-dot" />
                    <span className="scroll-story-rail-label">{step.short || step.title}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <ol className="scroll-story-steps">
            {stepsMounted && steps.map((step, index) => {
              const isActive = index === activeIndex
              return (
                <li
                  key={step.title}
                  data-story-step={index}
                  className={`scroll-story-step${isActive ? ' is-active' : ''}`}
                >
                  <div className="scroll-story-step-card">
                    <div className="scroll-story-step-top">
                      <span className="scroll-story-step-number">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="scroll-story-step-icon">
                        <i className={`fa-solid ${step.icon || 'fa-circle-check'}`} aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="scroll-story-step-title">{step.title}</h3>
                    <p className="scroll-story-step-desc">{step.desc}</p>
                    {step.meta && (
                      <span className="scroll-story-step-meta">
                        <i className="fa-solid fa-circle-info" aria-hidden="true" />
                        {step.meta}
                      </span>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
