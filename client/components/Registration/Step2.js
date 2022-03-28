import { TextField, Stack, InputAdornment, IconButton } from "@mui/material";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

export default function Step2() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const {
    formState: { errors },
  } = useFormContext(); //
  return (
    <Stack spacing={2}>
      <Controller
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextField
            fullWidth
            id="filled-basic"
            label="Email Address"
            onChange={onChange}
            value={value}
            error={errors.email && errors.email.message}
            helperText={errors.email ? errors.email.message : ""}
          />
        )}
      />
      <Controller
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextField
            fullWidth
            id="filled-basic"
            label="Password"
            type={showPassword ? "text" : "password"}
            onChange={onChange}
            value={value}
            error={errors.password && errors.password.message}
            helperText={errors.password ? errors.password.message : ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? (
                      <VisibilityRoundedIcon />
                    ) : (
                      <VisibilityOffRoundedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <TextField
            fullWidth
            id="filled-basic"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            onChange={onChange}
            value={value}
            error={errors.confirmPassword && errors.confirmPassword.message}
            helperText={
              errors.confirmPassword ? errors.confirmPassword.message : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                  >
                    {showConfirmPassword ? (
                      <VisibilityRoundedIcon />
                    ) : (
                      <VisibilityOffRoundedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Stack>
  );
}
