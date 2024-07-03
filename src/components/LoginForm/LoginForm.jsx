import classes from "./LoginForm.module.css";
import React from "react";

function LoginForm() {
  return (
    <div className={classes.loginContainer}>
      <h3 className={classes.loginFormTitle}>Вэлком бэк!</h3>
      <form className={classes.loginForm} autoComplete="off">
        <input type="text" id="userLogin" placeholder="Введи логин" />
        <input type="password" id="password" placeholder="Введи пароль" />
        <button type="submit">Войти</button>
      </form>
      <p className={classes.loginFormText}>У меня еще нет аккаунта</p>
    </div>
  );
}

export default LoginForm;
