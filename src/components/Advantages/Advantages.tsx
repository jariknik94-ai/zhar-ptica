import Reveal from '../Reveal/Reveal'
import './Advantages.scss'

function Advantages() {
  return (
    <section className='advantages'>
      <div className='container'>

        <h2>Почему выбирают нас</h2>

        <div className='advantages-grid'>

        <Reveal
          delay={0.1}
          direction='up'
        >
          <div className='advantage-card'>
            <h3>С 2011 года</h3>
            <p>
              Большой опыт в реставрации пухоперьевых изделий.
            </p>
          </div>
        </Reveal>
        <Reveal
          delay={0.25}
          direction='up'
        >
          <div className='advantage-card'>
            <h3>Премиальный подход</h3>
            <p>
              Деликатная работа и внимание к каждой детали.
            </p>
          </div>
        </Reveal>
        <Reveal
          delay={0.4}
          direction='up'
        >
          <div className='advantage-card'>
            <h3>Современное оборудование</h3>
            <p>
              Профессиональная обработка наполнителя.
            </p>
          </div>
        </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Advantages