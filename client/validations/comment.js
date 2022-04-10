import { object, string } from "yup";

const requiredMsg = "This field is required";

const commentValidation = object({
  content: string()
    .trim()
    .max(128, "Maximum length of 128 characters")
    .required(requiredMsg),
});

export default commentValidation;
