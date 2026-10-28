/**
 * Progressive frame preloader for the scroll-scrub sections.
 *
 * The previous implementation loaded only *sparse keyframes* on idle (every 8th or
 * 10th frame, and every 40th/45th on mobile) and then relied on a ±10 frame
 * lookahead while scrolling. On a fast scroll most target frames were simply not
 * loaded, so the renderer fell back to the nearest available neighbour — which
 * could be dozens of frames away. The visible result was an animation that froze
 * for long stretches or jumped in big steps.
 *
 * This loader fills the sequence completely:
 *   1. keyframes first, so every scroll position has something close by;
 *   2. then the gaps are filled in ascending order.
 *
 * Work is chunked into idle callbacks so decoding never competes with scrolling.
 * On metered or slow connections the dense fill is skipped and only keyframes load.
 */

// A frame budget is requested through requestIdleCallback, but a parallel timeout
// guarantees the sequence keeps filling even when the browser never reports an idle
// period (background tabs, throttled idle callbacks, low-power devices). Without
// that guarantee the loader can silently stall, which is exactly the frozen-scrub
// symptom this module exists to remove.
const IDLE_TIMEOUT_MS = 300
const HARD_TIMEOUT_MS = 60

function schedule(fn) {
  if (typeof window === 'undefined') return null

  let ran = false
  let idleId = null
  let timerId = null

  const run = () => {
    if (ran) return
    ran = true
    if (idleId != null && 'cancelIdleCallback' in window) {
      try { window.cancelIdleCallback(idleId) } catch { /* already consumed */ }
    }
    if (timerId != null) clearTimeout(timerId)
    fn()
  }

  if ('requestIdleCallback' in window) {
    idleId = window.requestIdleCallback(run, { timeout: IDLE_TIMEOUT_MS })
  }
  timerId = setTimeout(run, HARD_TIMEOUT_MS)

  return { idleId, timerId }
}

function unschedule(handle) {
  if (handle == null || typeof window === 'undefined') return
  if (handle.idleId != null && 'cancelIdleCallback' in window) {
    try { window.cancelIdleCallback(handle.idleId) } catch { /* already consumed */ }
  }
  if (handle.timerId != null) clearTimeout(handle.timerId)
}

/**
 * @param {object} options
 * @param {number} options.frameCount      Total frames in the sequence.
 * @param {(index:number)=>void} options.loadSingle  Idempotent loader for one frame.
 * @param {()=>boolean} [options.isCancelled]  Return true to stop scheduling.
 * @returns {()=>void} cancel function
 */
export function startProgressivePreload({ frameCount, loadSingle, isCancelled = () => false }) {
  if (typeof window === 'undefined' || !frameCount) return () => {}

  const connection = (typeof navigator !== 'undefined' && navigator.connection) || {}
  const metered = connection.saveData === true || /(^|-)2g$/.test(connection.effectiveType || '')
  const isMobile = window.innerWidth <= 768

  // Keyframes only: enough that the scrub always has a neighbour a few indices away,
  // without pulling the whole sequence during page load. Loading all 300 frames cost
  // ~20 MB up front and dropped the mobile Lighthouse score to 37; the scroll
  // lookahead in each component fills the frames the visitor actually reaches.
  const keyStep = metered ? 30 : isMobile ? 12 : 8
  const chunkSize = metered ? 1 : 2

  const seen = new Set()
  const queue = []

  const enqueue = (index) => {
    if (index < 0 || index >= frameCount || seen.has(index)) return
    seen.add(index)
    queue.push(index)
  }

  // Priority 1: evenly spaced keyframes.
  for (let k = 0; k < frameCount; k += keyStep) enqueue(k)
  enqueue(frameCount - 1)

  // A handful of frames around the start position, so the first scrub movement is
  // already covered before the scroll lookahead kicks in.
  const headWindow = metered ? 2 : isMobile ? 6 : 10
  for (let k = 0; k <= headWindow; k++) enqueue(k)

  let cursor = 0
  let handle = null
  let cancelled = false

  const pump = () => {
    handle = null
    if (cancelled || isCancelled()) return

    const end = Math.min(queue.length, cursor + chunkSize)
    for (; cursor < end; cursor++) {
      try {
        loadSingle(queue[cursor])
      } catch {
        // A single failed frame must never stop the rest of the sequence.
      }
    }

    if (cursor < queue.length) handle = schedule(pump)
  }

  handle = schedule(pump)

  return () => {
    cancelled = true
    unschedule(handle)
    handle = null
  }
}
