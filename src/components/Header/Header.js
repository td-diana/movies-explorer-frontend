import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo-movies-explorer-blue.svg";
import Navigation from "../Navigation/Navigation";

function Header({ LoggeIn}) {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img src={logo} alt="логотип" />
        </Link>
        <Navigation LoggeIn={LoggeIn} />
      </div>
    </header>
  );
}

export default Header;

