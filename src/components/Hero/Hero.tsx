import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import BookingModal from '../BookingModal/BookingModal'
import './Hero.scss'

function Hero() {
  // открытие модального окна заявки
  const [open, setOpen] = useState(false)

  // эффект параллакса для декоративного света
  const [offset, setOffset] = useState(0)

  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setOffset(window.scrollY * 0.3)
          ticking.current = false
        })

        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className='hero'>

      {/* декоративный свет */}
      <div
        className='hero-light'
        style={{ transform: `translateY(${offset}px)` }}
      />

      <div className='container hero-content'>

        {/* заголовок —  motion, без blocking delay */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Премиальная реставрация
          пухоперьевых изделий
        </motion.h1>

        {/* описание */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          Ателье «Жар птица» — возвращаем комфорт, мягкость и свежесть вашим изделиям с 2011 года
        </motion.p>

        {/* кнопки */}
        <motion.div
          className='hero-buttons'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >

          {/* заявка */}
          {/* <button onClick={() => setOpen(true)}>
            Оставить заявку
          </button> */}

          {/* услуги → прайс */}
          {/* <button onClick={() => navigate('/price')}>
            Прайс
          </button> */}

        </motion.div>

      </div>

      {/* модальное окно */}
      <BookingModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />

    </section>
  )
}

export default Hero