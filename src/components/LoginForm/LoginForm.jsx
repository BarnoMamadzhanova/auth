import { useFormik } from "formik";
import classes from "./LoginForm.module.css";
import React from "react";
import { loginSchema } from "../../schemas/login";
// import visible from "../../assets/eye.svg";

const onSubmit = () => {
  console.log("submitted");
};

function LoginForm() {
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  console.log(errors);

  return (
    <div className={classes.loginContainer}>
      <h3 className={classes.loginFormTitle}>Вэлком бэк!</h3>
      <form
        onSubmit={handleSubmit}
        className={classes.loginForm}
        autoComplete="off"
      >
        <input
          value={values.userLogin}
          onChange={handleChange}
          type="text"
          id="username"
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
