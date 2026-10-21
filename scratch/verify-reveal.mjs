import { spawn } from 'node:child_process'

const CHROME = 'C:\\Users\\mdani\\.cache\\puppeteer\\chrome-headless-shell\\win64-146.0.7680.31\\chrome-headless-shell-win64\\chrome-headless-shell.exe'
const PORT = 9333
const BASE = 'http://localhost:5183'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const proc = spawn(CHROME, [
  `--remote-debugging-port=${PORT}`,
  '--no-sandbox',
  '--disable-gpu',
  '--disable-dev-shm-usage',
  `--user-data-dir=C:\\Temp\\cdp-reveal-${Date.now()}`,
  '--window-size=1280,900',
  'about:blank'
], { stdio: 'ignore', windowsHide: true })

let wsUrl = null
for (let i = 0; i < 40; i++) {
  try {
    const res = await fetch(`http://127.0.0.1:${PORT}/json/version`)
    const j = await res.json()
    wsUrl = j.webSocketDebuggerUrl
    break
  } catch { await sleep(250) }
}
if (!wsUrl) { console.error('CHROME_NOT_READY'); proc.kill(); process.exit(1) }

const ws = new WebSocket(wsUrl)
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej })

let msgId = 0
const pending = new Map()
ws.onmessage = (ev) => {
  const m = JSON.parse(ev.data)
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id) }
}
const send = (method, params = {}, sessionId) => new Promise((resolve) => {
  const id = ++msgId
  pending.set(id, resolve)
  ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }))
})

const { result: { targetId } } = await send('Target.createTarget', { url: 'about:blank' })
const { result: { sessionId } } = await send('Target.attachToTarget', { targetId, flatten: true })

const evaluate = async (expression, awaitPromise = false) => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise }, sessionId)
  if (r.result?.exceptionDetails) return { error: r.result.exceptionDetails.text }
  return r.result?.result?.value
}

const consoleErrors = []
await send('Log.enable', {}, sessionId)
await send('Runtime.enable', {}, sessionId)
ws.addEventListener('message', (ev) => {
  const m = JSON.parse(ev.data)
  if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') {
    consoleErrors.push(`${m.params.entry.url || ''}: ${m.params.entry.text}`.slice(0, 160))
  }
})

await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false }, sessionId)
// Headless shell forces prefers-reduced-motion: reduce; force it off so the real
// animation path (reveal-ready -> hidden -> is-revealed) is what we measure.
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] }, sessionId)

const probe = async (path, selector, opts = {}) => {
  await send('Page.navigate', { url: `${BASE}${path}` }, sessionId)
  await sleep(opts.wait || 2500)

  const setup = await evaluate(`(() => {
    const el = document.querySelector(${JSON.stringify(selector)});
    if (!el) return { found: false, revealReady: document.documentElement.classList.contains('reveal-ready') };
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      found: true,
      revealReady: document.documentElement.classList.contains('reveal-ready'),
      reducedMotionOff: window.matchMedia('(prefers-reduced-motion: reduce)').matches === false,
      isRevealedBefore: el.classList.contains('is-revealed'),
      opacityBefore: cs.opacity,
      transformBefore: cs.transform,
      transitionDelay: el.style.transitionDelay || null,
      wasBelowFold: r.top > window.innerHeight,
      top: Math.round(r.top)
    };
  })()`)

  if (!setup.found) return { path, selector, found: false }

  await evaluate(`(() => {
    const el = document.querySelector(${JSON.stringify(selector)});
    el.scrollIntoView({ behavior: 'instant', block: 'center' });
    return true;
  })()`)
  await sleep(1400)

  const after = await evaluate(`(() => {
    const el = document.querySelector(${JSON.stringify(selector)});
    const cs = getComputedStyle(el);
    return { opacityAfter: cs.opacity, transformAfter: cs.transform, isRevealedAfter: el.classList.contains('is-revealed'), inlineDelay: el.style.transitionDelay || null };
  })()`)

  const layout = await evaluate(`(() => ({
    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    revealReady: document.documentElement.classList.contains('reveal-ready')
  }))()`)

  return { path, selector, ...setup, ...after, ...layout }
}

const results = []
results.push(await probe('/about/', '#articles-section article'))
results.push(await probe('/about/', '.about-team-section .main-container'))
results.push(await probe('/about/', 'main section:last-of-type h2'))
results.push(await probe('/order/', '.order-seo-info [data-reveal-stagger] > div:nth-child(4)'))
results.push(await probe('/order/', '.order-seo-info [data-reveal="up"]:last-of-type'))
results.push(await probe('/contact/', 'main section:last-of-type h2'))
results.push(await probe('/blog/', '.blog-grid .blog-card'))
results.push(await probe('/blog/slug-not-real/', 'body', { wait: 2000 }))

console.log(JSON.stringify({ results, consoleErrors: [...new Set(consoleErrors)].slice(0, 10) }, null, 2))
ws.close()
proc.kill()
process.exit(0)
