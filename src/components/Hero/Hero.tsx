import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import BookingModal from '../BookingModal/BookingModal'
import Reveal from '../Reveal/Reveal'
import './Hero.scss'

function Hero() {
  const [open, setOpen] = useState(false)
  const [offset, setOffset] = useState(0)


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

  window.addEventListener('scroll', handleScroll, { passive: true })

  return () => window.removeEventListener('scroll', handleScroll)
}, [])

  return (
    <section className='hero'>

      {/* Parallax background (GPU-friendly) */}
      <div
        className='hero-light'
        style={{
          transform: `translate3d(0, ${offset}px, 0)`,
          willChange: 'transform'
        }}
      />

      <div className='container hero-content'>

        {/* TITLE */}
        <Reveal direction='up'>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            Премиальная реставрация
            пухоперьевых изделий
          </motion.h1>
        </Reveal>

        {/* TEXT */}
        <Reveal direction='up' delay={0.2}>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ателье «Жар птица» — возвращаем комфорт, мягкость и свежесть вашим изделиям с 2011 года
          </motion.p>
        </Reveal>

      </div>

      <BookingModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />

    </section>
  )
}

export default Hero