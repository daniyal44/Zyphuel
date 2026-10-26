import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Writable } from 'node:stream'
import App from './App'

/**
 * Streaming SSR renderer.
 *
 * We use renderToPipeableStream + onAllReady (instead of the legacy synchronous
 * renderToString) so that route-level `React.lazy()` code splitting still emits the
 * COMPLETE markup for every prerendered page. With renderToString a suspended
 * Suspense boundary would be written as its fallback only, which would ship empty
 * HTML to crawlers.
 *
 * Resolves with the full HTML string once every lazy chunk has resolved.
 */
export function render(url) {
  return new Promise((resolve, reject) => {
    let html = ''
    let settled = false

    const sink = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk.toString()
        callback()
      },
    })

    const fail = (err) => {
      if (settled) return
      settled = true
      reject(err)
    }

    sink.on('finish', () => {
      if (settled) return
      settled = true
      resolve(html)
    })
    sink.on('error', fail)

    try {
      const { pipe } = renderToPipeableStream(
        <React.StrictMode>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </React.StrictMode>,
        {
          onAllReady() {
            pipe(sink)
          },
          onShellError(err) {
            // A shell-level failure means onAllReady will never fire — fail the build
            // loudly instead of hanging the prerender step forever.
            fail(err)
          },
          onError(err) {
            // Non-fatal errors inside the tree are surfaced, but the render still completes.
            console.error(`[SSR] render error for ${url}:`, err)
          },
        }
      )
    } catch (err) {
      fail(err)
    }
  })
}
