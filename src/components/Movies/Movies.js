import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList"

function Movies({movies}) {
  return (
    <>
      <section className="section section_search">
        <SearchForm />
      </section>
      <section className="section section_movies">
      <div className="horizontal-line horizontal-line_grey horizontal-line_movies" />
        <MoviesCardList movies={movies}/>
      </section>
    </>
  );
}

export default Movies;