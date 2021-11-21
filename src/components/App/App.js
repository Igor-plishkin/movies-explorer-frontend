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
import { Route, Routes } from "react-router-dom";
import getMovies from "../../utils/MainApi";
import React from "react";

function App() {
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    getMovies().then((res) => {
      console.log(res);
      setMovies(res);
    });
  }, []);

  return (
    <div className="App">
      <Header />
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
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
