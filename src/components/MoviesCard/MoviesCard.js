import { MOVIES_API_URL, oneHour } from "../../utils/constants";
import "./MoviesCard.css";

function MoviesCard({ movie }) {
  function countDuration(duration) {
    const hours = Math.trunc(duration / oneHour);
    const minutes = duration % oneHour;

    return `${hours > 0 ? `${hours}ч ` : ""}${
      minutes > 0 ? `${minutes}м` : ""
    }`;
  }

  //Функциональность сохранения карточки будет реализована вместе с api, ниже только презентация на одном элементе
  function handleSaveClick() {
    const saveBtn = document.querySelector(".card__save");
    saveBtn.classList.toggle("card__save_active");
  }
  return (
    <article className="card">
      <a
        className="card__link"
        href={movie.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img className="card__image" src={`${MOVIES_API_URL + movie.image.url}`} alt={movie.nameRU} />
      </a>
      <div className="card__footer">
        <p className="card__name">{movie.nameRU}</p>
        <button className="card__save" onClick={handleSaveClick}></button>
      </div>
      <span className="card__duration">{countDuration(movie.duration)}</span>
    </article>
  );
}

export default MoviesCard;
