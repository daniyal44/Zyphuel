/**
 * Second-pass shrink for the scroll frames.
 *
 * The first WebP pass (1280 px, q68) halved the payload but the deployed origin
 * still delivers only ~0.5 MB/s, so a single hero sequence (7.5–14.5 MB) could not
 * finish filling before the visitor had already scrolled through it — which is the
 * "animation jumps / does not load" symptom.
 *
 * This pass re-encodes the existing WebP frames to max width 1120 at q64, which is
 * about 30% smaller again while staying visually identical at full-screen size.
 *
 * Usage: node scripts/reshrink-frames.mjs [--width=1120] [--quality=64]
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
const WIDTH = Number(args.width || 1120)
const QUALITY = Number(args.quality || 64)

const DIRS = [
  'public/ezgif-2f1a39c97e5b173b-jpg',
  'public/services-hero-frames',
  'public/services-section3-frames',
  'public/app-hero-frames',
  'public/app-section3-frames'
]

const mb = (b) => `${(b / 1024 / 1024).toFixed(1)} MB`

let totalBefore = 0
let totalAfter = 0

for (const dir of DIRS) {
  const abs = path.join(ROOT, dir)
  const files = (await fs.readdir(abs)).filter((f) => f.toLowerCase().endsWith('.webp')).sort()
  let before = 0
  let after = 0
  let cursor = 0

  const worker = async () => {
    while (cursor < files.length) {
      const file = files[cursor++]
      const target = path.join(abs, file)
      const input = await fs.readFile(target)
      const meta = await sharp(input).metadata()
      before += input.length
      const out =
        meta.width && meta.width > WIDTH
          ? await sharp(input).resize({ width: WIDTH, withoutEnlargement: true }).webp({ quality: QUALITY, effort: 4 }).toBuffer()
          : input
      const tmp = `${target}.tmp`
      await fs.writeFile(tmp, out)
      await fs.rename(tmp, target)
      after += out.length
    }
  }

  await Promise.all(Array.from({ length: 8 }, worker))
  totalBefore += before
  totalAfter += after
  console.log(`${dir.padEnd(42)} ${mb(before).padStart(9)} -> ${mb(after).padStart(9)} (${files.length} frames)`)
}

console.log(`\nTOTAL ${mb(totalBefore)} -> ${mb(totalAfter)} (${(100 - (totalAfter / totalBefore) * 100).toFixed(0)}% smaller)`)
