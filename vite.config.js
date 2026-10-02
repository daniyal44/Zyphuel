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
  plugins: [react(), apkServerPlugin(), zyphuelOrderGuardPlugin()],
  server: {
    watch: {
      ignored: ['**/dist/**', '**/dist-ssr/**', '**/APK/**', '**/*.apk', '**/plugins/**']
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
              if (id.includes('articles')) {
                return 'articles-data';
              }
            },
          },
        },
  },
}))
