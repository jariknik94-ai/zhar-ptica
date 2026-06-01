import Reveal from '../Reveal/Reveal'
import './Process.scss'

function Process() {
  return (
    <section className='process'>
      <div className='container'>

        <h2>Этапы процесса реставрации</h2>

        <div className='steps'>

          <Reveal
            delay={0.1}
            direction='up'
          >
            <div className='step'>
              <span>01</span>
              <h3>Диагностика изделия</h3>
            </div>
          </Reveal>

          <Reveal
            delay={0.25}
            direction='up'
          >
            <div className='step'>
              <span>02</span>
              <h3>Очистка наполнителя</h3>
            </div>
          </Reveal>

          <Reveal
            delay={0.4}
            direction='up'
          >
            <div className='step'>
              <span>03</span>
              <h3>Реставрация изделия</h3>
            </div>
          </Reveal>

          <Reveal
            delay={0.55}
            direction='up'
          >
            <div className='step'>
              <span>04</span>
              <h3>Контроль <br /> качества</h3>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  )
}

export default Process