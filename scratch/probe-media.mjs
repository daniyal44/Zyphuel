import { spawn } from 'node:child_process'

const CHROME = 'C:\\Users\\mdani\\.cache\\puppeteer\\chrome-headless-shell\\win64-146.0.7680.31\\chrome-headless-shell-win64\\chrome-headless-shell.exe'
const PORT = 9344
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const proc = spawn(CHROME, [
  `--remote-debugging-port=${PORT}`, '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage',
  `--user-data-dir=C:\\Temp\\cdp-rm-${Date.now()}`, 'about:blank'
], { stdio: 'ignore', windowsHide: true })

let wsUrl = null
for (let i = 0; i < 40; i++) {
  try { const r = await fetch(`http://127.0.0.1:${PORT}/json/version`); wsUrl = (await r.json()).webSocketDebuggerUrl; break } catch { await sleep(250) }
}
const ws = new WebSocket(wsUrl)
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej })
let msgId = 0
const pending = new Map()
ws.onmessage = (ev) => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id) } }
const send = (method, params = {}, sessionId) => new Promise((resolve) => { const id = ++msgId; pending.set(id, resolve); ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) })) })

const { result: { targetId } } = await send('Target.createTarget', { url: 'about:blank' })
const { result: { sessionId } } = await send('Target.attachToTarget', { targetId, flatten: true })
const evaluate = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true }, sessionId)
  if (r.result?.exceptionDetails) return { error: r.result.exceptionDetails.exception?.description || r.result.exceptionDetails.text }
  return r.result?.result?.value
}

await send('Page.enable', {}, sessionId)
await send('Page.navigate', { url: 'http://localhost:5183/about/' }, sessionId)
await sleep(3000)

console.log(JSON.stringify(await evaluate(`(() => ({
  rm: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  rmNoPrefer: window.matchMedia('(prefers-reduced-motion: no-preference)').matches,
  htmlClass: document.documentElement.className,
  dataRevealCount: document.querySelectorAll('[data-reveal]').length,
  hookState: !!window.__reactFiberRoot,
  firstCardOpacity: getComputedStyle(document.querySelector('#articles-section article')).opacity
}))()`), null, 2))

ws.close(); proc.kill(); process.exit(0)
