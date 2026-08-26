import { useEffect, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import './BookingModal.scss'

const PHONE_MASK = /^\+7-\(\d{3}\)-\d{3}-\d{2}-\d{2}$/

/**
 * Форматирование российского номера телефона.
 * Результат: +7-(999)-999-99-99
 */
function formatPhone(value: string): string {
  let digits = value.replace(/\D/g, '')

  if (digits.startsWith('8')) {
    digits = `7${digits.slice(1)}`
  }

  if (!digits.startsWith('7')) {
    digits = `7${digits}`
  }

  digits = digits.slice(0, 11)

  const operatorCode = digits.slice(1, 4)
  const firstPart = digits.slice(4, 7)
  const secondPart = digits.slice(7, 9)
  const thirdPart = digits.slice(9, 11)

  let result = '+7'

  if (operatorCode) result += `-(${operatorCode}`
  if (digits.length >= 4) result += ')'
  if (firstPart) result += `-${firstPart}`
  if (secondPart) result += `-${secondPart}`
  if (thirdPart) result += `-${thirdPart}`

  return result
}

function isValidPhone(phone: string): boolean {
  return PHONE_MASK.test(phone)
}

function BookingModal() {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosed, setIsClosed] = useState(false)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')
  const [isPersonalDataAccepted, setIsPersonalDataAccepted] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  // Показываем форму через 3 секунды после загрузки
  useEffect(() => {
    if (isClosed) return

    const timer = window.setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => window.clearTimeout(timer)
  }, [isClosed])

  const handleClose = () => {
    if (isSubmitting) return
    setIsVisible(false)
    setIsClosed(true)
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    if (error) setError('')
  }

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value))
    if (error) setError('')
  }

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
    if (error) setError('')
  }

  const handleConsentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPersonalDataAccepted(e.target.checked)
    if (error) setError('')
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return
    setError('')

    const trimmedName = name.trim()
    const trimmedPhone = phone.trim()
    const trimmedComment = comment.trim()

    if (!trimmedName) return setError('Пожалуйста, укажите Ваше имя')
    if (!trimmedPhone) return setError('Пожалуйста, укажите номер телефона')
    if (!isValidPhone(trimmedPhone)) return setError('Введите телефон в формате +7-(999)-999-99-99')
    if (!isPersonalDataAccepted) return setError('Необходимо согласиться на обработку персональных данных')

    try {
      setIsSubmitting(true)

      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          phone: trimmedPhone,
          comment: trimmedComment,
        }),
      })

      let data: { success?: boolean; message?: string }

      try {
        data = await response.json()
      } catch {
        throw new Error('Сервер вернул некорректный ответ')
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Не удалось отправить заявку')
      }

      setIsSuccess(true)
      setName('')
      setPhone('')
      setComment('')
      setIsPersonalDataAccepted(false)
    } catch (err) {
      console.error('Booking error:', err)
      setError(err instanceof Error ? err.message : 'Не удалось отправить заявку')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isVisible) return null

  return (
    <div className='booking-popup'>
      <div className='booking-popup__header'>
        <div>
          <h2>{isSuccess ? 'Заявка отправлена!' : 'Нужна помощь?'}</h2>
          <p>
            {isSuccess
              ? 'Мы свяжемся с Вами в ближайшее время.'
              : 'Закажите обратный звонок и мы обязательно с Вами свяжемся'}
          </p>
        </div>

        <button
          className='booking-popup__close'
          type='button'
          onClick={handleClose}
          disabled={isSubmitting}
          aria-label='Закрыть'
        >
          &times;
        </button>
      </div>

      {!isSuccess && (
        <form className='booking-popup__form' onSubmit={handleSubmit} noValidate>
          <input
            type='text'
            placeholder='Ваше имя *'
            value={name}
            onChange={handleNameChange}
            disabled={isSubmitting}
            autoComplete='name'
            required
            aria-required='true'
          />

          <input
            type='tel'
            placeholder='+7-(___)-___-__-__ *'
            value={phone}
            onChange={handlePhoneChange}
            disabled={isSubmitting}
            autoComplete='tel'
            inputMode='tel'
            maxLength={18}
            required
            aria-required='true'
          />

          <textarea
            placeholder='Комментарий (необязательно)'
            value={comment}
            onChange={handleCommentChange}
            disabled={isSubmitting}
          />

          <label className='booking-popup__consent'>
            <input
              className='booking-popup__consent-input'
              type='checkbox'
              checked={isPersonalDataAccepted}
              onChange={handleConsentChange}
              disabled={isSubmitting}
              required
              aria-required='true'
            />
            <span className='booking-popup__consent-checkbox' aria-hidden='true' />
            <span className='booking-popup__consent-text'>
              Я согласен (-на) на обработку{' '}
              <a
                href='/politics'
                target='_blank'
                rel='noopener noreferrer'
                onClick={(e) => e.stopPropagation()}
              >
                персональных данных
              </a>
            </span>
          </label>

          {error && (
            <p className='booking-popup__error' role='alert'>
              {error}
            </p>
          )}

          <button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Отправляем...' : 'Заказать вызов'}
          </button>
        </form>
      )}
    </div>
  )
}

export default BookingModal