import { object, string, mixed, date } from "yup";
import { oopValidations } from "./partyMember";

const requiredMsg = "This field is required";

const wishValidation = object({
  wish: string()
    .max(32, "Maximum length of 32 characters")
    .required(requiredMsg),
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
      // idk how to customize the message here, help 😭
    )
    .required(requiredMsg),
});

export const step1Validations = wishValidation.concat(oopValidations);

export const createQuestValidation = [step1Validations, step2Validations];
