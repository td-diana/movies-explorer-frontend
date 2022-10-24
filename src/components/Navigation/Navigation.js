import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation({ LoggeIn }) {
  return (
    <>
      {!LoggeIn ? (
        <nav className="navigation">
          <ul className="navigation__list">
            <li navigation__item>
              <Link to="/signup" className="navigation__link">
                Регистрация
              </Link>
            </li>
            <li navigation__item>
              <Link
                to="/signin"
                className="navigation__link navigation__link-signin"
              >
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="navigation">
          <ul className="navigation__list navigation__list-loggedin">
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
              <Link
                to="/profile"
                className="navigation__link navigation__link-account"
              >
                Аккаунт
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}

export default Navigation;
