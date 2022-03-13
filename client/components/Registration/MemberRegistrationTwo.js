import React, { useState } from "react";

import PropTypes from "prop-types";

import {
  TextField,
  Button,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as yup from "yup";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

const validationSchema = yup.object({
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Confirm Password does not match"),
});

const MemberRegistrationTwo = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [direction, setDirection] = useState("back");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <Formik
      initialValues={formData}
      onSubmit={(values) => {
        setFormData(values);
        // eslint-disable-next-line
        direction === "back" ? prevStep() : nextStep();
      }}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => (
        <Form>
          <Stack spacing={2}>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              onClick={prevStep}
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
            <Field
              name="email"
              label="Email Address *"
              margin="normal"
              as={TextField}
              error={touched.email && errors.email}
              helperText={touched.email && errors.email}
            />
            <Field
              name="password"
              label="Password"
              margin="normal"
              as={TextField}
              error={touched.password && errors.password}
              helperText={touched.password && errors.password}
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
            />
            <Field
              name="confirmPassword"
              label="Confirm Password"
              margin="normal"
              as={TextField}
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
              error={touched.confirmPassword && errors.confirmPassword}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => setDirection("forward")}
            >
              Continue
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

MemberRegistrationTwo.propTypes = {
  // eslint-disable-next-line
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
};

export default MemberRegistrationTwo;
