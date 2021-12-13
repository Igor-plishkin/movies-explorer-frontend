import "./NotFound.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="section not-found">
      <h3 className="not-found__title">404</h3>
      <p className="not-found__text">Страница не найдена</p>
      <Link className="not-found__link" to="/">Назад</Link>
    </section>
  );
}

export default NotFound;
