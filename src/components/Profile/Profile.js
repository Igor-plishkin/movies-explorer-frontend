import "./Profile.css";
import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../utils/useFormWithValidation";

function Profile({
  handleSignOut,
  handleUpdateUser,
  setIsFormSent,
  isFormSent,
  isSuccess,
  isError,
  setSuccess,
  setError,
}) {
  const { name, email } = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    name,
    email,
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setHasChanges(
      !(values.name === name) || (!(values.email === email) && isValid)
    );
  }, [values.name, values.email, name, email]);

  function handleSubmit(e) {
    e.preventDefault();
    setSuccess('');
    setError('');
    setIsFormSent(true);
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
              minLength="2"
              maxLength="40"
            />
            {errors.name ? (
              <span className="profile__error">{errors.name}</span>
            ) : null}
          </label>
          <div className="horizontal-line horizontal-line_grey horizontal-line_profile" />
          <label className="profile__label" htmlFor="email">
            E-mail
            <input
              className="profile__input"
              type="email"
              id="email"
              name="email"
              value={values.email}
              pattern="^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$"
              onChange={handleChange}
              required
              minLength="2"
              maxLength="40"
            />
            {errors.email ? (
              <span className="profile__error profile__error_email">
                {errors.email}
              </span>
            ) : null}
          </label>
        </div>
        {isSuccess ? (
          <span className="profile__notion profile__notion_success">
            Ваш профиль успешно обновился!
          </span>
        ) : null}
        {isError ? (
          <span className="profile__notion profile__notion_error">
            При обновлении профиля произошла ошибка.
          </span>
        ) : null}
        <button
          className="profile__edit-btn"
          type="submit"
          disabled={!hasChanges || !isValid || isFormSent}
        >
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
