import React from "react";
import Form from "../Form/Form";
import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import { useFormWithValidation } from "../../utils/useFormWithValidation";

function Register({ onRegistr, setIsFormSent, isFormSent, isError, setError }) {
  const history = useHistory();

  const { values, handleChange, errors, isValid } = useFormWithValidation({
    email: "",
    password: "",
    name: "",
  });

  React.useEffect(() => {
    setError(false);
  }, [history]);

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password, name } = values;
    setIsFormSent(true);
    onRegistr(name, email, password);
  }

  return (
    <section className="section register">
      <Link className="header__logo" to="/" />
      <h3 className="register__title">Добро пожаловать!</h3>
      <Form
        isRegistration={true}
        buttonText="Зарегистрироваться"
        subText="Уже зарегистрированы?"
        linkTo="/signin"
        linkText="Войти"
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

export default Register;
