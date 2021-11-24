import "./Profile.css";

function Profile() {
  return (
    <section className="section profile">
      <h3 className="profile__title">Привет, Виталий!</h3>
      <form className="profile__form">
        <div className="profile__form-field">
          <label className="profile__label" htmlFor="profileName">
            Имя
            <input
              className="profile__input"
              type="text"
              value="Виталий"
              id="profileName"
            />
          </label>
          <div className="horizontal-line horizontal-line_grey horizontal-line_profile" />
          <label className="profile__label" htmlFor="profileEmail">
            E-mail
            <input
              className="profile__input"
              type="text"
              value="pochta@yandex.ru"
              id="profileEmail"
            />
          </label>
        </div>
        <button className="profile__edit-btn" type="submit">Редактировать</button>
        <button className="profile__sing-out" type="submit">Выйти из аккаунта</button>
      </form>
    </section>
  );
}

export default Profile;
