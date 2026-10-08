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
  const distSitemap = path.resolve(__dirname, '..', 'dist', 'sitemap.xml')
  const publicSitemap = path.resolve(__dirname, '..', 'public', 'sitemap.xml')
  const sitemapPath = fs.existsSync(distSitemap) ? distSitemap : publicSitemap
  
  if (!fs.existsSync(sitemapPath)) {
    console.error('[IndexNow] sitemap.xml not found in dist/ or public/. Run build first.')
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

  console.log(`[IndexNow] Submitting ${urls.length} URLs to search engine endpoints...`)
  urls.forEach((url, i) => console.log(`  ${i + 1}. ${url}`))

  const endpoints = [
    { name: 'Yandex (yandex.com/indexnow)', url: 'https://yandex.com/indexnow' },
    { name: 'Microsoft Bing (www.bing.com/indexnow)', url: 'https://www.bing.com/indexnow' },
    { name: 'IndexNow Shared Hub (api.indexnow.org/indexnow)', url: 'https://api.indexnow.org/indexnow' }
  ]

  for (const ep of endpoints) {
    try {
      const response = await fetch(ep.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(payload)
      })

      if (response.status === 200 || response.status === 202) {
        console.log(`\n[IndexNow] ✅ ${ep.name} -> Success! (Status ${response.status})`)
      } else {
        const errorText = await response.text()
        console.warn(`\n[IndexNow] ⚠️ ${ep.name} -> Response (Status ${response.status}):`, errorText)
        if (response.status === 403 && ep.url.includes('bing')) {
          console.log('[IndexNow] 💡 Bing Note: If Bing returns 403, simply log in to Bing Webmaster Tools (https://www.bing.com/webmasters) and click "Import from Google Search Console" once.')
        }
      }
    } catch (error) {
      console.warn(`\n[IndexNow] ⚠️ Could not reach ${ep.name}: ${error.message}`)
    }
  }

  // ── Ping Search Engine Sitemaps ──────────────────────────────
  const sitemapUrl = `https://${HOST}/sitemap.xml`
  const pingEndpoints = [
    { name: 'Google Sitemap Ping', url: `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}` },
    { name: 'Bing Sitemap Ping', url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}` },
  ]

  console.log('\n[Sitemap Pinger] Pinging search engine sitemap notification endpoints...')
  for (const ping of pingEndpoints) {
    try {
      const pingRes = await fetch(ping.url, { method: 'GET' })
      console.log(`[Sitemap Pinger] ✅ ${ping.name} -> Responded with status ${pingRes.status}`)
    } catch (err) {
      console.log(`[Sitemap Pinger] ℹ️ ${ping.name} notification sent (${err.message})`)
    }
  }

  console.log('\n[IndexNow] All indexing requests dispatched successfully!')
}

submitToIndexNow()
