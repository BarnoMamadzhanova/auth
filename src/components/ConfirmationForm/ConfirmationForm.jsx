import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import classes from "./ConfirmationForm.module.css";
import { confirmSchema } from "../../schemas/confirm";
import { back } from "../../assets";
import {
  resendConfirmationEmail,
  selectAuthState,
} from "../../store/auth/authReducer";

function ConfirmationForm({ onSubmitSuccess, onSubmitError }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector(selectAuthState);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
    },
    validationSchema: confirmSchema,
    // onSubmit: async (values, actions) => {
    //   try {
    //     await dispatch(resendConfirmationEmail(values));
    //     onSubmitSuccess();
    //   } catch {
    //     onSubmitError();
    //   }
    //   actions.resetForm();
    // },
    onSubmit: (values, actions) => {
      console.log("submitted");
      console.log(values);
      console.log(actions);

      // Simulate success
      onSubmitSuccess();

      // Simulate error
      // onSubmitError();

      actions.resetForm();
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    formik;

  return (
    <div className={classes.confirmationContainer}>
      <button onClick={() => navigate(-1)} className={classes.backLink}>
        <img src={back} alt="back" />
        Назад
      </button>
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
          {isLoading ? "Отправка..." : "Письмо не пришло"}
        </button>
        {error && <div className={classes.errorMessage}>{error}</div>}
      </form>
      <Link to="/" className={classes.confirmLink}>
        Авторизоваться
      </Link>
    </div>
  );
}

export default ConfirmationForm;
