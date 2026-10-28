import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import './ServicesScrollAnimationSection.css'
import { startProgressivePreload } from '../utils/framePreloader'

const FRAME_COUNT = 300
const FOLDER = '/services-hero-frames'

const framePath = (i) =>
  `${FOLDER}/service-frame-${String(i).padStart(3, '0')}.jpg`

export default function ServicesScrollAnimationSection() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const lastDrawnImgRef = useRef(null)
  const targetFrameRef = useRef(0)
  const currentFrameRef = useRef(0)
  const isLoopingRef = useRef(false)
  const animIdRef = useRef(null)
  const isVisibleRef = useRef(true)

  const [scrolled, setScrolled] = useState(false)
  // The progress bar is written straight to the DOM. Driving it through React state
  // re-rendered the whole section on every animation frame and forced a style
  // recalculation each time - 6.2 s of Style & Layout in the Lighthouse trace.
  const [scrubStage, setScrubStage] = useState(0)
  const progressBarRef = useRef(null)
  const scrubStageRef = useRef(0)

  const updateScrubUi = useCallback((frame) => {
    const pct = Math.min(100, Math.max(0, (frame / (FRAME_COUNT - 1)) * 100))
    const bar = progressBarRef.current
    if (bar) bar.style.width = pct + '%'
    const stage = pct < 35 ? 0 : pct < 75 ? 1 : 2
    if (stage !== scrubStageRef.current) {
      scrubStageRef.current = stage
      setScrubStage(stage)
    }
  }, [])

  // High-performance canvas buffer sizing
  const resizeCanvasBuffer = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.5)
    const rect = canvas.getBoundingClientRect()
    const targetW = Math.round((rect.width || window.innerWidth) * dpr)
    const targetH = Math.round((rect.height || window.innerHeight) * dpr)

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW
      canvas.height = targetH
    }
  }, [])

  // Direct 1:1 frame renderer with aspect-ratio cover math
  const renderFrame = useCallback((index) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true })
    if (!ctx) return

    const images = imagesRef.current
    if (!images || images.length === 0) return

    const safeIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(index)))
    let img = images[safeIndex]

    // If target frame is not yet fully loaded, find nearest loaded neighbor
    if (!img || !img.complete || img.naturalWidth === 0) {
      let fallback = null
      for (let offset = 1; offset < 13; offset++) {
        const prev = safeIndex - offset >= 0 ? images[safeIndex - offset] : null
        if (prev && prev.complete && prev.naturalWidth > 0) {
          fallback = prev
          break
        }
        const next = safeIndex + offset < FRAME_COUNT ? images[safeIndex + offset] : null
        if (next && next.complete && next.naturalWidth > 0) {
          fallback = next
          break
        }
      }
      if (fallback) {
        img = fallback
      } else if (lastDrawnImgRef.current) {
        img = lastDrawnImgRef.current
      } else {
        return
      }
    }

    if (canvas.width === 0 || canvas.height === 0) {
      resizeCanvasBuffer()
    }

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'medium'

    const cW = canvas.width
    const cH = canvas.height
    const iW = img.naturalWidth || 2560
    const iH = img.naturalHeight || 1440
    const scale = Math.max(cW / iW, cH / iH)
    const drawW = iW * scale
    const drawH = iH * scale
    const drawX = (cW - drawW) * 0.5
    const drawY = (cH - drawH) * 0.5

    ctx.drawImage(img, 0, 0, iW, iH, drawX, drawY, drawW, drawH)
    lastDrawnImgRef.current = img
  }, [resizeCanvasBuffer])

  // On-demand RAF loop: runs ONLY while frame is actively moving, stops when idle (0% CPU/GPU waste)
  const startLoop = useCallback(() => {
    if (isLoopingRef.current || !isVisibleRef.current) return
    isLoopingRef.current = true

    const loop = () => {
      if (!isVisibleRef.current) {
        isLoopingRef.current = false
        return
      }

      const diff = targetFrameRef.current - currentFrameRef.current

      if (Math.abs(diff) > 0.02) {
        currentFrameRef.current += diff * 0.12
        renderFrame(currentFrameRef.current)
        updateScrubUi(currentFrameRef.current)
        animIdRef.current = requestAnimationFrame(loop)
      } else {
        currentFrameRef.current = targetFrameRef.current
        renderFrame(currentFrameRef.current)
        updateScrubUi(currentFrameRef.current)
        isLoopingRef.current = false
      }
    }

    animIdRef.current = requestAnimationFrame(loop)
  }, [renderFrame])

  // Cleanup loop on unmount
  useEffect(() => {
    return () => {
      isLoopingRef.current = false
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current)
    }
  }, [])

  // Fast staged preloading: Frame 1 immediately, then sparse keyframes on idle
  useEffect(() => {
    let isMounted = true
    const imgs = new Array(FRAME_COUNT)
    imagesRef.current = imgs

    const loadSingle = (idx) => {
      if (imgs[idx]) return imgs[idx]
      const img = new Image()
      img.decoding = 'async'
      img.src = framePath(idx + 1)
      imgs[idx] = img
      return img
    }

    // Priority 1: Instant load and render Frame 1 immediately
    const firstImg = new Image()
    firstImg.decoding = 'async'
    firstImg.onload = () => {
      if (!isMounted) return
      renderFrame(0)
    }
    firstImg.onerror = (e) => {
      console.warn('Services hero frame 1 failed to load:', framePath(1), e)
    }
    firstImg.src = framePath(1)
    imgs[0] = firstImg

    if (firstImg.complete && firstImg.naturalWidth > 0) {
      renderFrame(0)
    }

    // Priority 2: progressive fill of the whole sequence on idle, so a fast scroll
    // never lands on an unloaded frame (see src/utils/framePreloader.js).
    const cancelPreload = startProgressivePreload({
      frameCount: FRAME_COUNT,
      loadSingle,
      isCancelled: () => !isMounted
    })

    return () => {
      isMounted = false
      cancelPreload()
    }
  }, [renderFrame])

  // Viewport observer: pause completely when scrolled out of view
  useEffect(() => {
    const container = containerRef.current
    if (!container || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const inView = entry.isIntersecting
          isVisibleRef.current = inView
          if (inView) {
            startLoop()
          } else {
            isLoopingRef.current = false
            if (animIdRef.current) cancelAnimationFrame(animIdRef.current)
          }
        })
      },
      { threshold: 0.01, rootMargin: '200px 0px 200px 0px' }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [startLoop])

  // Direct, low-latency scroll tracker updating target frame with lookahead preloading
  useEffect(() => {
    let hasScrolled = false

    const handleScroll = () => {
      const container = containerRef.current
      if (!container || !isVisibleRef.current) return

      const rect = container.getBoundingClientRect()
      const scrollTop = -rect.top
      const maxScroll = rect.height - window.innerHeight

      if (scrollTop > 20 && !hasScrolled) {
        hasScrolled = true
        setScrolled(true)
      }

      if (maxScroll <= 0) return

      const fraction = Math.min(1, Math.max(0, scrollTop / maxScroll))
      targetFrameRef.current = fraction * (FRAME_COUNT - 1)

      // Lookahead Window: load +/- 8 frames around current position
      const imgs = imagesRef.current
      if (imgs) {
        const center = Math.round(targetFrameRef.current)
        const minW = Math.max(0, center - 14)
        const maxW = Math.min(FRAME_COUNT - 1, center + 16)
        for (let w = minW; w <= maxW; w++) {
          if (!imgs[w]) {
            const img = new Image()
            img.decoding = 'async'
            img.src = framePath(w + 1)
            imgs[w] = img
          }
        }
      }

      startLoop()
    }

    const handleResize = () => {
      resizeCanvasBuffer()
      if (lastDrawnImgRef.current) {
        renderFrame(currentFrameRef.current)
      }
      handleScroll()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('orientationchange', handleResize, { passive: true })

    resizeCanvasBuffer()
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [renderFrame, resizeCanvasBuffer, startLoop])

  // Smooth scroll down to main doorstep fuel delivery hero
  const handleScrollToContent = () => {
    const heroEl = document.getElementById('services-main') || document.querySelector('.services-hero')
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Dynamic storytelling stages
  const stageInfo = useMemo(() => {
    if (scrubStage === 0) {
      return {
        stage: 'Stage 01',
        title: 'Euro-V Industrial Power',
        desc: 'Advanced heavy-duty generator architecture designed for mission-critical standby power.'
      }
    } else if (scrubStage === 1) {
      return {
        stage: 'Stage 02',
        title: 'Precision Engine Assembly',
        desc: 'Calibrated alternator and fuel-injection systems engineered for continuous power generation.'
      }
    } else {
      return {
        stage: 'Stage 03',
        title: 'Standby Refueling Ready',
        desc: 'Direct doorstep Euro-V diesel delivery with 50-meter high-reach hoses and 0.01L digital accuracy.'
      }
    }
  }, [scrubStage])

  return (
    <section
      id="services-scroll-hero"
      className="services-scroll-hero"
      ref={containerRef}
      aria-label="3D Generator Refueling Scroll Animation"
    >
      <div className="services-sticky-stage">
        {/* Main Canvas covering 100% viewport */}
        <canvas
          ref={canvasRef}
          id="services-canvas"
          className="services-canvas"
          width={1920}
          height={1080}
        />

        {/* Cinematic Vignette */}
        <div className="services-canvas-vignette" aria-hidden="true" />
        <div className="services-canvas-edge-glow" aria-hidden="true" />

        {/* Top-Left Status Badge */}
        <div className="services-scroll-badge">
          <span className="live-dot" />
          <i className="fa-solid fa-bolt-lightning" />
          <span>Generator & Machinery Refueling</span>
        </div>

        {/* Top-Right Narrative Phase */}
        <div className="services-phase-pill">
          <span>{stageInfo.stage}:</span>
          <strong>{stageInfo.title}</strong>
        </div>

        {/* Center-Bottom Storytelling Overlay */}
        <div className="services-story-overlay">
          <h2 className="services-story-title">{stageInfo.title}</h2>
          <p className="services-story-desc">{stageInfo.desc}</p>
        </div>

        {/* Real-time 3D scrub progress line */}
        <div
          className="services-progress-bar"
          ref={progressBarRef}
          style={{ width: '0%' }}
          aria-hidden="true"
        />

        {/* Interactive Clickable Scroll / Skip Hint */}
        <button
          type="button"
          className={`services-scroll-hint${scrolled ? ' hidden' : ''}`}
          onClick={handleScrollToContent}
          title="Scroll to animate or click to view doorstep fuel delivery details"
        >
          <i className="fa-solid fa-arrow-down" />
          <span>Scroll to animate</span>
        </button>
      </div>
    </section>
  )
}
