import { object, string } from "yup";

const requiredMsg = "This field is required";

const commentValidation = object({
  content: string()
    .trim()
    .max(200, "Maximum length of 200 characters")
    .required(requiredMsg),
});

export default commentValidation;
