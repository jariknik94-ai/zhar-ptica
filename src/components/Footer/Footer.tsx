 import './Footer.scss'
 
 function Footer() {
  return (
    <footer className='footer'>
      <div className='container'>

        <h3>Ателье «Жар птица»</h3>

        <p>
          Реставрация пухоперьевых изделий
          премиального качества.
        </p>

        <span>
          © 2011-2026 Все права защищены
        </span>
        
        <p>
          <small><small>Продолжая использовать наш сайт, вы даете согласие на обработку файлов cookies и других
          пользовательских данных, в соответствии с <a href="/politics">политикой обработки персональных данных</a>.</small></small>
        </p>
      </div>
    </footer>
  )
}

export default Footer