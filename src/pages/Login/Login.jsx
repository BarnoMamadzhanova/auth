import React from "react";
import classes from "./Login.module.css";
import { Hero } from "../../components/Hero/Hero";
import LoginForm from "../../components/LoginForm/LoginForm";

function Login() {
  return (
    <div className={classes.login}>
      <Hero />
      <LoginForm />
    </div>
  );
}

export default Login;
