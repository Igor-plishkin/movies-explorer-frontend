import "./MoviesCard.css";

function MoviesCard() {
  //Функциональность сохранения карточки будет реализована вместе с api, ниже только презентация на одном элементе
  function handleSaveClick() {
    const saveBtn = document.querySelector(".card__save");
    saveBtn.classList.toggle("card__save_active");
  }
  return (
    <article className="card">
      <div className="card__image"></div>
      <div className="card__footer">
        <p className="card__name">33 слова о дизайне</p>
        <button className="card__save" onClick={handleSaveClick}></button>
      </div>
      <span className="card__duration">1ч42м</span>
    </article>
  );
}

export default MoviesCard;
