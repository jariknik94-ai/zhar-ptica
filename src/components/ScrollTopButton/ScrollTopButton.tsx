import { useEffect, useState } from 'react'
import './ScrollTopButton.scss'

function ScrollTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }

    // Добавлен флаг { passive: true } для оптимизации производительности
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      onClick={scrollTop}
      className={`scroll-top-btn ${visible ? 'show' : ''}`}
      aria-label="Прокрутить страницу наверх"
    >
      ↑
    </button>
  )
}

export default ScrollTopButton