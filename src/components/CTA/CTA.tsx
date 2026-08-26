import { useNavigate } from 'react-router-dom'
import Reveal from '../Reveal/Reveal'
import './CTA.scss'

function CTA() {
  const navigate = useNavigate()

  return (
    <section className='cta'>
      <div className='container'>
        <Reveal direction="up">
          <h2>Верните комфорт любимым изделиям</h2>
          {/* Добавлен абзац, стили для которого уже были в вашем SCSS */}
          <p>
            Узнайте стоимость наших услуг и подарите своим подушкам, одеялам и перинам вторую жизнь.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <div className='cta-buttons'>
            <button
              className='cta-price-btn'
              onClick={() => navigate('/price')}
            >
              Прайс
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default CTA