import { BASE_API_URL, MOVIES_API_URL } from "./constants";

class Api {
  constructor(baseUrl) {
    this.url = baseUrl;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getSavedMovies() {
    return fetch(`${this.url}/movies`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this._handleResponse);
  }

  getUser() {
    return fetch(`${this.url}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this._handleResponse);
  }

  updateUser(name, email) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    }).then(this._handleResponse);
  }

  saveMovie(movie) {
    return fetch(`${this.url}/movies`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        description: movie.description,
        year: movie.year,
        image: `${MOVIES_API_URL + movie.image.url}`,
        trailer: movie.trailerLink,
        thumbnail: `${MOVIES_API_URL + movie.image.formats.thumbnail.url}`,
        movieId: movie.id.toString(),
        nameRU: movie.nameRU,
        nameEN: movie.nameEN || 'null',
        owner: movie.owner,
      }),
    }).then(this._handleResponse);
  }

  deleteMovie(id) {
    return fetch(`${this.url}/movies/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this._handleResponse);
  }
}

const api = new Api(BASE_API_URL);

export default api;
