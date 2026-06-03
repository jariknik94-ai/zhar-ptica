import './Footer.scss'

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">

        <div className="footer__brand">
          <h3>Ателье «Жар птица»</h3>
          <p className="footer__desc">
            Реставрация пухоперьевых изделий премиального качества
          </p>
        </div>

        <div className="footer__meta">
          <span>© 2011–2026 Все права защищены</span>
        </div>

        <p className="footer__cookies">
          Продолжая использовать наш сайт, вы даете согласие на обработку файлов cookies и других
          пользовательских данных, <br />в соответствии с{' '}
          <a href="/politics">
            политикой обработки персональных данных
          </a>.
        </p>

      </div>
    </footer>
  )
}

export default Footer