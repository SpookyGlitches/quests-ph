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
import moment from "moment";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  displayName: yup.string().required("Please enter a display name"),
  dateOfBirth: yup
    .string()
    .nullable()
    .test("dateOfBirth", "You must be 18 years or older", function (value) {
      return moment().diff(moment(value, "YYYY-MM-DD"), "years") >= 18;
    })
    .required("Please enter your age"),
});

const MemberRegistrationOne = () => {
  // const MemberRegistrationOne = ({ activeStep, steps, handleNext }) => { //old
  //const [value, setValue] = React.useState(null);
  //eslint-disable-next-line
  // const handleChange = (newValue) => {
  //   setValue(newValue);
  // };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const submitForm = (data) => {
    //handleNext(); this shit doesnt work huhu
    console.log(data);
  };
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

        <form
          noValidate
          onSubmit={handleSubmit(submitForm)}
          className="signup-form"
        >
          <TextField
            id="displayName"
            name="displayName"
            label="Display Name"
            fullWidth
            margin="dense"
            {...register("displayName")}
            error={errors.displayName ? true : false}
          />
          <Typography
            style={{
              color: "red",
              fontWeight: "500",
              fontSize: "12px",
              textAlign: "left",
            }}
          >
            {errors.displayName?.message}
          </Typography>

          <TextField
            id="fullName"
            name="fullName"
            label="Full Name"
            fullWidth
            margin="dense"
            {...register("fullName")}
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
                onChange={(value) =>
                  onChange(moment(value).format("YYYY-MM-DD"))
                }
                renderInput={(params) => (
                  // console.log(invalid),
                  <TextField
                    error={invalid}
                    helperText={invalid ? error.message : null}
                    id="dateOfBirth"
                    variant="standard"
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
            sx={{ mt: 5 }}
          >
            Next
          </Button>
        </form>
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
