import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

function apkServerPlugin() {
  const serveApk = (apkPath, req, res, next) => {
    if (fs.existsSync(apkPath)) {
      const stat = fs.statSync(apkPath)
      res.setHeader('Content-Type', 'application/vnd.android.package-archive')
      res.setHeader('Content-Disposition', 'attachment; filename="Zyphuel.apk"')
      res.setHeader('Content-Length', stat.size)
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
      res.setHeader('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400')
      res.setHeader('X-Content-Type-Options', 'nosniff')

      if (req.method === 'OPTIONS') {
        res.statusCode = 204
        res.end()
        return
      }

      if (req.method === 'HEAD') {
        res.statusCode = 200
        res.end()
        return
      }

      if (req.method === 'GET') {
        res.statusCode = 200
        const stream = fs.createReadStream(apkPath)
        stream.pipe(res)
        return
      }
    }
    next()
  }

  return {
    name: 'vite-plugin-apk-serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : ''
        const isApkRequest = url.toLowerCase().endsWith('.apk') || url.startsWith('/APK/') || url.startsWith('/apk/')
        if (isApkRequest) {
          const apkPath = path.resolve(__dirname, 'public/APK/Zyphuel.apk')
          return serveApk(apkPath, req, res, next)
        }
        next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : ''
        const isApkRequest = url.toLowerCase().endsWith('.apk') || url.startsWith('/APK/') || url.startsWith('/apk/')
        if (isApkRequest) {
          const apkPath = path.resolve(__dirname, 'dist/APK/Zyphuel.apk')
          return serveApk(apkPath, req, res, next)
        }
        next()
      })
    }
  }
}

function ezgifServerPlugin() {
  const serveEzgif = (req, res, next) => {
    const url = req.url ? req.url.split('?')[0] : ''
    let folder = null
    if (url.startsWith('/ezgif-2f1a39c97e5b173b-jpg/')) {
      folder = 'ezgif-2f1a39c97e5b173b-jpg'
    } else if (url.startsWith('/services-hero-frames/')) {
      folder = 'services-hero-frames'
    } else if (url.startsWith('/services-section3-frames/')) {
      folder = 'services-section3-frames'
    } else if (url.startsWith('/app-hero-frames/')) {
      folder = 'app-hero-frames'
    } else if (url.startsWith('/app-section3-frames/')) {
      folder = 'app-section3-frames'
    }

    if (folder) {
      const fileName = path.basename(url)
      const publicPath = path.resolve(__dirname, 'public', folder, fileName)
      const rootPath = path.resolve(__dirname, folder, fileName)
      const targetPath = fs.existsSync(publicPath) ? publicPath : (fs.existsSync(rootPath) ? rootPath : null)

      if (targetPath) {
        const stat = fs.statSync(targetPath)
        const mtime = stat.mtime.toUTCString()
        res.setHeader('Content-Type', 'image/jpeg')
        res.setHeader('Content-Length', stat.size)
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
        res.setHeader('Last-Modified', mtime)
        res.setHeader('Access-Control-Allow-Origin', '*')

        if (req.headers['if-modified-since'] === mtime) {
          res.statusCode = 304
          res.end()
          return
        }

        if (req.method === 'OPTIONS') {
          res.statusCode = 204
          res.end()
          return
        }
        if (req.method === 'HEAD') {
          res.statusCode = 200
          res.end()
          return
        }
        if (req.method === 'GET') {
          res.statusCode = 200
          const stream = fs.createReadStream(targetPath)
          stream.pipe(res)
          return
        }
      }
    }
    next()
  }

  return {
    name: 'vite-plugin-ezgif-serve',
    configureServer(server) {
      server.middlewares.use(serveEzgif)
    },
    configurePreviewServer(server) {
      server.middlewares.use(serveEzgif)
    }
  }
}

function zyphuelOrderGuardPlugin() {
  const isNightCutoffNow = () => {
    try {
      const dtf = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Karachi',
        hour: 'numeric',
        hour12: false
      })
      const hour = parseInt(dtf.format(new Date()), 10)
      return hour >= 22 || hour < 8
    } catch (e) {
      const now = new Date()
      const utc = now.getUTCHours()
      const hour = (utc + 5) % 24
      return hour >= 22 || hour < 8
    }
  }

  const handleOrderProtection = (req, res, next) => {
    const url = req.url ? req.url.split('?')[0] : ''
    if (url.startsWith('/api/order') || url.startsWith('/api/submit') || url.startsWith('/api/checkout')) {
      if (isNightCutoffNow()) {
        res.statusCode = 403
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({
          error: 'Forbidden',
          status: 403,
          message: 'Zyphuel doorstep fuel orders close strictly at 10:00 PM PKT and resume at 8:00 AM PKT. Please contact our 24/7 WhatsApp emergency hotline: +92 3230-112464.'
        }))
        return
      }
    }
    next()
  }

  return {
    name: 'vite-plugin-zyphuel-order-guard',
    configureServer(server) {
      server.middlewares.use(handleOrderProtection)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handleOrderProtection)
    }
  }
}

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), apkServerPlugin(), ezgifServerPlugin(), zyphuelOrderGuardPlugin()],
  server: {
    watch: {
      ignored: [
        '**/.git/**',
        '**/.agents/**',
        '**/.claude/**',
        '**/docs/**',
        '**/dist/**',
        '**/dist-ssr/**',
        '**/APK/**',
        '**/*.apk',
        '**/plugins/**',
        '**/public/video/**',
        '**/*.mp4',
        '**/*.webm',
        '**/public/services-hero-frames/**',
        '**/services-hero-frames/**',
        '**/public/services-section3-frames/**',
        '**/services-section3-frames/**',
        '**/public/app-hero-frames/**',
        '**/app-hero-frames/**',
        '**/public/app-section3-frames/**',
        '**/app-section3-frames/**',
        '**/ezgif-2f1a39c97e5b173b-jpg/**',
        '**/public/ezgif-2f1a39c97e5b173b-jpg/**',
        '**/public/images/**',
        '**/node_modules/**'
      ]
    }
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    minify: 'esbuild',
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-router-dom/')) {
                return 'vendor-react';
              }
              // NOTE: jspdf / qrcode / jsbarcode are deliberately NOT pinned to a
              // shared chunk here. Forcing them into one 'vendor-pdf-barcode' chunk
              // made Rollup place Vite's own __vitePreload helper inside it, so the
              // entry chunk (and therefore every page) statically imported 471 KB of
              // PDF/barcode code. Left to itself, Rollup keeps them in the lazily
              // imported generateInvoicePdf chunk, which only the invoice download
              // pulls in (Lighthouse audit 2026-10-28, -492 KiB per page).
              if (id.includes('articles')) {
                return 'articles-data';
              }
            },
          },
        },
  },
}))
