import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="horizontal-line horizontal-line_grey" />
      <div className="footer__wrapper">
        <span className="footer__copy">© 2021</span>
        <ul className="footer__list">
          <li className="footer__item"><Link className="footer__link" to="#">Яндекс.Практикум</Link></li>
          <li className="footer__item"><Link className="footer__link" to="#">Github</Link></li>
          <li className="footer__item"><Link className="footer__link" to="#">Facebook</Link></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
