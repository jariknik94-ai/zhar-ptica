import { useNavigate } from 'react-router-dom'
import Reveal from '../Reveal/Reveal'
import './CTA.scss'

function CTA() {
  const navigate = useNavigate()

  return (
    <section className='cta'>
      <div className='container'>

        <Reveal direction='up'>
          <h2>Верните комфорт любимым изделиям</h2>

          <p>
            Узнайте стоимость наших услуг и подарите своим подушкам,
            одеялам и перинам вторую жизнь.
          </p>
        </Reveal>

        <Reveal direction='up' delay={0.2}>
          <div className='cta-buttons'>

            {/* Кнопка прайс-листа и подпись к ней */}
            <div className='cta-price-action'>
              <button
                className='cta-price-btn'
                type='button'
                onClick={() => navigate('/price')}
              >
                Посмотреть цены
              </button>

              <span className='cta-note'>
                Подушки · Одеяла · Перины
              </span>
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  )
}

export default CTA