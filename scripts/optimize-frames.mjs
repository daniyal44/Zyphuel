/**
 * Frame-sequence optimizer for the scroll-scrubbing sections.
 *
 * The scrub consumers draw these JPEGs onto a canvas at scroll speed. Frames that
 * are wider than the max useful canvas width only cost decode time and bandwidth:
 * the canvas is at most viewport-width wide, so 2560px frames were pure waste
 * (328 MB across 1,500 files, 130-390 KB each).
 *
 * Usage: node scripts/optimize-frames.mjs [--width=1600] [--quality=70]
 * Overwrites the files in place; the sequence numbering is never touched.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=')
    return [k, v]
  })
)
const MAX_WIDTH = Number(args.width || 1600)
const QUALITY = Number(args.quality || 70)

const DIRS = [
  'public/ezgif-2f1a39c97e5b173b-jpg',
  'public/services-hero-frames',
  'public/services-section3-frames',
  'public/app-hero-frames',
  'public/app-section3-frames',
]

const formatMB = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`

async function dirSize(dir) {
  const files = await fs.readdir(dir)
  let total = 0
  for (const f of files) {
    const st = await fs.stat(path.join(dir, f))
    if (st.isFile()) total += st.size
  }
  return total
}

async function optimizeFile(file) {
  const input = await fs.readFile(file)
  const img = sharp(input, { failOn: 'none' })
  const meta = await img.metadata()

  if (!meta.width || meta.width <= MAX_WIDTH) {
    return { skipped: true, before: input.length, after: input.length }
  }

  const out = await img
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true, chromaSubsampling: '4:2:0' })
    .toBuffer()

  // Never make a file bigger than it already was.
  if (out.length < input.length) {
    await fs.writeFile(file, out)
    return { skipped: false, before: input.length, after: out.length }
  }
  return { skipped: true, before: input.length, after: input.length }
}

async function processDir(dir) {
  const abs = path.join(ROOT, dir)
  const before = await dirSize(abs)
  const files = (await fs.readdir(abs)).filter((f) => /\.jpe?g$/i.test(f)).sort()

  let done = 0
  let skipped = 0
  const CONCURRENCY = 8
  let cursor = 0

  const worker = async () => {
    while (cursor < files.length) {
      const idx = cursor++
      try {
        const r = await optimizeFile(path.join(abs, files[idx]))
        if (r.skipped) skipped++
        else done++
      } catch (err) {
        console.error(`  ! ${files[idx]}: ${err.message}`)
        skipped++
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker))

  const after = await dirSize(abs)
  console.log(
    `${dir.padEnd(42)} ${formatMB(before).padStart(9)} -> ${formatMB(after).padStart(9)}` +
      `  (${done} resized, ${skipped} kept)`
  )
  return { before, after }
}

console.log(`Resizing frames to max width ${MAX_WIDTH}px @ q${QUALITY} (mozjpeg, progressive)\n`)

let totalBefore = 0
let totalAfter = 0
for (const dir of DIRS) {
  const { before, after } = await processDir(dir)
  totalBefore += before
  totalAfter += after
}

const saved = totalBefore - totalAfter
console.log(
  `\nTOTAL ${formatMB(totalBefore)} -> ${formatMB(totalAfter)} ` +
    `(${saved > 0 ? '-' : ''}${formatMB(Math.abs(saved))}, ${((saved / totalBefore) * 100).toFixed(0)}% smaller)`
)
