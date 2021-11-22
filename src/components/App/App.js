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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const navigate = useNavigate();

  const [movies, setMovies] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

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
      Promise.all([api.getUser(), getMovies()])
        .then(([userData, moviesRes]) => {
          setCurrentUser(userData.data);
          setMovies(moviesRes);
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
              loggedIn ? <Movies movies={movies} /> : <Navigate to="/" />
            }
          />
          <Route
            path="/saved-movies"
            element={loggedIn ? <SavedMovies /> : <Navigate to="/" />}
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
