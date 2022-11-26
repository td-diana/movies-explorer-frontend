import "./Login.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import logo from "../../images/logo-movies-explorer-blue.svg";
import FormValidation from "../../validation/formValidation";

function Login({ onLogin }) {
  const { handleChange, resetForm, errors, isValid, values } = FormValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <main className="login">
      <form className="login__form" onSubmit={handleSubmit} noValidate>
        <Link to="/" className="login__logo">
          <img src={logo} alt="логотип" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <div className="login__container">
          <label className="login__label">
            <span className="login__label-title">E-mail</span>
            <input
              name="email"
              className="login__input"
              type="email"
              value={values.email || ''}
              required
              onChange={handleChange}
            />
            <span className="login__error">{errors.email || ""}</span>
          </label>
          <label className="login__label">
            <span className="login__label-title">Пароль</span>
            <input
              name="password"
              className="login__input login__input-password"
              onChange={handleChange}
              type="password"
              value={values.password || ''}
              required
            />
            <span className="login__error">{errors.password || ""}</span>
          </label>
        </div>
        <button
          type="submit"
          className={`login__button ${!isValid && "login__button-disabled"}`}
          disabled={!isValid}
        >
          Войти
        </button>
        <span className="login__details">
          Еще не зарегистрированы?&nbsp;
          <Link to="/signup" className="login__link">
            Регистрация
          </Link>
        </span>
      </form>
    </main>
  );
}

export default Login;
