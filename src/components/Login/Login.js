import "./Login.css";
import logo from "../../images/logo.svg";
import Form from "../Form/Form";

function Login() {
  return (
    <section className="section register">
      <img src={logo} alt="Логотип" className="header__logo" />
      <h3 className="register__title">Рады видеть!</h3>
      <Form
        isRegistration={false}
        buttonText="Войти"
        subText="Ещё не зарегистрированы?"
        linkTo="/sign-up"
        linkText="Регистрация"
      />
    </section>
  );
}

export default Login;
