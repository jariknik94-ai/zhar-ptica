import Reveal from '../Reveal/Reveal'
import { FaTelegramPlane } from "react-icons/fa"
import { FaWhatsapp } from 'react-icons/fa'

import './Contacts.scss'

function Contacts() {
  return (
    <section
      className="contacts"
      id="contacts"
    >
      <div className="container">

        <h2>Контакты</h2>

        <p className="contacts-subtitle">
          Свяжитесь с нами любым удобным способом
        </p>

        <div className="contacts-grid">

          {/* INFO */}
    <Reveal direction="left">
        <div className="contacts-info">

            <div className="contact-card">
              <span>📍 Адрес</span>

              <p>
                г. Прокопьевск
                <br />
                пр-кт Ленина 7
              </p>
            </div>

                <div className="contact-card">
                <span>📞 Телефон</span>

                <a href="tel:+79516125805">
                    +7 (951) 612-58-05
                </a>
                <br />
                <a
                className="contact-link telegram-link"
                href="https://t.me/podushkaodeilo"
                target="_blank"
                rel="noreferrer"
                >
                <FaTelegramPlane />
                Telegram
                </a>
                <a
                className="contact-link whatsapp-link"
                href="https://wa.me/79039510157"
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp />
                WhatsApp
              </a>
                </div>
            <div className="contact-card">
              <span>🕒 График работы</span>

              <p>
                ПН-ПТ: 10:00-18:00
                <br />
                СБ: 10:00-15:00
                <br />
                ВС: Выходной
              </p>
            </div>

          </div>
    </Reveal>
          {/* MAP */}
    <Reveal
    delay={0.2}
    direction="right"
    >
        <div className="contacts-map">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A7b4919caa955e797f5559306861bdd05cfa2da93e3d4fe597d6afc4d7aa3b9f0&amp;source=constructor"
              width="100%"
              height="575"
              frameBorder="0"
              loading="lazy"
            />

          </div>
    </Reveal>
        </div>

      </div>
    </section>
  )
}

export default Contacts