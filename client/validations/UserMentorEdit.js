import { object, string } from "yup";
import moment from "moment";

const requiredMsg = "This field is required";

// eslint-disable-next-line import/prefer-default-export
export const EditMentorValidations = object({
  fullName: string().required(requiredMsg),
  displayName: string()
    .min(6, "Display Name must be at least 6 characters")
    .max(20)
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Your display name should not contain spaces or special characters",
    )

    .required(requiredMsg),

  dateOfBirth: string()
    .nullable()
    .test("dateOfBirth", "You must be 18 years or older", (value) => {
      return moment().diff(moment(value, "YYYY-MM-DD"), "years") >= 18;
    })
    .required("Please enter your age"),

  // email: string().required(requiredMsg).email("Email is invalid"),
});
