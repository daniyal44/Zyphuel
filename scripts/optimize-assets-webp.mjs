/**
 * WebP asset pass for the two heaviest image consumers on the site.
 *
 * 1. Scroll-scrub frame sequences — 1,500 JPEGs (about 97 MB). Every hero
 *    downloads its own 300-frame sequence while the visitor scrolls, so the
 *    delivered bytes per scroll are what makes the live site feel slow while
 *    localhost (disk, no network) stays instant. WebP at 1280 px is ~40%
 *    smaller than the mozjpeg originals at the same visual size.
 *
 * 2. 3D carousel cards — brand images up to 5 MB rendered into 220 px cards.
 *    They are written to public/images/carousel/*.webp at 560 px.
 *
 * Originals are never overwritten or deleted here; the caller removes the JPEG
 * frame copies only after the built site has been verified.
 *
 * Usage: node scripts/optimize-assets-webp.mjs [--frames] [--carousel]
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const FRAME_DIRS = [
  'public/ezgif-2f1a39c97e5b173b-jpg',
  'public/services-hero-frames',
  'public/services-section3-frames',
  'public/app-hero-frames',
  'public/app-section3-frames'
]

const CAROUSEL_SOURCES = [
  'Contact.jpg', 'Qr-code.png', 'JazzCash.png', 'Easypaisa.jpg', 'NayaPay.png',
  'Naypay.png', 'SadaPay.jpg', 'Bank.png', 'Mashreq.jpg', 'book.png', 'wall.png',
  'tablet.png', 'cup.png', 'pen.png', 'card.png', 'fuel.png', 'helmet.png',
  'collab.png', 'tank.png', 'Shirt.png', 'Gallen.png', 'Cap.png', 'logo.png'
]

const args = new Set(process.argv.slice(2))
const runFrames = args.size === 0 || args.has('--frames')
const runCarousel = args.size === 0 || args.has('--carousel')

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`

async function mapLimit(items, limit, worker) {
  let cursor = 0
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (cursor < items.length) {
        const index = cursor++
        await worker(items[index], index)
      }
    })
  )
}

async function convertFrames() {
  let before = 0
  let after = 0
  let failed = 0

  for (const dir of FRAME_DIRS) {
    const abs = path.join(ROOT, dir)
    let files
    try {
      files = (await fs.readdir(abs)).filter((f) => /\.jpe?g$/i.test(f)).sort()
    } catch {
      console.warn(`skip (missing): ${dir}`)
      continue
    }

    let dirBefore = 0
    let dirAfter = 0

    await mapLimit(files, 8, async (file) => {
      const source = path.join(abs, file)
      const target = path.join(abs, file.replace(/\.jpe?g$/i, '.webp'))
      try {
        const input = await fs.readFile(source)
        dirBefore += input.length
        const output = await sharp(input, { failOn: 'none' })
          .resize({ width: 1280, withoutEnlargement: true })
          .webp({ quality: 68, effort: 4 })
          .toBuffer()
        await fs.writeFile(target, output)
        dirAfter += output.length
      } catch (error) {
        failed++
        console.error(`  ! ${file}: ${error.message}`)
      }
    })

    before += dirBefore
    after += dirAfter
    console.log(`${dir.padEnd(42)} ${mb(dirBefore).padStart(9)} -> ${mb(dirAfter).padStart(9)}  (${files.length} frames)`)
  }

  console.log(`\nFRAMES total ${mb(before)} -> ${mb(after)} (${(100 - (after / before) * 100).toFixed(0)}% smaller, ${failed} failed)`)
}

async function convertCarousel() {
  const outDir = path.join(ROOT, 'public/images/carousel')
  await fs.mkdir(outDir, { recursive: true })

  let before = 0
  let after = 0
  const produced = []

  await mapLimit(CAROUSEL_SOURCES, 4, async (file) => {
    const source = path.join(ROOT, 'public/images', file)
    try {
      const input = await fs.readFile(source)
      const output = await sharp(input, { failOn: 'none' })
        .resize({ width: 560, height: 560, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80, effort: 4 })
        .toBuffer()
      const target = path.join(outDir, file.replace(/\.(png|jpe?g)$/i, '.webp'))
      await fs.writeFile(target, output)
      before += input.length
      after += output.length
      produced.push(path.basename(target))
    } catch (error) {
      console.error(`  ! ${file}: ${error.message}`)
    }
  })

  console.log(`\nCAROUSEL total ${mb(before)} -> ${mb(after)} (${produced.length} images)`)
}

await convertFrames()
await convertCarousel()
