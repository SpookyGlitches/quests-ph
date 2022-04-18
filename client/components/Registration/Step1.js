import { TextField, Stack } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import { Controller, useFormContext } from "react-hook-form";
import moment from "moment";

export default function Step1({ memberType }) {
  const {
    control,
    formState: { errors },
  } = useFormContext(); //
  return (
    <Stack spacing={2}>
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

      {memberType === "mentor" ? (
        <Controller
          name="fullName"
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              id="filled-basic"
              label="Full Name"
              onChange={onChange}
              value={value}
              error={errors.fullName && errors.fullName.message}
              helperText={errors.fullName ? errors.fullName.message : ""}
            />
          )}
        />
      ) : (
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
      )}

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
