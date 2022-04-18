import { TextField } from "@mui/material";

import { Controller, useFormContext } from "react-hook-form";

export default function Step1({ wishItem }) {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <>
      {wishItem}

      <Controller
        name="outcome"
        render={({ field: { onChange, value } }) => (
          <TextField
            fullWidth
            id="filled-basic"
            label="Outcome"
            onChange={onChange}
            value={value}
            error={Boolean(errors.outcome)}
            helperText={
              errors.outcome
                ? errors.outcome.message
                : "What positive impact would the wish bring to you?"
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
            error={Boolean(errors.obstacle)}
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
