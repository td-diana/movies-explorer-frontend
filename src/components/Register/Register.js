import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./Register.css";
import logo from "../../images/logo-movies-explorer-blue.svg";
import FormValidation from "../../validation/formValidation";

function Register({ onRegister }) {
  const { handleChange, resetForm, errors, isValid, values } = FormValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <main className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <Link to="/" className="register__logo">
          <img src={logo} alt="логотип" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <div className="register__container">
          <label className="register__label">
            <span className="register__label-title">Имя</span>
            <input
              name="name"
              className="register__input"
              type="text"
              value={values.name || ""}
              required
              minLength="2"
              maxLength="30"
              onChange={handleChange}
            />
            <span className="register__error">{errors.name || ""}</span>
          </label>
          <label className="register__label">
            <span className="register__label-title">E-mail</span>
            <input
              name="email"
              className="register__input"
              type="email"
              value={values.email || ""}
              required
              onChange={handleChange}
            />
            <span className="register__error">{errors.email || ""}</span>
          </label>
          <label className="register__label">
            <span className="register__label-title">Пароль</span>
            <input
              name="password"
              className="register__input register__input-password"
              onChange={handleChange}
              type="password"
              value={values.password || ""}
              required
            />
            <span className="register__error">{errors.password || ""}</span>
          </label>
        </div>
        <button
          type="submit"
          className={`register__button ${
            !isValid && "register__button-disabled"
          }`}
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
        <span className="register__details">
          Уже зарегистрированы?&nbsp;
          <Link to="/signin" className="register__link">
            Войти
          </Link>
        </span>
      </form>
    </main>
  );
}

export default Register;
