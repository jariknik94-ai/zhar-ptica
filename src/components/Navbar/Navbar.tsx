import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Navbar.scss'

type NavbarType = 'main' | 'price'

function Navbar({ type = 'main' }: { type?: NavbarType }) {
  const navigate = useNavigate()
  const location = useLocation()

  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')

  const navRef = useRef<HTMLDivElement | null>(null)

  const isPrice = type === 'price'

  // LOCK SCROLL
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // OUTSIDE CLICK
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }

    if (menuOpen) document.addEventListener('mousedown', handleOutside)

    return () => document.removeEventListener('mousedown', handleOutside)
  }, [menuOpen])

  // SCROLL FUNCTION
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const goHome = () => {
    setMenuOpen(false)
    navigate('/')
  }

  const goToSection = (id: string) => {
    setMenuOpen(false)

    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => scrollTo(id), 100)
    } else {
      scrollTo(id)
    }
  }

  // ACTIVE SCROLL SPY (ТОЛЬКО ДЛЯ MAIN)
  useEffect(() => {
    if (isPrice) return

    const sections = [
      'home',
      'services',
      'advantages',
      'process',
      'reviews',
      'price',
      'contacts',
    ]

    const handleScroll = () => {
      let current = 'home'

      sections.forEach((id) => {
        const el = document.getElementById(id)

        if (el) {
          const rect = el.getBoundingClientRect()

          if (rect.top <= 120 && rect.bottom >= 120) {
            current = id
          }
        }
      })

      setActive(current)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isPrice])

  return (
    <>
      <div
        className={`nav-overlay ${menuOpen ? 'show' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      <header className="navbar">
        <div className="container navbar-content" ref={navRef}>

          {/* LOGO */}
          <div className="logo" onClick={goHome} style={{ cursor: 'pointer' }}>
            <img className="logo-avatar" src="/favicon.png" />
            Жар птица
          </div>

          {/* BURGER */}
          <button
            className={`burger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>

          {/* MAIN NAV */}
          {!isPrice && (
            <nav className={`nav ${menuOpen ? 'open' : ''}`}>

              <a
                className={active === 'home' ? 'active-link' : ''}
                onClick={() => goToSection('home')}
              >
                Главная
              </a>

              <a
                className={active === 'services' ? 'active-link' : ''}
                onClick={() => goToSection('services')}
              >
                Услуги
              </a>

              <a
                className={active === 'advantages' ? 'active-link' : ''}
                onClick={() => goToSection('advantages')}
              >
                Преимущества
              </a>

              <a
                className={active === 'process' ? 'active-link' : ''}
                onClick={() => goToSection('process')}
              >
                Процесс
              </a>

              <a
                className={active === 'reviews' ? 'active-link' : ''}
                onClick={() => goToSection('reviews')}
              >
                Отзывы
              </a>

              {/* <a
                className={active === 'price' ? 'active-link' : ''}
                onClick={() => goToSection('price')}
              >
                Прайс
              </a> */}

              <a
                className={active === 'contacts' ? 'active-link' : ''}
                onClick={() => goToSection('contacts')}
              >
                Контакты
              </a>

            </nav>
          )}

          {/* PRICE NAV */}
          {isPrice && (
            <nav className={`nav ${menuOpen ? 'open' : ''}`}>

              <a onClick={goHome}>Главная</a>

              <a className="active-link">Прайс</a>

              <a
                onClick={() => {
                  navigate('/')
                  setTimeout(() => scrollTo('contacts'), 100)
                }}
              >
                Контакты
              </a>

            </nav>
          )}

        </div>
      </header>
    </>
  )
}

export default Navbar