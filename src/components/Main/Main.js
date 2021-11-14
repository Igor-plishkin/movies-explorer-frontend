import "./Main.css";
import { Link } from "react-router-dom";
import studentPhoto from "../../images/student.jpg";

function Main() {
  return (
    <>
      <section className="promo section">
        <div className="promo__container">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <nav className="promo__nav">
            <Link className="promo__link" to="#">
              О проекте
            </Link>
            <Link className="promo__link" to="#">
              Технологии
            </Link>
            <Link className="promo__link" to="#">
              Студент
            </Link>
          </nav>
        </div>
      </section>
      <section className="project section">
        <h2 className="section-title section-title_project">О проекте</h2>
        <div className="horizontal-line" />
        <div className="project__content">
          <p className="project__main-text">
            Дипломный проект включал 5 этапов
          </p>
          <p className="project__main-text">
            На выполнение диплома ушло 5 недель
          </p>
          <p className="project__sub-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
          <p className="project__sub-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
        <div className="project__timeline">
          <div className="project__time project__time_one-week">1 неделя</div>
          <div className="project__time project__time_four-weeks">4 недели</div>
          <span className="project__sub-time">Back-end</span>
          <span className="project__sub-time">Front-end</span>
        </div>
      </section>
      <section className="techs section">
        <h2 className="section-title section-title_techs">Технологии</h2>
        <div className="horizontal-line" />
        <div className="techs__content">
          <p className="techs__title-text">7 технологий</p>
          <p className="techs__text">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
          <ul className="techs__list">
            <li className="techs__list-item">HTML</li>
            <li className="techs__list-item">CSS</li>
            <li className="techs__list-item">JS</li>
            <li className="techs__list-item">React</li>
            <li className="techs__list-item">Git</li>
            <li className="techs__list-item">Express.js</li>
            <li className="techs__list-item">mongoDB</li>
          </ul>
        </div>
      </section>
      <section className="student section">
        <h2 className="section-title section-title_student">Студент</h2>
        <div className="horizontal-line" />
        <div className="student__wrapper">
          <div className="student__content">
            <p className="student__name">Виталий</p>
            <p className="student__position">Фронтенд-разработчик, 30 лет</p>
            <p className="student__description">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <Link className="student__link" to="#">
              Facebook
            </Link>
            <Link className="student__link" to="#">
              Github
            </Link>
          </div>
          <img
            src={studentPhoto}
            alt="Фото студента"
            className="student__image"
          />
        </div>
      </section>
      <section className="portfolio section">
        <h2 className="section-title section-title_portfolio">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <p className="portfolio__name">Статичный сайт</p>
            <Link className="portfolio__link" to="#">
            </Link>
          </li>
          <div className="horizontal-line horizontal-line_grey horizontal-line_portfolio" />
          <li className="portfolio__item">
            <p className="portfolio__name">Адаптивный сайт</p>
            <Link className="portfolio__link" to="#">
            </Link>
          </li>
          <div className="horizontal-line horizontal-line_grey horizontal-line_portfolio" />
          <li className="portfolio__item">
            <p className="portfolio__name">Одностраничное приложение</p>
            <Link className="portfolio__link" to="#">
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}

export default Main;
