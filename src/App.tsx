import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home.tsx'
import PricePage from './pages/PricePage/PricePage.tsx'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Politics from "./pages/Politics/Politics";
import CookiePopup from './components/CookiePopup/CookiePopup'

function App() {
  return (
    <BrowserRouter>

      <ScrollToTop />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/price' element={<PricePage />} />
        <Route path="/politics" element={<Politics />} />
      </Routes>
    <CookiePopup />
    </BrowserRouter>
  )
}

export default App