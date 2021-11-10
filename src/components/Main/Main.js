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
        <h2 className="about__title">О проекте</h2>
        <hr className="horizontal-line"/>
        <div className="about__content">
          <p className="about__main-text">Дипломный проект включал 5 этапов</p>
          <p className="about__main-text">На выполнение диплома ушло 5 недель</p>
          <p className="about__sub-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          <p className="about__sub-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
        <div className="about__timeline">
          <div className="about__time about__time_one-week">1 неделя</div>
          <div className="about__time about__time_four-weeks">4 недели</div>
          <span className="about__sub-time">Back-end</span>
          <span className="about__sub-time">Front-end</span>
        </div>
      </section>
    </>
  );
}

export default Main;
