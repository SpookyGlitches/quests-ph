import { TextField } from "@mui/material";

import { Controller, useFormContext } from "react-hook-form";

export default function Step1() {
  const {
    formState: { errors },
  } = useFormContext(); //
  return (
    <>
      <Controller
        name="wish"
        render={({ field: { onChange, value } }) => (
          <TextField
            fullWidth
            id="filled-basic"
            label="Wish"
            onChange={onChange}
            value={value}
            error={errors.wish && errors.wish.message}
            helperText={
              errors.wish
                ? errors.wish.message
                : "What is something that you want to achieve?"
            }
          />
        )}
      />
      <Controller
        name="outcome"
        render={({ field: { onChange, value } }) => (
          <TextField
            fullWidth
            id="filled-basic"
            label="Outcome"
            onChange={onChange}
            value={value}
            error={errors.outcome}
            helperText={
              errors.outcome
                ? errors.outcome.message
                : "What positive impact can your wish bring to you?"
            }
          />
        )}
      />

      <Controller
        name="obstacle"
        render={({ field: { onChange, value } }) => (
          <TextField
            fullWidth
            id="filled-basic"
            label="Obstacle"
            onChange={onChange}
            minRows={3}
            maxRows={7}
            value={value}
            error={errors.obstacle}
            multiline
            helperText={
              errors.obstacle
                ? errors.obstacle.message
                : "What's stopping you from achieving your wish?"
            }
          />
        )}
      />

      <Controller
        name="plan"
        render={({ field: { onChange, value } }) => (
          <TextField
            fullWidth
            label="Plan"
            onChange={onChange}
            minRows={3}
            maxRows={7}
            value={value}
            error={errors.plan}
            multiline
            helperText={
              errors.plan
                ? errors.plan.message
                : "What steps will you take to overcome your obstacle?"
            }
          />
        )}
      />
    </>
  );
}
