import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { registerSchema } from "../../schemas/register";
import classes from "./RegisterForm.module.css";
import invisible from "../../assets/eye.svg";
import visible from "../../assets/invisible.svg";
import back from "../../assets/backArrow.svg";
import done from "../../assets/done.svg";
import wrong from "../../assets/wrong.svg";

const onSubmit = (values, actions) => {
  console.log("submitted");
  console.log(values);
  console.log(actions);
  actions.resetForm();
};

function RegisterForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: registerSchema,
      onSubmit,
      validateOnChange: false,
      validateOnBlur: false,
    });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const passwordValidation = {
    length: values.password.length >= 8 && values.password.length <= 15,
    letters: /(?=.*[a-z])(?=.*[A-Z])/.test(values.password),
    number: /(?=.*\d)/.test(values.password),
    specialChar: /(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/.test(values.password),
  };

  const allValid =
    passwordValidation.length &&
    passwordValidation.letters &&
    passwordValidation.number &&
    passwordValidation.specialChar;

  return (
    <>
      <Link to="/" className={classes.backLink}>
        <img src={back} alt="back" />
        Назад
      </Link>
      <div className={classes.registerContainer}>
        <h3 className={classes.registerFormTitle}>Создать аккаунт Lorby</h3>
        <form
          onSubmit={handleSubmit}
          className={classes.registerForm}
          autoComplete="off"
        >
          <div
            className={`${classes.inputContainer} ${
              errors.email && touched.email ? classes.error : ""
            }`}
          >
            <input
              value={values.email}
              onChange={handleChange}
              type="email"
              id="email"
              placeholder="Введи адрес почты"
              onBlur={handleBlur}
              className={
                errors.email && touched.email ? classes.inputError : ""
              }
            />
          </div>
          {errors.email && touched.email && (
            <div className={classes.errorMessage}>{errors.email}</div>
          )}

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
              placeholder="Придумай логин"
              onBlur={handleBlur}
              className={
                errors.username && touched.username ? classes.inputError : ""
              }
            />
          </div>
          {errors.username && touched.username && (
            <div className={classes.errorMessage}>{errors.username}</div>
          )}

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
              placeholder="Создай пароль"
              onBlur={handleBlur}
              className={
                errors.password && touched.password ? classes.inputError : ""
              }
            />
            <img
              src={passwordVisible ? visible : invisible}
              alt="Toggle visibility"
              className={classes.passwordToggleIcon}
              onClick={togglePasswordVisibility}
            />
          </div>
          {errors.password && touched.password && (
            <div className={classes.errorMessage}>{errors.password}</div>
          )}

          <ul className={classes.validation}>
            <li className={allValid ? classes.valid : classes.invalid}>
              {allValid ? (
                <img src={done} alt="done" />
              ) : (
                <img src={wrong} alt="wrong" />
              )}
            </li>
          </ul>

          <div
            className={`${classes.inputContainer} ${
              errors.confirmPassword && touched.confirmPassword
                ? classes.error
                : ""
            }`}
          >
            <input
              value={values.confirmPassword}
              onChange={handleChange}
              type={passwordVisible ? "text" : "password"}
              id="confirmPassword"
              placeholder="Повтори пароль"
              onBlur={handleBlur}
              className={
                errors.confirmPassword && touched.confirmPassword
                  ? classes.inputError
                  : ""
              }
            />
            <img
              src={passwordVisible ? visible : invisible}
              alt="Toggle visibility"
              className={classes.passwordToggleIcon}
              onClick={togglePasswordVisibility}
            />
          </div>
          {errors.confirmPassword && touched.confirmPassword && (
            <div className={classes.errorMessage}>{errors.confirmPassword}</div>
          )}

          <button type="submit" disabled={!allValid} onSubmit={handleSubmit}>
            Далее
          </button>
        </form>
      </div>
    </>
  );
}

export default RegisterForm;
