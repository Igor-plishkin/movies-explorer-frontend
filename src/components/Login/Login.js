import "./Login.css";
import Form from "../Form/Form";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../../utils/useFormWithValidation";
function Login({onLogin}) {
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    email: "",
    password: "",
  });
  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = values;
    onLogin(email, password);
  }
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
        onSubmit={handleSubmit}
        values={values}
        errors={errors}
        handleChange={handleChange}
        isValid={isValid}
      />
    </section>
  );
}

export default Login;
