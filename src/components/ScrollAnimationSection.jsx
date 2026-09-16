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
  const lastIndexRef = useRef(-1)
  const tickingRef = useRef(false)

  const [scrolled, setScrolled] = useState(false)

  // Direct 1:1 frame renderer matching reference zz.html
  const renderFrame = useCallback((index) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const images = imagesRef.current
    const img = images[index]
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find nearest loaded frame if current frame is not ready
      for (let offset = 1; offset < FRAME_COUNT; offset++) {
        const prev = images[index - offset]
        if (prev && prev.complete && prev.naturalWidth > 0) {
          if (canvas.width !== prev.naturalWidth) canvas.width = prev.naturalWidth
          if (canvas.height !== prev.naturalHeight) canvas.height = prev.naturalHeight
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(prev, 0, 0)
          return
        }
        const next = images[index + offset]
        if (next && next.complete && next.naturalWidth > 0) {
          if (canvas.width !== next.naturalWidth) canvas.width = next.naturalWidth
          if (canvas.height !== next.naturalHeight) canvas.height = next.naturalHeight
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(next, 0, 0)
          return
        }
      }
      return
    }

    if (canvas.width !== img.naturalWidth) canvas.width = img.naturalWidth
    if (canvas.height !== img.naturalHeight) canvas.height = img.naturalHeight
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0)
  }, [])

  // Preload all 300 frames with immediate Frame 1 render matching reference zz.html
  useEffect(() => {
    let isMounted = true
    const imgs = new Array(FRAME_COUNT)
    imagesRef.current = imgs

    // Priority 1: Load and render Frame 1 immediately
    const firstImg = new Image()
    firstImg.src = framePath(1)
    firstImg.onload = () => {
      if (!isMounted) return
      imgs[0] = firstImg
      renderFrame(0)
    }
    firstImg.onerror = () => {
      imgs[0] = firstImg
    }
    imgs[0] = firstImg

    // Priority 2: Preload remaining frames in smooth batches
    let nextIndex = 2
    const batchSize = 15

    const loadBatch = () => {
      if (!isMounted || nextIndex > FRAME_COUNT) return
      const limit = Math.min(nextIndex + batchSize, FRAME_COUNT + 1)
      for (let i = nextIndex; i < limit; i++) {
        const img = new Image()
        img.src = framePath(i)
        const idx = i - 1
        img.onload = img.onerror = () => {
          if (!isMounted) return
          imgs[idx] = img
        }
      }
      nextIndex = limit
      if (nextIndex <= FRAME_COUNT) {
        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
          window.requestIdleCallback(loadBatch, { timeout: 200 })
        } else {
          setTimeout(loadBatch, 30)
        }
      }
    }

    loadBatch()

    return () => {
      isMounted = false
    }
  }, [renderFrame])

  // Scroll tracking matching zz.html: direct 1:1 scroll fraction to frame index
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

      if (index !== lastIndexRef.current) {
        lastIndexRef.current = index
        if (!tickingRef.current) {
          tickingRef.current = true
          requestAnimationFrame(() => {
            renderFrame(index)
            tickingRef.current = false
          })
        }
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
        {/* Main Canvas matching zz.html */}
        <canvas ref={canvasRef} id="canvas" className="reference-canvas" />

        {/* Scroll hint matching zz.html */}
        <div id="scroll-hint" className={`reference-scroll-hint${scrolled ? ' hidden' : ''}`}>
          &#8595; Scroll to animate &#8595;
        </div>
      </div>
    </section>
  )
}
