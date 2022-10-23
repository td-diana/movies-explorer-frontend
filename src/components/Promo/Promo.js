import { Link } from "react-router-dom";
import "./Promo.css";

function Promo() {
  return (
    <section className="promo">        
      <div className="promo__container">      
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>            
    </div>
    <nav className="promo__nav">
        <ul className="promo__list">
        <li>
          <Link to="#" className="promo__link">
            О проекте
          </Link>
        </li>
        <li>
          <Link to="#" className="promo__link">
            Технологии
          </Link>
        </li>
        <li>
          <Link to="#" className="promo__link">
            Студент
          </Link>
        </li>        
      </ul> 
        </nav>      
      </section>  

  );
}

export default Promo;
