import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList"

function SavedMovies() {
  return (
    <>
      <section className="section section_search">
        <SearchForm />
      </section>
      <section className="section section_movies">
        <MoviesCardList />
      </section>
    </>
  );
}

export default SavedMovies;