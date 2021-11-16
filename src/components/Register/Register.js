import Form from "../Form/Form";
import "./Register.css";
import { Link } from "react-router-dom";

function Register() {
  return (
    <section className="section register">
      <Link className="header__logo" to="/"/>
      <h3 className="register__title">Добро пожаловать!</h3>
      <Form
        isRegistration={true}
        buttonText="Зарегистрироваться"
        subText="Уже зарегистрированы?"
        linkTo="/signin"
        linkText="Войти"
      />
    </section>
  );
}

export default Register;
