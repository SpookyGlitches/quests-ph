import { TextField, Stack, Button, Typography } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import { Controller, useFormContext } from "react-hook-form";
import moment from "moment";

export default function Step1() {
  const {
    control,
    formState: { errors },
  } = useFormContext(); //
  return (
    <Stack spacing={2}>
      <Button
        style={{
          borderRadius: 10,
          minheight: "56px",
          width: "100%",
          backgroundColor: "white",
          color: "black",
          marginTop: "1rem",
        }}
        variant="contained"
      >
        <img src="/auth/google.png" width="15" height="15" alt="questsgoogle" />{" "}
        &nbsp; Sign Up with Google
      </Button>
      <Typography align="center">or</Typography>
      <Controller
        name="displayName"
        render={({ field: { onChange, value } }) => (
          <TextField
            fullWidth
            id="filled-basic"
            label="Display Name"
            onChange={onChange}
            value={value}
            error={errors.displayName && errors.displayName.message}
            helperText={errors.displayName ? errors.displayName.message : ""}
          />
        )}
      />
      <Controller
        name="fullName"
        render={({ field: { onChange, value } }) => (
          <TextField
            fullWidth
            id="filled-basic"
            label="Full Name"
            onChange={onChange}
            value={value}
          />
        )}
      />
      <Controller
        name="dateOfBirth"
        control={control}
        defaultValue={null}
        render={({
          // eslint-disable-next-line
          field: { onChange, value },
          fieldState: { error, invalid },
        }) => (
          <DatePicker
            label="Birthdate"
            disableFuture
            value={value}
            // eslint-disable-next-line
            onChange={(value) => onChange(moment(value).format("YYYY-MM-DD"))}
            renderInput={(params) => (
              <TextField
                helperText={invalid ? error.message : null}
                id="dateOfBirth"
                variant="filled"
                margin="dense"
                fullWidth
                color="primary"
                autoComplete="bday"
                {...params}
                error={invalid}
              />
            )}
          />
        )}
      />
    </Stack>
  );
}
