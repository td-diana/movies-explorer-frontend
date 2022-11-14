const MOVIES_URL = "https://api.nomoreparties.co/beatfilm-movies";

class MoviesApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  }

  getMovies() {
    return fetch(`${this._baseUrl}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((res) => this._checkResponse(res));
  }
}

const moviesApi = new MoviesApi({
  baseUrl: MOVIES_URL,
});

export default moviesApi;
