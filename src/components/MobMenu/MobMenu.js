import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import "./MobMenu.css";

function MobMenu({ onClickMobmenu, isMobmenuOpened, closeMobmenu }) {
  const setActive = ({ isActive }) =>
    isActive ? "mob-menu__link mob-menu__link_active" : "mob-menu__link";

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
      className={`mob-menu mob-menu_status_${
        isMobmenuOpened ? "opened" : "closed"
      }`}
      onClick={handleOverlay}
    >
      <ul className="mob-menu__list mob-menu__list_logged">
        <li className="mob-menu__item">
          <NavLink to="" className={setActive} end>
            Главная
          </NavLink>
        </li>

        <li className="mob-menu__item">
          <NavLink to="/movies" className={setActive}>
            Фильмы
          </NavLink>
        </li>
        <li className="mob-menu__item">
          <NavLink to="/saved-movies" className={setActive}>
            Сохранённые фильмы
          </NavLink>
        </li>
        <li className="mob-menu__item">
          <NavLink
            to="/profile"
            className="mob-menu__link mob-menu__link-account"
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
