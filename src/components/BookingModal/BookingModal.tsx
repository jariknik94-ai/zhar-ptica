import { useEffect } from 'react'
import './BookingModal.scss'

type Props = {
  isOpen: boolean
  onClose: () => void
}

function BookingModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null

  // закрытие по ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <div className='modal-overlay' onClick={onClose}>

      <div className='modal' onClick={(e) => e.stopPropagation()}>

        <h2>Оставить заявку</h2>

        <p>Мы свяжемся с вами в ближайшее время</p>

        <form className='modal-form'>

          <input type='text' placeholder='Ваше имя' />

          <input type='tel' placeholder='Телефон' />

          <textarea placeholder='Комментарий (необязательно)' />

          <button type='submit'>Отправить заявку</button>

        </form>

        <button className='close-btn' onClick={onClose}>
          Отменить
        </button>

      </div>

    </div>
  )
}

export default BookingModal