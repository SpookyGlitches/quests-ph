import * as React from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import DatePicker from "@mui/lab/DatePicker";
import useForm from "../../hooks/useForm";

const MemberRegistrationOne = ({ activeStep, steps, handleNext }) => {
  const [value, setValue] = React.useState(null);
  //eslint-disable-next-line
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const stateSchema = {
    displayName: { value: "", error: "" },
    fullName: { value: "", error: "" },
    birthdate: { value: "", error: "" },
  };

  const stateValidatorSchema = {
    displayName: {
      required: true,
      validator: {
        func: (value) => /^[[A-Za-z][A-Za-z0-9_]{7,29}$/.test(value),
        error: "Display Name must be 8-30 characters",
      },
    },
    fullName: {
      required: true,
      validator: {
        func: (value) => /^[[A-Za-z][A-Za-z0-9_]{7,29}$/.test(value),
        error: "Full Name must be 8-30 characters",
      },
    },
  };

  const { values, errors, dirty, handleOnChange } = useForm(
    stateSchema,
    stateValidatorSchema,
  );
  const { displayName, fullName } = values;

  return (
    <>
      <Stack direction="column" spacing={1.5}>
        <Button
          style={{
            borderRadius: 10,
            minHeight: "56px",
            width: "100%",
            backgroundColor: "white",
            color: "black",
            marginTop: "1rem",
          }}
          variant="contained"
        >
          <img
            src="/assets/google.png"
            width="15"
            height="15"
            alt="questsgoogle"
          />{" "}
          &nbsp; Sign Up with Google
        </Button>
        <Typography align="center">or</Typography>
        <TextField
          fullWidth
          required
          style={{}}
          id="filled-required"
          label="Display Name"
          name="displayName"
          value={displayName}
          onChange={handleOnChange}
        />
        {errors.displayName && dirty.displayName && (
          <Typography
            style={{ marginTop: "0", color: "red", fontWeight: "200" }}
          >
            {errors.displayName}
          </Typography>
        )}
        <TextField
          fullWidth
          required
          style={{}}
          id="filled-required"
          label="Full Name"
          name="fullName"
          value={fullName}
          onChange={handleOnChange}
          sx={{}}
        />
        {errors.fullName && dirty.fullName && (
          <Typography
            style={{ marginTop: "0", color: "red", fontWeight: "200" }}
          >
            {errors.fullName}
          </Typography>
        )}

        <DatePicker
          label="Birthday"
          name="birthdate"
          value={value}
          maxDate={new Date()}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />

        {!displayName || !fullName ? (
          <Button variant="contained" disabled>
            {activeStep === steps.length ? "Finish" : "Next"}
          </Button>
        ) : (
          <Button variant="contained" onClick={handleNext}>
            {activeStep === steps.length ? "Finish" : "Next"}
          </Button>
        )}
      </Stack>

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
    </>
  );
};

export default MemberRegistrationOne;
