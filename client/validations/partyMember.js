import { object, string, mixed } from "yup";
import { PartyMemberRole } from "@prisma/client";

const requiredMsg = "This field is required";

export const roleValidation = object({
  role: mixed()
    .oneOf([
      PartyMemberRole.MENTOR,
      PartyMemberRole.MENTEE,
      PartyMemberRole.PARTY_LEADER,
    ])
    .required(requiredMsg),
});

export const oopValidations = object({
  outcome: string()
    .max(64, "Maximum length of 64 characters")
    .required(requiredMsg),
  obstacle: string().max(128).required(requiredMsg),
  plan: string().max(128).required(requiredMsg),
});
