import { politicsContent } from '../../data/politics';
import Navbar from "../../components/Navbar/Navbar";
import Footer from '../../components/Footer/Footer'
import ScrollTopButton from "../../components/ScrollTopButton/ScrollTopButton";
import SEO from "../../components/SEO/SEO";

import './Politics.scss';

const Politics = () => {
  return (
    <>
    <SEO
    title="Политика конфиденциальности | Жар-птица"
    description="Политика обработки персональных данных."
    canonical="/politics"
    breadcrumbs={[
        { name: "Главная", url: "/" },
        { name: "Политика конфиденциальности", url: "/politics" }
    ]}
/>
    <Navbar type="politics" />
    <section className="politics">
      <div className="container">
        <div className="politics-card">
          <div
            className="politics-content"
            dangerouslySetInnerHTML={{ __html: politicsContent }}
          />
        </div>
      </div>
    </section>
      <Footer />
      <ScrollTopButton />
    </>
  );
};

export default Politics;