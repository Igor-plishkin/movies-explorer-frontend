import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />

      {true && (<div className="header__login">
        <Link className="header__singin" to="/sign-in">Регистрация</Link>
        <Link className="header__singup" to="/sign-up">Войти</Link>
      </div>)}
    </header>
  );
}

export default Header;
