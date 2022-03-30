import { object, string } from "yup";
import moment from "moment";

const requiredMsg = "This field is required";
/* eslint-disable import/prefer-default-export */
export const EditMemberValidations = object({
  fullName: string().required(requiredMsg),
  displayName: string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Your display name should not contain spaces or special characters",
    )
    .min(4, "Display Name must be at least 6 characters")
    .max(20)
    .required(requiredMsg),

  dateOfBirth: string()
    .nullable()
    .test("dateOfBirth", "You must be 18 years or older", (value) => {
      return moment().diff(moment(value, "YYYY-MM-DD"), "years") >= 18;
    })
    .required("Please enter your age"),

  email: string().required(requiredMsg).email("Email is invalid"),

  //   password: string()
  //     .min(6, "Password must be at least 6 characters")
  //     .max(40, "Password must not exceed 40 characters")
  //     .matches(/[a-z]+/, "Password must contain at least one lowercase character")
  //     .matches(/[A-Z]+/, "Password must contain at least one uppercase character")
  //     .matches(
  //       /[@$!%*#?&]+/,
  //       "Password must contain at least one special character",
  //     )
  //     .matches(/\d+/, "Password must contain at least one number")
  //     .required(requiredMsg),

  //   confirmPassword: string()
  //     .required(requiredMsg)
  //     .oneOf([ref("password"), null], "Confirm Password does not match"),
});
