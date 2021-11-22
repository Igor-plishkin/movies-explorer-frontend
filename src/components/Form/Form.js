import { Link } from "react-router-dom";
import "./Form.css";
import React from "react";

function Form({
  isRegistration,
  buttonText,
  linkText,
  linkTo,
  subText,
  onSubmit,
}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();

    isRegistration
      ? onSubmit(name, email, password)
      : onSubmit(email, password);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {isRegistration && (
        <div className="form__field">
          <label className="form__label" htmlFor="formName">
            Имя
          </label>
          <input
            className="form__input"
            type="text"
            required
            id="formName"
            onChange={handleNameChange}
            value={name}
          />
          <span className="form__error">Что-то пошло не так...</span>
        </div>
      )}
      <div className="form__field">
        <label className="form__label" htmlFor="formEmail">
          E-mail
        </label>
        <input
          className="form__input"
          type="email"
          required
          id="formEmail"
          onChange={handleEmailChange}
          value={email}
        />
        {/* Формы без валидации, класс _active добавлен для примера */}
        <span className="form__error form__error_active">
          Что-то пошло не так...
        </span>
      </div>
      <div
        className={`form__field ${
          isRegistration
            ? "form__field_last_registration"
            : "form__field_last_login"
        }`}
      >
        <label className="form__label" htmlFor="formPass">
          Пароль
        </label>
        <input
          className="form__input"
          type="password"
          required
          id="formPass"
          onChange={handlePasswordChange}
          value={password}
        />
        <span className="form__error form__error_active">
          Что-то пошло не так...
        </span>
      </div>
      <button className="form__button">{buttonText}</button>
      <p className="form__sub-text">
        {subText}
        <Link className="form__link" to={linkTo}>
          {linkText}
        </Link>
      </p>
    </form>
  );
}

export default Form;
