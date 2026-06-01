import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home.tsx'
import PricePage from './pages/PricePage/PricePage.tsx'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

function App() {
  return (
    <BrowserRouter>

      <ScrollToTop />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/price' element={<PricePage />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App