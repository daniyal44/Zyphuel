import { useEffect, useRef, useState, useCallback } from 'react'
import './ScrollAnimationSection.css'

const FRAME_COUNT = 300
const FOLDER = '/ezgif-2f1a39c97e5b173b-jpg'

const getFramePath = (i) =>
  `${FOLDER}/ezgif-frame-${String(i).padStart(3, '0')}.jpg`

const STORY_PHASES = [
  {
    id: 'phase-1',
    name: 'Purity',
    startFrame: 0,
    endFrame: 68,
    pillClass: 'pill-amber',
    pillText: '🔥 Certified Euro-V Stream',
    title: 'Pure Refined Liquid Energy',
    desc: 'Dispensed at official OGRA standards with ultra-low sulfur and optimum cetane, ensuring peak engine life and generator reliability.',
    position: 'pos-left'
  },
  {
    id: 'phase-2',
    name: 'Containment',
    startFrame: 75,
    endFrame: 155,
    pillClass: 'pill-blue',
    pillText: '⚡ Specialized Storage',
    title: 'Hermetically Sealed Canisters',
    desc: 'Heavy-duty stainless transport canisters designed to eliminate vapors, moisture, and contamination during transit.',
    position: 'pos-right'
  },
  {
    id: 'phase-3',
    name: 'Calibration',
    startFrame: 162,
    endFrame: 238,
    pillClass: 'pill-cyan',
    pillText: '🛡️ 0.01L Accuracy Guarantee',
    title: 'Precision In Every Drop',
    desc: 'Verified by calibrated positive-displacement flow meters. You receive 100% of the volume you pay for—zero compromise.',
    position: 'pos-left'
  },
  {
    id: 'phase-4',
    name: 'Delivery',
    startFrame: 245,
    endFrame: 299,
    pillClass: 'pill-emerald',
    pillText: '🚀 Lahore Rapid Dispatch',
    title: 'Zyphuel Certified & Sealed',
    desc: 'The complete canister sealed and ready for direct dispatch to your doorstep across Lahore within 15–30 minutes.',
    position: 'pos-center'
  }
]

export default function ScrollAnimationSection() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const targetFrameRef = useRef(0)
  const currentFrameRef = useRef(0)
  const isLoopRunningRef = useRef(false)
  const rafIdRef = useRef(null)

  const [loading, setLoading] = useState(true)
  const [loadedCount, setLoadedCount] = useState(0)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [activePhaseIndex, setActivePhaseIndex] = useState(0)

  // Retrieve the best available image frame (with fallback to nearest loaded frame)
  const getLoadedImage = useCallback((index) => {
    const images = imagesRef.current
    if (!images || images.length === 0) return null

    const safeIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(index)))
    if (images[safeIndex] && images[safeIndex].complete && images[safeIndex].naturalWidth > 0) {
      return images[safeIndex]
    }

    // Search backward for nearest available frame
    for (let i = safeIndex - 1; i >= 0; i--) {
      if (images[i] && images[i].complete && images[i].naturalWidth > 0) {
        return images[i]
      }
    }
    // Search forward
    for (let i = safeIndex + 1; i < FRAME_COUNT; i++) {
      if (images[i] && images[i].complete && images[i].naturalWidth > 0) {
        return images[i]
      }
    }
    return null
  }, [])

  // Render a specific frame onto the canvas
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = getLoadedImage(index)
    if (!img) return

    if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0)
  }, [getLoadedImage])

  // Continuous smooth interpolation (Lerp) RAF loop
  const startAnimationLoop = useCallback(() => {
    if (isLoopRunningRef.current) return
    isLoopRunningRef.current = true

    const loop = () => {
      const target = targetFrameRef.current
      const current = currentFrameRef.current
      const diff = target - current

      if (Math.abs(diff) > 0.05) {
        // Gentle, cinematic easing factor for slow motion feel
        currentFrameRef.current += diff * 0.08
        drawFrame(currentFrameRef.current)
      } else {
        currentFrameRef.current = target
        drawFrame(target)
      }

      // Update active phase based on current frame
      const frameInt = Math.round(currentFrameRef.current)
      let matchedPhase = -1
      for (let p = 0; p < STORY_PHASES.length; p++) {
        if (frameInt >= STORY_PHASES[p].startFrame && frameInt <= STORY_PHASES[p].endFrame) {
          matchedPhase = p
          break
        }
      }
      if (matchedPhase !== -1) {
        setActivePhaseIndex(matchedPhase)
      }

      rafIdRef.current = requestAnimationFrame(loop)
    }

    rafIdRef.current = requestAnimationFrame(loop)
  }, [drawFrame])

  // Preload all 300 frames
  useEffect(() => {
    let isMounted = true
    const imgs = []
    let loaded = 0

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image()
      img.src = getFramePath(i)

      img.onload = img.onerror = () => {
        if (!isMounted) return
        loaded++
        setLoadedCount(loaded)

        // Draw initial frame as soon as frame 1 arrives
        if (i === 1) {
          drawFrame(0)
        }

        // Allow interaction after initial 25 frames are ready
        if (loaded >= 25 && loading) {
          setLoading(false)
          startAnimationLoop()
        }
      }

      imgs.push(img)
    }

    imagesRef.current = imgs

    return () => {
      isMounted = false
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
      isLoopRunningRef.current = false
    }
  }, [drawFrame, loading, startAnimationLoop])

  // Scroll tracking with passive listener
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const scrollDistance = -rect.top
      const maxScroll = rect.height - window.innerHeight

      if (scrollDistance > 15) {
        setHasScrolled(true)
      }

      if (maxScroll <= 0) return

      const fraction = Math.min(1, Math.max(0, scrollDistance / maxScroll))
      targetFrameRef.current = fraction * (FRAME_COUNT - 1)

      if (!isLoopRunningRef.current) {
        startAnimationLoop()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
      isLoopRunningRef.current = false
    }
  }, [startAnimationLoop])

  // Skip / Jump directly to Hero Section
  const handleSkip = () => {
    if (!sectionRef.current) return
    const targetY = sectionRef.current.offsetTop + sectionRef.current.offsetHeight
    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }

  const progressPercent = Math.round((loadedCount / FRAME_COUNT) * 100)
  const currentGlowClass = `phase-${activePhaseIndex + 1}`

  return (
    <section
      ref={sectionRef}
      className="scroll-anim-container"
      aria-label="Interactive 3D Euro-V Refueling Experience"
    >
      <div className="scroll-anim-sticky">
        {/* Dynamic ambient color glow */}
        <div className={`scroll-anim-glow ${currentGlowClass}`} />

        {/* Cinematic Vignette */}
        <div className="scroll-anim-vignette" />

        {/* Storytelling Narrative Cards */}
        <div className="scroll-story-stage">
          {STORY_PHASES.map((phase, idx) => {
            const isActive = idx === activePhaseIndex
            return (
              <div
                key={phase.id}
                className={`scroll-story-card ${phase.position}${isActive ? ' active' : ''}`}
              >
                <div className={`scroll-story-pill ${phase.pillClass}`}>
                  {phase.pillText}
                </div>
                <h3 className="scroll-story-title">
                  <span>{phase.title}</span>
                </h3>
                <p className="scroll-story-desc">{phase.desc}</p>

                {idx === 3 && (
                  <div className="scroll-story-action">
                    <button
                      type="button"
                      
                      className="scroll-story-btn"
                      onClick={handleSkip}
                    >
                      <span>Explore Doorstep Refueling</span>
                      <i className="fa-solid fa-arrow-down" />
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Canvas Element */}
        <canvas ref={canvasRef} className="scroll-anim-canvas" />

        {/* Bottom Fade to blend into Hero */}
        <div className="scroll-anim-bottom-fade" />

        {/* Scroll To Animate Prompt */}
        <div className={`scroll-anim-hint${hasScrolled ? ' hidden' : ''}`}>
          <i className="fa-solid fa-angles-down" />
          <span>Scroll down to experience</span>
        </div>

       
      </div>
    </section>
  )
}
