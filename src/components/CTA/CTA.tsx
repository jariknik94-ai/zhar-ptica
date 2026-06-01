import { useNavigate } from 'react-router-dom'
import './CTA.scss'

function CTA() {
  const navigate = useNavigate()

  return (
    <section className='cta'>
      <div className='container'>

        <h2>
          Верните комфорт любимым изделиям
        </h2>

        <div className='cta-buttons'>
          <button
            className='cta-price-btn'
            onClick={() => navigate('/price')}
          >
            Прайс
          </button>
        </div>

      </div>
    </section>
  )
}

export default CTA