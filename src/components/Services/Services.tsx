import { FaFeatherAlt, FaCouch, FaWind } from 'react-icons/fa'
import Reveal from "../Reveal/Reveal";
import './Services.scss'

function Services() {
  const services = [
    {
      icon: <FaCouch />,
      title: 'Замена наперника',
      text: 'Дезинфекция наполнителя ультрафиолетовым излучением.'
    },
    {
      icon: <FaFeatherAlt />,
      title: 'Реставрация подушек и одеял',
      text: 'Восстановление формы и замена наполнителя.'
    },
    // {
    //   icon: <FaCouch />,
    //   title: 'Реставрация одеял',
    //   text: 'Дезинфекция наполнителя и замена напполнителя.'
    // },
    {
      icon: <FaWind />,
      title: 'Очистка пуха и пера',
      text: 'Чистка и обработка пера сжатым воздухом.'
    }
  ]

  return (

      <section className='services'>
        <div className='container'>

          <h2>Наши услуги</h2>

          <div className='services-grid'>
            {services.map((item, i) => (
            <Reveal
              key={i}
              delay={i * 0.15}
              direction='up'
            >
              <div className='service-card'>
                <div className='icon'>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </Reveal>
                ))}
          </div>

        </div>
      </section>

  )
}

export default Services