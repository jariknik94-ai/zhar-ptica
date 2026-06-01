import Navbar from "../../components/Navbar/Navbar";
import Footer from '../../components/Footer/Footer'
import Reveal from '../../components/Reveal/Reveal'
import ScrollTopButton from "../../components/ScrollTopButton/ScrollTopButton";
import './PricePage.scss'

function PricePage() {
  //  РЕСТАВРАЦИЯ 

  const pillows = [
    ['30×30', '400 ₽'],
    ['30×80', '400 ₽'],
    ['40×40', '450 ₽'],
    ['40×60', '450 ₽'],
    ['44×45', '450 ₽'],
    ['50×50', '510 ₽'],
    ['50×60', '510 ₽'],
    ['50×70', '580 ₽'],
    ['60×60', '580 ₽'],
    ['65×65', '600 ₽'],
    ['70×70', '600 ₽'],
    ['75×75', '660 ₽'],
    ['80×80', '660 ₽'],
  ]

  const blankets = [
    ['120×140 (детское)', '2300 ₽'],
    ['140×210 (односпальное)', '3300 ₽'],
    ['155×210 (полутораспальное)', '3600 ₽'],
    ['175×210 (двуспальное)', '3800 ₽'],
    ['200×210 (Евро)', '4200 ₽'],
  ]

  const featherbeds = [
    ['0,8×2,0', '2200 ₽'],
    ['1,0×2,0', '2300 ₽'],
    ['1,2×2,0', '2700 ₽'],
    ['1,5×2,0', '3000 ₽'],
    ['Нестандартный размер', '+30%'],
  ]

  //  ПОШИВ 

  const linenBiaz = [
    ['Полутораспальный', '3500 ₽'],
    ['Двуспальный', '4050 ₽'],
    ['Евро', '4600 ₽'],
    ['Семейный', '5550 ₽'],
  ]

  const linenPercale = [
    ['Полутораспальный', '3250 ₽'],
    ['Двуспальный', '3800 ₽'],
    ['Евро', '4100 ₽'],
    ['Семейный', '4700 ₽'],
  ]

  const duvet = [
    ['Полутораспальный', '1580 ₽'],
    ['Двуспальный', '1790 ₽'],
    ['Евро', '2200 ₽'],
  ]

  //  НАВОЛОЧКИ 

  const pillowcases = [
    ['70×70', '350 ₽'],
    ['65×65', '350 ₽'],
    ['60×60', '340 ₽'],
    ['55×55', '320 ₽'],
    ['50×70', '330 ₽'],
    ['50×60', '310 ₽'],
    ['50×50', '280 ₽'],
    ['45×45', '240 ₽'],
    ['40×70', '240 ₽'],
    ['40×60', '240 ₽'],
    ['40×50', '240 ₽'],
    ['40×40', '230 ₽'],
    ['35×35', '200 ₽'],
    ['30×60', '200 ₽'],
    ['30×30', '200 ₽'],
  ]

  const renderTable = (
    title: string,
    subtitle: string,
    data: string[][]
  ) => (
    <div className='price-section'>
      <h3>
        {title}
        <span>{subtitle}</span>
      </h3>

      <table className='price-table'>
        <thead>
          <tr>
            <th>Размер / Услуга</th>
            <th>Стоимость</th>
          </tr>
        </thead>

        <tbody>
          {data.map(([name, price]) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <>
      <Navbar type="price" />

      <section className='price-page'>
        <div className='container'>

          <Reveal direction='up'>
            <h1>Прайс-лист</h1>
          </Reveal>
          {/* <button
            className="scroll-down"
            onClick={() => {
              document
                .querySelector('.price-grid')
                ?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            ↓ Смотреть цены
          </button> */}
          {/*  РЕСТАВРАЦИЯ  */}

          <Reveal direction='up'>
            <h2 className='section-title'>
              Реставрация
            </h2>
            <div className='price-row'>
            {renderTable(
              'Реставрация подушек',
              'в том числе замена наперника',
              pillows
            )}

            {renderTable(
              'Реставрация одеял',
              'пуховых',
              blankets
            )}

            {renderTable(
              'Реставрация перин',
              '',
              featherbeds
            )}
          </div>
          </Reveal>



          {/*  ПОШИВ  */}

          <Reveal direction='up'>
            <h2 className='section-title'>
              Пошив постельного белья
            </h2>
            <div className='price-row'>
              {renderTable(
                'Комплекты постельного белья',
                'бязь',
                linenBiaz
              )}

              {renderTable(
                'Комплекты постельного белья',
                'перкаль',
                linenPercale
              )}

              {renderTable(
                'Пододеяльник',
                'бязь',
                duvet
              )}
            </div>
          </Reveal>



          {/*  НАВОЛОЧКИ  */}
          <Reveal direction='up'>
            <div className='single-table'>
              {renderTable(
                'Наволочки готовые',
                'бязь',
                pillowcases
              )}
            </div>
          </Reveal>


        </div>
      </section>

      <Footer />
      <ScrollTopButton />
    </>
  )
}

export default PricePage