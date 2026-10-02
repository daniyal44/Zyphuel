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

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), apkServerPlugin()],
  server: {
    watch: {
      ignored: ['**/dist/**', '**/dist-ssr/**', '**/APK/**', '**/*.apk']
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
