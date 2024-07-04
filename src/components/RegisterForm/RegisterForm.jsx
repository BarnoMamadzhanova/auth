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

const onSubmit = () => {
  console.log("submitted");
};

function RegisterForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { values, errors, touched, handleBlur, handleChange } = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      setSubmitted(true);
      onSubmit(values);
    },
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
    specialChar: /(?=.*[@$!%*?&#])/.test(values.password),
  };

  const allValid = Object.values(passwordValidation).every(Boolean);

  return (
    <>
      <Link to="/" className={classes.backLink}>
        <img src={back} alt="back" />
        Назад
      </Link>
      <div className={classes.registerContainer}>
        <h3 className={classes.registerFormTitle}>Создать аккаунт Lorby</h3>
        <form
          onSubmit={onSubmit}
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
            {errors.username && touched.username && (
              <div className={classes.errorMessage}>{errors.username}</div>
            )}
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

          <ul
            className={`${classes.validation} ${
              passwordValidation.length &&
              passwordValidation.letters &&
              passwordValidation.number &&
              passwordValidation.specialChar
                ? classes.valid
                : submitted &&
                  !passwordValidation.length &&
                  !passwordValidation.letters &&
                  !passwordValidation.number &&
                  !passwordValidation.specialChar
                ? classes.invalid
                : ""
            }`}
          >
            <li
            //   className={
            //     passwordValidation.length
            //       ? classes.valid
            //       : submitted && !passwordValidation.length
            //       ? classes.invalid
            //       : ""
            //   }
            >
              {passwordValidation.length ? (
                <img src={done} alt="done" />
              ) : submitted ? (
                <img src={wrong} alt="wrong" />
              ) : null}
            </li>
            <li
            //   className={
            //     passwordValidation.letters
            //       ? classes.valid
            //       : submitted && !passwordValidation.letters
            //       ? classes.invalid
            //       : ""
            //   }
            >
              {passwordValidation.letters ? (
                <img src={done} alt="done" />
              ) : submitted ? (
                <img src={wrong} alt="wrong" />
              ) : null}
            </li>
            <li
            //   className={
            //     passwordValidation.number
            //       ? classes.valid
            //       : submitted && !passwordValidation.number
            //       ? classes.invalid
            //       : ""
            //   }
            >
              {passwordValidation.number ? (
                <img src={done} alt="done" />
              ) : submitted ? (
                <img src={wrong} alt="wrong" />
              ) : null}
            </li>
            <li
            //   className={
            //     passwordValidation.specialChar
            //       ? classes.valid
            //       : submitted && !passwordValidation.specialChar
            //       ? classes.invalid
            //       : ""
            //   }
            >
              {passwordValidation.specialChar ? (
                <img src={done} alt="done" />
              ) : submitted ? (
                <img src={wrong} alt="wrong" />
              ) : null}
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

          <button type="submit" disabled={!allValid} onSubmit={onSubmit}>
            Далее
          </button>
        </form>
      </div>
    </>
  );
}

export default RegisterForm;
