import { politicsContent } from '../../data/politics';
import Navbar from "../../components/Navbar/Navbar";
import Footer from '../../components/Footer/Footer';
import ScrollTopButton from "../../components/ScrollTopButton/ScrollTopButton";
import SEO from "../../components/SEO/SEO";

import './Politics.scss';

const Politics = () => {
  return (
    <>
      <SEO
        title="Политика обработки персональных данных | Жар птица"
        description="Политика обработки персональных данных ателье «Жар птица». Порядок обработки, хранения и защиты персональных данных пользователей сайта."
        canonical="/politics"
        breadcrumbs={[
          { name: "Главная", url: "/" },
          { name: "Политика обработки персональных данных", url: "/politics" }
        ]}
      />
      
      <Navbar type="politics" />
      
      <main className="politics">
        <div className="container">
          <article className="politics-card">
            <div
              className="politics-content"
              dangerouslySetInnerHTML={{ __html: politicsContent }}
            />
          </article>
        </div>
      </main>

      <Footer />
      <ScrollTopButton />
    </>
  );
};

export default Politics;