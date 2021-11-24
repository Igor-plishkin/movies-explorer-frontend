import { Link } from "react-router-dom";
import "./Form.css";

function Form({ isRegistration, buttonText, linkText, linkTo, subText }) {
  return (
    <form className="form">
      {isRegistration && (
        <div className="form__field">
          <label className="form__label" htmlFor="formName">Имя</label>
          <input className="form__input" type="text" required id="formName"/>
          <span className="form__error">Что-то пошло не так...</span>
        </div>
      )}
      <div className="form__field">
        <label className="form__label" htmlFor="formEmail">E-mail</label>
        <input className="form__input" type="email" required id="formEmail"/>
        {/* Формы без валидации, класс _active добавлен для примера */}
        <span className="form__error form__error_active">Что-то пошло не так...</span>
      </div>
      <div className={`form__field ${isRegistration ? "form__field_last_registration" : "form__field_last_login"}`}>
        <label className="form__label" htmlFor="formPass">Пароль</label>
        <input className="form__input" type="password" required id="formPass"/>
        <span className="form__error form__error_active">Что-то пошло не так...</span>
      </div>
      <button className="form__button">{buttonText}</button>
      <p className="form__sub-text">{subText}<Link className="form__link" to={linkTo}>{linkText}</Link></p>
    </form>
  );
}

export default Form;
