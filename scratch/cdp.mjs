// Headless Chrome CDP probe (no visible browser). Extracts heading outlines and
// label/aria mismatches so we can fix a11y precisely. Node 24 global WebSocket.
import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9333
const BASE = process.env.BASE || 'http://localhost:5184'
const PAGES = (process.env.PAGES || '/,/about/,/services/,/order/,/contact/,/blog/,/download/,/privacy/,/terms/').split(',')

const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--no-sandbox',
  `--remote-debugging-port=${PORT}`,
  '--user-data-dir=' + process.env.TEMP + '\\cdp-profile-' + Date.now(),
  '--window-size=1350,940', 'about:blank',
], { stdio: 'ignore' })

async function getTargets() {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/list`)
      const list = await r.json()
      const page = list.find((t) => t.type === 'page')
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl
    } catch {}
    await sleep(250)
  }
  throw new Error('no CDP target')
}

function connect(url) {
  const ws = new WebSocket(url)
  let id = 0
  const pending = new Map()
  ws.addEventListener('message', (e) => {
    const msg = JSON.parse(e.data)
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg.result); pending.delete(msg.id) }
  })
  const send = (method, params = {}) => new Promise((res, rej) => {
    const mid = ++id
    pending.set(mid, res)
    ws.send(JSON.stringify({ id: mid, method, params }))
    setTimeout(() => { if (pending.has(mid)) { pending.delete(mid); rej(new Error('timeout ' + method)) } }, 15000)
  })
  return new Promise((res) => ws.addEventListener('open', () => res({ ws, send })))
}

const EXTRACT = `(() => {
  const heads = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')]
    .map(h => ({ lvl: +h.tagName[1], txt: (h.textContent||'').trim().slice(0,40) }));
  // label/aria mismatch: visible text not contained in accessible name
  const mism = [];
  for (const el of document.querySelectorAll('button,a[href],input,[role=button]')) {
    const vis = (el.innerText||'').replace(/\\s+/g,' ').trim();
    const aria = el.getAttribute('aria-label');
    if (aria && vis && !aria.includes(vis)) {
      mism.push({ tag: el.tagName, cls: el.className.slice(0,50), vis: vis.slice(0,60), aria: aria.slice(0,80) });
    }
  }
  return JSON.stringify({ heads, mism });
})()`

const results = {}
try {
  const wsUrl = await getTargets()
  const { ws, send } = await connect(wsUrl)
  await send('Page.enable')
  for (const path of PAGES) {
    const url = BASE + path
    await send('Page.navigate', { url })
    await sleep(2500)
    const evalRes = await send('Runtime.evaluate', { expression: EXTRACT, returnByValue: true })
    results[path] = JSON.parse(evalRes.result.value)
  }
  ws.close()
} finally {
  chrome.kill()
}

for (const path of PAGES) {
  const r = results[path]
  if (!r) continue
  console.log(`\n===== ${path} =====`)
  console.log('HEADINGS: ' + r.heads.map(h => `h${h.lvl}:${h.txt.replace(/\\s+/g,'_')}`).join('  '))
  if (r.mism.length) {
    console.log('ARIA MISMATCH:')
    for (const m of r.mism) console.log(`  <${m.tag} class="${m.cls}>\n     vis="${m.vis}"\n     aria="${m.aria}"`)
  }
}
