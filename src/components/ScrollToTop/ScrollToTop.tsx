import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return
    }

    const sectionIds = ['home', 'services', 'advantages', 'process', 'before-after', 'reviews', 'price', 'contacts']
    const id = hash.slice(1)
    if (pathname !== '/' || !sectionIds.includes(id)) return

    // Дожидаемся ленивых разделов: их загрузка меняет положение контактов.
    const scrollToSection = () => {
      const section = document.getElementById(id)
      if (!section || !document.getElementById('reviews')) return false
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      section.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth' })
      return true
    }

    if (scrollToSection()) return
    const observer = new MutationObserver(() => {
      if (scrollToSection()) observer.disconnect()
    })
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [pathname, hash, key])

  return null
}

export default ScrollToTop
