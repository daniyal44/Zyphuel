/**
 * Generates a branded 1200x630 social preview card for every blog article.
 *
 * Why this exists: sharing an article used to preview the raw Unsplash photo
 * (720x480, no branding). Each article now gets its own card — article photo,
 * category, headline and the Zyphuel footer — served from
 * `public/images/social/<slug>.jpg`, which `prerender.js` picks up per route.
 *
 * Usage: node scripts/make-social-cards.mjs [--only=slug]
 *
 * Rendering goes through headless Chrome because text shaping in SVG/Sharp on
 * Windows is unreliable. Source HTML/PNG stay in `.tmpseo/` (git-ignored); only
 * the final JPEGs are committed.
 */

import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { articles } from '../src/data/articles.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const WORK = path.join(ROOT, '.tmpseo', 'social-cards')
const ART_DIR = path.join(WORK, 'art')
const HTML_DIR = path.join(WORK, 'html')
const PNG_DIR = path.join(WORK, 'png')
const OUT_DIR = path.join(ROOT, 'public', 'images', 'social')
const LOGO = path.join(ROOT, 'public', 'images', 'Zyphuel-logo.png')

for (const dir of [ART_DIR, HTML_DIR, PNG_DIR, OUT_DIR]) fs.mkdirSync(dir, { recursive: true })

const onlyArg = process.argv.find((a) => a.startsWith('--only='))
const only = onlyArg ? onlyArg.slice('--only='.length) : null

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].filter(Boolean)
  for (const candidate of candidates) if (fs.existsSync(candidate)) return candidate
  throw new Error('Chrome not found. Set CHROME_PATH to a Chrome/Chromium binary.')
}

const CHROME = findChrome()

const esc = (value = '') =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function artUrl(image, slug) {
  const local = path.join(ART_DIR, `${slug}.jpg`)
  if (!fs.existsSync(local) || fs.statSync(local).size < 10_000) {
    const src = image ? image.split('?')[0] + '?auto=format&fit=crop&w=1200&h=630&q=80' : null
    if (!src) return null
    execFileSync('curl', ['-sS', '--max-time', '60', '-o', local, src], { stdio: 'inherit' })
  }
  return pathToFileURL(local).href
}

function cardHtml(article, photo) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body {
    font-family: "Segoe UI", "Inter", Arial, sans-serif;
    background: #04141f;
    color: #fff;
    position: relative;
  }
  .photo {
    position: absolute;
    inset: 0 0 0 42%;
    background-image: url("${photo || ''}");
    background-position: center;
    background-size: cover;
    -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 34%);
            mask-image: linear-gradient(to right, transparent 0%, #000 34%);
    filter: saturate(1.05) contrast(1.04);
    opacity: .95;
  }
  .wash {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(720px 440px at 6% 6%, rgba(26,79,124,.82), transparent 70%),
      linear-gradient(100deg, #04141f 0%, #061c2c 40%, rgba(6,28,44,.80) 56%, rgba(6,28,44,.30) 100%);
  }
  .gold {
    position: absolute;
    left: -150px; bottom: -200px;
    width: 620px; height: 460px;
    background: radial-gradient(closest-side, rgba(224,170,66,.26), transparent 70%);
  }
  .inner {
    position: relative;
    height: 100%;
    width: 760px;
    padding: 38px 52px 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .top { display: flex; align-items: center; gap: 16px; }
  .brand-plate {
    background: #fff; border-radius: 13px;
    padding: 10px 16px; display: flex; align-items: center;
    box-shadow: 0 10px 26px rgba(0,0,0,.28);
  }
  .brand-plate img { height: 36px; width: auto; display: block; }
  .divider { width: 1px; height: 28px; background: rgba(255,255,255,.22); }
  .place { font-size: 14px; letter-spacing: 3.2px; font-weight: 600; color: #9fc4de; text-transform: uppercase; }
  .chip {
    display: inline-block;
    font-size: 14.5px; font-weight: 700; letter-spacing: .6px; text-transform: uppercase;
    color: #ffd07a;
    background: rgba(240,182,74,.14);
    border: 1px solid rgba(240,182,74,.45);
    border-radius: 999px;
    padding: 7px 15px;
    margin-bottom: 18px;
    max-width: 640px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  h1 {
    font-size: 46px; line-height: 1.13; font-weight: 800;
    letter-spacing: -0.8px; max-width: 650px;
    text-shadow: 0 4px 26px rgba(3,16,26,.55);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .meta { margin-top: 16px; font-size: 17px; font-weight: 500; color: #b9d2e3; }
  .meta b { color: #eaf3f9; font-weight: 600; }
  .footer {
    display: flex; align-items: center; justify-content: space-between;
    border-top: 1px solid rgba(255,255,255,.16);
    padding-top: 16px;
    width: 650px;
  }
  .site { font-size: 20px; font-weight: 700; }
  .site span { color: #8fb8d4; font-weight: 500; }
  .phone { font-size: 17px; font-weight: 600; color: #f0b64a; letter-spacing: .3px; }
</style>
</head>
<body>
  <div class="photo"></div>
  <div class="wash"></div>
  <div class="gold"></div>
  <div class="inner">
    <div class="top">
      <div class="brand-plate"><img src="${pathToFileURL(LOGO).href}" alt="Zyphuel" /></div>
      <div class="divider"></div>
      <div class="place">Zyphuel Journal</div>
    </div>
    <div>
      <div class="chip">${esc(article.category)}</div>
      <h1 id="title">${esc(article.title)}</h1>
      <div class="meta"><b>${esc(article.date)}</b> &nbsp;·&nbsp; ${esc(article.readTime || '')}</div>
    </div>
    <div class="footer">
      <div class="site">zyphuel.netlify.app <span>/ blog</span></div>
      <div class="phone">+92 3230-112464</div>
    </div>
  </div>
  <script>
    // Long headlines shrink instead of clipping at the third line.
    (function () {
      var title = document.getElementById('title');
      var limit = 3 * parseFloat(getComputedStyle(title).lineHeight);
      var size = 46;
      while (title.scrollHeight > limit + 1 && size > 30) {
        size -= 2;
        title.style.fontSize = size + 'px';
      }
    })();
  </script>
</body>
</html>`
}

const sharp = (await import('sharp')).default
const results = []

for (const article of articles) {
  if (only && article.slug !== only) continue
  const photo = artUrl(article.image, article.slug)
  const htmlPath = path.join(HTML_DIR, `${article.slug}.html`)
  const pngPath = path.join(PNG_DIR, `${article.slug}.png`)
  const outPath = path.join(OUT_DIR, `${article.slug}.jpg`)

  fs.writeFileSync(htmlPath, cardHtml({ ...article, image: photo }, photo), 'utf8')
  execFileSync(
    CHROME,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--window-size=1200,630',
      '--virtual-time-budget=5000',
      `--screenshot=${pngPath.split(path.sep).join('/')}`,
      pathToFileURL(htmlPath).href,
    ],
    { stdio: 'ignore' },
  )

  await sharp(pngPath).jpeg({ quality: 86, mozjpeg: true }).toFile(outPath)
  const kb = (fs.statSync(outPath).size / 1024).toFixed(1)
  results.push({ slug: article.slug, kb })
  console.log(`✓ ${article.slug} (${kb} KB)`)
}

console.log(`\nGenerated ${results.length} card(s) into public/images/social/`)
