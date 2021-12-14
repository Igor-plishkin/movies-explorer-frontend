import "./Main.css";
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
            <a className="promo__link" href="#project">
              О проекте
            </a>
            <a className="promo__link" href="#techs" hrefLang="#techs">
              Технологии
            </a>
            <a className="promo__link" href="#student">
              Студент
            </a>
          </nav>
        </div>
      </section>
      <section className="project section" id="project">
        <h2 className="section-title section-title_project">О проекте</h2>
        <div className="horizontal-line" />
        <div className="project__content">
          <p className="project__main-text">
            Дипломный проект включал 5 этапов
          </p>

          <p className="project__sub-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
          <p className="project__main-text">
            На выполнение диплома ушло 5 недель
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
      <section className="techs section" id="techs">
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
      <section className="student section" id="student">
        <h2 className="section-title section-title_student">Студент</h2>
        <div className="horizontal-line" />
        <div className="student__wrapper">
          <div className="student__content">
            <p className="student__name">Игорь</p>
            <p className="student__position">Фронтенд-разработчик, 23 года</p>
            <p className="student__description">
              Я родился и живу в Тюмени, закончил ТИУ по профессии приборостроение в 2020 году. Сразу после университета устроился по специальности в ООО НПП "Симплекс". С марта 2021 работаю на должности инженера - руководителя камеральной группы. Во время учебы изучал C/C++ для программирования микроконтроллеров и приборов, и загорелся идей стать разработчиком. С января 2021 года учился на курсе веб-разработчика Яндекс.Практикум. Профессия меня поглотила, стараюсь достичь больших успехов в этой области. В свободное время люблю изучать новое: читать книги, изучать языки, на очереди Немецкий. Занимаюсь баскетболом больше 8 лет, это моя страсть.
            </p>
            <a className="student__link" href="https://t.me/Plisha_jr">
              telegram
            </a>
            <a
              className="student__link"
              href="https://github.com/Igor-plishkin"
            >
              Github
            </a>
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
            <a
              className="portfolio__link"
              href="https://igor-plishkin.github.io/how-to-learn/"
            ></a>
          </li>
          <div className="horizontal-line horizontal-line_grey horizontal-line_portfolio" />
          <li className="portfolio__item">
            <p className="portfolio__name">Адаптивный сайт</p>
            <a
              className="portfolio__link"
              href="https://igor-plishkin.github.io/russian-travel/"
            ></a>
          </li>
          <div className="horizontal-line horizontal-line_grey horizontal-line_portfolio" />
          <li className="portfolio__item">
            <p className="portfolio__name">Одностраничное приложение</p>
            <a
              className="portfolio__link"
              href="https://plisha-jr.nomoredomains.rocks/"
            ></a>
          </li>
        </ul>
      </section>
    </>
  );
}

export default Main;
