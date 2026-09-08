/**
 * IndexNow URL Submission Script
 * 
 * Submits all sitemap URLs to IndexNow API (Bing, Yandex, Seznam, Naver).
 * Runs automatically after each build/deploy.
 * 
 * Note: Google does NOT support IndexNow. For Google, rely on:
 *   - XML Sitemap with accurate <lastmod> (already configured)
 *   - Google Search Console URL Inspection tool
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ── Configuration ──────────────────────────────────────────────
const HOST = 'zyphuel.netlify.app'
const API_KEY = '185084a8fa7dac10b46ec58d30c56792'
const KEY_LOCATION = `https://${HOST}/${API_KEY}.txt`
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

// ── Extract URLs from sitemap.xml ──────────────────────────────
function getUrlsFromSitemap() {
  const sitemapPath = path.resolve(__dirname, '..', 'dist', 'sitemap.xml')
  
  if (!fs.existsSync(sitemapPath)) {
    console.error('[IndexNow] sitemap.xml not found in dist/. Run build first.')
    process.exit(1)
  }

  const sitemap = fs.readFileSync(sitemapPath, 'utf-8')
  const urls = []
  const regex = /<loc>(.*?)<\/loc>/g
  let match

  while ((match = regex.exec(sitemap)) !== null) {
    urls.push(match[1])
  }

  return urls
}

// ── Submit URLs to IndexNow ────────────────────────────────────
async function submitToIndexNow() {
  const urls = getUrlsFromSitemap()

  if (urls.length === 0) {
    console.warn('[IndexNow] No URLs found in sitemap.xml. Skipping.')
    return
  }

  const payload = {
    host: HOST,
    key: API_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls
  }

  console.log(`[IndexNow] Submitting ${urls.length} URLs to Bing/Yandex/Seznam/Naver...`)
  urls.forEach((url, i) => console.log(`  ${i + 1}. ${url}`))

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    })

    if (response.status === 200 || response.status === 202) {
      console.log(`\n[IndexNow] ✅ Success! Status: ${response.status}`)
      console.log('[IndexNow] All participating search engines have been notified.')
    } else {
      const errorText = await response.text()
      console.error(`\n[IndexNow] ❌ Failed (Status ${response.status}):`, errorText)
    }
  } catch (error) {
    // Don't fail the build if IndexNow is unreachable
    console.warn(`\n[IndexNow] ⚠️  Could not reach IndexNow API: ${error.message}`)
    console.warn('[IndexNow] Build continues. URLs will be picked up on next crawl.')
  }
}

submitToIndexNow()
