import { FaFeatherAlt, FaCouch, FaWind } from 'react-icons/fa'
import Reveal from "../Reveal/Reveal";
import './Services.scss'

const SERVICES_DATA = [
  {
    icon: <FaCouch />,
    title: 'Замена наперника',
    text: 'Дезинфекция наполнителя ультрафиолетовым излучением.',
  },
  {
    icon: <FaFeatherAlt />,
    title: 'Реставрация подушек и одеял',
    text: 'Восстановление формы и замена наполнителя.',
  },
  {
    icon: <FaWind />,
    title: 'Очистка пуха и пера',
    text: 'Чистка и обработка пера сжатым воздухом.',
  },
]

function Services() {
  return (
    <section className='services' id='services'>
      <div className='container'>
        <h2>Наши услуги</h2>

        <div className='services-grid'>
          {SERVICES_DATA.map((item, i) => (
            <Reveal
              key={i}
              delay={i * 0.15}
              direction='up'
            >
              <article className='service-card'>
                <div className='icon'>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services