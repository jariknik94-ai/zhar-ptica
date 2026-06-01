import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import './Reveal.scss'

type Props = {
  children: ReactNode

  delay?: number

  direction?: 'up' | 'down' | 'left' | 'right'
}

function Reveal({
  children,
  delay = 0,
  direction = 'up',
}: Props) {

  const getInitial = () => {

    switch (direction) {

      case 'left':
        return {
          opacity: 0,
          x: -80,
          filter: 'blur(10px)',
        }

      case 'right':
        return {
          opacity: 0,
          x: 80,
          filter: 'blur(10px)',
        }

      case 'down':
        return {
          opacity: 0,
          y: -80,
          filter: 'blur(10px)',
        }

      default:
        return {
          opacity: 0,
          y: 80,
          filter: 'blur(10px)',
        }
    }
  }

  return (
    <motion.div
      className="reveal"

      initial={getInitial()}

      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
      }}

      viewport={{
        once: true,
        amount: 0.15,
      }}

      transition={{
        duration: 0.9,
        delay,

        type: 'spring',

        stiffness: 70,
        damping: 18,
      }}
    >
      {children}
    </motion.div>
  )
}

export default Reveal