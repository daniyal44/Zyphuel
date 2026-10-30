import { useEffect, useRef, useState, useCallback } from 'react'
import './ScrollAnimationSection.css'
import { startProgressivePreload } from '../utils/framePreloader'

// 300 source frames exist on disk, but only every third one is used. Three hundred
// 1280 px images is ~1 500 requests across the five heroes; on a phone that queue
// never drained before the visitor had scrolled past, so the canvas froze. A 100
// frame scrub over the same runway is indistinguishable at full-screen size and
// loads roughly three times faster.
const SOURCE_STRIDE = 3
const FRAME_COUNT = 100
const FOLDER = '/ezgif-2f1a39c97e5b173b-jpg'

const framePath = (i) =>
  `${FOLDER}/ezgif-frame-${String(i * SOURCE_STRIDE + 1).padStart(3, '0')}.webp`

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

  // A requested frame may finish loading after the smoothing loop has settled on a
  // nearby fallback. Repaint the current target when that frame arrives so a quick
  // scroll cannot leave the canvas showing a stale frame until the next scroll event.
  const requestFrame = useCallback((images, index) => {
    if (images[index]) return images[index]
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => {
      const targetIndex = Math.round(targetFrameRef.current)
      const targetImage = images[targetIndex]
      if (isVisibleRef.current && targetImage?.complete && targetImage.naturalWidth > 0) {
        renderFrame(targetIndex)
        updateScrubUi(targetIndex)
      }
    }
    img.src = framePath(index)
    images[index] = img
    return img
  }, [renderFrame, updateScrubUi])

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

    const loadSingle = (idx) => requestFrame(imgs, idx)

    // Priority 1: Instant load and render Frame 1 immediately (0ms blocking)
    const firstImg = new Image()
    firstImg.decoding = 'async'
    firstImg.onload = () => {
      if (!isMounted) return
      renderFrame(0)
    }
    firstImg.onerror = (e) => {
      console.warn('Hero frame 1 failed to load:', framePath(0), e)
    }
    firstImg.src = framePath(0)
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
  }, [renderFrame, requestFrame])

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

      // Ahead-biased lookahead: the visitor scrolls downward, so guarantee the
      // frames in front of the scrub (not a symmetric window) and keep only a few
      // behind. Loading the whole sequence froze the main thread during decode.
      const imgs = imagesRef.current
      if (imgs) {
        const center = Math.round(targetFrameRef.current)
        const minW = Math.max(0, center - 4)
        const maxW = Math.min(FRAME_COUNT - 1, center + 16)
        for (let w = minW; w <= maxW; w++) {
          requestFrame(imgs, w)
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
  }, [requestFrame, startLoop])

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
          ref={progressBarRef}
          style={{ width: '0%' }}
          aria-hidden="true"
        />

        {/* Interactive Clickable Scroll / Skip Hint */}
        <button
          type="button"
          id="scroll-hint"
          className={`reference-scroll-hint${scrolled ? ' hidden' : ''}`}
          onClick={handleScrollToContent}
          title="Scroll or click to view doorstep fuel delivery details"
        >
          &#8595; Scroll to animate &#8595;
        </button>
      </div>
    </section>
  )
}
