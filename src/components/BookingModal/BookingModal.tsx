import { useEffect, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import './BookingModal.scss'

const PHONE_MASK = /^\+7-\(\d{3}\)-\d{3}-\d{2}-\d{2}$/

/**
 * Форматирование российского номера телефона.
 *
 * Результат:
 * +7-(999)-999-99-99
 */
function formatPhone(value: string): string {
  let digits = value.replace(/\D/g, '')

  // Если пользователь начинает ввод с 8:
  // 8 999 999 99 99 → +7-(999)-999-99-99
  if (digits.startsWith('8')) {
    digits = `7${digits.slice(1)}`
  }

  // Если пользователь вводит номер без 7:
  // 9999999999 → +7-(999)-999-99-99
  if (!digits.startsWith('7')) {
    digits = `7${digits}`
  }

  // Российский номер содержит 11 цифр вместе с 7
  digits = digits.slice(0, 11)

  const operatorCode = digits.slice(1, 4)
  const firstPart = digits.slice(4, 7)
  const secondPart = digits.slice(7, 9)
  const thirdPart = digits.slice(9, 11)

  let result = '+7'

  if (operatorCode) {
    result += `-(${operatorCode}`
  }

  if (digits.length >= 4) {
    result += ')'
  }

  if (firstPart) {
    result += `-${firstPart}`
  }

  if (secondPart) {
    result += `-${secondPart}`
  }

  if (thirdPart) {
    result += `-${thirdPart}`
  }

  return result
}

/**
 * Проверка полного формата телефона.
 */
function isValidPhone(phone: string): boolean {
  return PHONE_MASK.test(phone)
}

function BookingPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosed, setIsClosed] = useState(false)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  /**
   * Показываем форму через 3 секунды
   * после загрузки страницы.
   */
  useEffect(() => {
    if (isClosed) {
      return
    }

    const timer = window.setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => {
      window.clearTimeout(timer)
    }
  }, [isClosed])

  /**
   * Закрытие формы.
   */
  const handleClose = () => {
    if (isSubmitting) {
      return
    }

    setIsVisible(false)
    setIsClosed(true)
  }

  /**
   * Обработка имени.
   */
  const handleNameChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setName(event.target.value)

    if (error) {
      setError('')
    }
  }

  /**
   * Обработка телефона.
   */
  const handlePhoneChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const formattedPhone = formatPhone(
      event.target.value,
    )

    setPhone(formattedPhone)

    if (error) {
      setError('')
    }
  }

  /**
   * Обработка комментария.
   */
  const handleCommentChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setComment(event.target.value)

    if (error) {
      setError('')
    }
  }

  /**
   * Отправка заявки.
   */
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    setError('')

    const trimmedName = name.trim()
    const trimmedPhone = phone.trim()
    const trimmedComment = comment.trim()

    /**
     * Имя обязательно.
     */
    if (!trimmedName) {
      setError('Пожалуйста, укажите Ваше имя')
      return
    }

    /**
     * Телефон обязательно.
     */
    if (!trimmedPhone) {
      setError('Пожалуйста, укажите номер телефона')
      return
    }

    /**
     * Проверяем полный формат телефона.
     */
    if (!isValidPhone(trimmedPhone)) {
      setError(
        'Введите телефон в формате +7-(999)-999-99-99',
      )
      return
    }

    try {
      setIsSubmitting(true)

      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          phone: trimmedPhone,
          comment: trimmedComment,
        }),
      })

      let data: {
        success?: boolean
        message?: string
      }

      try {
        data = await response.json()
      } catch {
        throw new Error(
          'Сервер вернул некорректный ответ',
        )
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || 'Не удалось отправить заявку',
        )
      }

      /**
       * Заявка успешно отправлена.
       */
      setIsSuccess(true)

      setName('')
      setPhone('')
      setComment('')
    } catch (error) {
      console.error('Booking error:', error)

      setError(
        error instanceof Error
          ? error.message
          : 'Не удалось отправить заявку',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className='booking-popup'>
      <div className='booking-popup__header'>
        <div>
          <h2>
            {isSuccess
              ? 'Заявка отправлена!'
              : 'Нужна помощь?'}
          </h2>

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
          ×
        </button>
      </div>

      {!isSuccess && (
        <form
          className='booking-popup__form'
          onSubmit={handleSubmit}
          noValidate
        >
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

          {error && (
            <p
              className='booking-popup__error'
              role='alert'
            >
              {error}
            </p>
          )}

          <button
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Отправляем...'
              : 'Заказать вызов'}
          </button>
        </form>
      )}
    </div>
  )
}

export default BookingPopup