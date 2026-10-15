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
  const isCanvasReadyRef = useRef(false)

  const [scrolled, setScrolled] = useState(false)
  const [scrubProgress, setScrubProgress] = useState(0)

  // High-DPI canvas buffer sizing (Retina/4K/8K crystal clear rendering)
  const resizeCanvasBuffer = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5)
    const rect = canvas.getBoundingClientRect()
    const targetW = Math.round((rect.width || window.innerWidth) * dpr)
    const targetH = Math.round((rect.height || window.innerHeight) * dpr)

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW
      canvas.height = targetH
    }
  }, [])

  // Direct 1:1 frame renderer with aspect-ratio cover math and crystal clear high quality
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
      for (let offset = 1; offset < FRAME_COUNT; offset++) {
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

    // Ensure canvas buffer matches screen DPR
    if (canvas.width === 0 || canvas.height === 0) {
      resizeCanvasBuffer()
    }

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    // Apple-grade aspect-ratio cover crop (zero distortion, zero pixel stretch, razor sharp)
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

  // Continuous physics-based RAF LERP loop for silky-smooth, calm, unhurried scrubbing (not fast)
  useEffect(() => {
    let animId
    let isRunning = true

    const loop = () => {
      if (!isRunning) return
      const diff = targetFrameRef.current - currentFrameRef.current

      // Calm, unhurried glide toward target frame with gentle damping (0.065)
      if (Math.abs(diff) > 0.02) {
        currentFrameRef.current += diff * 0.065
        renderFrame(currentFrameRef.current)
        setScrubProgress(Math.min(100, Math.max(0, (currentFrameRef.current / (FRAME_COUNT - 1)) * 100)))
      }

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)
    return () => {
      isRunning = false
      if (animId) cancelAnimationFrame(animId)
    }
  }, [renderFrame])

  // Fast staged preloading: Frame 1 -> Sparse Keyframes (~40 frames) -> Progressive background fill
  useEffect(() => {
    let isMounted = true
    const imgs = new Array(FRAME_COUNT)
    imagesRef.current = imgs

    // Priority 1: Instant load and render Frame 1 immediately
    const firstImg = new Image()
    firstImg.decoding = 'async'
    firstImg.onload = () => {
      if (!isMounted) return
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

    // Priority 2: Sparse Keyframes (every 6th frame)
    const keyframeIndices = []
    for (let k = 6; k < FRAME_COUNT; k += 6) {
      keyframeIndices.push(k)
    }
    if (keyframeIndices[keyframeIndices.length - 1] !== FRAME_COUNT - 1) {
      keyframeIndices.push(FRAME_COUNT - 1)
    }

    let kIdx = 0
    const loadKeyframes = () => {
      if (!isMounted) return
      if (kIdx >= keyframeIndices.length) {
        loadAllRemainingFrames()
        return
      }

      const batch = keyframeIndices.slice(kIdx, kIdx + 6)
      batch.forEach((idx) => {
        if (!imgs[idx]) {
          const img = new Image()
          img.decoding = 'async'
          img.src = framePath(idx + 1)
          imgs[idx] = img
        }
      })
      kIdx += 6
      setTimeout(loadKeyframes, 25)
    }

    const keyframeTimer = setTimeout(loadKeyframes, 60)

    // Priority 3: Progressive idle background filling
    const loadAllRemainingFrames = () => {
      if (!isMounted) return
      let missingIdx = 1
      const batchSize = 10

      const fillNext = () => {
        if (!isMounted || missingIdx >= FRAME_COUNT) return
        let loadedCount = 0
        while (missingIdx < FRAME_COUNT && loadedCount < batchSize) {
          if (!imgs[missingIdx]) {
            const img = new Image()
            img.decoding = 'async'
            img.src = framePath(missingIdx + 1)
            imgs[missingIdx] = img
            loadedCount++
          }
          missingIdx++
        }

        if (missingIdx < FRAME_COUNT && isMounted) {
          if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
            window.requestIdleCallback(() => fillNext(), { timeout: 120 })
          } else {
            setTimeout(fillNext, 35)
          }
        }
      }

      fillNext()
    }

    return () => {
      isMounted = false
      clearTimeout(keyframeTimer)
    }
  }, [renderFrame])

  // Low-latency scroll tracker updating target frame
  useEffect(() => {
    let hasScrolled = false
    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return

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
  }, [renderFrame, resizeCanvasBuffer])

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
