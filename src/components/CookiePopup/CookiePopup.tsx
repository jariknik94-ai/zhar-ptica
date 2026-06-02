import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './CookiePopup.scss'

function CookiePopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted')
    const rejected = localStorage.getItem('cookiesRejected')

    if (!accepted && !rejected) {
      setVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true')
    localStorage.removeItem('cookiesRejected')
    setVisible(false)
  }

  const rejectCookies = () => {
    localStorage.setItem('cookiesRejected', 'true')
    localStorage.removeItem('cookiesAccepted')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie">
      <div className="cookie__card">
        <p className="cookie__text">
          ИП Никуличева Марина Викторовна обрабатывает cookies с целью удобного использования вебсайтом.{' '}
          Вы можете запретить обработку сookies в настройках браузера. Пожалуйста, ознакомьтесь с{' '}
          <Link to="/politics" className="cookie__link">
            политикой обработки персональных данных
          </Link>.
        </p>

        <div className="cookie__actions">
          <button className="cookie__btn cookie__btn--reject" onClick={rejectCookies}>
            Отклонить
          </button>

          <button className="cookie__btn cookie__btn--accept" onClick={acceptCookies}>
            Принять
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookiePopup