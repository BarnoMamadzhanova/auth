import * as yup from "yup";

const usernamePattern = /^[a-zA-Z]+$/;

const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;

export const confirmSchema = yup.object().shape({
  username: yup
    .string()
    .min(3)
    .max(20)
    .matches(usernamePattern)
    .required("Required"),
  email: yup
    .string()
    .matches(emailPattern, "Пожалуйста введите верный email")
    .required("Required"),
});
