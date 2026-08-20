import http from 'node:http'
import https from 'node:https'

const PORT = process.env.PORT || 3001
const MAX_BOT_TOKEN = process.env.MAX_BOT_TOKEN
const MAX_CHAT_ID = process.env.MAX_CHAT_ID

if (!MAX_BOT_TOKEN || !MAX_CHAT_ID) {
  console.error(
    'Ошибка: MAX_BOT_TOKEN и MAX_CHAT_ID должны быть заданы',
  )

  process.exit(1)
}

/*
 * HTTPS Agent для MAX API.
 *
 * На Windows Kaspersky перехватывает HTTPS-соединение
 * и подменяет сертификат MAX собственным сертификатом.
 *
 * Поэтому Node.js получает:
 *
 * MAX → Let's Encrypt → ISRG Root X1
 *
 * только после перехвата Kaspersky:
 *
 * Kaspersky Root → *.max.ru
 *
 * Windows доверяет этому сертификату,
 * но Node.js — нет.
 *
 * rejectUnauthorized: false применяется ТОЛЬКО
 * к соединениям этого Agent.
 *
 * Глобальный NODE_TLS_REJECT_UNAUTHORIZED
 * НЕ используется.
 */
const maxAgent = new https.Agent({
  rejectUnauthorized: false,
})

/**
 * Отправка сообщения в MAX.
 */
function sendToMax(message) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      text: message,
    })

    const request = https.request(
      {
        hostname: 'platform-api2.max.ru',
        port: 443,
        path: `/messages?chat_id=${encodeURIComponent(
          MAX_CHAT_ID,
        )}`,
        method: 'POST',

        headers: {
          Authorization: MAX_BOT_TOKEN,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },

        agent: maxAgent,

        timeout: 15000,
      },

      (response) => {
        const chunks = []

        response.on('data', (chunk) => {
          chunks.push(chunk)
        })

        response.on('end', () => {
          const body = Buffer.concat(chunks).toString('utf-8')

          resolve({
            statusCode: response.statusCode,
            body,
          })
        })
      },
    )

    request.on('timeout', () => {
      request.destroy(
        new Error('Таймаут соединения с MAX API'),
      )
    })

    request.on('error', reject)

    request.write(payload)
    request.end()
  })
}

/**
 * Отправка JSON-ответа клиенту.
 */
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  })

  res.end(JSON.stringify(data))
}

/**
 * Проверка телефона.
 *
 * Допустимый формат:
 *
 * +7-(999)-999-99-99
 */
function isValidPhone(phone) {
  return /^\+7-\(\d{3}\)-\d{3}-\d{2}-\d{2}$/.test(phone)
}

const server = http.createServer(async (req, res) => {
  /**
   * CORS / preflight.
   */
  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  /**
   * Разрешаем только:
   *
   * POST /api/booking
   */
  if (req.method !== 'POST' || req.url !== '/api/booking') {
    sendJson(res, 404, {
      success: false,
      message: 'Not found',
    })

    return
  }

  try {
    /**
     * Ограничиваем размер запроса.
     */
    const MAX_BODY_SIZE = 10 * 1024

    let bodySize = 0
    const chunks = []

    for await (const chunk of req) {
      bodySize += chunk.length

      if (bodySize > MAX_BODY_SIZE) {
        sendJson(res, 413, {
          success: false,
          message: 'Слишком большой запрос',
        })

        req.destroy()
        return
      }

      chunks.push(chunk)
    }

    const rawBody = Buffer.concat(chunks).toString('utf-8')

    let body

    try {
      body = JSON.parse(rawBody)
    } catch {
      sendJson(res, 400, {
        success: false,
        message: 'Некорректный JSON',
      })

      return
    }

    const name = String(body.name || '').trim()
    const phone = String(body.phone || '').trim()
    const comment = String(body.comment || '').trim()

    /**
     * Имя обязательно.
     */
    if (!name) {
      sendJson(res, 400, {
        success: false,
        message: 'Введите имя',
      })

      return
    }

    /**
     * Телефон обязательно.
     */
    if (!phone) {
      sendJson(res, 400, {
        success: false,
        message: 'Введите номер телефона',
      })

      return
    }

    /**
     * Проверяем формат телефона.
     */
    if (!isValidPhone(phone)) {
      sendJson(res, 400, {
        success: false,
        message:
          'Телефон должен быть в формате +7-(999)-999-99-99',
      })

      return
    }

    /**
     * Формируем сообщение для MAX.
     */
    const message = [
      '🔥 НОВАЯ ЗАЯВКА С САЙТА',
      '',
      `👤 Имя: ${name}`,
      `📞 Телефон: ${phone}`,
      '',
      `💬 Комментарий: ${comment || 'Не указан'}`,
      '',
      '🌐 Источник: сайт «Жар-птица»',
    ].join('\n')

    /**
     * Отправляем заявку в MAX.
     */
    const maxResponse = await sendToMax(message)

    /**
     * MAX должен вернуть 2xx.
     */
    if (
      maxResponse.statusCode < 200 ||
      maxResponse.statusCode >= 300
    ) {
      console.error(
        'MAX API error:',
        maxResponse.statusCode,
        maxResponse.body,
      )

      sendJson(res, 502, {
        success: false,
        message: 'Не удалось отправить заявку',
      })

      return
    }

    console.log(
      `Заявка успешно отправлена в MAX: ${name}, ${phone}`,
    )

    sendJson(res, 200, {
      success: true,
      message: 'Заявка успешно отправлена',
    })
  } catch (error) {
    console.error('Booking error:', error)

    sendJson(res, 500, {
      success: false,
      message: 'Ошибка сервера',
    })
  }
})

server.listen(PORT, () => {
  console.log(`Booking API запущен на порту ${PORT}`)
})