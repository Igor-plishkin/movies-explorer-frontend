import { useEffect, useState } from "react";
import { MOVIES_API_URL, oneHour } from "../../utils/constants";
import "./MoviesCard.css";

function MoviesCard({ movie, handleSaveMovie, isSaved, savedMoviesId }) {
  const [isSavedCard, setSavedCard] = useState(false);

  useEffect(() => {
    if (!isSaved) {
      setSavedCard(savedMoviesId.some((i) => i === movie.id));
    }
  }, [isSavedCard]);

  function countDuration(duration) {
    const hours = Math.trunc(duration / oneHour);
    const minutes = duration % oneHour;

    return `${hours > 0 ? `${hours}ч ` : ""}${
      minutes > 0 ? `${minutes}м` : ""
    }`;
  }

  function handleSaveClick() {
    setSavedCard(true);

    handleSaveMovie(movie);
  }
  return (
    <article className="card">
      <a
        className="card__link"
        href={isSaved ? movie.trailer : movie.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="card__image"
          src={isSaved ? movie.image : `${MOVIES_API_URL + movie.image.url}`}
          alt={movie.nameRU}
        />
      </a>
      <div className="card__footer">
        <p className="card__name">{movie.nameRU}</p>
        <button
          className={`card__save ${isSavedCard && "card__save_active"}`}
          onClick={handleSaveClick}
        ></button>
      </div>
      <span className="card__duration">{countDuration(movie.duration)}</span>
    </article>
  );
}

export default MoviesCard;
