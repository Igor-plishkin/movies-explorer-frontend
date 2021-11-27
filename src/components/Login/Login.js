import React from "react";
import "./Login.css";
import Form from "../Form/Form";
import { Link, useHistory } from "react-router-dom";
import { useFormWithValidation } from "../../utils/useFormWithValidation";
function Login({ onLogin, setIsFormSent, isFormSent, isError, setError }) {
  const history = useHistory();


  const { values, handleChange, errors, isValid } = useFormWithValidation({
    email: "",
    password: "",
  });

  React.useEffect(() => {
    setError(false);
  }, [history]);

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = values;
    setIsFormSent(true);
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
        isFormSent={isFormSent}
        isValid={isValid}
        isError={isError}
      />
    </section>
  );
}

export default Login;
