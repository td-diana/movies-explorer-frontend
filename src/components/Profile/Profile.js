import { useEffect } from "react";
import "./Profile.css";
import FormValidation from "../../validation/formValidation";

function Profile() {  
  const { handleChange, resetForm, errors } = FormValidation();

  function handleSubmit(e) {
    e.preventDefault();
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <main className="profile">
      <form className="profile__form" name="profile" onSubmit={handleSubmit}>
        <h1 className="profile__title">Привет, !</h1>
        <div className="profile__container">
          <label className="profile__label">
            <span className="profile__label-text">Имя</span>
            <input
              name="name"
              className="profile__input"
              onChange={handleChange}
              type="text"
              required
              minLength="2"
              maxLength="30"
            />
            <span className="profile__error">{errors.name || ""}</span>
          </label>
          <label className="profile__label">
            <span className="profile__label-text">E-mail</span>
            <input
              name="email"
              className="profile__input"
              onChange={handleChange}
              type="email"
              required
            />
            <span className="profile__error">{errors.email || ""}</span>
          </label>
        </div>
        <div className="profile__container-button">
          <button type="submit" className="profile__button-edit">
            Редактировать
          </button>
          <button type="submit" className="profile__button-exit">
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </main>
  );
}

export default Profile;
