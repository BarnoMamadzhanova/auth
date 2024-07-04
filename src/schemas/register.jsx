import * as yup from "yup";

const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;

const usernamePattern = /^[a-zA-Z]+$/;

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/;

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailPattern, "Пожалуйста введите верный email")
    .required("Required"),
  username: yup
    .string()
    .min(3)
    .max(20)
    .matches(usernamePattern, "Имя пользователя может содержать только буквы")
    .required("Required"),
  password: yup
    .string()
    .min(8)
    .max(15)
    .matches(passwordPattern)
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Пароли не совпадают")
    .required("Required"),
});
