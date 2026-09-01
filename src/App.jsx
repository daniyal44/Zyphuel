import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import InterestModal from './components/InterestModal'
import ToastContainer from './components/Toast'
import { ToastProvider } from './context/ToastContext'
import { FuelPriceProvider } from './context/FuelPriceContext'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import OrderPage from './pages/OrderPage'
import ContactPage from './pages/ContactPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsOfUsePage from './pages/TermsOfUsePage'
import DownloadPage from './pages/DownloadPage'
import BlogListPage from './pages/BlogListPage'
import BlogArticlePage from './pages/BlogArticlePage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

const openModal = () => {
  if (window.__openInterestModal) window.__openInterestModal()
}

function App() {
  return (
    <ToastProvider>
      <FuelPriceProvider>
        <ScrollToTop />
        <Header onOpenInterestModal={openModal} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-use" element={<TermsOfUsePage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogArticlePage />} />
        </Routes>
        <Footer />
        <InterestModal />
        <ToastContainer />
      </FuelPriceProvider>
    </ToastProvider>
  )
}

export default App
