import "./Profile.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../utils/useFormWithValidation";

function Profile({ handleSignOut, handleUpdateUser }) {
  const { name, email } = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    name,
    email,
  });

  function handleSubmit(e) {
    e.preventDefault();
    

    handleUpdateUser(values.name, values.email);
  }

  return (
    <section className="section profile">
      <h3 className="profile__title">{`Привет, ${name}!`}</h3>
      <form className="profile__form" onSubmit={handleSubmit}>
        <div className="profile__form-field">
          <label className="profile__label" htmlFor="name">
            Имя
            <input
              className="profile__input"
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              required
            />
          </label>
          <div className="horizontal-line horizontal-line_grey horizontal-line_profile" />
          <label className="profile__label" htmlFor="email">
            E-mail
            <input
              className="profile__input"
              type="text"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button className="profile__edit-btn" type="submit">
          Редактировать
        </button>
        <button
          className="profile__sing-out"
          type="button"
          onClick={handleSignOut}
        >
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
}

export default Profile;
