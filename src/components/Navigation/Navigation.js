import "./Navigation.css";
import { Link, NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

function Navigation({ loggedIn, onClickMobmenu, isMobmenuOpened }) {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

  function handleOnClickMobmenu() {
    onClickMobmenu(isMobmenuOpened);
  }

  return (
    <>
      {!loggedIn ? (
        <nav className="navigation">
          <ul className="navigation__list">
            <li>
              <Link to="/signup" className="navigation__link">
                Регистрация
              </Link>
            </li>
            <li>
              <Link
                to="/signin"
                className="navigation__link navigation__link-signin"
              >
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      ) : isMobile ? (
        <button
          type="button"
          className="navigation__mob-menu-button"
          onClick={handleOnClickMobmenu}
        />
      ) : (
        <nav className="navigation">
          <ul className="navigation__list navigation__list-loggedin">
            <li className="navigation__item">
              <NavLink to="/movies" className="navigation__link">
                Фильмы
              </NavLink>
            </li>
            <li className="navigation__item">
              <NavLink to="/saved-movies" className="navigation__link">
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <div className="navigation__item">
            <NavLink
              to="/profile"
              className="navigation__link navigation__link-account"
            >
              Аккаунт
            </NavLink>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navigation;
