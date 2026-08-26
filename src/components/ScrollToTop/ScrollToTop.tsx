import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Компонент для автоматического сброса скролла в начало страницы 
 * при изменении маршрута (pathname).
 */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [pathname])

  return null
}

export default ScrollToTop