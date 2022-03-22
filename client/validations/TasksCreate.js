import { object, string, number, date, ref, mixed } from "yup";
import moment from "moment";

const requiredMsg = "This field is required";

export const createTaskSchema = object({
  title: string()
    .max(40, "Title must not exceed 20 characters")
    .required(requiredMsg),

  description: string()
    .max(40, "Description must not exceed 40 characters")
    .required(requiredMsg),
  points: number().positive().integer().required(requiredMsg),
  dueDate: date().required(requiredMsg),
});
