import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./Login.css";
import logo from "../../images/logo-movies-explorer-blue.svg";
import FormValidation from "../../validation/formValidation";

function Login() {
  const { handleChange, resetForm, errors, isValid } = FormValidation();

  function handleSubmit(e) {
    e.preventDefault();   
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <main className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <Link to="/" className="login__logo">
          <img src={logo} alt="логотип" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <div className="login__container">
          <label className="login__label">
            <span className="login__label-title">Имя</span>
            <input
              name="name"
              className="login__input"
              type="text"
              required
              minLength="2"
              maxLength="30"
              onChange={handleChange}
            />
            <span className="login__error">{errors.name || ""}</span>
          </label>
          <label className="login__label">
            <span className="login__label-title">E-mail</span>
            <input
              name="email"
              className="login__input"
              type="email"
              required
              onChange={handleChange}
            />
            <span className="login__error">{errors.email || ""}</span>
          </label>        
        </div>
        <button type="submit" 
        className={`login__button ${!isValid && 'login__button-disabled'}`}        
         disabled={!isValid}>
          Войти
        </button>
        <span className="login__details">
          Еще не зарегистрированы?&nbsp;
          <Link to="signup" className="login__link">
            Регистрация
          </Link>
        </span>
      </form>
    </main>
  );
}

export default Login;