import { lazy, Suspense, useEffect, useState } from 'react';

import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import CTA from '../../components/CTA/CTA';
import Footer from '../../components/Footer/Footer';
import ScrollTopButton from '../../components/ScrollTopButton/ScrollTopButton';
import Contacts from '../../components/Contacts/Contacts';
import SEO from '../../components/SEO/SEO';
import BookingModal from '../../components/BookingModal/BookingModal';

// LAZY LOADED SECTIONS
const Services = lazy(() => import('../../components/Services/Services'));
const Advantages = lazy(() => import('../../components/Advantages/Advantages'));
const Reviews = lazy(() => import('../../components/Reviews/Reviews'));
const Process = lazy(() => import('../../components/Process/Process'));
const BeforeAfter = lazy(() => import('../../components/BeforeAfter/BeforeAfter'));

function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    // Автоматически показываем форму через 3 секунды после открытия страницы
    const timer = window.setTimeout(() => {
      setIsBookingOpen(true);
    }, 3000);

    // Очищаем таймер при размонтировании страницы
    return () => window.clearTimeout(timer);
  }, []);

  // Открытие формы из Hero и других элементов страницы
  const handleBookingOpen = () => {
    setIsBookingOpen(true);
  };

  // Закрытие формы
  const handleBookingClose = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="home-page">
      <SEO
        title="Ателье «Жар птица» — реставрация пуховых подушек, одеял и перин в Прокопьевске."
        description="Ателье «Жар птица» с 2011 года выполняет реставрацию подушек, одеял и перин. Очистка пухо-перьевого наполнителя, замена наперников, пошив постельного белья."
        canonical="/"
      />

      <Navbar />

      {/* HERO */}
      <section id="home">
        <Hero onBookingClick={handleBookingOpen} />
      </section>

      <Suspense fallback={null}>
        {/* SERVICES */}
        <section id="services">
          <Services />
        </section>

        {/* ADVANTAGES */}
        <section id="advantages">
          <Advantages />
        </section>

        {/* PROCESS */}
        <section id="process">
          <Process />
        </section>

        {/* BEFORE AFTER */}
        <section id="before-after">
          <BeforeAfter />
        </section>

        {/* REVIEWS */}
        <section id="reviews">
          <Reviews />
        </section>
      </Suspense>

      {/* CTA / PRICE */}
      <section id="price">
        <CTA />
      </section>

      {/* CONTACTS */}
      <section id="contacts">
        <Contacts />
      </section>

      <ScrollTopButton />

      <Footer />

      {/* Форма обратного звонка */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleBookingClose}
      />
    </div>
  );
}

export default Home;