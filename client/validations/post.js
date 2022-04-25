import { object, string } from "yup";

const requiredMsg = "This field is required";

const titleValidation = object({
  title: string()
    .max(100, "Maximum length of 100 characters")
    .required(requiredMsg),
});

const bodyValidation = object({
  body: string()
    .max(200, "Maximum length of 200 characters")
    .required(requiredMsg),
});

const postValidations = titleValidation.concat(bodyValidation);

export default postValidations;
