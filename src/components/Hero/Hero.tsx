import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Reveal from '../Reveal/Reveal'
import './Hero.scss'

interface HeroProps {
  onBookingClick: () => void
}

function Hero({ onBookingClick }: HeroProps) {
  const [offset, setOffset] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    let ticking = false
    let latestValue = 0

    const handleScroll = () => {
      latestValue = window.scrollY * 0.3

      if (!ticking) {
        ticking = true

        window.requestAnimationFrame(() => {
          setOffset(latestValue)
          ticking = false
        })
      }
    }

    window.addEventListener('scroll', handleScroll, {
      passive: true
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section className='hero'>

      {/* Параллакс фонового свечения */}
      <div
        className='hero-light'
        style={{
          transform: `translate3d(0, ${offset}px, 0)`,
          willChange: 'transform'
        }}
      />

      <div className='container hero-content'>

        {/* Заголовок */}
        <Reveal direction='up'>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: 'easeOut'
            }}
          >
            Премиальная реставрация
            пухоперьевых изделий
          </motion.h1>
        </Reveal>

        {/* Описание */}
        <Reveal direction='up' delay={0.2}>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2
            }}
          >
            Возвращаем мягкость, чистоту и комфорт вашим
            подушкам, одеялам и перинам. Работаем с 2011 года.
          </motion.p>
        </Reveal>

        {/* Основные действия */}
        <Reveal direction='up' delay={0.35}>
          <motion.div
            className='hero-actions'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.35
            }}
          >
            {/* Обратный звонок */}
            <div className='hero-action'>
              <button
                className='cta-price-btn cta-primary'
                type='button'
                onClick={onBookingClick}
              >
                Заказать обратный звонок
              </button>
            </div>

            {/* Прайс-лист */}
            <div className='hero-action hero-price-action'>
              <button
                className='cta-price-btn cta-secondary'
                type='button'
                onClick={() => navigate('/price')}
              >
                Посмотреть цены
              </button>

              <span className='hero-note'>
                Подушки · Одеяла · Перины
              </span>
            </div>
          </motion.div>
        </Reveal>

      </div>

    </section>
  )
}

export default Hero