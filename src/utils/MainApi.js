const BASE_URL = "https://backend.films-explorer.nomoredomains.icu";

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _onError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // регистрация
  createUser(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then((res) => this._onError(res));
  }

  // вход
  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((res) => this._onError(res));
  }

  // запрос данных пользователя
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => this._onError(res));
  }
}

const mainApi = new Api({
  baseUrl: BASE_URL,
});

export default mainApi;
