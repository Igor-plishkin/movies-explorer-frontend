import "./Footer.css";
import { useLocation } from "react-router-dom";

function Footer() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== "/signin" &&
      pathname !== "/signup" &&
      pathname !== "/profile" ? (
        <footer className="footer">
          <p className="footer__title">
            Учебный проект Яндекс.Практикум х BeatFilm.
          </p>
          <div className="horizontal-line horizontal-line_grey" />
          <div className="footer__wrapper">
            <span className="footer__copy">© 2021</span>
            <ul className="footer__list">
              <li className="footer__item">
                <a className="footer__link" href="https://practicum.yandex.ru/">
                  Яндекс.Практикум
                </a>
              </li>
              <li className="footer__item">
                <a
                  className="footer__link"
                  href="https://github.com/Igor-plishkin"
                >
                  Github
                </a>
              </li>
              <li className="footer__item">
                <a className="footer__link" href="https://vk.com/amazlngman">
                  vk
                </a>
              </li>
            </ul>
          </div>
        </footer>
      ) : null}
    </>
  );
}

export default Footer;
