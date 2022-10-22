import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo-movies-explorer-blue.svg";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn }) {
  return (
    <header className="header">
      <div className="header__top-bar">      
        <Link to="/">
          <img className="header__logo" src={logo} alt="логотип" />
        </Link>
        <>
      {!loggedIn ? (
        <nav className="header__navbar">        
          <ul className="header__navbar-list">
            <li>
              <Link to="/signup" className="header__navbar-link">
                Регистрация
              </Link>
            </li>
            <li>
              <Link
                to="/signin"
                className="header__navbar-link header__navbar-link_signin"
              >
                Войти
              </Link>
            </li>
          </ul>          
        </nav> 
) : (
<Navigation />
)}
        </>       
      </div>      
    </header>
  );
}

export default Header;
