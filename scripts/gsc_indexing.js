#!/usr/bin/env node
/**
 * Google Search Console & Search Engine Indexing Automation Tool
 * 
 * Verifies sitemap integrity, checks Google Search Console verification token,
 * pings search engine sitemap endpoints, and outputs direct indexing status.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const DOMAIN = 'https://zyphuel.netlify.app'
const SITEMAP_URL = `${DOMAIN}/sitemap.xml`
const GOOGLE_VERIFY_FILE = 'google1ab7400cf65ca469.html'

async function runGscInspection() {
  console.log('================================================================');
  console.log('  🔍 ZYPHUEL GOOGLE SEARCH CONSOLE & ENGINE INDEXING INSPECTION  ');
  console.log('================================================================\n');

  // 1. Verify Google Verification Token File
  const verifyPathPublic = path.join(ROOT, 'public', GOOGLE_VERIFY_FILE)
  const verifyPathDist = path.join(ROOT, 'dist', GOOGLE_VERIFY_FILE)

  let verifyToken = null
  if (fs.existsSync(verifyPathPublic)) {
    verifyToken = fs.readFileSync(verifyPathPublic, 'utf8').trim()
    console.log(`[GSC] ✅ Verification File Found (public/): ${GOOGLE_VERIFY_FILE}`)
    console.log(`      Content: "${verifyToken}"`)
  } else {
    console.warn(`[GSC] ⚠️ Verification file missing from public/`)
  }

  // 2. Parse and Validate Sitemap URLs
  const sitemapPath = path.join(ROOT, 'public', 'sitemap.xml')
  if (!fs.existsSync(sitemapPath)) {
    console.error('[Sitemap] ❌ sitemap.xml not found!')
    process.exit(1)
  }

  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8')
  const urlMatches = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1])
  const lastmodMatches = [...sitemapContent.matchAll(/<lastmod>(.*?)<\/lastmod>/g)].map(m => m[1])

  console.log(`\n[Sitemap] ✅ Found ${urlMatches.length} URLs in sitemap.xml:`)
  urlMatches.forEach((url, i) => {
    const mod = lastmodMatches[i] || 'N/A'
    console.log(`   ${(i + 1).toString().padStart(2, ' ')}. [${mod}] ${url}`)
  })

  // 3. Check robots.txt Directives
  const robotsPath = path.join(ROOT, 'public', 'robots.txt')
  if (fs.existsSync(robotsPath)) {
    const robots = fs.readFileSync(robotsPath, 'utf8')
    const hasSitemap = robots.includes(SITEMAP_URL)
    const hasLlms = robots.includes('llms.txt')
    console.log(`\n[Robots.txt] Checks:`)
    console.log(`   - Sitemap reference: ${hasSitemap ? '✅ PASS' : '❌ MISSING'}`)
    console.log(`   - llms.txt reference: ${hasLlms ? '✅ PASS' : '❌ MISSING'}`)
    console.log(`   - Googlebot allowed: ${robots.includes('User-agent: Googlebot') ? '✅ PASS' : '❌ MISSING'}`)
  }

  // 4. Ping Search Engines with Sitemap URL
  console.log(`\n[Pings] Submitting sitemap ping to search engine endpoints...`)

  const pingEndpoints = [
    { name: 'Google (Legacy Ping)', url: `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}` },
    { name: 'Bing Ping', url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}` }
  ]

  for (const ep of pingEndpoints) {
    try {
      const res = await fetch(ep.url, { method: 'GET', signal: AbortSignal.timeout(6000) })
      console.log(`   - ${ep.name}: HTTP ${res.status} (${res.statusText || 'OK'})`)
    } catch (err) {
      console.log(`   - ${ep.name}: Network notice (${err.message})`)
    }
  }

  // 5. Output Direct Steps for Instant GSC Indexing
  console.log('\n================================================================');
  console.log('  📌 GOOGLE SEARCH CONSOLE INSTANT INDEXING GUIDE FOR ALL PAGES  ');
  console.log('================================================================');
  console.log(`
1. Open Google Search Console: https://search.google.com/search-console
2. Select Property: https://zyphuel.netlify.app/
3. Under "Indexing" in the left sidebar, click "Sitemaps"
4. Under "Add a new sitemap", enter:
     sitemap.xml
   and click "SUBMIT".
   Google will immediately schedule all 15 URLs for crawling and indexing.
5. For Instant Priority Indexing of specific high-value pages:
   - Paste the URL (e.g. https://zyphuel.netlify.app/ or https://zyphuel.netlify.app/order/)
     into the top "Inspect any URL in https://zyphuel.netlify.app" search bar.
   - Click "TEST LIVE URL" -> "REQUEST INDEXING".
`);
}

runGscInspection()
