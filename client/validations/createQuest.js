import { object, string, mixed, date } from "yup";

const requiredMsg = "This field is required";

export const step1Validations = object({
  wish: string()
    .max(32, "Maximum length of 32 characters")
    .required(requiredMsg),
  outcome: string()
    .max(64, "Maximum length of 64 characters")
    .required(requiredMsg),
  obstacle: string().max(128).required(requiredMsg),
  plan: string().max(128).required(requiredMsg),
});

export const step2Validations = object({
  category: mixed().oneOf(["HEALTH", "CAREER", "SOCIAL"]).required(requiredMsg),
  difficulty: mixed().oneOf(["EASY", "MEDIUM", "HARD"]).required(requiredMsg),
  visibility: mixed().oneOf(["PUBLIC", "PRIVATE"]).required(requiredMsg),
  startDate: date().required(requiredMsg),
  endDate: date()
    .when(
      "startDate",
      (startDate, schema) => startDate && schema.min(startDate),
    )
    .required(requiredMsg),
});

export const validationSchema = [step1Validations, step2Validations];
