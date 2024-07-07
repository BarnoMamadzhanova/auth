import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registerSchema } from "../../schemas/register";
import classes from "./RegisterForm.module.css";
import { invisible, visible, back } from "../../assets";
import { useAppDispatch, useAppSelector } from "../../store/main";
import { registerUser } from "../../store/auth/authReducer";

function RegisterForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: registerSchema,
      // onSubmit: async (values, actions) => {
      //   try {
      //     await dispatch(registerUser(values)).unwrap();
      //     console.log("Registration successful");
      //     navigate("/profile");
      //   } catch (err) {
      //     console.log("Registration failed", err);
      //   }
      //   actions.resetForm();
      // },

      // Simulate form submission
      onSubmit: (values, actions) => {
        console.log("submitted");
        console.log(values);
        console.log(actions);

        // Simulate API call delay
        setTimeout(() => {
          const success = true;
          if (success) {
            console.log("Registration successful");
            navigate("/confirmation");
          } else {
            console.log("Registration failed");
          }
        }, 1000);

        actions.resetForm();
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
    specialChar: /(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/.test(values.password),
  };

  return (
    <>
      <button onClick={() => navigate(-1)} className={classes.backLink}>
        <img src={back} alt="back" />
        Назад
      </button>
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
            <li
              className={
                passwordValidation.length ? classes.valid : classes.invalid
              }
            >
              От 8 до 15 символов
            </li>
            <li
              className={
                passwordValidation.letters ? classes.valid : classes.invalid
              }
            >
              Строчные и прописные буквы
            </li>
            <li
              className={
                passwordValidation.number ? classes.valid : classes.invalid
              }
            >
              Минимум 1 цифра
            </li>
            <li
              className={
                passwordValidation.specialChar ? classes.valid : classes.invalid
              }
            >
              Минимум 1 спецсимвол (!, ", #, $...)
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

          <button type="submit" onSubmit={handleSubmit} disabled={isLoading}>
            Далее
          </button>
          {error && <div className={classes.errorMessage}>{error}</div>}
        </form>
      </div>
    </>
  );
}

export default RegisterForm;
