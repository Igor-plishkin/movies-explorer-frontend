import { Link } from "react-router-dom";
import "./Form.css";

function Form({
  isRegistration,
  buttonText,
  linkText,
  linkTo,
  subText,
  onSubmit,
  handleChange,
  values,
  errors,
  isValid
}) {
  return (
    <form className="form" onSubmit={onSubmit}>
      {isRegistration && (
        <div className="form__field">
          <label className="form__label" htmlFor="formName">
            Имя
          </label>
          <input
            className="form__input"
            type="text"
            required
            minLength="2"
            id="formName"
            name="name"
            onChange={handleChange}
            value={values.name}
          />
          {errors.name ? (
            <span className="form__error">{errors.name}</span>
          ) : null}
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
          name="email"
          id="formEmail"
          onChange={handleChange}
          value={values.email}
        />
        {errors.email ? (
          <span className="form__error">{errors.email}</span>
        ) : null}
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
          name="password"
          onChange={handleChange}
          value={values.password}
          minLength="8"
        />
        {errors.password ? (
          <span className="form__error">{errors.password}</span>
        ) : null}
      </div>
      <button className="form__button" disabled={!isValid}>{buttonText}</button>
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
