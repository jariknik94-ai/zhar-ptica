import Navbar from "../../components/Navbar/Navbar";
import Footer from '../../components/Footer/Footer';
import Reveal from '../../components/Reveal/Reveal';
import ScrollTopButton from "../../components/ScrollTopButton/ScrollTopButton";
import SEO from "../../components/SEO/SEO";
import { 
  PILLOWS, 
  BLANKETS, 
  FEATHERBEDS, 
  LINEN_BIAZ, 
  LINEN_PERCALE, 
  DUVET, 
  PILLOWCASES 
} from "../../data/prices";
import './PricePage.scss';

const renderTable = (title: string, subtitle: string, data: string[][]) => (
  <div className='price-section'>
    <h3>
      {title}
      {subtitle && <span>{subtitle}</span>}
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
);

function PricePage() {
  return (
    <>
      <SEO
        title="Прайс-лист | Жар птица"
        description="Актуальные цены ателье «Жар птица» в Прокопьевске: реставрация подушек, одеял, перин, замена наперников и пошив постельного белья."
        canonical="/price"
        breadcrumbs={[
          { name: "Главная", url: "/" },
          { name: "Прайс-лист", url: "/price" }
        ]}
      />
      
      <Navbar type="price" />

      <main className='price-page'>
        <div className='container'>

          <Reveal direction='up'>
            <h1>Прайс-лист</h1>
          </Reveal>

          <Reveal direction='up'>
            <h2 className='section-title'>Реставрация</h2>
            <div className='price-row'>
              {renderTable('Реставрация подушек', 'в том числе замена наперника', PILLOWS)}
              {renderTable('Реставрация одеял', 'пуховых', BLANKETS)}
              {renderTable('Реставрация перин', '', FEATHERBEDS)}
            </div>
          </Reveal>

          <Reveal direction='up'>
            <h2 className='section-title'>Пошив постельного белья</h2>
            <div className='price-row'>
              {renderTable('Комплекты постельного белья', 'бязь', LINEN_BIAZ)}
              {renderTable('Комплекты постельного белья', 'перкаль', LINEN_PERCALE)}
              {renderTable('Пододеяльник', 'бязь', DUVET)}
            </div>
          </Reveal>

          <Reveal direction='up'>
            <div className='single-table'>
              {renderTable('Наволочки готовые', 'бязь', PILLOWCASES)}
            </div>
          </Reveal>

        </div>
      </main>

      <Footer />
      <ScrollTopButton />
    </>
  );
}

export default PricePage;