import { Link } from "react-router-dom";
import "./NavTab.css";

function NavTab() {
  
  return (
    <section className="nav-tab">     
       <nav className="nav-tab__container">
        <ul className="nav-tab__list">
        <li>
          <Link to="#" className="nav-tab__link">
            О проекте
          </Link>
        </li>
        <li>
          <Link to="#" className="nav-tab__link">
            Технологии
          </Link>
        </li>
        <li>
          <Link to="#" className="nav-tab__link">
            Студент
          </Link>
        </li>        
      </ul> 
        </nav> 
    </section>
  );
}

export default NavTab;