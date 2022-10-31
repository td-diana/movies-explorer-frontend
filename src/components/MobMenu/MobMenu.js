import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import "./MobMenu.css";

function MobMenu({ onClickMobmenu, isMobmenuOpened, closeMobmenu }) {
  useEffect(() => {
    if (!isMobmenuOpened) return;

    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        closeMobmenu();
      }
    }
    document.addEventListener("keydown", handleEscClose);

    return () => document.removeEventListener("keydown", handleEscClose);
  }, [isMobmenuOpened, closeMobmenu]);

  function handleOverlay(e) {
    if (e.target === e.currentTarget) {
      closeMobmenu();
    }
  }

  return (
    <nav
      className={`mob-menu mob-menu_status_${isMobmenuOpened ? "opened" : ""}`}
      onClick={handleOverlay}
    >
      <ul className="mob-menu__list mob-menu__list_logged">
        <li className="mob-menu__item">
          <NavLink to="/" className="mob-menu__link">
            Главная
          </NavLink>
        </li>
        <li className="mob-menu__item">
          <NavLink to="/movies" className="mob-menu__link">
            Фильмы
          </NavLink>
        </li>
        <li className="mob-menu__item">
          <NavLink to="/saved-movies" className="mob-menu__link">
            Сохранённые фильмы
          </NavLink>
        </li>
        <li className="mob-menu__item">
          <NavLink
            to="/profile"
            className="mob-menu__link navigation__link-account"
          >
            Аккаунт
          </NavLink>
        </li>
      </ul>
      <button
        className="mob-menu__button-close"
        type="button"
        onClick={onClickMobmenu}
      />
    </nav>
  );
}

export default MobMenu;
