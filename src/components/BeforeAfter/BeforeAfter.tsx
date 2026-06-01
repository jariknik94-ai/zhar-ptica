import { useState } from 'react'
import After from "../../assets/BeforeAfter/After.jpg"
import Before from "../../assets/BeforeAfter/Before.jpg"
import Reveal from '../Reveal/Reveal'
import './BeforeAfter.scss'

function BeforeAfter() {

  const [position, setPosition] = useState(50)

  return (
    <section className='before-after'>

      <div className='container'>

        <Reveal direction="up">
          <div>

            <h2>До / После реставрации</h2>

            <p className='subtitle'>
              Реальный результат восстановления пухоперьевых изделий
            </p>

          </div>
        </Reveal>

        <Reveal direction="up" delay={0.2}>

          <div className='ba-wrapper'>

            {/* AFTER IMAGE */}
            <img
              src={After}
              alt='after'
              className='ba-image'
            />

            {/* BEFORE IMAGE */}
            <div
              className='ba-overlay'
              style={{
                clipPath: `inset(0 ${100 - position}% 0 0)`
              }}
            >
              <img
                src={Before}
                alt='before'
                className='ba-image'
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
              onChange={(e) =>
                setPosition(Number(e.target.value))
              }
              className='ba-slider'
            />

            {/* LABELS */}
            <span className='label before'>
              До
            </span>

            <span className='label after'>
              После
            </span>

          </div>

        </Reveal>

      </div>

    </section>
  )
}

export default BeforeAfter