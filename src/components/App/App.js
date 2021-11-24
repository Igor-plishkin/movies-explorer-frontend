import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import getMovies from "../../utils/MoviesApi";
import React from "react";
import auth from "../../utils/auth";
import api from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import searchMovies from "../../utils/searchMovie";
import { shortDuration } from "../../utils/constants";

function App() {
  const navigate = useNavigate();

  const [movies, setMovies] = React.useState(
    localStorage.getItem("foundMovies")
      ? JSON.parse(localStorage.getItem("foundMovies"))
      : []
  );
  const [savedMovies, setSavedMovies] = React.useState([]);

  const [isSearchLoading, setSearchLoading] = React.useState(false);
  const [isShortSerched, setShortSearched] = React.useState(false);
  const [isSavedShortSerched, setSavedShortSearched] = React.useState(false);
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [isSearchError, setIsSearchError] = React.useState(false);
  const [savedKeyWord, setSavedKeyWord] = React.useState("");
  const [isOnlyCheckedSearch, setIsOnlyCheckedSearch] = React.useState(false);
  const [foundSavedMovies, setFoundSavedMovies] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedMoviesId, setSavedMoviesId] = React.useState([]);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth
        .getToken(jwt)
        .then((res) => {
          setLoggedIn(true);
        })
        .catch((err) => {
          if (err.status === 400) {
            console.log("400 — Токен не передан или передан не в том формате");
          } else if (err.status === 401) {
            console.log("401 — Переданный токен некорректен");
          }
        });
    }
  }, [navigate]);

  React.useEffect(() => {
    setIsNotFound(false);
  }, [loggedIn]);

  React.useEffect(() => {
    if (localStorage.getItem("foundMovies")) {
      handleShortSearch();
    }
  }, [isShortSerched]);

  React.useEffect(() => {
    if (savedKeyWord) {
      handleSearchSavedMovies(savedKeyWord);
    }
  }, [savedMovies]);

  React.useEffect(() => {
    if (savedMovies.length || foundSavedMovies.length) {
      handleSearchSavedMovies(savedKeyWord);
    }
  }, [isSavedShortSerched]);

  function handleSearchSavedMovies(value) {
    setIsOnlyCheckedSearch(false);
    if (!value) {
      setIsOnlyCheckedSearch(true);
    }
    setSavedKeyWord(value);

    const movies = searchMovies(savedMovies, value, isSavedShortSerched);
    setFoundSavedMovies(movies);
  }

  async function handleSearchMovies(value) {
    setSearchLoading(true);
    setIsNotFound(false);
    setIsSearchError(false);

    try {
      let movies = JSON.parse(localStorage.getItem("movies"));

      if (!movies) {
        const films = await getMovies();
        localStorage.setItem("movies", JSON.stringify(films));
        movies = JSON.parse(localStorage.getItem("movies"));
      }
      const foundMovies = searchMovies(movies, value);
      localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
      handleShortSearch();
    } catch (err) {
      console.log(err);
      setIsSearchError(true);
    } finally {
      setSearchLoading(false);
    }
  }

  function handleShortSearch() {
    const foundMovies = JSON.parse(localStorage.getItem("foundMovies"));

    const shortMovies = foundMovies.filter((movie) => {
      if (isShortSerched) {
        if (movie.duration < shortDuration) {
          return true;
        }
      } else if (movie.duration >= shortDuration) {
        return true;
      }
    });

    setMovies(shortMovies);
    setIsNotFound(!shortMovies.length);
  }

  function handleSaveMovie(movie) {
    api
      .saveMovie(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, res.data]);
        setSavedMoviesId([...savedMoviesId, movie.id]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteMovie(movie) {
    let movieId = savedMovies.filter(
      (f) => f.movieId === movie.id || f.data?.movieId === movie.id
    )[0];
    if (movieId) {
      movieId = movieId._id || movieId._id;
    }
    api
    .deleteMovie(movie.owner ? movie._id : movieId)
    .then((deleted) => {
      setSavedMovies(savedMovies.filter((film) => film._id !== deleted.data._id));
      setSavedMoviesId(savedMoviesId.filter((id) => id !== deleted.data.movieId));
    })
    .catch((err) => {
      console.error(err);
    });
  }

  function handleUpdateUser(name, email) {
    api
      .updateUser(name, email)
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - не передано одно из полей");
        } else if (err.status === 401) {
          console.log("401 - пользователь с email не найден");
        }
      });
  }

  function handleRegistr(name, email, password) {
    auth
      .registration(name, email, password)
      .then((res) => {
        navigate("/signin");
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - некорректно заполнено одно из полей");
        }
      });
  }
  function handleSignOut() {
    auth
      .signOut()
      .then((res) => {
        setCurrentUser({});
        setLoggedIn(false);
        localStorage.removeItem("jwt");
        localStorage.removeItem("foundMovies");
        localStorage.removeItem("movies");
        setMovies([]);
        navigate("/signin");
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log(err.massage);
        }
      });
  }

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUser(), api.getSavedMovies()])
        .then(([userData, savedMoviesRes]) => {
          setCurrentUser(userData.data);
          setSavedMovies(savedMoviesRes.data);
          setSavedMoviesId(savedMoviesRes.data.map((movie) => movie.movieId));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Header isLogged={loggedIn} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Main />
              </>
            }
          />
          {/* Защищенные авторизацией роуты react-router-dom V6 */}
          <Route
            path="/movies"
            element={
              loggedIn ? (
                <Movies
                  movies={movies}
                  onSave={handleSaveMovie}
                  onDelete={handleDeleteMovie}
                  onSearch={handleSearchMovies}
                  onChangeDuration={setShortSearched}
                  isLoading={isSearchLoading}
                  isSaved={false}
                  isError={isSearchError}
                  isNotFound={isNotFound}
                  savedMoviesId={savedMoviesId}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/saved-movies"
            element={
              loggedIn ? (
                <SavedMovies
                  isSaved={true}
                  onSearch={handleSearchSavedMovies}
                  onDelete={handleDeleteMovie}
                  onChangeDuration={setSavedShortSearched}
                  savedMovies={
                    savedKeyWord || isOnlyCheckedSearch
                      ? foundSavedMovies?.length
                        ? foundSavedMovies
                        : "NotFound"
                      : savedMovies
                  }
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              loggedIn ? (
                <Profile
                  handleSignOut={handleSignOut}
                  handleUpdateUser={handleUpdateUser}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          {/* <ProtectedRoute path="/movies" movies={movies} component={Movies} loggedIn={loggedIn}/>
          <ProtectedRoute path="/saved-movies" component={SavedMovies} loggedIn={loggedIn}/>
          <ProtectedRoute path="/profile" component={Profile} loggedIn={loggedIn}/> */}
          <Route
            path="/signup"
            element={<Register onRegistr={handleRegistr} />}
          />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
