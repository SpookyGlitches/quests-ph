import * as React from "react";
import { useState } from "react";
import {
  Typography,
  TextField,
  Box,
  Button,
  Stack,
  InputAdornment,
  IconButton,
  Link as MuiLink,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import useForm from "../../hooks/useForm";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Confirm Password does not match"),
});

// const MemberRegistrationTwo = ({
//   activeStep,
//   steps,
//   handleNext,
//   handleBack,
// }) => {  //old
const MemberRegistrationTwo = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // const stateSchema = {
  //   emailAddress: { value: "", error: "" },
  //   password: { value: "", error: "" },
  //   confirmPassword: { value: "", error: "" },
  // };

  // const stateValidatorSchema = {
  //   emailAddress: {
  //     required: true,
  //     validator: {
  //       func: (value) =>
  //         //eslint-disable-next-line
  //         /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
  //           value,
  //         ),
  //       error: "Email must be a valid email address",
  //     },
  //   },
  //   password: {
  //     required: true,
  //     validator: {
  //       func: (value) =>
  //         /^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value),
  //       error:
  //         "Password must be at least 8 characters and at least one special character",
  //     },
  //   },
  // };

  // const { values, errors, dirty, handleOnChange } = useForm(
  //   stateSchema,
  //   stateValidatorSchema,
  // );
  // const { emailAddress, password, confirmPassword } = values;
  const {
    register,
    handleSubmit,
    handleOnChange,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const submitForm = (data) => {
    console.log(data);
  };
  return (
    <>
      <Stack direction="column" spacing={2}>
        <form
          noValidate
          onSubmit={handleSubmit(submitForm)}
          className="signup-form"
        >
          <TextField
            id="email"
            name="email"
            label="Email Address"
            fullWidth
            margin="dense"
            {...register("email")}
            error={errors.email ? true : false}
          />
          <Typography
            style={{
              color: "red",
              fontWeight: "500",
              fontSize: "12px",
              textAlign: "left",
            }}
          >
            {errors.email?.message}
          </Typography>
          <TextField
            id="password"
            name="password"
            label="Password"
            fullWidth
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={handleOnChange}
            margin="dense"
            {...register("password")}
            error={errors.password ? true : false}
          />
          <Typography
            style={{
              color: "red",
              fontWeight: "500",
              fontSize: "12px",
              textAlign: "left",
            }}
          >
            {errors.password?.message}
          </Typography>

          <TextField
            id="password"
            name="confirmPassword"
            label="Confirm Password"
            fullWidth
            type={showConfirmPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={handleOnChange}
            margin="dense"
            {...register("confirmPassword")}
            error={errors.confirmPassword ? true : false}
          />
          <Typography
            style={{
              color: "red",
              fontWeight: "500",
              fontSize: "12px",
              textAlign: "left",
            }}
          >
            {errors.confirmPassword?.message}
          </Typography>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            sx={{ mt: 5 }}
          >
            SUBMIT
          </Button>
        </form>

        {/* <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        {!emailAddress ||
        !password ||
        !confirmPassword ||
        confirmPassword != password ? (
          <Button variant="contained" disabled>
            {activeStep === steps.length ? "Finish" : "Sign Up"}
          </Button>
        ) : (
          <Button variant="contained" onClick={handleNext}>
            {activeStep === steps.length ? "Finish" : "Sign Up"}
          </Button>
        )} */}
      </Stack>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="string"
          sx={{ mt: "1rem", mb: "1rem" }}
          textAlign="center"
        >
          By signing up, I accept the{" "}
          <MuiLink
            sx={{ cursor: "pointer" }}
            style={{ textDecoration: "none" }}
          >
            <a href="/landing/terms-of-service">Quests Terms of Service</a>
          </MuiLink>{" "}
          and acknowledge the{" "}
          <MuiLink
            sx={{ cursor: "pointer" }}
            style={{ textDecoration: "none" }}
          >
            <a href="/landing/privacy_policy">Privacy Policy</a>
          </MuiLink>
          .
        </Typography>
      </Box>
    </>
  );
};

export default MemberRegistrationTwo;
