import { useEffect, useState } from 'react'
import './ScrollTopButton.scss'

function ScrollTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
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
      aria-label="Наверх"
    >
      ↑
    </button>
  )
}

export default ScrollTopButton