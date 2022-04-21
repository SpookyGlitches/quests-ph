import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function WishInput({ disabled }) {
  const {
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      name="wish"
      render={({ field: { onChange, value } }) => (
        <TextField
          fullWidth
          disabled={disabled}
          label="Wish"
          onChange={onChange}
          value={value}
          error={Boolean(errors.wish)}
          helperText={
            errors.wish
              ? errors.wish.message
              : "What is something that you want to achieve?"
          }
        />
      )}
    />
  );
}
