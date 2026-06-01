import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import BookingModal from '../BookingModal/BookingModal'
import Reveal from '../Reveal/Reveal'
import './Hero.scss'

function Hero() {
  // открытие модального окна заявки
  const [open, setOpen] = useState(false)

  // навигация по страницам
  // const navigate = useNavigate()

  // эффект параллакса для декоративного света
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.3)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className='hero'>

      {/* декоративный свет */}
      <div
        className='hero-light'
        style={{ transform: `translateY(${offset}px)` }}
      />
    <Reveal direction='up'>
      <div className='container hero-content'>

        {/* заголовок */}
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Премиальная реставрация
          пухоперьевых изделий
        </motion.h1>

        {/* описание */}
        <motion.p
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Ателье «Жар птица» — возвращаем комфорт, мягкость и свежесть вашим изделиям с 2011 года
        </motion.p>

        {/* кнопки */}
        <motion.div
          className='hero-buttons'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
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
    </Reveal>
      {/* модальное окно */}
      <BookingModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />

    </section>
  )
}

export default Hero