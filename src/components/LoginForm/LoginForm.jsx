import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas/login";
import classes from "./LoginForm.module.css";
import invisible from "../../assets/eye.svg";
import visible from "../../assets/invisible.svg";

const onSubmit = () => {
  console.log("submitted");
};

function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formError, setFormError] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    formik;

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await formik.validateForm();

    if (Object.keys(formik.errors).length > 0) {
      setFormError("Неверный логин или пароль");
    } else {
      setFormError("");
      handleSubmit();
    }
  };

  return (
    <div className={classes.loginContainer}>
      <h3 className={classes.loginFormTitle}>Вэлком бэк!</h3>
      {formError && <div className={classes.formErrorMessage}>{formError}</div>}
      <form
        onSubmit={handleFormSubmit}
        className={classes.loginForm}
        autoComplete="off"
      >
        <div
          className={`${classes.inputContainer} ${
            errors.username && touched.username ? classes.error : ""
          }`}
        >
          <input
            value={values.username}
            onChange={handleChange}
            type="text"
            id="username"
            placeholder="Введи логин"
            onBlur={handleBlur}
          />
        </div>

        <div
          className={`${classes.inputContainer} ${
            errors.password && touched.password ? classes.error : ""
          }`}
        >
          <input
            value={values.password}
            onChange={handleChange}
            type={passwordVisible ? "text" : "password"}
            id="password"
            placeholder="Введи пароль"
            onBlur={handleBlur}
          />
          <img
            src={passwordVisible ? visible : invisible}
            alt="Toggle visibility"
            className={classes.passwordToggleIcon}
            onClick={togglePasswordVisibility}
          />
        </div>

        <button type="submit" onSubmit={handleFormSubmit}>
          Войти
        </button>
      </form>
      <Link to="/registration" className={classes.loginFormText}>
        У меня еще нет аккаунта
      </Link>
    </div>
  );
}

export default LoginForm;
