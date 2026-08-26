import { FaRegCalendarAlt, FaStar, FaCogs } from 'react-icons/fa'
import Reveal from '../Reveal/Reveal'
import './Advantages.scss'

// Выносим данные в массив для удобного редактирования
const ADVANTAGES_DATA = [
  {
    id: 1,
    title: 'С 2011 года',
    text: 'Большой опыт в реставрации пухоперьевых изделий.',
    icon: <FaRegCalendarAlt />,
    delay: 0.1,
  },
  {
    id: 2,
    title: 'Премиальный подход',
    text: 'Деликатная работа и внимание к каждой детали.',
    icon: <FaStar />,
    delay: 0.25,
  },
  {
    id: 3,
    title: 'Современное оборудование',
    text: 'Профессиональная обработка наполнителя.',
    icon: <FaCogs />,
    delay: 0.4,
  },
]

function Advantages() {
  return (
    <section className='advantages'>
      <div className='container'>
        <h2>Почему выбирают нас</h2>

        <div className='advantages-grid'>
          {ADVANTAGES_DATA.map((adv) => (
            <Reveal key={adv.id} delay={adv.delay} direction='up'>
              {/* Семантически правильнее использовать article для карточек */}
              <article className='advantage-card'>
                <div className='icon'>{adv.icon}</div>
                <h3>{adv.title}</h3>
                <p>{adv.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Advantages