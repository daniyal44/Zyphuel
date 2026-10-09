import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { initOrderGuardPlugin } from './plugins/zyphuelOrderGuard'

const rootElement = document.getElementById('root')

if (rootElement && rootElement.hasChildNodes()) {
  try {
    ReactDOM.hydrateRoot(
      rootElement,
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>,
      {
        onRecoverableError(error, errorInfo) {
          if (import.meta.env.DEV) {
            console.warn('[Zyphuel Hydration Recoverable]:', error, errorInfo)
          }
        }
      }
    )
  } catch (err) {
    console.warn('[Zyphuel] Hydration fallback to client render:', err)
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    )
  }
} else if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
}

// Run Order Guard Plugin after React initialization
initOrderGuardPlugin()
