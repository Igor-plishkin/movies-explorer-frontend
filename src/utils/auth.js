import { BASE_API_URL } from "./constants";

class Auth {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  registration(email, password) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: "include",
    }).then(this._handleResponse);
  }

  login(email, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: "include",
    }).then(this._handleResponse);
  }
  getToken(jwt) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      credentials: "include",
    }).then(this._handleResponse);
  }
  signout() {
    return fetch(`${this.baseUrl}/signout`, {
      method: "DELETE",
      credentials: "include",
    }).then(this._handleResponse);
  }
}

const auth = new Auth(BASE_API_URL);

export default auth;
