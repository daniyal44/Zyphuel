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

  const [scrolled, setScrolled] = useState(false)
  const [scrubProgress, setScrubProgress] = useState(0)

  // Direct 1:1 frame renderer with zero-tear persistence and instant fallback
  const renderFrame = useCallback((index) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
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
        // Keep currently rendered frame to avoid any blank flicker
        img = lastDrawnImgRef.current
      } else {
        return
      }
    }

    // Set fixed native dimensions once to prevent GPU buffer re-allocations
    if (!isCanvasReadyRef.current && img.naturalWidth > 0) {
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      isCanvasReadyRef.current = true
    }

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'medium'
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    lastDrawnImgRef.current = img
  }, [])

  // Continuous physics-based RAF LERP loop for silky-smooth 60/120fps scrubbing
  useEffect(() => {
    let animId
    let isRunning = true

    const loop = () => {
      if (!isRunning) return
      const diff = targetFrameRef.current - currentFrameRef.current

      // Glide smoothly toward target frame with gentle damping
      if (Math.abs(diff) > 0.05) {
        currentFrameRef.current += diff * 0.18
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

  // Fast staged preloading: Frame 1 -> Sparse Keyframes (37 frames) -> Progressive background fill
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
      console.warn('Hero frame 1 failed to load:', framePath(1), e)
    }
    firstImg.src = framePath(1)
    imgs[0] = firstImg

    if (firstImg.complete && firstImg.naturalWidth > 0) {
      renderFrame(0)
    }

    // Priority 2: Sparse Keyframes (every 8th frame: ~37 frames total, only ~1.5 MB)
    // Allows full-range scrubbing immediately with zero delay
    const keyframeIndices = []
    for (let k = 8; k < FRAME_COUNT; k += 8) {
      keyframeIndices.push(k)
    }
    if (keyframeIndices[keyframeIndices.length - 1] !== FRAME_COUNT - 1) {
      keyframeIndices.push(FRAME_COUNT - 1)
    }

    let kIdx = 0
    const loadKeyframes = () => {
      if (!isMounted) return
      if (kIdx >= keyframeIndices.length) {
        // Once keyframes are queued, progressively fill remaining frames in background
        loadAllRemainingFrames()
        return
      }

      const batch = keyframeIndices.slice(kIdx, kIdx + 6)
      batch.forEach(idx => {
        if (!imgs[idx]) {
          const img = new Image()
          img.decoding = 'async'
          img.src = framePath(idx + 1)
          imgs[idx] = img
        }
      })
      kIdx += 6
      setTimeout(loadKeyframes, 20)
    }

    // Start keyframes after a short breather so first hero paint completes cleanly
    const keyframeTimer = setTimeout(loadKeyframes, 60)

    // Priority 3: Progressive idle background filling for all intermediate frames
    const loadAllRemainingFrames = () => {
      if (!isMounted) return
      let missingIdx = 1
      const batchSize = 12

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

  // Direct, low-latency scroll tracker updating the target frame without blocking
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

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    window.addEventListener('orientationchange', handleScroll, { passive: true })

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      window.removeEventListener('orientationchange', handleScroll)
    }
  }, [])

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
