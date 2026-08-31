import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home.tsx'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

const PricePage = lazy(() => import('./pages/PricePage/PricePage.tsx'))
const Politics = lazy(() => import('./pages/Politics/Politics'))
const CookiePopup = lazy(() => import('./components/CookiePopup/CookiePopup'))
const BookingModal = lazy(() => import('./components/BookingModal/BookingModal'))

function AppContent() {
  return (
    <>
      <ScrollToTop />

      <Suspense fallback={<div style={{ minHeight: '100svh' }} />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/price' element={<PricePage />} />
          <Route path='/politics' element={<Politics />} />
        </Routes>

        <CookiePopup />
        <BookingModal />
      </Suspense>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App;