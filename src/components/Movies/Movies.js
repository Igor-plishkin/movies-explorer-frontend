import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies({
  movies,
  onSave,
  onSearch,
  onChangeDuration,
  isLoading,
  isError,
  isNotFound,
  isSaved,
  savedMoviesId,
  onDelete
}) {
  return (
    <>
      <section className="section section_search">
        <SearchForm
          handleSubmit={onSearch}
          onChangeDuration={onChangeDuration}
        />
      </section>
      <section className="section section_movies">
        <div className="horizontal-line horizontal-line_grey horizontal-line_movies" />
        {isLoading ? <Preloader /> : null}
        {isNotFound ? (
          <p className="movies__not-found">Фильмы не найдены</p>
        ) : null}
        {isError ? (
          <p className="movies__error">
            Во время запроса произошла ошибка. Возможно, проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте ещё раз
          </p>
        ) : null}

        <MoviesCardList movies={movies} onSave={onSave} isSaved={isSaved} savedMoviesId={savedMoviesId} onDelete={onDelete}/>
      </section>
    </>
  );
}

export default Movies;
