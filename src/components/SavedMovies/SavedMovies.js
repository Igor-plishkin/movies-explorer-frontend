import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ savedMovies, onSearch, onChangeDuration, isSaved, onDelete }) {
  return (
    <>
      <section className="section section_search">
        <SearchForm
          handleSubmit={onSearch}
          onChangeDuration={onChangeDuration}
        />
      </section>
      <section className="section section_movies">
        {savedMovies === "NotFound" ? (
          <p className="movies__not-found">Фильмы не найдены</p>
        ) : (
          <MoviesCardList movies={savedMovies} isSaved={isSaved} onDelete={onDelete}/>
        )}
      </section>
    </>
  );
}

export default SavedMovies;
