import { object, string, ref } from "yup";

const requiredMsg = "This field is required";
// eslint-disable-next-line import/prefer-default-export
export const ChangePasswordValidations = object({
  password: string()
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters")
    .matches(/[a-z]+/, "Password must contain at least one lowercase character")
    .matches(/[A-Z]+/, "Password must contain at least one uppercase character")
    .matches(
      /[@$!%*#?&]+/,
      "Password must contain at least one special character",
    )
    .matches(/\d+/, "Password must contain at least one number")
    .required(requiredMsg),

  confirmPassword: string()
    .required(requiredMsg)
    .oneOf([ref("password"), null], "Confirm Password does not match"),
});
