// import { useState } from 'react';
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import "./Navigation.css";
// import MobMenu from "../MobMenu/MobMenu";
import mobmenu from "../../images/icon-mob-menu.svg";

function Navigation({ LoggeIn }) {
  const isMobile = useMediaQuery({ query: `(max-width: 800px)` });

  return (
    <>
      {!LoggeIn ? (
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
        <img className="navigation__mob-menu" src={mobmenu} alt="логотип" />
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
          </ul>
          <div className="navigation__item">
            <Link
              to="/profile"
              className="navigation__link navigation__link-account"
            >
              Аккаунт
            </Link>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navigation;
