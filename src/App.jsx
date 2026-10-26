import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import InterestModal from './components/InterestModal'
import ToastContainer from './components/Toast'
import { ToastProvider } from './context/ToastContext'
import { FuelPriceProvider } from './context/FuelPriceContext'
import HomePage from './pages/HomePage'

// Route-level code splitting: only the landing route ships in the entry chunk.
// Every other page is fetched on demand, which keeps the critical JS bundle small
// for first paint. Prerendered HTML for all pages is produced by the streaming SSR
// renderer (see src/entry-server.jsx), so no crawler ever sees an empty shell.
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const OrderPage = lazy(() => import('./pages/OrderPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const TermsOfUsePage = lazy(() => import('./pages/TermsOfUsePage'))
const DownloadPage = lazy(() => import('./pages/DownloadPage'))
const BlogListPage = lazy(() => import('./pages/BlogListPage'))
const BlogArticlePage = lazy(() => import('./pages/BlogArticlePage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

const openModal = () => {
  if (window.__openInterestModal) window.__openInterestModal()
}

// Minimal, layout-stable placeholder. It is only ever visible during a client-side
// navigation (server-rendered HTML stays on screen during hydration).
const RouteFallback = (
  <div className="route-loading" role="status" aria-label="Loading page">
    <span className="route-loading-spinner" aria-hidden="true" />
  </div>
)

function App() {
  return (
    <ToastProvider>
      <FuelPriceProvider>
        <ScrollToTop />
        <Header onOpenInterestModal={openModal} />
        <Suspense fallback={RouteFallback}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/" element={<ServicesPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/order/" element={<OrderPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/contact/" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/privacy/" element={<PrivacyPolicyPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/privacy-policy/" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfUsePage />} />
            <Route path="/terms/" element={<TermsOfUsePage />} />
            <Route path="/terms-of-use" element={<TermsOfUsePage />} />
            <Route path="/terms-of-use/" element={<TermsOfUsePage />} />
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/download/" element={<DownloadPage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogArticlePage />} />
            <Route path="/blog/:slug/" element={<BlogArticlePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <Footer />
        <InterestModal />
        <ToastContainer />
      </FuelPriceProvider>
    </ToastProvider>
  )
}

export default App
