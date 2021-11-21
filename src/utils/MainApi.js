import { MOVIES_API_URL } from "./constants"

const getMovies = () => {
  return fetch(`${MOVIES_API_URL}/beatfilm-movies`, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export default getMovies;