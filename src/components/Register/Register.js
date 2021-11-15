import Form from "../Form/Form";
import "./Register.css";
import logo from "../../images/logo.svg";

function Register() {
  return (
    <section className="section register">
      <img src={logo} alt="Логотип" className="header__logo" />
      <h3 className="register__title">Добро пожаловать!</h3>
      <Form
        isRegistration={true}
        buttonText="Зарегистрироваться"
        subText="Уже зарегистрированы?"
        linkTo="/sign-in"
        linkText="Войти"
      />
    </section>
  );
}

export default Register;
