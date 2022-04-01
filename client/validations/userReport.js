import { object, string, mixed } from "yup";

const requiredMsg = "This field is required";

export const userReportValidation = object({
  category: mixed()
    .oneOf(["Spamming", "Harassment", "Fraud", "Others"])
    .required(requiredMsg),
  reportDetails: string().required(requiredMsg),
});

export const UserReport = [userReportValidation];
