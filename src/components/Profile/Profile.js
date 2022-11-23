import { useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";
import FormValidation from "../../validation/formValidation";

function Profile({ handleLogOut, handleProfile }) {
  const { handleChange, resetForm, errors, values, isValid } = FormValidation();
  const currentUser = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();
    handleProfile(values);
  }

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  const editUser =
    !isValid ||
    (currentUser.name === values.name && currentUser.email === values.email);

  return (
    <main className="profile">
      <form className="profile__form" name="profile" onSubmit={handleSubmit}>
        <h1 className="profile__title">{`Привет, ${
          currentUser.name || ""
        }!`}</h1>
        <div className="profile__container">
          <label className="profile__label">
            <span className="profile__label-text">Имя</span>
            <input
              name="name"
              className="profile__input"
              onChange={handleChange}
              type="text"
              value={values.name || ""}
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
              value={values.email || ""}
              required
            />
            <span className="profile__error">{errors.email || ""}</span>
          </label>
        </div>

        <div className="profile__container-button">
          <>
            {!editUser ? (
              <button
                type="submit"
                disabled={editUser ? true : false}
                className={`profile__button-edit ${
                  editUser ? "profile__button-edit_disabled" : ""
                }`}
              >
                Сохранить
              </button>
            ) : (
              <button
                title="Отредактируйте поля профиля"
                type="submit"
                disabled={editUser ? true : false}
                className={`profile__button-edit ${
                  editUser ? "profile__button-edit_disabled" : ""
                }`}
              >
                Редактировать
              </button>
            )}
          </>

          <button
            type="submit"
            className="profile__button-exit"
            onClick={handleLogOut}
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </main>
  );
}

export default Profile;

// Страница редактирование профиля:
// На странице редактирования профиля клик по кнопке «Сохранить» отправляет запрос на роут /users/me, если данные введены корректно.
// Пользователю отображается уведомление об успешном запросе к серверу при сохранении профиля.

// Комментарий: при сохранение профиля пользователь должен увидеть сообщение о подтверждении, вид сообщения может быть любым на ваш выбор

// Если на странице редактирования профиля введённая информация соответствует текущим данным пользователя, кнопка «Сохранить» заблокирована и нельзя отправить запрос сохранения.

// Комментарий: При редактировании пользователь может ввести текущие данные профиля и сохранить их, а нужно сделать так, чтобы можно было отправить запрос на сохранение,
//  только если данные изменены по сравнению с текущими данными пользователя, которые должны содержаться в текущий момент в контексте.

// поля формы заблокированы во время отправки запросов и у пользователя нет возможности отправить новый запрос до завершения предыдущего.

// Комментарий: на время выполнения запроса считается хорошей практикой блокировать поля ввода и кнопку отправки формы,
// что бы пользователь не мог выполнить новые запросы до завершения предыдущего
