import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import {
  desktopWidth,
  tabletWidth,
  mobileWidth,
  smallDesktopWidth,
} from "../../utils/constants";

function MoviesCardList({ movies, onSave, isSaved, savedMoviesId }) {
  const [renderMovies, setRenderMovies] = React.useState([]);
  const [windowSize, setWindowSize] = React.useState(window.innerWidth);

  function handlerChangeWidth() {
    return setTimeout(() => {
      setWindowSize(window.innerWidth);
    }, 500);
  }

  function moviesCount() {
    if (windowSize >= desktopWidth) return { count: 12, add: 4 };
    if (windowSize >= smallDesktopWidth) return { count: 9, add: 3 };
    if (windowSize >= tabletWidth) return { count: 8, add: 2 };
    if (windowSize >= mobileWidth) return { count: 5, add: 5 };
  }

  function handleMoviesAdd() {
    setRenderMovies(movies.slice(0, renderMovies.length + moviesCount().add));
  }

  React.useEffect(() => {
    movies && setRenderMovies(movies.slice(0, moviesCount().count));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies, windowSize]);

  React.useEffect(() => {
    window.addEventListener("resize", handlerChangeWidth);
  });

  return (
    <>
      <ul className="movies__list">
        {renderMovies.map((movie) => {
          return (
            <MoviesCard key={!isSaved ? movie.id : movie._id} movie={movie} handleSaveMovie={onSave} isSaved={isSaved} savedMoviesId={savedMoviesId}/>
          );
        })}
      </ul>
      {movies.length > renderMovies.length ? (
        <button className="movies__add-btn" onClick={handleMoviesAdd}>
          Ещё
        </button>
      ) : null}
    </>
  );
}

export default MoviesCardList;
