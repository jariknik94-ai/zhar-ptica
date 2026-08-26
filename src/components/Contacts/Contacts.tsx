import Reveal from '../Reveal/Reveal'
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'
import MaxIcon from '../../assets/icons/max.svg?react'
import './Contacts.scss'

function Contacts() {
  return (
    <section className='contacts' id='contacts'>
      <div className='container'>
        <h2>Контакты</h2>
        <p className='contacts-subtitle'>Свяжитесь с нами любым удобным способом</p>

        <div className='contacts-grid'>
          {/* TOP */}
          <Reveal direction='up'>
            <div className='contacts-top'>
              
              {/* ADDRESS (Семантический тег address) */}
              <address className='contact-card'>
                <span>📍 Адрес</span>
                <p>
                  г. Прокопьевск
                  <br />
                  пр-кт Ленина, 7
                </p>
              </address>

              {/* PHONE */}
              <div className='contact-card'>
                <span>💬 Связаться</span>
                <div className='contacts-contact-grid'>
                  <div className='contacts-contact-column'>
                    <a className='phone-number' href='tel:+79516125805'>
                      📞+7 (951) 612-58-05
                    </a>
                    <a
                      className='contact-link telegram-link'
                      href='https://t.me/podushkaodeilo'
                      target='_blank'
                      rel='noreferrer'
                    >
                      <FaTelegramPlane />
                      Telegram
                    </a>
                  </div>
                  <div className='contacts-contact-column'>
                    <a
                      className='contact-link whatsapp-link'
                      href='https://wa.me/79039410157'
                      target='_blank'
                      rel='noreferrer'
                    >
                      <FaWhatsapp />
                      WhatsApp
                    </a>
                    <a
                      className='contact-link max-link'
                      href='https://max.ru/u/f9LHodD0cOJay_DlowUM4tHCaFx3YyI-lyKuGWdRcxwSVZCcRfU3zl6gcVg'
                      target='_blank'
                      rel='noreferrer'
                    >
                      <MaxIcon className='max-icon' />
                      MAX
                    </a>
                  </div>
                </div>
              </div>

              {/* WORKTIME */}
              <div className='contact-card'>
                <span>🕒 График работы</span>
                <p>
                  ПН–ПТ: 10:00–18:00
                  <br />
                  СБ: 10:00–15:00
                  <br />
                  ВС: Выходной
                </p>
              </div>
            </div>
          </Reveal>

          {/* MAP */}
          <Reveal direction='up' delay={0.2}>
            <div className='contacts-map'>
              <iframe
                title='Ателье Жар-птица на карте Прокопьевска'
                src='https://yandex.ru/map-widget/v1/?um=constructor%3A7b4919caa955e797f5559306861bdd05cfa2da93e3d4fe597d6afc4d7aa3b9f0&amp;source=constructor'
                width='100%'
                height='650'
                frameBorder='0'
                loading='lazy'
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Contacts