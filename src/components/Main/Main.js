import "./Main.css";
import { Link } from "react-router-dom";

function Main() {
  return (
    <>
      <section className="promo">
        <div className="promo__container">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <nav className="promo__nav">
            <Link className="promo__link" to="#">О проекте</Link>
            <Link className="promo__link" to="#">Технологии</Link>
            <Link className="promo__link" to="#">Студент</Link>
          </nav>
        </div>
      </section>
      <section className="about">

      </section>
    </>
  );
}

export default Main;
