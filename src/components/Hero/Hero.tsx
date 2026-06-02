import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import BookingModal from '../BookingModal/BookingModal'
import Reveal from '../Reveal/Reveal'
import './Hero.scss'

function Hero() {
  const [open, setOpen] = useState(false)
  const [offset, setOffset] = useState(0)

  const [ready, setReady] = useState(false)

  useEffect(() => {
    // 👉 даём браузеру сначала отрисовать LCP
    const t = requestAnimationFrame(() => {
      setReady(true)
    })

    return () => cancelAnimationFrame(t)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.3)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className='hero'>

      <div
        className='hero-light'
        style={{ transform: `translateY(${offset}px)` }}
      />

      {/* LCP контент ВСЕГДА сразу */}
      <div className='container hero-content'>

        {/* АНИМАЦИЯ НЕ УБРАНА — но теперь не блокирует LCP */}
        {ready ? (
          <>
            <Reveal direction='up'>
              <motion.h1
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                Премиальная реставрация
                пухоперьевых изделий
              </motion.h1>
            </Reveal>

            <Reveal direction='up' delay={0.2}>
              <motion.p
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Ателье «Жар птица» — возвращаем комфорт, мягкость и свежесть вашим изделиям с 2011 года
              </motion.p>
            </Reveal>
          </>
        ) : (
          // 👉 fallback для LCP (очень важно)
          <>
            <h1>
              Премиальная реставрация
              пухоперьевых изделий
            </h1>

            <p>
              Ателье «Жар птица» — возвращаем комфорт, мягкость и свежесть вашим изделиям с 2011 года
            </p>
          </>
        )}

      </div>

      <BookingModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />

    </section>
  )
}

export default Hero