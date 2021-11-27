import "./App.css";
import {
  Route,
  Switch,
  useHistory,
  Redirect,
  useLocation,
} from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import getMovies from "../../utils/MoviesApi";
import React from "react";
import auth from "../../utils/auth";
import api from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import searchMovies from "../../utils/searchMovie";
import { shortDuration } from "../../utils/constants";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const history = useHistory();
  const { pathname } = useLocation();

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
  const [isFormSent, setIsFormSent] = React.useState(false);
  const [isRegisterError, setIsRegisterError] = React.useState("");
  const [isLoginError, setIsLoginError] = React.useState("");
  const [isProfileUpdateError, setIsProfileUpdateError] = React.useState("");
  const [isUpdateSuccessful, setIsUpdateSuccessful] = React.useState(false);

  const tokenCheck = React.useCallback(() => {
      auth
        .getToken()
        .then((res) => {
          setLoggedIn(true);
          history.push(pathname);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [history]);

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

  React.useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  React.useEffect(() => {
    setIsUpdateSuccessful(false);
  }, [pathname]);

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
        setSavedMovies(
          savedMovies.filter((film) => film._id !== deleted.data._id)
        );
        setSavedMoviesId(
          savedMoviesId.filter((id) => id !== deleted.data.movieId)
        );
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
        setIsUpdateSuccessful(true);
      })
      .catch((err) => {
        console.log(err);
        setIsProfileUpdateError(err);
      })
      .finally(() => {
        setIsFormSent(false);
      });
  }

  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        setLoggedIn(true);
        history.push("/movies");
      })
      .catch((err) => {
        console.log(err);
        setIsLoginError(err);
      })
      .finally(() => {
        setIsFormSent(false);
      });
  }

  function handleRegistr(name, email, password) {
    auth
      .registration(name, email, password)
      .then((res) => {
        handleLogin(email, password);
      })
      .catch((err) => {
        console.log(err);
        setIsRegisterError(err);
      })
      .finally(() => {
        setIsFormSent(false);
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
        history.push("/");
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log(err.massage);
        }
      });
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Header isLogged={loggedIn} />
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <ProtectedRoute
            exact
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
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
          ></ProtectedRoute>
          <ProtectedRoute
            path="/saved-movies"
            exact
            loggedIn={loggedIn}
            component={SavedMovies}
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
          ></ProtectedRoute>
          <ProtectedRoute
            path="/profile"
            exact
            loggedIn={loggedIn}
            component={Profile}
            handleSignOut={handleSignOut}
            handleUpdateUser={handleUpdateUser}
            isFormSent={isFormSent}
            setIsFormSent={setIsFormSent}
            isError={isProfileUpdateError}
            setError={setIsProfileUpdateError}
            isSuccess={isUpdateSuccessful}
            setSuccess={setIsUpdateSuccessful}
          ></ProtectedRoute>
          <Route path="/signup" exact>
            {!loggedIn ? (
              <Register
                onRegistr={handleRegistr}
                isFormSent={isFormSent}
                setIsFormSent={setIsFormSent}
                isError={isRegisterError}
                setError={setIsRegisterError}
              />
            ) : (
              <Redirect to="/movies" />
            )}
          </Route>
          <Route path="/signin" exact>
            {!loggedIn ? (
              <Login
                onLogin={handleLogin}
                isFormSent={isFormSent}
                setIsFormSent={setIsFormSent}
                isError={isLoginError}
                setError={setIsLoginError}
              />
            ) : (
              <Redirect to="/movies" />
            )}
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
