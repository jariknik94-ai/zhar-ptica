import Reveal from '../Reveal/Reveal'
import './Reviews.scss'

const REVIEWS_DATA = [
  {
    id: 1,
    text: '«Подушки стали как новые. Очень качественная работа.»',
    author: 'Анна',
    delay: 0.1,
    direction: 'left' as const,
  },
  {
    id: 2,
    text: '«Очень довольна! Подушки сделали качественно.»',
    author: 'Галина',
    delay: 0.1,
    direction: 'left' as const,
  },
  {
    id: 3,
    text: '«Премиальный сервис и прекрасный результат.»',
    author: 'Марина',
    delay: 0.3,
    direction: 'right' as const,
  },
  {
    id: 4,
    text: '«Услугу оказали в короткие сроки и по приятной цене.»',
    author: 'Ольга',
    delay: 0.3,
    direction: 'right' as const,
  },
]

function Reviews() {
  return (
    <section className='reviews' id='reviews'>
      <div className='container'>
        <h2>Отзывы клиентов</h2>

        <div className='reviews-grid'>
          {REVIEWS_DATA.map((review) => (
            <Reveal
              key={review.id}
              delay={review.delay}
              direction={review.direction}
            >
              <figure className='review-card'>
                <p>{review.text}</p>
                <figcaption>— {review.author}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reviews