import { object, string } from "yup";

const requiredMsg = "This field is required";

export const oopValidations = object({
  outcome: string()
    .max(64, "Maximum length of 64 characters")
    .required(requiredMsg),
  obstacle: string().max(128).required(requiredMsg),
  plan: string().max(128).required(requiredMsg),
});

export const joinQuestValidation = [oopValidations];
