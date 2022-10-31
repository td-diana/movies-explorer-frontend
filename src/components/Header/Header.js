import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo-movies-explorer-blue.svg";
import Navigation from "../Navigation/Navigation";

function Header({ LoggedIn, theme, onClickMobmenu, isMobmenuOpened }) {
  return (
    <header className={`header header_theme_${theme ? "logged" : "nologged"}`}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img src={logo} alt="логотип" />
        </Link>
        <Navigation
          LoggedIn={LoggedIn}
          onClickMobmenu={onClickMobmenu}
          isMobmenuOpened={isMobmenuOpened}
        />
      </div>
    </header>
  );
}

export default Header;
