/**
 * Rasterises every docs/reports/charts/*.svg into a PNG next to it.
 *
 * Why both formats: GitHub renders committed SVG images inline, but a few
 * clients (mobile apps, some corporate proxies, certain markdown previewers)
 * refuse SVG and show a broken-image icon instead. Shipping a PNG twin means a
 * report graph always has something to fall back on, and both files are small
 * enough to keep in the repository.
 *
 * Usage: node scripts/charts-to-png.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const chartsDir = path.resolve(__dirname, '../docs/reports/charts')

const files = fs.readdirSync(chartsDir).filter((name) => name.endsWith('.svg')).sort()

if (!files.length) {
  console.log('No SVG charts found in docs/reports/charts')
  process.exit(0)
}

let written = 0
for (const file of files) {
  const source = path.join(chartsDir, file)
  const target = path.join(chartsDir, file.replace(/\.svg$/, '.png'))
  const svg = fs.readFileSync(source)
  await sharp(svg, { density: 144 })
    .resize({ width: 1920, withoutEnlargement: false })
    .png({ compressionLevel: 9, palette: true })
    .toFile(target)
  const kb = (fs.statSync(target).size / 1024).toFixed(0)
  console.log(`PNG ${file.replace(/\.svg$/, '.png')} (${kb} KB)`)
  written += 1
}

console.log(`Done: ${written} PNG chart(s) written to docs/reports/charts`)
