import Reveal from '../Reveal/Reveal'
import './Reviews.scss'

function Reviews() {
  return (
    <section className='reviews'>
      <div className='container'>

        <h2>Отзывы клиентов</h2>

        <div className='reviews-grid'>

        <Reveal
          delay={0.1}
          direction='left'
        >
          <div className='review-card'>
            <p>
              «Подушки стали как новые.
              Очень качественная работа.»
            </p>

            <span>— Анна</span>
          </div>
        </Reveal>
        <Reveal
          delay={0.1}
          direction='left'
        >
          <div className='review-card'>
            <p>
              «Очень довольна! Подушки сделали качественно.»
            </p>

            <span>— Галина</span>
          </div>
        </Reveal>
        <Reveal
          delay={0.3}
          direction='right'
        >
          <div className='review-card'>
            <p>
              «Премиальный сервис и прекрасный результат.»
            </p>

            <span>— Марина</span>
          </div>
        </Reveal>
        <Reveal
          delay={0.3}
          direction='right'
        >
          <div className='review-card'>
            <p>
              «Услугу оказали в короткие сроки и по приятной цене.»
            </p>

            <span>— Ольга</span>
          </div>
        </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Reviews