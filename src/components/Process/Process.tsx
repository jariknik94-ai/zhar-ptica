import Reveal from '../Reveal/Reveal'
import './Process.scss'

const PROCESS_STEPS = [
  {
    id: '01',
    title: 'Диагностика изделия',
    delay: 0.1,
  },
  {
    id: '02',
    title: 'Очистка наполнителя',
    delay: 0.25,
  },
  {
    id: '03',
    title: 'Реставрация изделия',
    delay: 0.4,
  },
  {
    id: '04',
    title: 'Контроль качества',
    delay: 0.55,
  },
]

function Process() {
  return (
    <section className='process' id='process'>
      <div className='container'>
        <h2>Этапы процесса реставрации</h2>

        <div className='steps'>
          {PROCESS_STEPS.map((step) => (
            <Reveal key={step.id} delay={step.delay} direction='up'>
              <article className='step'>
                <span>{step.id}</span>
                <h3>{step.title}</h3>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Process