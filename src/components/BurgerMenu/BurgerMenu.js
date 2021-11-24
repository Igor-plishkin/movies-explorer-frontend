import { Link } from "react-router-dom";
import "./BurgerMenu.css";
import accountIcon from "../../images/account-icon.svg";

function BurgerMenu({ isOpen, onClose }) {
  return (
    <nav className={`menu ${isOpen && "menu_opened"}`}>
      <div className="menu__container">
        <button className="menu__close-btn" onClick={onClose}></button>
        <ul className="menu__list">
          <li className="menu__item">
            <Link className="menu__link" to="/">
              Главная
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to="/movies">
              Фильмы
            </Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to="/saved-movies">
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <Link className="menu__link menu__link_account" to="/profile">
          Аккаунт
          <img className="menu__account-icon" src={accountIcon} alt="аккаунт" />
        </Link>
      </div>
    </nav>
  );
}

export default BurgerMenu;
