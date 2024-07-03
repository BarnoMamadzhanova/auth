import * as yup from "yup";

const usernamePattern = /^[a-zA-Z]+$/;

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/;

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .min(3)
    .max(20)
    .matches(usernamePattern)
    .required("Required"),
  password: yup
    .string()
    .min(8)
    .max(15)
    .matches(passwordPattern)
    .required("Required"),
});
