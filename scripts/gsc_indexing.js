#!/usr/bin/env node
/**
 * Google Search Console & Search Engine Indexing Automation & Audit Tool
 * 
 * Verifies sitemap integrity, checks verification tokens, audits the 5 GSC Drilldown
 * pages (/blog/, /contact/, /download/, /order/, /terms/) for title tags, canonical URLs,
 * hreflang tags, robots directives, and structured data schemas.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const DOMAIN = 'https://zyphuel.netlify.app'
const SITEMAP_URL = `${DOMAIN}/sitemap.xml`
const GOOGLE_VERIFY_FILE = 'google1ab7400cf65ca469.html'

// URLs flagged in the 2026-10-28 GSC Coverage export
// (1 x "Page with redirect" + 2 x "Discovered – currently not indexed").
// The owner reports these three as not indexed: services, download, order.
// Keep this list in sync with the live export — it previously listed blog,
// contact, download, order and terms, which sent the owner to the wrong pages.
const DRILLDOWN_PAGES = [
  { path: '/services/', file: 'dist/services/index.html' },
  { path: '/download/', file: 'dist/download/index.html' },
  { path: '/order/', file: 'dist/order/index.html' }
]

async function runGscInspection() {
  console.log('================================================================');
  console.log('  🔍 ZYPHUEL GOOGLE SEARCH CONSOLE & CRAWL HEALTH AUDIT         ');
  console.log('================================================================\n');

  // 1. Verify Google Verification Token File
  const verifyPathPublic = path.join(ROOT, 'public', GOOGLE_VERIFY_FILE)
  const verifyPathDist = path.join(ROOT, 'dist', GOOGLE_VERIFY_FILE)

  if (fs.existsSync(verifyPathPublic)) {
    const token = fs.readFileSync(verifyPathPublic, 'utf8').trim()
    console.log(`[GSC Auth] ✅ Verification File Found: ${GOOGLE_VERIFY_FILE}`)
    console.log(`           Token: "${token}"`)
  } else {
    console.warn(`[GSC Auth] ⚠️ Verification file missing from public/`)
  }

  // 2. Parse and Validate Sitemap URLs
  const sitemapPath = path.join(ROOT, 'dist', 'sitemap.xml')
  const publicSitemapPath = path.join(ROOT, 'public', 'sitemap.xml')
  const actualSitemap = fs.existsSync(sitemapPath) ? sitemapPath : publicSitemapPath

  if (!fs.existsSync(actualSitemap)) {
    console.error('[Sitemap] ❌ sitemap.xml not found!')
  } else {
    const sitemapContent = fs.readFileSync(actualSitemap, 'utf8')
    const urlMatches = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1])
    const lastmodMatches = [...sitemapContent.matchAll(/<lastmod>(.*?)<\/lastmod>/g)].map(m => m[1])
    console.log(`\n[Sitemap] ✅ Found ${urlMatches.length} URLs in sitemap.xml:`)
    urlMatches.forEach((url, i) => {
      const mod = lastmodMatches[i] || 'N/A'
      console.log(`   ${(i + 1).toString().padStart(2, ' ')}. [${mod}] ${url}`)
    })
  }

  // 3. Check robots.txt Directives
  const robotsPath = path.join(ROOT, 'public', 'robots.txt')
  if (fs.existsSync(robotsPath)) {
    const robots = fs.readFileSync(robotsPath, 'utf8')
    const hasSitemap = robots.includes(SITEMAP_URL)
    const hasGooglebot = robots.includes('User-agent: Googlebot')
    const hasInspectionTool = robots.includes('User-agent: Google-InspectionTool')
    console.log(`\n[Robots.txt] Checks:`)
    console.log(`   - Sitemap declared: ${hasSitemap ? '✅ PASS' : '❌ MISSING'}`)
    console.log(`   - Googlebot allowed: ${hasGooglebot ? '✅ PASS' : '❌ MISSING'}`)
    console.log(`   - Google-InspectionTool allowed: ${hasInspectionTool ? '✅ PASS' : '❌ MISSING'}`)
  }

  // 4. Audit Drilldown Pages (Title, Canonical, Robots, Hreflang, Schema)
  console.log('\n================================================================');
  console.log('  📑 AUDITING THE 3 GSC DRILLDOWN PAGES                         ');
  console.log('================================================================');

  for (const page of DRILLDOWN_PAGES) {
    const filePath = path.join(ROOT, page.file)
    const url = `${DOMAIN}${page.path}`
    console.log(`\n🔎 [URL]: ${url}`)

    if (!fs.existsSync(filePath)) {
      console.log(`   ❌ HTML file missing: ${page.file} (Run build first)`)
      continue
    }

    const html = fs.readFileSync(filePath, 'utf8')

    // Title
    const titleMatch = html.match(/<title>(.*?)<\/title>/i)
    const title = titleMatch ? titleMatch[1] : 'MISSING'
    console.log(`   - Title: ${title !== 'MISSING' ? '✅' : '❌'} "${title}" (${title.length} chars)`)

    // Canonical
    const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i)
    const canonical = canonicalMatch ? canonicalMatch[1] : 'MISSING'
    const canonicalValid = canonical === url
    console.log(`   - Canonical: ${canonicalValid ? '✅ MATCH' : '❌ MISMATCH'} (${canonical})`)

    // Hreflang
    const hasXDefault = html.includes(`hreflang="x-default" href="${url}"`)
    const hasEn = html.includes(`hreflang="en" href="${url}"`)
    const hasEnPk = html.includes(`hreflang="en-PK" href="${url}"`)
    console.log(`   - Hreflang: ${hasXDefault && hasEn && hasEnPk ? '✅ COMPLETE' : '⚠️ PARTIAL'} (x-default: ${hasXDefault}, en: ${hasEn}, en-PK: ${hasEnPk})`)

    // Meta Robots
    const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["'](.*?)["']/i)
    const robotsContent = robotsMatch ? robotsMatch[1] : 'MISSING'
    console.log(`   - Meta Robots: ${robotsContent.includes('index') && !robotsContent.includes('noindex') ? '✅ INDEXABLE' : '❌ BLOCKED'} (${robotsContent})`)

    // Description
    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i)
    const desc = descMatch ? descMatch[1] : 'MISSING'
    console.log(`   - Description: ${desc !== 'MISSING' ? '✅' : '❌'} (${desc.length} chars)`)

    // Schema
    const hasSchema = html.includes('id="seo-schema"') || html.includes('application/ld+json')
    console.log(`   - JSON-LD Schema: ${hasSchema ? '✅ PRESENT' : '❌ MISSING'}`)
  }

  // 5. Actionable Steps for GSC Live Inspection
  console.log('\n================================================================');
  console.log('  📌 ACTIONABLE GOOGLE SEARCH CONSOLE STEPS FOR IMMEDIATE INDEXING');
  console.log('================================================================');
  console.log(`
1. Open Google Search Console: https://search.google.com/search-console
2. Ensure Property is: https://zyphuel.netlify.app/
3. Under "Indexing" -> "Sitemaps":
   - Submit: "sitemap.xml"
   - Confirm Status is "Success".
4. For the 3 Drilldown Pages:
   - https://zyphuel.netlify.app/services/
   - https://zyphuel.netlify.app/download/
   - https://zyphuel.netlify.app/order/
   Inspect each URL in the top search bar:
   - Click "TEST LIVE URL" (verifies Googlebot can fetch without error)
   - Click "REQUEST INDEXING"
5. Under "Page indexing" -> "Discovered – currently not indexed":
   - Click "VALIDATE FIX" button to trigger automated Googlebot recrawl!
`);
}

runGscInspection()
