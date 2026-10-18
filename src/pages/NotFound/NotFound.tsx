import { Link } from 'react-router-dom'
import { FiArrowLeft, FiHome } from 'react-icons/fi'
import { motion } from 'framer-motion'
import './NotFound.scss'

function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found__glow not-found__glow--one" />
      <div className="not-found__glow not-found__glow--two" />

      <motion.div
        className="not-found__content"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <span className="not-found__eyebrow">
          ЖАР ПТИЦА · АТЕЛЬЕ РЕСТАВРАЦИИ
        </span>

        <div className="not-found__number" aria-label="Ошибка 404">
          4<span>0</span>4
        </div>

        <h1>Кажется, страница улетела</h1>

        <p className="not-found__description">
          Такой страницы не существует или она была перемещена.
          Но не переживайте — мы поможем вернуться туда, где всё на своих местах.
        </p>

        <Link to="/" className="not-found__button">
          <FiHome size={19} />
          <span>Вернуться на главную</span>
          <FiArrowLeft className="not-found__arrow" size={18} />
        </Link>

        {/* <span className="not-found__note">
          Всё лишнее восстановим. Даже маршрут.
        </span> */}
      </motion.div>
    </main>
  )
}

export default NotFound