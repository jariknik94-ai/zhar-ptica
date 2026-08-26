import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Navbar.scss'

type NavbarType = 'main' | 'price' | 'politics'
type Theme = 'dark' | 'light'

function Navbar({ type = 'main' }: { type?: NavbarType }) {
  const navigate = useNavigate()
  const location = useLocation()

  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')

  // THEME
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme === 'light' ? 'light' : 'dark'
  })

  const navRef = useRef<HTMLDivElement | null>(null)

  const isPrice = type === 'price'
  const isPolitics = type === 'politics'

  // APPLY THEME
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  // TOGGLE THEME
  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
    setMenuOpen(false)
  }

  // LOCK SCROLL & ESCAPE KEY HANDLER
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  // OUTSIDE CLICK
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutside)
    }
  }, [menuOpen])

  // SCROLL FUNCTION WITH HEADER OFFSET
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const navHeight = 84 // Высота шапки для отступа
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  const goHome = () => {
    setMenuOpen(false)
    navigate('/')
  }

  const goToSection = (id: string) => {
    setMenuOpen(false)

    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        scrollTo(id)
      }, 100)
    } else {
      scrollTo(id)
    }
  }

  // ACTIVE SCROLL SPY (Optimized)
  useEffect(() => {
    if (isPrice || isPolitics) return

    const sectionIds = [
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

      sectionIds.forEach((id) => {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          // Проверяем положение секции относительно верхней части экрана
          if (rect.top <= 140 && rect.bottom >= 140) {
            current = id
          }
        }
      })

      setActive(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isPrice, isPolitics])

  return (
    <>
      <div
        className={`nav-overlay ${menuOpen ? 'show' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      <header className="navbar">
        <div className="container navbar-content" ref={navRef}>
          {/* LOGO */}
          <div
            className="logo"
            onClick={goHome}
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
          >
            <img
              className="logo-avatar"
              src="/favicon.png"
              alt="Жар-птица"
            />
            Жар птица
          </div>

          {/* MAIN NAV */}
          {!isPrice && !isPolitics && (
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
              <a
                className={active === 'price' ? 'active-link' : ''}
                onClick={() => navigate('/price')}
              >
                Прайс
              </a>
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
                  setTimeout(() => {
                    scrollTo('contacts')
                  }, 100)
                }}
              >
                Контакты
              </a>
            </nav>
          )}

          {/* POLITICS NAV */}
          {isPolitics && (
            <nav className={`nav ${menuOpen ? 'open' : ''}`}>
              <a onClick={goHome}>Главная</a>
              <a
                className={active === 'price' ? 'active-link' : ''}
                onClick={() => navigate('/price')}
              >
                Прайс
              </a>
              <a className="active-link">Политика</a>
            </nav>
          )}

          {/* THEME TOGGLE */}
          <button
            type="button"
            className={`theme-toggle ${
              theme === 'light' ? 'theme-toggle--light' : 'theme-toggle--dark'
            }`}
            onClick={toggleTheme}
            aria-label={
              theme === 'dark'
                ? 'Включить светлую тему'
                : 'Включить тёмную тему'
            }
          >
            <span className="theme-toggle__track">
              <span className="theme-toggle__icon">
                {theme === 'dark' ? '☾' : '☀'}
              </span>
            </span>
          </button>

          {/* BURGER */}
          <button
            type="button"
            className={`burger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
    </>
  )
}

export default Navbar