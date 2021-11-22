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
import { Route, Routes, useNavigate } from "react-router-dom";
import getMovies from "../../utils/MoviesApi";
import React from "react";
import auth from "../../utils/auth";
import api from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

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
          navigate("/movies");
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

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUser(), getMovies()]).then((userData, moviesRes) => {
        setCurrentUser(userData.data);
        setMovies(moviesRes);
      });
    }
  }, [loggedIn]);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Header isLogged={loggedIn}/>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Main /> <Footer />
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                <Movies movies={movies} /> <Footer />
              </>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <>
                <SavedMovies /> <Footer />
              </>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/signup"
            element={<Register onRegistr={handleRegistr} />}
          />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
