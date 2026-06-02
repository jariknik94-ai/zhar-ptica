import { lazy, Suspense } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import CTA from "../../components/CTA/CTA";
import Footer from "../../components/Footer/Footer";
import ScrollTopButton from "../../components/ScrollTopButton/ScrollTopButton";
import Contacts from "../../components/Contacts/Contacts";
import React from "react";

// LAZY LOADED SECTIONS
const Services = lazy(() => import("../../components/Services/Services"));
const Advantages = lazy(() => import("../../components/Advantages/Advantages"));
const Reviews = React.lazy(() => import('../../components/Reviews/Reviews'))
const Process = React.lazy(() => import('../../components/Process/Process'))
const BeforeAfter = React.lazy(() => import('../../components/BeforeAfter/BeforeAfter'))

function Home() {
  return (
    <>
      <Navbar />

      {/* HERO (LCP PRIORITY) */}
      <section id="home">
        <Hero />
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

      {/* CTA (оставляем сразу — важный конверсионный блок) */}
      <section id="price">
        <CTA />
      </section>

      {/* CONTACTS */}
      <section id="contacts">
        <Contacts />
      </section>

      <ScrollTopButton />

      <Footer />
    </>
  );
}

export default Home;