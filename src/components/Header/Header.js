import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo-movies-explorer-blue.svg";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn, onClickMobmenu, isMobmenuOpened }) {
  const location = useLocation();
  return (
    <header
      className={`header header_theme_${
        location.pathname === "/" ? "grey" : "white"
      }`}
    >
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img src={logo} alt="логотип" />
        </Link>
        <Navigation
          loggedIn={loggedIn}
          onClickMobmenu={onClickMobmenu}
          isMobmenuOpened={isMobmenuOpened}
        />
      </div>
    </header>
  );
}

export default Header;
