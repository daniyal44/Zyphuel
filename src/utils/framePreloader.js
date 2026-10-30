/**
 * Progressive frame preloader for the scroll-scrub sections.
 *
 * History of this file:
 *   1. Sparse keyframes only -> the scrub fell back dozens of frames away and froze.
 *   2. Keyframes + a scroll lookahead -> better, but gaps were only filled while the
 *      visitor was scrolling, and each frame takes 0.3-1.8 s from the deployed
 *      origin. A visitor scrolling at normal speed outran the loader, so the canvas
 *      jumped between the two or three frames that happened to be cached.
 *
 * This version keeps the anchor frames plus a bounded idle trickle. A full
 * 300-frame preload was tried and had to be reverted: decoding that many 1120 px
 * WebP frames froze the main thread (wheel scrolling stalled for 15 s on a
 * software-rasterised browser). The fill is now capped, and each scroll handler
 * separately guarantees the frames *ahead* of the scrub direction, which is what
 * actually keeps a downward scroll smooth.
 *
 * Work is chunked so decoding never competes with scrolling, and a hard timeout
 * guarantees the queue keeps draining on browsers that never report an idle period.
 * On metered / 2G connections the fill is skipped and only keyframes load.
 */

const IDLE_TIMEOUT_MS = 200
const HARD_TIMEOUT_MS = 40

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

  // Keyframe spacing. Dense enough that even a scrub that outruns the fill lands
  // within a few frames of the truth, which is invisible at full-screen size.
  const keyStep = metered ? 24 : isMobile ? 8 : 6
  // Frames fetched per idle slice. Kept small on purpose: the cost here is image
  // decode on the main thread, not bandwidth.
  const chunkSize = metered ? 1 : 2
  // Hard ceiling on background-loaded frames per hero. The scroll lookahead covers
  // the rest of the sequence that the visitor actually reaches.
  const idleBudget = metered ? 24 : isMobile ? 90 : 150

  const seen = new Set()
  const queue = []
  // The dense fill waits for the page `load` event: those bytes are the largest
  // single block on the page, and starting them while the document is still
  // loading pushes LCP out by seconds on a throttled connection.
  const fillQueue = []

  const enqueue = (index, into = queue) => {
    if (index < 0 || index >= frameCount || seen.has(index)) return
    seen.add(index)
    into.push(index)
  }

  // Pass 1: the opening frames, so frame 1 and the first scrub step are instant.
  const headWindow = metered ? 2 : isMobile ? 6 : 10
  for (let k = 0; k <= headWindow; k++) enqueue(k)

  // Pass 2: evenly spaced keyframes across the whole sequence.
  for (let k = 0; k < frameCount; k += keyStep) enqueue(k)
  enqueue(frameCount - 1)

  // Pass 3: a bounded trickle through the rest of the sequence, so a jump further
  // down the page still lands on a nearby frame.
  if (!metered) {
    const stride = isMobile ? 2 : 1
    let added = 0
    for (let k = 0; k < frameCount && added < idleBudget; k += stride) {
      if (seen.has(k)) continue
      enqueue(k, fillQueue)
      added++
    }
  }

  let cursor = 0
  let handle = null
  let cancelled = false
  let fillStarted = false

  const startFill = () => {
    if (cancelled || isCancelled() || fillStarted || fillQueue.length === 0) return
    fillStarted = true
    for (const index of fillQueue) queue.push(index)
    fillQueue.length = 0
    handle = schedule(pump)
  }

  const waitForLoadThenFill = () => {
    if (typeof document === 'undefined') return
    if (document.readyState === 'complete') {
      startFill()
      return
    }
    const onLoad = () => {
      document.removeEventListener('load', onLoad)
      startFill()
    }
    document.addEventListener('load', onLoad, { once: true })
    // Safety net: a stalled sub-resource must not block the fill forever.
    setTimeout(onLoad, 8000)
  }

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

    if (cursor < queue.length) {
      handle = schedule(pump)
      return
    }

    if (!fillStarted && fillQueue.length) waitForLoadThenFill()
  }

  handle = schedule(pump)

  return () => {
    cancelled = true
    unschedule(handle)
    handle = null
    fillQueue.length = 0
  }
}
