import { useFormik } from "formik";
import classes from "./LoginForm.module.css";
import React from "react";
// import visible from "../../assets/eye.svg";

function LoginForm() {
  const { values, handleBlur, handleChange } = useFormik({
    initialValues: {
      userLogin: "",
      password: "",
    },
  });

  return (
    <div className={classes.loginContainer}>
      <h3 className={classes.loginFormTitle}>Вэлком бэк!</h3>
      <form className={classes.loginForm} autoComplete="off">
        <input
          value={values.userLogin}
          onChange={handleChange}
          type="text"
          id="userLogin"
          placeholder="Введи логин"
          onBlur={handleBlur}
        />
        <input
          value={values.password}
          onChange={handleChange}
          type="password"
          id="password"
          placeholder="Введи пароль"
          onBlur={handleBlur}
        />
        <button type="submit">Войти</button>
      </form>
      <p className={classes.loginFormText}>У меня еще нет аккаунта</p>
    </div>
  );
}

export default LoginForm;
