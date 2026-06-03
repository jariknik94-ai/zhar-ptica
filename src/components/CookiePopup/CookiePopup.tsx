import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './CookiePopup.scss'

function CookiePopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted')

    if (!accepted) {
      setVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie">
      <div className="cookie__card">
        <p className="cookie__text">
          ИП Никуличева Марина Викторовна обрабатывает cookies с целью удобного использования вебсайтом.
          Вы можете запретить обработку cookies в настройках браузера. Пожалуйста, ознакомьтесь с{' '}
          <Link to="/politics" className="cookie__link">
            политикой обработки персональных данных
          </Link>.
        </p>

        <div className="cookie__actions">
          <button
            className="cookie__btn cookie__btn--accept"
            onClick={acceptCookies}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookiePopup