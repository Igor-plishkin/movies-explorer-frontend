import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList"

function Movies() {
  return (
    <>
      <section className="section section_search">
        <SearchForm />
      </section>
      <section className="section section_movies">
        <MoviesCardList />
        <button className="movies__add-btn">Ещё</button>
      </section>
    </>
  );
}

export default Movies;