import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home/Home.tsx'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import NotFound from './pages/NotFound/NotFound'

const PricePage = lazy(() => import('./pages/PricePage/PricePage.tsx'))
const Politics = lazy(() => import('./pages/Politics/Politics'))
const CookiePopup = lazy(() => import('./components/CookiePopup/CookiePopup'))

function AppContent() {
  useEffect(() => {
    // Читаем сохранённую тему и применяем её ко всему документу.
    const savedTheme = localStorage.getItem('theme')
    document.documentElement.dataset.theme =
      savedTheme === 'light' ? 'light' : 'dark'
  }, [])

  return (
    <>
      <ScrollToTop />

      <Suspense fallback={<div style={{ minHeight: '100svh' }} />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/price' element={<PricePage />} />
          <Route path='/politics' element={<Politics />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <CookiePopup />
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

export default App