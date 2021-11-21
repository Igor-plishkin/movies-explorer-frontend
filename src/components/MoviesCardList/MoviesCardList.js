import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies }) {
  return (
    <ul className="movies__list">
      {!movies ? (
        <div>has no movies</div>
      ) : (
        movies.map((movie) => {
          return <MoviesCard key={movie.id} movie={movie}/>;
        })
      )}
    </ul>
  );
}

export default MoviesCardList;
