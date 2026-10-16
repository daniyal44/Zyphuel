import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import './ServicesSection3ScrollAnimation.css'

const FRAME_COUNT = 300
const FOLDER = '/services-section3-frames'

const framePath = (i) =>
  `${FOLDER}/section3-frame-${String(i).padStart(3, '0')}.jpg`

export default function ServicesSection3ScrollAnimation() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const lastDrawnImgRef = useRef(null)
  const targetFrameRef = useRef(0)
  const currentFrameRef = useRef(0)
  const isLoopingRef = useRef(false)
  const animIdRef = useRef(null)
  const isVisibleRef = useRef(false)
  const hasLoadedInitialRef = useRef(false)

  const [scrolled, setScrolled] = useState(false)
  const [scrubProgress, setScrubProgress] = useState(0)

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
      for (let offset = 1; offset < 35; offset++) {
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
        setScrubProgress(Math.min(100, Math.max(0, (currentFrameRef.current / (FRAME_COUNT - 1)) * 100)))
        animIdRef.current = requestAnimationFrame(loop)
      } else {
        currentFrameRef.current = targetFrameRef.current
        renderFrame(currentFrameRef.current)
        setScrubProgress(Math.min(100, Math.max(0, (currentFrameRef.current / (FRAME_COUNT - 1)) * 100)))
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

  // Lazy Preloading on Viewport Approach: does NOT request frames until approaching Section 3
  const initFrameLoading = useCallback(() => {
    if (hasLoadedInitialRef.current) return
    hasLoadedInitialRef.current = true

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
      renderFrame(0)
    }
    firstImg.onerror = (e) => {
      console.warn('Section 3 frame 1 failed to load:', framePath(1), e)
    }
    firstImg.src = framePath(1)
    imgs[0] = firstImg

    if (firstImg.complete && firstImg.naturalWidth > 0) {
      renderFrame(0)
    }

    // Priority 2: Sparse Keyframes on idle (every 10th frame: 30 frames)
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
    const step = isMobile ? 15 : 10
    const keyframeIndices = []
    for (let k = step; k < FRAME_COUNT; k += step) {
      keyframeIndices.push(k)
    }
    if (keyframeIndices[keyframeIndices.length - 1] !== FRAME_COUNT - 1) {
      keyframeIndices.push(FRAME_COUNT - 1)
    }

    let kIdx = 0
    let keyframeTimer = null

    const loadKeyframes = () => {
      if (!isVisibleRef.current || kIdx >= keyframeIndices.length) return

      const batch = keyframeIndices.slice(kIdx, kIdx + 4)
      batch.forEach((idx) => loadSingle(idx))
      kIdx += 4

      if (kIdx < keyframeIndices.length) {
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(loadKeyframes, { timeout: 150 })
        } else {
          keyframeTimer = setTimeout(loadKeyframes, 60)
        }
      }
    }

    keyframeTimer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(loadKeyframes, { timeout: 200 })
      } else {
        loadKeyframes()
      }
    }, 100)
  }, [renderFrame])

  // Viewport observer: Section 3 is far down, so only init & run when within 400px of viewport
  useEffect(() => {
    const container = containerRef.current
    if (!container || !('IntersectionObserver' in window)) {
      initFrameLoading()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const inView = entry.isIntersecting
          isVisibleRef.current = inView
          if (inView) {
            initFrameLoading()
            startLoop()
          } else {
            isLoopingRef.current = false
            if (animIdRef.current) cancelAnimationFrame(animIdRef.current)
          }
        })
      },
      { threshold: 0.01, rootMargin: '400px 0px 400px 0px' }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [initFrameLoading, startLoop])

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
        const minW = Math.max(0, center - 8)
        const maxW = Math.min(FRAME_COUNT - 1, center + 10)
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

  // Smooth scroll down to next section (#services-scope)
  const handleScrollToNextSection = () => {
    const nextEl = document.getElementById('services-scope')
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Dynamic storytelling stages
  const stageInfo = useMemo(() => {
    if (scrubProgress < 35) {
      return {
        stage: 'Stage 01',
        title: 'Holographic Dispatch Blueprint',
        desc: 'Precision delivery canisters, telemetry sensors, and automated digital dispatch architecture.'
      }
    } else if (scrubProgress < 75) {
      return {
        stage: 'Stage 02',
        title: 'Smart IoT & Mobile App Platform',
        desc: 'Live GPS bowser tracking, real-time volume metering, and digital order dispatch in Lahore.'
      }
    } else {
      return {
        stage: 'Stage 03',
        title: 'Zyphuel Enterprise Fleet Ecosystem',
        desc: 'Certified hazmat fuel specialists, direct corporate logistics, and calibrated terminal-grade mobility.'
      }
    }
  }, [scrubProgress])

  return (
    <section
      id="services-ecosystem-scroll"
      className="section3-scroll-hero"
      ref={containerRef}
      aria-label="3D Zyphuel Dispatch Ecosystem Scroll Animation"
    >
      <div className="section3-sticky-stage">
        {/* Main Canvas covering 100% viewport */}
        <canvas
          ref={canvasRef}
          id="section3-canvas"
          className="section3-canvas"
          width={1920}
          height={1080}
        />

        {/* Cinematic Vignette Overlays */}
        <div className="section3-canvas-vignette" aria-hidden="true" />
        <div className="section3-canvas-edge-glow" aria-hidden="true" />

        {/* Top-Left Status Badge */}
        <div className="section3-scroll-badge">
          <span className="live-dot" />
          <i className="fa-solid fa-truck-fast" />
          <span>Smart IoT &amp; Mobility Ecosystem</span>
        </div>

        {/* Top-Right Narrative Phase */}
        <div className="section3-phase-pill">
          <span>{stageInfo.stage}:</span>
          <strong>{stageInfo.title}</strong>
        </div>

        {/* Center-Bottom Storytelling Overlay */}
        <div className="section3-story-overlay">
          <h2 className="section3-story-title">{stageInfo.title}</h2>
          <p className="section3-story-desc">{stageInfo.desc}</p>
        </div>

        {/* Real-time 3D scrub progress line */}
        <div
          className="section3-progress-bar"
          style={{ width: `${scrubProgress}%` }}
          aria-hidden="true"
        />

        {/* Interactive Clickable Scroll / Skip Hint */}
        <button
          type="button"
          className={`section3-scroll-hint${scrolled ? ' hidden' : ''}`}
          onClick={handleScrollToNextSection}
          title="Scroll to animate or click to view service compliance details"
          aria-label="Scroll to animate or tap to jump to service compliance details"
        >
          <i className="fa-solid fa-arrow-down" />
          <span>Scroll to explore</span>
        </button>
      </div>
    </section>
  )
}
