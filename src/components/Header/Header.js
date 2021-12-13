import { Link, useLocation } from "react-router-dom";
import accountIcon from "../../images/account-icon.svg";
import "./Header.css";
import React, { useState } from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

function Header({ isLogged }) {
  const { pathname } = useLocation();

  const [isOpenMenu, setOpenMenu] = useState(false);

  function handleOpenMenu() {
    setOpenMenu(true);
  }
  function handleCloseMenu() {
    setOpenMenu(false);
  }

  const mobile = window.matchMedia("(max-width: 1023px)").matches;

  return (
    <>
      {pathname !== "/signin" && pathname !== "/signup" ? (
        <header className="header">
          <Link className="header__logo" to="/" />

          {!isLogged ? (
            <div className="header__login">
              <Link className="header__link header__link_singin" to="/signup">
                Регистрация
              </Link>
              <Link className="header__link header__link_singup" to="/signin">
                Войти
              </Link>
            </div>
          ) : (
            <>
              {mobile ? (
                <>
                  <button
                    className={`header__burger-btn ${
                      isOpenMenu && "header__burger-btn_active"
                    }`}
                    onClick={handleOpenMenu}
                  ></button>
                </>
              ) : (
                <>
                  <nav className="header__navigation">
                    <Link
                      className="header__link header__link_films"
                      to="/movies"
                    >
                      Фильмы
                    </Link>
                    <Link
                      className="header__link header__link_saved-films"
                      to="/saved-movies"
                    >
                      Сохранённые фильмы
                    </Link>
                  </nav>
                  <Link
                    className="header__link header__link_account"
                    to="/profile"
                  >
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
          <BurgerMenu isOpen={isOpenMenu} onClose={handleCloseMenu} />
        </header>
      ) : null}
    </>
  );
}

export default Header;
