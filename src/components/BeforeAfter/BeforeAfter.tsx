import { useState } from 'react'
import After from "../../assets/BeforeAfter/After.avif"
import Before from "../../assets/BeforeAfter/Before.avif"
import Reveal from '../Reveal/Reveal'
import './BeforeAfter.scss'

function BeforeAfter() {
  const [position, setPosition] = useState(50)

  return (
    <section className='before-after'>
      <div className='container'>

        <Reveal direction="up">
          <header>
            <h2>До / После реставрации</h2>
            <p className='subtitle'>
              Реальный результат восстановления пухоперьевых изделий
            </p>
          </header>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <div className='ba-wrapper'>

            {/* AFTER IMAGE (Background) */}
            <img
              src={After}
              alt='Подушка после чистки и реставрации в ателье'
              className='ba-image'
              loading="eager"
              decoding="async"
            />

            {/* BEFORE IMAGE (Foreground, clipped) */}
            <div
              className='ba-overlay'
              style={{
                clipPath: `inset(0 ${100 - position}% 0 0)`
              }}
            >
              <img
                src={Before}
                alt='Старая пуховая подушка до реставрации'
                className='ba-image'
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* DIVIDER */}
            <div
              className='ba-divider'
              style={{ left: `${position}%` }}
            >
              <div className='ba-handle' />
            </div>

            {/* SLIDER */}
            <input
              type='range'
              min='0'
              max='100'
              value={position}
              onChange={(e) => setPosition(Number(e.target.value))}
              className='ba-slider'
              aria-label='Ползунок сравнения фотографий до и после реставрации'
            />

            {/* LABELS */}
            <span className='label before'>До</span>
            <span className='label after'>После</span>

          </div>
        </Reveal>

      </div>
    </section>
  )
}

export default BeforeAfter