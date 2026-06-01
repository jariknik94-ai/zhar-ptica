import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Services from "../../components/Services/Services";
import Advantages from "../../components/Advantages/Advantages";
import Process from "../../components/Process/Process";
import Reviews from "../../components/Reviews/Reviews";
import CTA from "../../components/CTA/CTA";
import Footer from "../../components/Footer/Footer";
import BeforeAfter from "../../components/BeforeAfter/BeforeAfter";
// import FloatingCTA from "../../components/FloatingCTA/FloatingCTA";
import ScrollTopButton from "../../components/ScrollTopButton/ScrollTopButton";
import Contacts from "../../components/Contacts/Contacts"

function Home() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section id="home">
        <Hero />
      </section>

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

      {/* CTA */}
      <section id="price">
        <CTA />
      </section>
      

      {/* CONTACTS */}
      <section id="contacts">
        <Contacts />
      </section>

      {/* FLOATING UI */}
      {/* <FloatingCTA /> */}
      <ScrollTopButton />


      {/* FOOTER */}
      <Footer />
    </>
  )
}

export default Home