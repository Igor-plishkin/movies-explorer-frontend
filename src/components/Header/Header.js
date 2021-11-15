import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import accountIcon from "../../images/account-icon.svg";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />

      {true ? (
        <div className="header__login">
          <Link className="header__link header__link_singin" to="/sign-in">
            Регистрация
          </Link>
          <Link className="header__link header__link_singup" to="/sign-up">
            Войти
          </Link>
        </div>
      ) : (
        <>
          <nav className="header__navigation">
            <Link className="header__link header__link_films" to="/movies">Фильмы</Link>
            <Link className="header__link header__link_saved-films" to="/saved-movies">Сохранённые фильмы</Link>
          </nav>
          <Link className="header__link header__link_account" to="/profile">
            Аккаунт
            <img
              className="header__account-icon"
              src={accountIcon}
              alt="аккаунт"
            />
          </Link>
        </>
      )}
    </header>
  );
}

export default Header;
