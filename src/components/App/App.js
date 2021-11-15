import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Main /> */}
      {/* <Movies /> */}
      {/* <SavedMovies /> */}
      <Profile />
      <Footer />
    </div>
  );
}

export default App;
