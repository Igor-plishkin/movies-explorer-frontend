import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import accountIcon from "../../images/account-icon.svg";
import "./Header.css";
import React, { useState } from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

function Header() {
  const [isOpenMenu, setOpenMenu] = useState(false);

    function handleOpenMenu(){
    setOpenMenu(true);
  }
  function handleCloseMenu(){
    setOpenMenu(false);
  }
  // заглушка
  const isLogged = true;
  const mobile = window.matchMedia("(max-width: 1023px)").matches;

  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />

      {!isLogged ? (
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
          {mobile ? (
            <>
              <button className={`header__burger-btn ${isOpenMenu && "header__burger-btn_active"}`} onClick={handleOpenMenu}></button>
            </>
          ) : (
            <>
              <nav className="header__navigation">
                <Link className="header__link header__link_films" to="/movies">
                  Фильмы
                </Link>
                <Link
                  className="header__link header__link_saved-films"
                  to="/saved-movies"
                >
                  Сохранённые фильмы
                </Link>
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
        </>
      )}
      <BurgerMenu isOpen={isOpenMenu} onClose={handleCloseMenu}/>
    </header>
  );
}

export default Header;
