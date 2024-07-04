import React from "react";
import classes from "./Registration.module.css";
import { Hero } from "../../components/Hero/Hero";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

function Registration() {
  return (
    <div className={classes.registration}>
      <Hero />
      <RegisterForm />
    </div>
  );
}

export default Registration;
