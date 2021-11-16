import "./Login.css";
import Form from "../Form/Form";
import { Link } from "react-router-dom";

function Login() {
  return (
    <section className="section register">
      <Link className="header__logo" to="/" />
      <h3 className="register__title">Рады видеть!</h3>
      <Form
        isRegistration={false}
        buttonText="Войти"
        subText="Ещё не зарегистрированы?"
        linkTo="/signup"
        linkText="Регистрация"
      />
    </section>
  );
}

export default Login;
