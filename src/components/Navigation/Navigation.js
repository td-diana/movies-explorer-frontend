import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
     
    <nav className="navigation">
        {/* убрать после логики */}
        <div className="header__top-bar">
        <Link to="/">
          <img className="header__logo" alt="логотип" />
        </Link>
        
      <ul className="navigation__list">
        <li className="navigation__item">
          <Link to="/movies" className="navigation__link">
            Фильмы
          </Link>
        </li>
        <li className="navigation__item">
          <Link to="/saved-movies" className="navigation__link">
            Сохранённые фильмы
          </Link>
        </li>
        <li className="navigation__item">
          <Link to="/profile" className="navigation__link navigation__link-account">
            Аккаунт
          </Link>
        </li>
        
      </ul>
      </div>
    </nav>
  );
}

export default Navigation;
