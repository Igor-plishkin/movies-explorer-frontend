import { MOVIES_API_URL, oneHour } from "../../utils/constants";
import "./MoviesCard.css";

function MoviesCard({
  movie,
  handleSaveMovie,
  isSaved,
  savedMoviesId,
  onDelete,
}) {
  const handleIsLike = (card, savedCardsId) => {
    if (card.id) {
      return savedCardsId.some((el) => el === card.id);
    }
  };

  const isLiked = handleIsLike(movie, savedMoviesId);
  const cardLikeButtonClassName = isSaved
    ? "card__delete"
    : `card__save ${isLiked ? "card__save_active" : ""}`;

  function countDuration(duration) {
    const hours = Math.trunc(duration / oneHour);
    const minutes = duration % oneHour;

    return `${hours > 0 ? `${hours}ч ` : ""}${
      minutes > 0 ? `${minutes}м` : ""
    }`;
  }

  function handleSaveClick() {
    if (isSaved) {
      onDelete(movie);
    } else if (isLiked) {
      onDelete(movie);
    } else {
      handleSaveMovie(movie);
    }
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
          className={cardLikeButtonClassName}
          onClick={handleSaveClick}
        ></button>
      </div>
      <span className="card__duration">{countDuration(movie.duration)}</span>
    </article>
  );
}

export default MoviesCard;
