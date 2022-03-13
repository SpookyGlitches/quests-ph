import { useForm, Controller } from "react-hook-form";
import * as React from "react";
import {
  TextField,
  Stepper,
  StepLabel,
  Step,
  Button,
  InputAdornment,
  IconButton,
  Typography,
  Box,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import DatePicker from "@mui/lab/DatePicker";
import * as yup from "yup";
import moment from "moment";
import { useState } from "react";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useDropzone } from "react-dropzone";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import AuthHeader from "../../../components/Auth/AuthHeader";

const stepOneValidations = yup.object().shape({
  displayName: yup.string().required("Please enter a display name"),
  fullName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    .max(40)
    .required(),
  dateOfBirth: yup
    .string()
    .nullable()
    .test("dateOfBirth", "You must be 18 years or older", (value) => {
      return moment().diff(moment(value, "YYYY-MM-DD"), "years") >= 18;
    })
    .required("Please enter your age"),
});
const stepTwoValidations = yup.object().shape({
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
const stepThreeValidations = yup.object().shape({
  experience: yup.string().required(),
  detailedExperience: yup.string().max(255),
});
const steps = ["", "", ""];
export default function Register() {
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const { getRootProps, getInputProps } = useDropzone({
    accept:
      "image/*, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword",
    onDropAccepted: () => {},
    onDropRejected: () => {},
    multiple: true,
  });

  const stateSchema = {
    email: { value: "", error: "" },
    password: { value: "", error: "" },
    confirmPassword: { value: "", error: "" },
  };
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    control,
    handleOnChange,
    // eslint-disable-next-line
    formState: { errors },
  } = useForm(stateSchema);

  const watchdisplayName = watch("displayName", "");
  const watchFullName = watch("fullName", "");
  const watchDateofBirth = watch("dateOfBirth", "");
  const watchEmail = watch("email", "");
  const watchPassword = watch("password", "");
  const watchConfirmPassword = watch("confirmPassword", "");
  const watchExperience = watch("experience", "");
  const watchdetailedExperience = watch("detailedExperience", "");

  const onSubmit = () => {};

  const handleNext = async () => {
    switch (activeStep) {
      case 0:
        stepOneValidations
          .validate({
            displayName: watchdisplayName,
            fullName: watchFullName,
            dateOfBirth: watchDateofBirth,
          })
          // eslint-disable-next-line
          .then(() => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          });
        break;
      case 1:
        stepTwoValidations
          .validate({
            email: watchEmail,
            password: watchPassword,
            confirmPassword: watchConfirmPassword,
          })
          // eslint-disable-next-line
          .then(() => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          });
        console.log("case 1");
        break;
      case 2:
        stepThreeValidations
          .validate({
            experience: watchExperience,
            detailedExperience: watchdetailedExperience,
          })
          .then(() => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            handleSubmit(onSubmit)();
          });
        console.log("case 2");
        break;
      case 3:
        handleSubmit(onSubmit)();
        break;
      default:
    }
  };
  // eslint-disable-next-line
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <AuthLayout>
      <AuthHeader subtitle="Create an account" />
      <Stepper activeStep={activeStep} sx={{}}>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === 0 && (
        <Stack direction="column" spacing={2}>
          <Button
            style={{
              borderRadius: 10,
              minHeight: "56px",
              width: "100%",
              backgroundColor: "white",
              color: "black",
              marginTop: "0.5rem",
            }}
            variant="contained"
          >
            <img
              src="/auth/google.png"
              width="15"
              height="15"
              alt="questsgoogle"
            />{" "}
            &nbsp; Sign Up with Google
          </Button>
          <Typography align="center">or</Typography>
          <TextField
            fullWidth
            margin="dense"
            label="Display Name"
            {...register("displayName")}
            // error={errors ? true : false}
          />
          {/* <Typography
            style={{
              color: "red",
              fontWeight: "500",
              fontSize: "12px",
              textAlign: "left",
            }}
          >
            {errors.displayName?.message}
          </Typography> */}

          <TextField
            fullWidth
            margin="dense"
            label="Full Name"
            {...register("fullName")}
            sx={{ mt: -2 }}
          />

          <Controller
            name="dateOfBirth"
            control={control}
            defaultValue={null}
            render={({
              field: { onChange, value },
              fieldState: { error, invalid },
            }) => (
              <DatePicker
                label="Date of birth"
                disableFuture
                value={value}
                onChange={(date) => onChange(moment(date).format("YYYY-MM-DD"))}
                renderInput={(params) => (
                  // console.log(invalid),
                  <TextField
                    sx={{ mt: -2 }}
                    variant="filled"
                    error={invalid}
                    helperText={invalid ? error.message : null}
                    id="dateOfBirth"
                    margin="dense"
                    fullWidth
                    color="primary"
                    autoComplete="bday"
                    {...params}
                  />
                )}
              />
            )}
          />

          <Button
            color="primary"
            variant="contained"
            type="submit"
            onClick={handleNext}
            sx={{ mt: 5 }}
          >
            Next
          </Button>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="string" sx={{ mt: "1rem", mb: "1rem" }}>
              <Link href="/auth/login" passHref>
                <MuiLink
                  sx={{ cursor: "pointer" }}
                  style={{ textDecoration: "none" }}
                >
                  Already have an account?
                </MuiLink>
              </Link>
            </Typography>
          </Box>
        </Stack>
      )}
      {activeStep === 1 && (
        <Stack direction="column" spacing={1.5}>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            onClick={handleBack}
            sx={{
              mb: 1,
              boxShadow: 0,
              ":hover": {
                bgcolor: "white",
                color: "white",
                boxShadow: 0,
              },
            }}
            style={{
              maxWidth: "100px",
              minWidth: "100px",
              backgroundColor: "transparent",
              color: "#B0B0B0",
            }}
          >
            <ArrowBackIosRoundedIcon
              style={{ float: "left", marginLeft: "-1.5em" }}
            />
            &nbsp; Back
          </Button>
          <TextField
            label="Email Address"
            fullWidth
            sx={{ mt: 2 }}
            margin="dense"
            {...register("email")}

            // error={errors.email ? true : false}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            sx={{ mt: -2 }}
            fullWidth
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={handleOnChange}
            margin="dense"
            {...register("password")}
            // error={errors.password ? true : false}
          />
          <TextField
            id="password"
            name="confirmPassword"
            label="Confirm Password"
            sx={{ mt: -2 }}
            fullWidth
            type={showConfirmPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={handleOnChange}
            margin="dense"
            {...register("confirmPassword")}
            // error={errors.confirmPassword ? true : false}
          />
          <Button
            color="primary"
            variant="contained"
            type="submit"
            onClick={handleNext}
            sx={{ mt: 5 }}
          >
            Next
          </Button>
        </Stack>
      )}
      {activeStep === 2 && (
        <>
          <Stack direction="column" spacing={1.5}>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              onClick={handleBack}
              sx={{
                mb: 1,
                boxShadow: 0,
                ":hover": {
                  bgcolor: "white",
                  color: "white",
                  boxShadow: 0,
                },
              }}
              style={{
                maxWidth: "100px",
                minWidth: "100px",
                backgroundColor: "transparent",
                color: "#B0B0B0",
              }}
            >
              <ArrowBackIosRoundedIcon
                style={{ float: "left", marginLeft: "-1.5em" }}
              />
              &nbsp; Back
            </Button>
            <FormControl fullWidth variant="filled">
              <InputLabel
                id="demo-simple-select-label"
                style={{ fontSize: "13px" }}
              >
                Do you have any experience in mentoring?
              </InputLabel>
              <Select
                {...register("experience")}
                onChange={(e) =>
                  setValue("experience", e.target.value, {
                    shouldValidate: true,
                  })
                }
              >
                <MenuItem value={1}>Yes</MenuItem>
                <MenuItem value={2}>No</MenuItem>
              </Select>
            </FormControl>

            <TextField
              name="detailedExperience"
              label="If yes, what kind of mentoring?"
              multiline
              rows={3}
              fullWidth
              sx={{ mt: 2 }}
              margin="dense"
              {...register("detailedExperience")}

              // error={errors.email ? true : false}
            />

            <Box
              {...getRootProps({ className: "dropzone" })}
              sx={{
                height: "5.8rem",
                background: "#e7e7e7",
                borderColor: "#cbcbcb",
                borderRadius: "2px",
                borderWidth: "thin",
                cursor: "pointer",
              }}
            >
              <input {...getInputProps()} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: "100%",
                  padding: "2rem",
                }}
              >
                <Typography sx={{ color: "#625e5c", fontSize: "16px" }}>
                  Upload supporting document/s here
                </Typography>
                <CloudUploadRoundedIcon
                  sx={{
                    fontSize: "2rem",
                  }}
                />

                <Typography
                  variant="body2"
                  align="center"
                  sx={{ fontSize: "9px" }}
                >
                  Choose a file or drag it here.
                </Typography>
              </Box>
            </Box>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              onClick={handleNext}
              sx={{ mt: 5 }}
            >
              Sign Up
            </Button>
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
              sx={{ mt: "0rem", mb: "1rem" }}
              textAlign="center"
            >
              By signing up, I accept the{" "}
              <MuiLink
                sx={{ cursor: "pointer" }}
                style={{ textDecoration: "none" }}
              >
                {/* eslint-disable-next-line */}
                <a href="/landing/terms-of-service">Quests Terms of Service</a>
              </MuiLink>{" "}
              and acknowledge the{" "}
              <MuiLink
                sx={{ cursor: "pointer" }}
                style={{ textDecoration: "none" }}
              >
                {/* eslint-disable-next-line */}
                <a href="/landing/privacy-policy">Privacy Policy</a>
              </MuiLink>
              .
            </Typography>
          </Box>
        </>
      )}
      {activeStep === 3 && (
        <Stack direction="column" spacing={1.5} sx={{ alignItems: "center" }}>
          <Typography align="center" sx={{ fontSize: "15px" }}>
            You have successfully registered for a mentor account.
          </Typography>
          <Link href="/auth/login" passHref>
            <MuiLink
              sx={{ cursor: "pointer" }}
              style={{ textDecoration: "none" }}
            >
              Login
            </MuiLink>
          </Link>
        </Stack>
      )}
    </AuthLayout>
  );
}
