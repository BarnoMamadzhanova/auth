import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import classes from "./ConfirmationForm.module.css";
import { confirmSchema } from "../../schemas/confirm";
import { back } from "../../assets";

const onSubmit = (values, actions) => {
  console.log("submitted");
  console.log(values);
  console.log(actions);
  actions.resetForm();
};

function ConfirmationForm() {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
    },
    validationSchema: confirmSchema,
    onSubmit,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    formik;

  return (
    <div className={classes.confirmationContainer}>
      <Link to="/" className={classes.backLink}>
        <img src={back} alt="back" />
        Назад
      </Link>
      <p className={classes.confirmTitle}>
        Выслали письмо со ссылкой для завершения регистрации на вашу почту.
      </p>
      <p className={classes.confirmText}>
        Если письмо не пришло, то пожалуйста заполните форму
      </p>
      <form
        onSubmit={handleSubmit}
        className={classes.confirmForm}
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
            className={errors.email && touched.email ? classes.inputError : ""}
          />
        </div>
        {errors.email && touched.email && (
          <div className={classes.errorMessage}>{errors.email}</div>
        )}
        <button onSubmit={handleSubmit} type="submit">
          Письмо не пришло
        </button>
      </form>
      <Link to="/" className={classes.confirmLink}>
        Авторизоваться
      </Link>
    </div>
  );
}

export default ConfirmationForm;
