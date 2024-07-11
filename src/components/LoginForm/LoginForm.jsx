import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas/login";
import classes from "./LoginForm.module.css";
import { visible, invisible } from "../../assets";
import { useAppDispatch, useAppSelector } from "../../store/main";
import { loginUser } from "../../store/auth/authReducer";

function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formError, setFormError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error } = useAppSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const { values, errors, touched, handleBlur, handleChange, isSubmitting } =
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
      try {
        console.log("Form submitted with values:", values);
        await dispatch(loginUser(values));
        setFormError("");
        formik.resetForm();
        navigate("/profile");
      } catch (error) {
        console.error("Login error:", error);
        setFormError("Что-то пошло не так. Пожалуйста, попробуйте снова.");
      }
    }
  };

  const getErrorMessage = () => {
    if (!error) return "";

    switch (error.status) {
      case 400:
        return "Неверный логин или пароль";
      case 401:
        return "Аккаунт не активирован. Подтвердите свою почту";
      default:
        return "Произошла ошибка. Пожалуйста, попробуйте снова";
    }
  };

  const errorMessage = getErrorMessage();

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

        <button
          type="submit"
          disabled={isSubmitting}
          onSubmit={handleFormSubmit}
        >
          Войти
        </button>
        {errorMessage && (
          <div className={classes.formErrorMessage}>{errorMessage}</div>
        )}
      </form>
      <Link to="/registration" className={classes.loginFormText}>
        У меня еще нет аккаунта
      </Link>
    </div>
  );
}

export default LoginForm;
