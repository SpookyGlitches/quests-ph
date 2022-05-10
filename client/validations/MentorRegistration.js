import { object, string, ref, mixed, number } from "yup";
import moment from "moment";

const requiredMsg = "This field is required";

export const stepOneMentorValidations = object({
  displayName: string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Your display name should not contain spaces or special characters",
    )
    .min(6, "Display Name must be at least 6 characters")
    .max(20)
    .required(requiredMsg),
  fullName: string().required(requiredMsg).max(20),
  dateOfBirth: string()
    .nullable()
    .test("dateOfBirth", "You must be 18 years or older", (value) => {
      return moment().diff(moment(value, "YYYY-MM-DD"), "years") >= 18;
    })
    .required("Please enter your age"),
});

export const stepTwoMentorValidations = object({
  email: string().required(requiredMsg).email("Email is invalid"),
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

export const stepThreeMentorValidations = object({
  course: string().required(requiredMsg).max(50),
  yearLevel: mixed()
    .oneOf(["1", "2", "3", "4", "5", "College Graduate"])
    .required(requiredMsg),
  gwa: number()
    .required(requiredMsg)
    .typeError("Please input the proper format")
    .test(
      "Is positive?",
      "The number must be greater than 0!",
      (value) => value > 0,
    ),
});

export const stepFourMentorValidations = object({
  experience: mixed().oneOf(["yes", "no"]).required(requiredMsg),
});

export const MentorRegistration = [
  stepOneMentorValidations,
  stepTwoMentorValidations,
  stepThreeMentorValidations,
  stepFourMentorValidations,
];
