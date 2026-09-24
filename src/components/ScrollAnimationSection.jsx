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
  const targetIndexRef = useRef(0)
  const tickingRef = useRef(false)

  const [scrolled, setScrolled] = useState(false)

  // Direct 1:1 frame renderer with high-quality smoothing and zero-tear persistence
  const renderFrame = useCallback((index) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const images = imagesRef.current
    if (!images || images.length === 0) return

    const safeIndex = Math.min(FRAME_COUNT - 1, Math.max(0, index))
    let img = images[safeIndex]

    // If target frame is not yet fully decoded, find nearest loaded neighbor
    if (!img || !img.complete || img.naturalWidth === 0) {
      let fallback = null
      for (let offset = 1; offset < FRAME_COUNT; offset++) {
        const prev = images[safeIndex - offset]
        if (prev && prev.complete && prev.naturalWidth > 0) {
          fallback = prev
          break
        }
        const next = images[safeIndex + offset]
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

    if (canvas.width !== img.naturalWidth) canvas.width = img.naturalWidth
    if (canvas.height !== img.naturalHeight) canvas.height = img.naturalHeight

    // Ensure highest-quality bicubic resampling for razor-sharp pixels
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(img, 0, 0)
    lastDrawnImgRef.current = img
  }, [])

  // Fast parallel preloading with background GPU decoding for zero main-thread jank
  useEffect(() => {
    let isMounted = true
    const imgs = new Array(FRAME_COUNT)
    imagesRef.current = imgs

    // Priority 1: Instant load and render Frame 1
    const firstImg = new Image()
    firstImg.decoding = 'async'
    firstImg.src = framePath(1)
    imgs[0] = firstImg
    firstImg.onload = () => {
      if (!isMounted) return
      renderFrame(0)
    }

    // Priority 2: Fast chunk streaming with async GPU decoding
    let nextIndex = 2
    const batchSize = 30

    const loadNextBatch = () => {
      if (!isMounted || nextIndex > FRAME_COUNT) return
      const limit = Math.min(nextIndex + batchSize, FRAME_COUNT + 1)
      for (let i = nextIndex; i < limit; i++) {
        const img = new Image()
        img.decoding = 'async'
        img.src = framePath(i)
        const idx = i - 1
        imgs[idx] = img
        if (img.decode) {
          img.decode().catch(() => {})
        }
      }
      nextIndex = limit
      if (nextIndex <= FRAME_COUNT && isMounted) {
        setTimeout(loadNextBatch, 16)
      }
    }

    loadNextBatch()

    return () => {
      isMounted = false
    }
  }, [renderFrame])

  // Real-time RAF-synchronized scroll tracker guaranteeing latest frame is always drawn
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const scrollTop = -rect.top
      const maxScroll = rect.height - window.innerHeight

      if (scrollTop > 20 && !scrolled) {
        setScrolled(true)
      }

      if (maxScroll <= 0) return

      const fraction = Math.min(1, Math.max(0, scrollTop / maxScroll))
      const index = Math.min(FRAME_COUNT - 1, Math.floor(fraction * FRAME_COUNT))

      targetIndexRef.current = index

      if (!tickingRef.current) {
        tickingRef.current = true
        requestAnimationFrame(() => {
          renderFrame(targetIndexRef.current)
          tickingRef.current = false
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [renderFrame, scrolled])

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

        {/* Scroll hint matching zz.html */}
        <div id="scroll-hint" className={`reference-scroll-hint${scrolled ? ' hidden' : ''}`}>
          &#8595; Scroll to animate &#8595;
        </div>
      </div>
    </section>
  )
}
