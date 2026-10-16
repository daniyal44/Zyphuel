import { useEffect, useRef, useState, useCallback } from 'react'
import './ScrollAnimationSection.css'

const FRAME_COUNT = 300
const FOLDER = '/ezgif-2f1a39c97e5b173b-jpg'

const framePath = (i) =>
  `${FOLDER}/ezgif-frame-${String(i).padStart(3, '0')}.jpg`

export default function ScrollAnimationSection() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const lastDrawnImgRef = useRef(null)
  const targetFrameRef = useRef(0)
  const currentFrameRef = useRef(0)
  const isCanvasReadyRef = useRef(false)
  const isLoopingRef = useRef(false)
  const animIdRef = useRef(null)
  const isVisibleRef = useRef(true)

  const [scrolled, setScrolled] = useState(false)
  const [scrubProgress, setScrubProgress] = useState(0)

  // Direct 1:1 frame renderer with zero-tear persistence and instant fallback
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

    // Set fixed native dimensions once to prevent GPU buffer re-allocations
    if (!isCanvasReadyRef.current && img.naturalWidth > 0) {
      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.5)
      canvas.width = Math.round((img.naturalWidth || 1920) * (dpr > 1 ? 1 : 1))
      canvas.height = Math.round((img.naturalHeight || 1080) * (dpr > 1 ? 1 : 1))
      isCanvasReadyRef.current = true
    }

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'medium'
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    lastDrawnImgRef.current = img
  }, [])

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

      if (Math.abs(diff) > 0.04) {
        currentFrameRef.current += diff * 0.18
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

  // High-performance staged preloading: Frame 1 immediately, then sparse keyframes on idle
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

    // Priority 1: Instant load and render Frame 1 immediately (0ms blocking)
    const firstImg = new Image()
    firstImg.decoding = 'async'
    firstImg.onload = () => {
      if (!isMounted) return
      renderFrame(0)
    }
    firstImg.onerror = (e) => {
      console.warn('Hero frame 1 failed to load:', framePath(1), e)
    }
    firstImg.src = framePath(1)
    imgs[0] = firstImg

    if (firstImg.complete && firstImg.naturalWidth > 0) {
      renderFrame(0)
    }

    // Priority 2: Sparse Keyframes loaded gently during idle periods
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
    const step = isMobile ? 12 : 8
    const keyframeIndices = []
    for (let k = step; k < FRAME_COUNT; k += step) {
      keyframeIndices.push(k)
    }
    if (keyframeIndices[keyframeIndices.length - 1] !== FRAME_COUNT - 1) {
      keyframeIndices.push(FRAME_COUNT - 1)
    }

    let kIdx = 0
    let keyframeTimer = null

    const loadNextBatch = () => {
      if (!isMounted || !isVisibleRef.current) return
      if (kIdx >= keyframeIndices.length) return

      const batch = keyframeIndices.slice(kIdx, kIdx + 4)
      batch.forEach((idx) => loadSingle(idx))
      kIdx += 4

      if (kIdx < keyframeIndices.length) {
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(loadNextBatch, { timeout: 150 })
        } else {
          keyframeTimer = setTimeout(loadNextBatch, 60)
        }
      }
    }

    keyframeTimer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(loadNextBatch, { timeout: 200 })
      } else {
        loadNextBatch()
      }
    }, 100)

    return () => {
      isMounted = false
      if (keyframeTimer) clearTimeout(keyframeTimer)
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

  // Low-latency passive scroll tracker with on-demand lookahead frame preloading
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

      // Proactive lookahead: load frames around current position (+/- 8 frames)
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

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    window.addEventListener('orientationchange', handleScroll, { passive: true })

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      window.removeEventListener('orientationchange', handleScroll)
    }
  }, [startLoop])

  // Smooth scroll down to main doorstep fuel delivery hero
  const handleScrollToContent = () => {
    const heroEl = document.getElementById('home')
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="cinematic-hero"
      className="cinematic-scroll-hero"
      ref={containerRef}
      aria-label="3D Euro-V Refueling Animation"
    >
      <div className="cinematic-sticky-stage">
        {/* Main Canvas covering 100% viewport */}
        <canvas ref={canvasRef} id="canvas" className="reference-canvas" width={1920} height={1080} />

        {/* Real-time 3D scrub progress line */}
        <div
          className="cinematic-progress-bar"
          style={{ width: `${scrubProgress}%` }}
          aria-hidden="true"
        />

        {/* Interactive Clickable Scroll / Skip Hint */}
        <button
          type="button"
          id="scroll-hint"
          className={`reference-scroll-hint${scrolled ? ' hidden' : ''}`}
          onClick={handleScrollToContent}
          title="Scroll or click to view doorstep fuel delivery details"
          aria-label="Scroll to animate or tap to jump to fuel delivery details"
        >
          &#8595; Scroll to animate &#8595;
        </button>
      </div>
    </section>
  )
}
