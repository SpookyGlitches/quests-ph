import { object, string } from "yup";

const requiredMsg = "This field is required";

const titleValidation = object({
  title: string()
    .max(32, "Maximum length of 32 characters")
    .required(requiredMsg),
});

const bodyValidation = object({
  body: string()
    .max(128, "Maximum length of 128 characters")
    .required(requiredMsg),
});

const postValidations = titleValidation.concat(bodyValidation);

export default postValidations;
